// =====================================================================
// 프로젝트 목록 — 여기 한 곳만 수정하면 모든 카테고리 페이지에 반영됩니다.
//
// 새 프로젝트 추가: 아래 PROJECTS 배열의 원하는 위치에 한 줄 추가
//   { img, title, link, categories: [...] }
//   - 배열 순서 = 화면에 보이는 순서 (위가 최신)
//   - categories에 넣은 카테고리 페이지에만 나타납니다
//   - All types에는 hidden: true 가 아닌 모든 프로젝트가 나타납니다
//   - 영상 썸네일이면 poster 를 함께 넣으세요
//
// 카테고리 이름·순서 변경: 아래 CATEGORIES 수정
// =====================================================================

const CATEGORIES = [
    { id: "all",          label: "All types",    page: "project.html" },
    { id: "brand",        label: "Brand",        page: "project_brand.html" },
    { id: "graphic",      label: "Graphic",      page: "project_graphic.html" },
    { id: "ai-motion",    label: "AI.Motion",    page: "project_motiongraphic.html" },
    { id: "print",        label: "Print",        page: "project_printpublication.html" },
    { id: "illustration", label: "Illustration", page: "project_illustration_drawing.html" },
    { id: "interactive",  label: "Interactive",  page: "project_web_interaction.html" },
    { id: "everyday",     label: "Everyday",     page: "project_everydaypractice.html" }
];

const PROJECTS = [
    { img: "../img/re_thumbnail/thumb_2026card.jpg", title: "2026 Greeting Card", link: "2026greetingcard.html",
      categories: ["print", "illustration", "everyday"] },
    { img: "../img/re_thumbnail/thumb_lifeitsbeautiful_02.jpg", title: "lifeitsbeautiful.xyz", link: "lifeitsbeautiful.html",
      categories: ["graphic", "interactive", "everyday"] },
    { img: "../img/re_thumbnail/thumb_estate.jpg", title: "Estate / SanSan x Yoosung Kim", link: "estate.html",
      categories: ["graphic", "print", "illustration"] },
    { img: "../img/re_thumbnail/thumb_marketroot_vol5.jpg", title: "Market Root Vol.5 Poster/Identity", link: "marketroot_vol5.html",
      categories: ["brand", "graphic", "print", "illustration"] },
    { img: "../img/re_thumbnail/thumb_youbelieved_01.jpg", title: "You Believed What Was Written, Whether It Was True Or False: Part2", link: "youbelieved.html",
      categories: ["graphic", "print", "illustration", "everyday"] },
    { img: "../img/re_thumbnail/thumb_goodluckkeyring_02.jpg", title: "You Believed What Was Written, Whether It Was True Or False: Part1", link: "goodluckfish.html",
      categories: ["graphic", "print", "illustration", "everyday"] },
    { img: "../img/re_thumbnail/thumb_2025card_04.jpg", title: "2025 Greeting Card", link: "2025greetingcard.html",
      categories: ["graphic", "print", "illustration", "everyday"] },
    { img: "../img/re_thumbnail/thumb_2024christmas_02.jpg", title: "2024 Website: Christmas Edition", link: "2024website_christmas.html",
      categories: ["graphic", "interactive", "everyday"] },
    { img: "../img/re_thumbnail/thumb_marketroot.jpg", title: "Market Root Vol.2", link: "marketroot.html",
      categories: ["brand", "graphic", "print"] },
    { img: "../img/5543/collection1_04.jpg", title: "SanSan Press", link: "sansanpress.html",
      categories: ["graphic", "print", "illustration", "everyday"] },
    { img: "../img/re_thumbnail/thumb_2024website_02.jpg", title: "2024 Website", link: "2024website.html",
      categories: ["interactive", "everyday"] },
    { img: "../img/re_thumbnail/thumb_browsers.jpg", title: "Browsers and Browsers", link: "browsersandbrowsers.html",
      categories: ["print", "interactive"] },
    { img: "../img/re_thumbnail/thumb_csmidentity_01.jpg", title: "Central Saint Martins Graduate Show Identity[Finalist]", link: "csmidentity.html",
      categories: ["brand", "ai-motion"] },
    { img: "../img/re_thumbnail/thumb_dualistic_05.jpg", title: "Dualistic Relationship: Does It Reveal or Conceal? -part 2", link: "dualisticrelationship_part2.html",
      categories: ["print"] },
    { img: "../img/re_thumbnail/thumb_dualistic_04.jpg", title: "Dualistic Relationship: Does It Reveal or Conceal? -part 1", link: "dualisticrelationship_part1.html",
      categories: ["print"] },
    { img: "../img/betweenyourmemories/0t.png", title: "Between Your Memories", link: "betweenyourmemories.html",
      categories: ["interactive", "everyday"] },
    { img: "../img/re_thumbnail/thumb_surface_02.jpg", title: "Surface as a Screen", link: "surfaceasascreen.html",
      categories: ["everyday"] },
    { img: "../img/re_thumbnail/thumb_movement_01.jpg", poster: "../img/re_thumbnail/thumb_movement_01.png", title: "Movement and Non-movement", link: "movement.html",
      categories: ["everyday"] },
    { img: "../img/re_thumbnail/thumb_likeapurespirit_03.jpg", title: "Like a Pure Spirit", link: "likeapurespirit.html",
      categories: ["ai-motion", "print", "illustration"] },
    { img: "../img/gestures/gestures_screened_gathered.jpg", title: "Gestures", link: "gestures.html",
      categories: ["ai-motion", "illustration"] },
    { img: "../img/fromthesun/scene_03.jpg", title: "From the Sun", link: "fromthesun.html",
      categories: ["ai-motion", "interactive"] },

    // ---- 프로젝트 페이지 목록에서는 숨김 (페이지 자체는 남아 있어 index 등에서 링크로 접근 가능) ----
    { hidden: true, title: "Gravity", link: "gravity.html" },
    { hidden: true, title: "Line Conference Design", link: "lineconference.html" },
    { hidden: true, title: "Royal Salute", link: "royalsalute.html" },
    { hidden: true, title: "Flower Pig", link: "flowerpig.html" },
    { hidden: true, title: "Beyond Your Imagination", link: "beyondyourimagination.html" },
    { hidden: true, title: "CRP(Creative Rocket Platform)", link: "crp.html" },
    { hidden: true, title: "Love Letter", link: "loveletter.html" },
    { hidden: true, title: "Heung", link: "heung.html" },
    { hidden: true, title: "Flower Sick (Korean Word Promotion)", link: "flowersick.html" }
];
