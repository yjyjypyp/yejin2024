// 글리터 생성 함수
function createGlitter() {
    const initialGlitterCount = 16; // 처음에 생성할 글리터 개수
    const glitterCount = 35; // 전체 생성할 글리터 개수
    let remainingGlitterCount = glitterCount; // 남은 글리터 개수

    const bgSection = document.querySelector('.bg-section');

    let glitterInterval = setInterval(() => {
        if (remainingGlitterCount <= 0) {
            clearInterval(glitterInterval);
            return;
        }

        createSingleGlitter(bgSection);

        remainingGlitterCount--; // 남은 글리터 개수 감소
    }, 300); // 300ms 간격으로 글리터 생성

    for (let i = 0; i < initialGlitterCount; i++) {
        createSingleGlitter(bgSection);
    }
}

// 개별 글리터 생성 함수
function createSingleGlitter(container) {
    const glitter = document.createElement('div');
    glitter.classList.add('glitter');

    // 랜덤 크기 (5px ~ 15px)
    const size = Math.random() * 10 + 5;
    glitter.style.width = `${size}px`;
    glitter.style.height = `${size}px`;

    // 랜덤 위치와 속도, 지연 시간
    glitter.style.left = Math.random() * 100 + 'vw';
    glitter.style.animationDuration = Math.random() * 5 + 3 + 's'; // 3~8초 사이 속도
    glitter.style.animationDelay = Math.random() * 2 + 's'; // 0~2초 지연

    container.appendChild(glitter);

    // 애니메이션 종료 후 글리터 제거
    glitter.addEventListener('animationend', () => {
        container.removeChild(glitter);
    });
}

// 페이지 로드 후 글리터 생성 시작
window.onload = createGlitter;
