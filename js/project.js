// page close
function goBack() {
	window.history.back();
}
//모바일에서는 처음에 팝업떠있게하기
document.addEventListener("DOMContentLoaded", function() {
    // 팝업을 트리거하는 input을 자동으로 체크
    let popupCheckbox = document.getElementById("popup"); // popup의 id를 정확히 확인하세요
    if (popupCheckbox) {
        popupCheckbox.checked = true; // 자동으로 팝업 열기
    }
});

//slideshow
var isMobile = window.matchMedia("only screen and (max-width: 768px)").matches; // 모바일 화면인지 확인

if (!isMobile) { // 모바일이 아닌 경우에만 슬라이드 기능 활성화
  var slides = document.querySelector('.slides'),
      slide = document.querySelectorAll('.slides li'),
      currentIdx = 0,
      slideCount = slide.length,
      slideWidth = 100;
      slideMargin = 0,
      prevBtn = document.querySelector('.prev'),
      nextBtn = document.querySelector('.next');
      
  makeClone();

  function makeClone() {
    for(var i = 0; i<slideCount; i++){
      var cloneSlide = slide[i].cloneNode(true);
      cloneSlide.classList.add('clone');
      slides.appendChild(cloneSlide);
    }
    for(var i = slideCount -1; i>=0; i--){
      var cloneSlide = slide[i].cloneNode(true);
      cloneSlide.classList.add('clone');
      slides.prepend(cloneSlide);
    }
    updateWidth();
    setInitialPos();
    setTimeout(function(){
      slides.classList.add('animated');
    },100);
  }

  function updateWidth() {
    var currentSlides = document.querySelectorAll('.slides li');
    var newSlideCount = currentSlides.length;
    
    var newWidth = (slideWidth + slideMargin)*newSlideCount - slideMargin + 'vw';
    slides.style.width = newWidth;
  }
  function setInitialPos(){
    //var initialTranslateValue = -(slideWidth + slideMargin)*slideCount;
    //slides.style.transform = 'translateX(' + initialTranslateValue+'vw)';
    //var initialTranslateValue = 0; //-100vw
    var initialTranslateValue = -(slideWidth)*slideCount;
    slides.style.transform = 'translateX(' + initialTranslateValue +'vw)';
  }

  nextBtn.addEventListener('click',function(){
    moveSlide(currentIdx + 1);
  });
  prevBtn.addEventListener('click',function(){
    moveSlide(currentIdx - 1);
  });

  function moveSlide(num){
    slides.style.left = -num * (slideWidth + slideMargin) +'vw';
    currentIdx = num;

    if(currentIdx == slideCount || currentIdx == -slideCount){
      
      setTimeout (function(){
        slides.classList.remove('animated');
        slides.style.left = '0px';
        currentIdx = 0;
      }, 500);
      setTimeout (function(){
        slides.classList.add('animated');
      }, 600);
    }
  }
} else { // 모바일인 경우에는 아무런 작업을 하지 않음
  // 모바일에서는 슬라이드 기능을 비활성화했으므로 여기에 아무런 작업이 필요하지 않습니다.
}

// Footnote 제목 요소를 선택합니다.
var footnoteTitle = document.getElementById('footnote-title');

// Footnote 리스트 요소를 선택합니다.
var footnoteList = document.getElementById('footnote-list');

// Footnote 제목 요소에 클릭 이벤트 리스너를 추가합니다.
footnoteTitle.addEventListener('click', function() {
    // Footnote 리스트의 현재 표시 상태를 확인합니다.
    var isListVisible = footnoteList.style.display === 'block';

    // Footnote 리스트의 표시 상태를 토글합니다.
    if (isListVisible) {
        footnoteList.style.display = 'none'; // 보이지 않도록 설정
    } else {
        footnoteList.style.display = 'block'; // 보이도록 설정
    }
});

// Footnote 리스트 요소에 클릭 이벤트 리스너를 추가합니다.
footnoteList.addEventListener('click', function() {
    // Footnote 리스트를 숨깁니다.
    footnoteList.style.display = 'none';
});
