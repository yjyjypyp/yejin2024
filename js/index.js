// 요소 선택
const indexButton = document.querySelector('.list-index');
const indexPopup = document.querySelector('.index-popup');
const colophonButton = document.querySelector('.colophon-about');
const colophonPopup = document.querySelector('.colophon-popup');
const aboutButton = document.querySelector('.list-about');
const aboutPopup = document.querySelector('.about-popup');

// INDEX 클릭 시 팝업 보이기/숨기기 토글
indexButton.addEventListener('click', () => {
    if (indexPopup.style.display === 'none' || indexPopup.style.display === '') {
        indexPopup.style.display = 'block'; // 팝업 보이기
        createGlitter(); // 글리터 생성
    } else {
        indexPopup.style.display = 'none'; // 팝업 숨기기
    }
});

// index-popup 클릭 시 팝업 숨기기
indexPopup.addEventListener('click', () => {
    indexPopup.style.display = 'none';
});

// colophon 클릭 시 팝업 보이기/숨기기 토글
colophonButton.addEventListener('click', () => {
    if (colophonPopup.style.display === 'none' || colophonPopup.style.display === '') {
        colophonPopup.style.display = 'block'; // 팝업 보이기
    } else {
        colophonPopup.style.display = 'none'; // 팝업 숨기기
    }
});

// about-popup 클릭 시 팝업 숨기기
colophonPopup.addEventListener('click', () => {
    colophonPopup.style.display = 'none';
});

// about 클릭 시 팝업 보이기/숨기기 토글
aboutButton.addEventListener('click', () => {
    if (aboutPopup.style.display === 'none' || aboutPopup.style.display === '') {
        aboutPopup.style.display = 'block'; // 팝업 보이기
    } else {
        aboutPopup.style.display = 'none'; // 팝업 숨기기
    }
});

// about-popup 클릭 시 팝업 숨기기
aboutPopup.addEventListener('click', () => {
    aboutPopup.style.display = 'none';
});

// 글리터 생성 함수
function createGlitter() {
    const initialGlitterCount = 16; // 처음에 생성할 눈송이 개수 (한 번에 생성)
    const glitterCount = 35; // 전체 생성할 글리터 개수
    let remainingGlitterCount = glitterCount; // 생성할 글리터 개수

    let glitterInterval = setInterval(() => {
        // 남은 글리터 개수가 0이 되면 종료
        if (remainingGlitterCount <= 0) {
            clearInterval(glitterInterval);
            return;
        }

        // 각 popup에 개별 글리터 생성
        createSingleGlitter(indexPopup);
        createSingleGlitter(colophonPopup);
        createSingleGlitter(aboutPopup);

        remainingGlitterCount--; // 남은 글리터 개수 감소
    }, 300); // 300ms 간격으로 글리터 생성

    // 처음에 더 많은 글리터를 생성
    for (let i = 0; i < initialGlitterCount; i++) {
        createSingleGlitter(indexPopup);
        createSingleGlitter(colophonPopup);
        createSingleGlitter(aboutPopup);
    }
}

// 개별 글리터 생성 함수
function createSingleGlitter(popupElement) {
    const glitter = document.createElement('div');
    glitter.classList.add('glitter');

    // 랜덤한 크기 (5px에서 15px 사이)
    const size = Math.random() * 10 + 5; // 크기를 랜덤으로 설정 (5px ~ 15px)
    glitter.style.width = `${size}px`;
    glitter.style.height = `${size}px`;

    // 랜덤한 위치와 애니메이션 속도/지연 시간 설정
    glitter.style.left = Math.random() * 100 + 'vw'; // 화면 너비 내에서 랜덤 위치
    glitter.style.animationDuration = Math.random() * 5 + 3 + 's'; // 랜덤 속도 (3초에서 8초 사이)
    glitter.style.animationDelay = Math.random() * 2 + 's'; // 0~2초 사이의 랜덤 지연

    // 글리터를 popup 요소에 추가
    popupElement.appendChild(glitter);

    // 애니메이션 종료 후 글리터 제거
    glitter.addEventListener('animationend', () => {
        popupElement.removeChild(glitter);
    });
}


/// 다이아몬드 모양 글리터 생성 함수
function createDiamondGlitter() {
    const diamondCount = 60; // 생성할 다이아몬드 글리터 개수
    let diamondInterval = setInterval(() => {
        if (diamondCount <= 0) {
            clearInterval(diamondInterval);
            return;
        }

        const glitterDiamond = document.createElement('div');
        glitterDiamond.classList.add('glitter-plus');
		
		 // 다양한 색상 클래스에서 랜덤 선택
        const colorClasses = ['color-white', 'color-gold', 'color-lightblue', 'color-lightpink'];
        const randomColorClass = colorClasses[Math.floor(Math.random() * colorClasses.length)];
        glitterDiamond.classList.add(randomColorClass);
		
        // 랜덤 크기 설정 (10px ~ 30px 사이의 크기)
        const size = Math.random() * 3 + 3; // 10px에서 30px 사이 랜덤 크기
        glitterDiamond.style.width = `${size}px`;
        glitterDiamond.style.height = `${size}px`;

        // 랜덤 위치 및 애니메이션 설정
        glitterDiamond.style.left = Math.random() * 100 + 'vw';
        glitterDiamond.style.top = Math.random() * 100 + 'vh';
        glitterDiamond.style.animationDuration = Math.random() * 3 + 2 + 's';
        glitterDiamond.style.animationDelay = Math.random() * 2 + 's';

        document.querySelector('.content').appendChild(glitterDiamond);

        // 애니메이션 종료 후 글리터 제거
        glitterDiamond.addEventListener('animationend', () => {
            glitterDiamond.remove();
        });

        diamondCount--;
    }, 600); // 500ms 간격으로 다이아몬드 글리터 생성
}

// 페이지 로드 시 글리터 생성
window.onload = () => {
    createGlitter();        // 기존 글리터 생성
    createDiamondGlitter(); // 다이아몬드 글리터 생성
};

