// Christmas 2026 — remove this <script> tag after the season.

// ------------------------------------------------------------------
// 1. Touch screens: mark the tapped menu item so CSS can show it in the
//    hover green.
//    .is-pressed  while the finger is down (PROJECT link, before navigating)
//    .is-open     while that item's popup is open (INDEX / COLOPHON / ABOUT)
// ------------------------------------------------------------------
(function () {
	if (!window.matchMedia('(hover: none)').matches) return;

	const pairs = [
		['.list-index', '.index-popup'],
		['.colophon-about', '.colophon-popup'],
		['.list-about', '.about-popup'],
	];

	pairs.forEach(([buttonSel, popupSel]) => {
		const button = document.querySelector(buttonSel);
		const popup = document.querySelector(popupSel);
		if (!button || !popup) return;
		const li = button.closest('li') || button;
		const sync = () => li.classList.toggle('is-open', popup.style.display === 'block');
		new MutationObserver(sync).observe(popup, { attributes: true, attributeFilter: ['style'] });
		sync();
	});

	document.querySelectorAll('.content ul > li').forEach((li) => {
		li.addEventListener('touchstart', () => li.classList.add('is-pressed'), { passive: true });
		const release = () => setTimeout(() => li.classList.remove('is-pressed'), 180);
		li.addEventListener('touchend', release);
		li.addEventListener('touchcancel', release);
	});
})();

// ------------------------------------------------------------------
// 2. Popup snow: soft flakes drifting down, gathering into a drift
//    along the bottom of the open popup. Replaces the old glitter
//    burst from js/index.js while this file is loaded.
// ------------------------------------------------------------------
(function () {
	// Switch off the old glitter (index.js calls these on load / INDEX click)
	window.createGlitter = function () {};
	window.createSingleGlitter = function () {};

	const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	const CONFIG = {
		spawnPerSecond: 2.6,     // per 1000px of popup width
		speed: [46, 90],         // px per second (gentle, "퐁퐁")
		sway: [8, 26],           // px side-to-side drift
		pileMax: 0.13,           // drift can reach 13% of the popup height…
		pileMaxPx: 120,          // …but never more than this
		fillSeconds: 70,         // roughly how long until the drift is full
		column: 3,               // heightmap resolution in px
	};

	const CRYSTAL =
		"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-10 -10 20 20'%3E" +
		"%3Cg stroke='white' stroke-width='1.1' stroke-linecap='round' fill='none'%3E" +
		"%3Cpath id='a' d='M0 0V-9M0 -5.5L-2.2 -7.6M0 -5.5L2.2 -7.6'/%3E" +
		"%3Cuse href='%23a' transform='rotate(60)'/%3E%3Cuse href='%23a' transform='rotate(120)'/%3E" +
		"%3Cuse href='%23a' transform='rotate(180)'/%3E%3Cuse href='%23a' transform='rotate(240)'/%3E" +
		"%3Cuse href='%23a' transform='rotate(300)'/%3E%3C/g%3E%3C/svg%3E\")";

	const style = document.createElement('style');
	style.textContent = `
		.xmas-snow-layer { position:absolute; inset:0; z-index:-1; pointer-events:none; overflow:hidden; border-radius:inherit; }
		.xmas-flake { position:absolute; top:0; left:0; pointer-events:none; will-change:transform, opacity;
			border-radius:50%;
			background: radial-gradient(circle, rgba(255,255,255,1) 0 34%, rgba(255,250,248,.7) 54%, rgba(255,255,255,0) 74%);
			box-shadow: 0 0 6px 2px rgba(255,255,255,.9), 0 0 15px 4px rgba(255,234,210,.5); }
		/* twinkling halo: breathes in and out on its own rhythm */
		.xmas-flake::after { content:''; position:absolute; inset:-30%; border-radius:50%;
			background: radial-gradient(circle, rgba(255,255,255,.75) 0, rgba(255,232,206,.3) 40%, rgba(255,255,255,0) 68%);
			animation: xmasTwinkle var(--tw, 2.4s) ease-in-out var(--twd, 0s) infinite alternate; }
		.xmas-flake.is-glint { box-shadow: 0 0 7px 3px rgba(255,255,255,1), 0 0 22px 7px rgba(255,228,196,.6); }
		.xmas-flake.is-glint::after { inset:-45%; }
		.xmas-flake.is-crystal { border-radius:0; background:${CRYSTAL} center/contain no-repeat; box-shadow:none;
			filter: drop-shadow(0 0 2px rgba(255,255,255,1)) drop-shadow(0 0 6px rgba(255,232,206,.75)); }
		.xmas-flake.is-far { box-shadow: 0 0 3px 1px rgba(255,255,255,.55); }
		.xmas-flake.is-far::after { display:none; }
		@keyframes xmasTwinkle { from { opacity:.35; transform:scale(.92); } to { opacity:1; transform:scale(1.04); } }
		.xmas-pile { position:absolute; left:0; bottom:0; width:100%; pointer-events:none; }
	`;
	document.head.appendChild(style);

	const rand = (a, b) => a + Math.random() * (b - a);

	function makeSnow(popup) {
		const layer = document.createElement('div');
		layer.className = 'xmas-snow-layer';
		const canvas = document.createElement('canvas');
		canvas.className = 'xmas-pile';
		layer.appendChild(canvas);
		popup.insertBefore(layer, popup.firstChild);
		const ctx = canvas.getContext('2d');

		let W = 0, H = 0, maxH = 0, heights = new Float32Array(0), dpr = 1, sparkles = [];
		let running = false, lastSpawn = 0, carry = 0, raf = 0, dirty = true;

		function measure() {
			W = popup.clientWidth; H = popup.clientHeight;
			maxH = Math.min(H * CONFIG.pileMax, CONFIG.pileMaxPx);
			dpr = Math.min(window.devicePixelRatio || 1, 2);
			const cols = Math.ceil(W / CONFIG.column) + 1;
			if (cols !== heights.length) {
				const next = new Float32Array(cols);
				next.set(heights.subarray(0, Math.min(cols, heights.length)));
				heights = next;
			}
			const ch = Math.ceil(maxH + 16);
			canvas.width = Math.ceil(W * dpr); canvas.height = Math.ceil(ch * dpr);
			canvas.style.height = ch + 'px';
			// glints scattered through the drift, revealed as it deepens
			sparkles = Array.from({ length: Math.round(W / 9) }, () => ({
				x: Math.random() * W, d: rand(0.08, 0.85), r: rand(0.5, 1.3),
				a: rand(0.45, 0.95), gold: Math.random() < 0.35,
			}));
			dirty = true;
		}

		function heightAt(x) {
			const i = Math.max(0, Math.min(heights.length - 1, Math.round(x / CONFIG.column)));
			return heights[i];
		}

		// A landed flake adds a soft mound around x; growth eases off near the top
		function deposit(x, size) {
			const flakesToFill = CONFIG.spawnPerSecond * (W / 1000) * CONFIG.fillSeconds;
			const area = (maxH * 0.85 * W) / Math.max(flakesToFill, 1);
			const sigma = Math.max(30, size * 6);
			const amp = area / (sigma * 2.5066);
			const c = x / CONFIG.column, span = Math.ceil((sigma * 3) / CONFIG.column);
			for (let i = Math.max(0, Math.floor(c - span)); i <= Math.min(heights.length - 1, Math.ceil(c + span)); i++) {
				const d = (i - c) * CONFIG.column;
				const room = Math.max(0, 1 - heights[i] / maxH);
				heights[i] += amp * Math.exp(-(d * d) / (2 * sigma * sigma)) * room;
			}
			// light smoothing so the drift stays soft
			for (let k = 0; k < 4; k++) for (let i = 1; i < heights.length - 1; i++)
				heights[i] = heights[i] * 0.6 + (heights[i - 1] + heights[i + 1]) * 0.2;
			dirty = true;
		}

		function drawPile() {
			if (!dirty) return;
			dirty = false;
			const ch = canvas.height / dpr;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			ctx.clearRect(0, 0, W, ch);
			if (!heights.some((h) => h > 0.3)) return;
			ctx.beginPath();
			ctx.moveTo(0, ch);
			for (let i = 0; i < heights.length; i++) ctx.lineTo(i * CONFIG.column, ch - heights[i]);
			ctx.lineTo(W, ch);
			ctx.closePath();
			const g = ctx.createLinearGradient(0, ch - maxH, 0, ch);
			g.addColorStop(0, 'rgba(255,255,255,0.93)');
			g.addColorStop(0.55, 'rgba(250,240,240,0.88)');
			g.addColorStop(1, 'rgba(232,214,218,0.85)');
			ctx.fillStyle = g;
			ctx.shadowColor = 'rgba(255,255,255,0.9)';
			ctx.shadowBlur = 16;
			ctx.fill();
			ctx.shadowBlur = 0;
			for (const s of sparkles) {
				const h = heightAt(s.x);
				if (h < 6) continue;
				ctx.globalAlpha = s.a * Math.min(1, (h - 6) / 20);
				ctx.fillStyle = s.gold ? '#FFE3B8' : '#FFFFFF';
				ctx.beginPath();
				ctx.arc(s.x, ch - h * (1 - s.d), s.r, 0, Math.PI * 2);
				ctx.fill();
			}
			ctx.globalAlpha = 1;
		}

		function spawn() {
			const depth = Math.random();                  // 0 = far, 1 = near
			const crystal = depth > 0.6 && Math.random() < 0.35;
			const size = crystal ? rand(8, 13) : 1.6 + depth * rand(3.5, 6);
			const startX = rand(0, W);
			const sway = rand(...CONFIG.sway) * (0.5 + depth);
			const phase = rand(0, Math.PI * 2);
			const turns = rand(0.8, 1.8);
			const endX = startX + Math.sin(phase + turns * Math.PI * 2) * sway;
			const targetY = H - heightAt(endX) - size * 0.4;
			const speed = rand(...CONFIG.speed) * (0.7 + depth * 0.5);
			const duration = ((targetY + 20) / speed) * 1000;

			const el = document.createElement('div');
			const far = depth < 0.25;
			const glint = !crystal && !far && Math.random() < 0.18;
			el.className = 'xmas-flake' + (crystal ? ' is-crystal' : '') + (far ? ' is-far' : '') + (glint ? ' is-glint' : '');
			el.style.width = el.style.height = size + 'px';
			el.style.opacity = (0.5 + depth * 0.5).toFixed(2);
			el.style.setProperty('--tw', (glint ? rand(0.7, 1.3) : rand(1.6, 3.2)).toFixed(2) + 's');
			el.style.setProperty('--twd', (-rand(0, 3)).toFixed(2) + 's');
			if (far) el.style.filter = 'blur(0.6px)';
			layer.appendChild(el);

			const steps = 12, frames = [];
			const spin = crystal ? rand(-180, 180) : 0;
			for (let s = 0; s <= steps; s++) {
				const t = s / steps;
				const x = startX + Math.sin(phase + t * turns * Math.PI * 2) * sway - size / 2;
				const y = -20 + t * (targetY + 20) - size / 2;
				frames.push({ transform: `translate3d(${x}px, ${y}px, 0) rotate(${spin * t}deg)` });
			}
			const anim = el.animate(frames, { duration, easing: 'linear' });
			anim.onfinish = () => {
				el.remove();
				if (running) deposit(endX, size);
			};
		}

		function tick(now) {
			if (!running) return;
			if (!lastSpawn) lastSpawn = now;
			const dt = Math.min((now - lastSpawn) / 1000, 0.25);
			lastSpawn = now;
			carry += dt * CONFIG.spawnPerSecond * (W / 1000);
			while (carry >= 1) { spawn(); carry -= 1; }
			drawPile();
			raf = requestAnimationFrame(tick);
		}

		function start() {
			if (running || reduceMotion) return;
			running = true;
			heights.fill(0);
			measure();
			// a few flakes already mid-air so it doesn't start empty
			for (let i = 0; i < Math.round(W / 120); i++) setTimeout(spawn, i * 90);
			lastSpawn = 0; carry = 0;
			raf = requestAnimationFrame(tick);
		}

		function stop() {
			running = false;
			cancelAnimationFrame(raf);
			layer.querySelectorAll('.xmas-flake').forEach((f) => f.remove());
			heights.fill(0);
			dirty = true; drawPile();
		}

		const isOpen = () => getComputedStyle(popup).display !== 'none';
		const sync = () => (isOpen() ? start() : stop());
		new MutationObserver(sync).observe(popup, { attributes: true, attributeFilter: ['style', 'class'] });
		window.addEventListener('resize', () => { if (running) measure(); });
		sync();
	}

	['.index-popup', '.colophon-popup', '.about-popup'].forEach((sel) => {
		const popup = document.querySelector(sel);
		if (popup) makeSnow(popup);
	});
})();

// ------------------------------------------------------------------
// 3. Desktop loop video: the still image shows first; the video is
//    loaded only on landscape screens (no Save-Data, not 2g/3g, not
//    reduced motion) and fades in once it can play through. If it
//    isn't ready within 8 seconds, the still simply stays.
// ------------------------------------------------------------------
(function () {
	const bg = document.querySelector('.background');
	if (!bg) return;
	const wide = window.matchMedia('(min-width: 768px) and (orientation: landscape)');
	const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
	const conn = navigator.connection || {};
	if (reduce.matches || conn.saveData || /(^|-)2g|3g/.test(conn.effectiveType || '')) return;

	let video = null;

	function start() {
		if (video || !wide.matches) return;
		video = document.createElement('video');
		video.className = 'xmas-video';
		video.muted = true;
		video.loop = true;
		video.playsInline = true;
		video.setAttribute('muted', '');
		video.setAttribute('playsinline', '');
		video.setAttribute('aria-hidden', 'true');
		video.preload = 'auto';
		// 2560 for large or retina screens (e.g. MacBook 1440×2), 1920 otherwise
		const px = Math.max(window.innerWidth, window.innerHeight * 16 / 9) * Math.min(window.devicePixelRatio || 1, 2);
		const w = px > 2200 ? 2560 : 1920;
		// Bump ASSET_VERSION whenever the video files are replaced, so returning
		// visitors don't keep a cached older loop
		const ASSET_VERSION = '20261021-final';
		[[`img/index/xmas2026/xmas2026_loop_${w}.webm?v=${ASSET_VERSION}`, 'video/webm'],
		 [`img/index/xmas2026/xmas2026_loop_${w}.mp4?v=${ASSET_VERSION}`, 'video/mp4']].forEach(([src, type]) => {
			const s = document.createElement('source');
			s.src = src; s.type = type;
			video.appendChild(s);
		});
		bg.appendChild(video);

		const giveUp = setTimeout(() => {
			if (!video.classList.contains('is-ready')) { video.remove(); video = null; }
		}, 8000);

		video.addEventListener('canplaythrough', () => {
			video.play().then(() => {
				clearTimeout(giveUp);
				video.classList.add('is-ready');
			}).catch(() => {});
		}, { once: true });
	}

	// Pause when switched to portrait / narrow, resume when back
	wide.addEventListener('change', () => {
		if (!wide.matches) { if (video) video.pause(); }
		else if (video) { video.play().catch(() => {}); }
		else start();
	});
	document.addEventListener('visibilitychange', () => {
		if (!video) return;
		document.hidden ? video.pause() : (wide.matches && video.play().catch(() => {}));
	});

	if (document.readyState === 'complete') start();
	else window.addEventListener('load', start, { once: true });
})();
