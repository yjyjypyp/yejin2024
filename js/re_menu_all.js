// 썸네일 이미지 목록 & 프로젝트명
    const projects = [
		{ img: "../img/re_thumbnail/thumb_2026card.jpg", title: "2026 Greeting Card", link: "2026greetingcard.html",tags: "#Graphic #Print and Publication #EverydayPractice"},
		{ img: "../img/re_thumbnail/thumb_Estate.jpg", title: "Estate / SanSan x Yoosung Kim", link: "estate.html",tags: "#Illustration #Book Design #Print and Publication #EverydayPractice"},
		{ img: "../img/re_thumbnail/thumb_marketroot_vol5.jpg", title: "Market Root Vol.5 Poster/Identity", link: "marketroot_vol5.html",tags: "#Graphic #Book Design #Branding #Print and Publication"},
        { img: "../img/re_thumbnail/thumb_lifeitsbeautiful_02.jpg", title: "lifeitsbeautiful.xyz", link: "lifeitsbeautiful.html",tags: "#Graphic #Web.Interaction #EverydayPractice"},
		 { img: "../img/re_thumbnail/thumb_youbelieved_01.jpg", title: "You Believed What Was Written, Whether It Was True Or False: Part2", link: "youbelieved.html",tags: "#Graphic #EverydayPractice"},
		 { img: "../img/re_thumbnail/thumb_goodluckkeyring_02.jpg", title: "You Believed What Was Written, Whether It Was True Or False: Part1", link: "goodluckfish.html",tags: "#Graphic #EverydayPractice"},
		 { img: "../img/re_thumbnail/thumb_2025card_04.jpg", title: "2025 Greeting Card", link: "2025greetingcard.html",tags: "#Graphic #Print and Publication #EverydayPractice"},
		 { img: "../img/re_thumbnail/thumb_2024christmas_02.jpg", title: "2024 Website: Christmas Edition", link: "2024website_christmas.html",tags: "#Graphic #Web.Interaction #EverydayPractice"},
		 { img: "../img/re_thumbnail/thumb_marketroot.jpg", title: "Market Root Vol.2", link: "marketroot.html",tags: "#Graphic #Print and Publication "},
		 { img: "../img/5543/collection1_04.jpg", title: "SanSan Press", link: "sansanpress.html",tags: "#Graphic #Illustration.Drawing #EverydayPractice"},
		 { img: "../img/re_thumbnail/thumb_2024website_02.jpg", title: "2024 Website", link: "2024website.html",tags: "#Graphic #Web.Interaction #EverydayPractice"},
		 { img: "../img/re_thumbnail/thumb_browsers.jpg", title: "Browsers and Browsers", link: "browsersandbrowsers.html",tags: "#Graphic #Web.Interaction #Print and Publication"},
		 { img: "../img/re_thumbnail/thumb_csmidentity_01.jpg", title: "Central Saint Martins Graduate Show Identity[Finalist]", link: "csmidentity.html",tags: "#Graphic #MotionGraphic #Branding"},
		 { img: "../img/re_thumbnail/thumb_dualistic_05.jpg", title: "Dualistic Relationship: Does It Reveal or Conceal? -part 2", link: "dualisticrelationship_part2.html",tags: "#Graphic #Print and Publication #EverydayPractice"},
		{ img: "../img/re_thumbnail/thumb_dualistic_04.jpg", title: "Dualistic Relationship: Does It Reveal or Conceal? -part 1", link: "dualisticrelationship_part1.html",tags: "#Graphic #Print and Publication #EverydayPractice"},
		 { img: "../img/re_thumbnail/thumb_surface_02.jpg", title: "Surface as a Screen", link: "surfaceasascreen.html",tags: "#Graphic #Interaction #EverydayPractice"},
		 { img: "../img/re_thumbnail/thumb_movement_01.jpg", poster: "../img/re_thumbnail/thumb_movement_01.png", title: "Movement and Non-movement", link: "movement.html",tags: "#Graphic #Motion Graphics #Illustration.Drawing #EverydayPractice"},
		 { img: "../img/betweenyourmemories/0t.png", title: "Between Your Memories", link: "betweenyourmemories.html",tags: "#Graphic #Web.Interaction"},
		 { img: "../img/re_thumbnail/thumb_likeapurespirit_03.jpg", title: "Like a Pure Spirit", link: "likeapurespirit.html",tags: "#Graphic #MotionGraphic #Print and Publication"},
		 { img: "../img/gestures/gestures_screened_gathered.jpg", title: "Gestures", link: "gestures.html",tags: "#Graphic #MotionGraphic"},
		{ img: "../img/gravity/main_poster.jpg", title: "Gravity", link: "gravity.html",tags: "#Graphic"},
		{ img: "../img/fromthesun/scene_03.jpg", title: "From the Sun", link: "fromthesun.html",tags: "#Graphic #MotionGraphic #Mobile"},
		{ img: "../img/re_thumbnail/thumb_line_02.jpg", title: "Line Conference Design", link: "lineconference.html",tags: "#Graphic #EverydayPractice"},
		{ img: "../img/royal salute/03.jpg", title: "Royal Salute", link: "royalsalute.html",tags: "#VideoProduction"},
		{ img: "../img/flowerpig/tail.png", title: "Flower Pig", link: "flowerpig.html",tags: "#Graphic #MotionGraphic"},
		{ img: "../img/beyondyourimagination/face0013.png", title: "Beyond Your Imagination", link: "beyondyourimagination.html",tags: "#Graphic #Web.Interaction"},
		{ img: "../img/crp/mockup_crp.jpg", title: "CRP(Creative Rocket Platform)", link: "crp.html",tags: "#Graphic #MotionGraphic"},
		{ img: "../img/flowersick/mainimage_01_resize.jpg", title: "Flower Sick", link: "flowersick.html",tags: "#VideoProduction"},
		{ img: "../img/loveletter/love_letter_drawing_02.jpg", title: "Love Letter", link: "loveletter.html",tags: "#Graphic #Motion Graphic #Illustration.Drawing"},
		{ img: "../img/re_thumbnail/thumb_heung.jpg", title: "Heung", link: "heung.html",tags: "#Graphic #Illustration.Drawing"}
    ];
const container = document.getElementById("projectContainer");

projects.forEach((project) => {
    const projectDiv = document.createElement("a");
    projectDiv.href = project.link;
    projectDiv.classList.add("project");

    const img = document.createElement("img");
    img.src = project.img;
    img.alt = project.title;

    const textContainer = document.createElement("div");
    textContainer.classList.add("project-text");

    const title = document.createElement("div");
    title.classList.add("project-title");
    title.textContent = project.title;

    const tags = document.createElement("div");
    tags.classList.add("project-tags");
    tags.textContent = project.tags;

    textContainer.appendChild(title);
    textContainer.appendChild(tags);
    projectDiv.appendChild(img);
    projectDiv.appendChild(textContainer);
    container.appendChild(projectDiv);
});

// 일반 글리터 생성 함수
function createSingleGlitter() {
    const glitter = document.createElement('div');
    glitter.classList.add('glitter');

    // 랜덤 크기 설정 (5px ~ 15px)
    const size = Math.random() * 10 + 5;
    glitter.style.width = `${size}px`;
    glitter.style.height = `${size}px`;

    // 랜덤 위치 및 속도 설정
    glitter.style.left = Math.random() * 100 + 'vw';
    glitter.style.top = '-10px'; // 처음에는 화면 위쪽에서 시작
    glitter.style.animationDuration = Math.random() * 5 + 3 + 's';
    glitter.style.animationDelay = Math.random() * 2 + 's';

    document.body.appendChild(glitter);

    // 애니메이션 종료 후 삭제
    glitter.addEventListener('animationend', () => {
        glitter.remove();
    });
}

// 다이아몬드 글리터 생성 함수
function createDiamondGlitter() {
    const diamondCount = 100; // 생성할 다이아몬드 글리터 개수
    const initialCount = 25; // 초기 로드 시 즉시 생성할 글리터 개수

    function createSingleDiamond() {
        const glitterDiamond = document.createElement('div');
        glitterDiamond.classList.add('glitter-plus');

        // 다양한 색상 클래스에서 랜덤 선택
        const colorClasses = ['color-gold', 'color-lightblue', 'color-lightpink', 'color-lightgreen'];
        const randomColorClass = colorClasses[Math.floor(Math.random() * colorClasses.length)];
        glitterDiamond.classList.add(randomColorClass);

        // 랜덤 크기 설정 (3px ~ 6px)
        const size = Math.random() * 3 + 3;
        glitterDiamond.style.width = `${size}px`;
        glitterDiamond.style.height = `${size}px`;

        // 랜덤 위치 및 애니메이션 설정
        glitterDiamond.style.left = Math.random() * 100 + 'vw';
        glitterDiamond.style.top = Math.random() * 100 + 'vh';
        glitterDiamond.style.animationDuration = Math.random() * 3 + 2 + 's';
        glitterDiamond.style.animationDelay = Math.random() * 2 + 's';

        document.body.appendChild(glitterDiamond);

        // 애니메이션 종료 후 글리터 제거
        glitterDiamond.addEventListener('animationend', () => {
            glitterDiamond.remove();
        });
    }

    // 초기 글리터 생성
    for (let i = 0; i < initialCount; i++) {
        createSingleDiamond();
    }

    // 나머지 글리터 생성 (일정 시간 간격으로 생성)
    let remainingCount = diamondCount - initialCount;
    let diamondInterval = setInterval(() => {
        if (remainingCount <= 0) {
            clearInterval(diamondInterval);
            return;
        }

        createSingleDiamond();
        remainingCount--;
    }, 800);
}

// 페이지 로드 시 글리터 생성
window.onload = () => {
    createSingleGlitter();   // 기존 글리터 생성
    createDiamondGlitter(); // 다이아몬드 글리터 생성
};
