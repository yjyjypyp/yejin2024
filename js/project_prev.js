// page close
function goBack() {
	window.history.back();
}

//slideshow
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