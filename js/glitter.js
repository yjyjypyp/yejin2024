// script.js

const indexButton = document.querySelector('.index');
const indexPopup = document.querySelector('.index-popup');

// INDEX 클릭 시 팝업 보이기
indexButton.addEventListener('click', () => {
    indexPopup.style.display = 'flex'; // 팝업 보이기
    createGlitter(); // 글리터 생성 함수 호출
});

// 팝업을 클릭하면 숨기기
indexPopup.addEventListener('click', () => {
    indexPopup.style.display = 'none'; // 팝업 숨기기
});

