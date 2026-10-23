// =====================================================================
// 자동 색상 반전 (auto tone)
// 제목·슬라이드 번호·prev/next·닫기 버튼·Footnotes·세로 홈 링크 아래의 실제 이미지 밝기를 읽어서
// 배경이 어두우면 흰색(.tone-dark), 밝으면 기본 검정으로 바꿉니다.
//
// 판정이 의도와 다른 슬라이드는 HTML에서 직접 지정할 수 있어요:
//   <li data-tone="dark">  → 이 슬라이드 위에서는 항상 흰색
//   <li data-tone="light"> → 이 슬라이드 위에서는 항상 검정
// =====================================================================
(function () {
    var THRESHOLD = 0.5;          // 0(검정) ~ 1(흰색). 이보다 어두우면 흰 글자
    var UI_SELECTOR = ".head, .controls, .slidenumber, .bottom, .homepagelink";
    var cache = {};               // 이미지 src → 축소 픽셀 데이터

    function targets() {
        var list = [];
        var title = document.querySelector('input[id*="popup"] + label');
        if (title) {
            var h0 = title.querySelector("h0");
            list.push({ el: title, area: h0 || title });
        }
        document.querySelectorAll(".controls pguide").forEach(function (el) {
            list.push({ el: el, area: el });
        });
        document.querySelectorAll(".head .close").forEach(function (el) {
            list.push({ el: el, area: el });
        });
        document.querySelectorAll(".bottom .footnote-title").forEach(function (el) {
            list.push({ el: el, area: el });
        });
        document.querySelectorAll(".homepagelink .btn").forEach(function (el) {
            list.push({ el: el, area: el });
        });
        document.querySelectorAll(".slidenumber").forEach(function (el) {
            var p = el.querySelector("p") || el;
            list.push({ el: el, area: p });
        });
        return list;
    }

    // ---- 픽셀 읽기 ---------------------------------------------------
    function pixelsOf(src, drawable, w, h) {
        if (cache[src]) return cache[src];
        if (!w || !h) return null;
        var scale = Math.min(1, 400 / Math.max(w, h));
        var cw = Math.max(1, Math.round(w * scale)), ch = Math.max(1, Math.round(h * scale));
        try {
            var c = document.createElement("canvas");
            c.width = cw; c.height = ch;
            var ctx = c.getContext("2d", { willReadFrequently: true });
            ctx.drawImage(drawable, 0, 0, cw, ch);
            var data = { w: cw, h: ch, d: ctx.getImageData(0, 0, cw, ch).data };
            if (drawable.tagName !== "VIDEO") cache[src] = data;   // 영상은 프레임이 바뀌므로 캐시 안 함
            return data;
        } catch (e) {
            return null;  // 외부 도메인 이미지 등 읽을 수 없는 경우
        }
    }

    // 박스 안에 이미지가 어떻게 놓였는지(fit, 위치) 계산 → 화면 좌표를 이미지 좌표로
    function mapPoint(x, y, box, nw, nh, fit, posX, posY) {
        var bw = box.width, bh = box.height, dw = bw, dh = bh;
        if (fit === "cover" || fit === "contain") {
            var s = fit === "cover" ? Math.max(bw / nw, bh / nh) : Math.min(bw / nw, bh / nh);
            dw = nw * s; dh = nh * s;
        } else if (fit === "none" || fit === "auto") {
            dw = nw; dh = nh;
        }
        var ox = box.left + (bw - dw) * posX, oy = box.top + (bh - dh) * posY;
        var u = (x - ox) / dw, v = (y - oy) / dh;
        if (u < 0 || u > 1 || v < 0 || v > 1) return null;   // 이미지 바깥(여백)
        return { u: u, v: v };
    }

    function pct(v) {
        if (!v) return 0.5;
        if (v.indexOf("%") > -1) return parseFloat(v) / 100;
        if (v === "left" || v === "top") return 0;
        if (v === "right" || v === "bottom") return 1;
        return 0.5;
    }

    function luminance(r, g, b) { return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255; }

    function sampleData(data, m) {
        var px = Math.min(data.w - 1, Math.floor(m.u * data.w));
        var py = Math.min(data.h - 1, Math.floor(m.v * data.h));
        var i = (py * data.w + px) * 4, d = data.d;
        if (d[i + 3] < 30) return null;  // 투명 픽셀 → 뒤쪽 배경을 봄
        return luminance(d[i], d[i + 1], d[i + 2]);
    }

    var bgImgs = {};
    function bgImage(url) {
        if (!bgImgs[url]) {
            var im = new Image();
            im.onload = function () { schedule(); };
            im.src = url;
            bgImgs[url] = im;
        }
        return bgImgs[url];
    }

    // 한 점 아래에 보이는 색의 밝기 (UI 요소는 건너뜀)
    function toneAt(x, y) {
        var stack = document.elementsFromPoint(x, y);
        for (var k = 0; k < stack.length; k++) {
            var e = stack[k];
            if (e.closest(UI_SELECTOR) || e.closest('input[id*="popup"] + label')) continue;

            var forced = e.closest("li[data-tone]");
            if (forced) return forced.getAttribute("data-tone") === "dark" ? 0 : 1;

            var cs = getComputedStyle(e);
            if (cs.visibility === "hidden" || parseFloat(cs.opacity) < 0.3) continue;
            var box = e.getBoundingClientRect();
            var pos = (cs.objectPosition || "50% 50%").split(" ");

            if (e.tagName === "IMG" && e.complete && e.naturalWidth) {
                var m = mapPoint(x, y, box, e.naturalWidth, e.naturalHeight, cs.objectFit, pct(pos[0]), pct(pos[1]));
                var data = m && pixelsOf(e.currentSrc || e.src, e, e.naturalWidth, e.naturalHeight);
                var l = data && sampleData(data, m);
                if (l !== null && l !== undefined) return l;
            } else if (e.tagName === "VIDEO" && e.videoWidth) {
                var mv = mapPoint(x, y, box, e.videoWidth, e.videoHeight, cs.objectFit, pct(pos[0]), pct(pos[1]));
                var dv = mv && pixelsOf("video", e, e.videoWidth, e.videoHeight);
                var lv = dv && sampleData(dv, mv);
                if (lv !== null && lv !== undefined) return lv;
            } else if (e.tagName === "IFRAME") {
                return 0.1;  // 임베드 영상 플레이어는 대부분 어두움
            }

            var bi = cs.backgroundImage;
            var url = bi && bi !== "none" && (bi.match(/url\(["']?([^"')]+)["']?\)/) || [])[1];
            if (url) {
                var im = bgImage(url);
                if (im.complete && im.naturalWidth) {
                    var size = cs.backgroundSize.split(" ")[0];
                    var bpos = cs.backgroundPosition.split(" ");
                    var mb = mapPoint(x, y, box, im.naturalWidth, im.naturalHeight,
                        size === "cover" || size === "contain" ? size : (size === "auto" ? "auto" : "fill"),
                        pct(bpos[0]), pct(bpos[1]));
                    var db = mb && pixelsOf(url, im, im.naturalWidth, im.naturalHeight);
                    var lb = db && sampleData(db, mb);
                    if (lb !== null && lb !== undefined) return lb;
                }
            }

            var c = cs.backgroundColor.match(/[\d.]+/g);
            if (c && (c.length < 4 || parseFloat(c[3]) > 0.5)) {
                return luminance(+c[0], +c[1], +c[2]);
            }
        }
        return 1; // 아무것도 없으면 흰 배경으로 간주
    }

    function update() {
        var vw = window.innerWidth, vh = window.innerHeight;
        targets().forEach(function (t) {
            var r = t.area.getBoundingClientRect();
            if (r.width < 1 || r.right < 0 || r.left > vw || r.bottom < 0 || r.top > vh) return;
            var sum = 0, n = 0;
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 3; j++) {
                    var x = r.left + r.width * (i + 0.5) / 4;
                    var y = r.top + r.height * (j + 0.5) / 3;
                    if (x < 0 || y < 0 || x >= vw || y >= vh) continue;
                    sum += toneAt(x, y); n++;
                }
            }
            if (n) t.el.classList.toggle("tone-dark", sum / n < THRESHOLD);
        });
    }

    var timer = null;
    function schedule(delay) {
        clearTimeout(timer);
        timer = setTimeout(update, delay || 60);
    }

    window.addEventListener("load", function () {
        update();
        document.querySelectorAll("img").forEach(function (im) {
            if (!im.complete) im.addEventListener("load", function () { schedule(); });
        });
        var slides = document.querySelector(".slides");
        if (slides) slides.addEventListener("transitionend", function () { schedule(); });
        document.querySelectorAll(".controls .prev, .controls .next").forEach(function (b) {
            b.addEventListener("click", function () { schedule(550); setTimeout(update, 750); });
        });
        var popup = document.querySelector('input[id*="popup"]');
        if (popup) popup.addEventListener("change", function () { schedule(450); });
        window.addEventListener("resize", function () { schedule(150); });
        window.addEventListener("scroll", function () { schedule(80); }, { passive: true });
        document.addEventListener("scroll", function () { schedule(80); }, { passive: true, capture: true });
        // 화면에 영상이 있으면 프레임 변화에 맞춰 가끔 다시 확인
        if (document.querySelector("video")) setInterval(update, 1500);
    });
})();
