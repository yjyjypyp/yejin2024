document.addEventListener('scroll', function() {
  var scrollTop = window.scrollY;
  var h1 = document.querySelector('h1');
  h1.style.backgroundPositionY = -scrollTop + 'px'; // 스크롤에 따라 배경 이미지 위치 이동
});

    // 팝업이 열릴 때 다른 li 요소들의 스타일을 조작하는 함수
    function toggleListVisibility() {
        var popup2 = document.getElementById('popup2');
        var listItems = document.querySelectorAll('ul li:not(:first-child)');

        if (popup2.checked) {
            listItems.forEach(function(item) {
                item.style.display = 'none';
            });
        } else {
            listItems.forEach(function(item) {
                item.style.display = 'block';
            });
        }
    }
//volumn 숨기기
 	function hideVolumnInfo() {
		var popup = document.getElementById('popup');
        var popup2 = document.getElementById('popup2');
        var volumn = document.querySelector('.volumn');
        var volumnInfo = document.querySelector('.volumn-info');

		 if (popup2.checked || popup.checked) {
            volumn.style.display = 'none';
            volumnInfo.style.display = 'none';
        } else {
            volumn.style.display = 'block';
            volumnInfo.style.display = 'block';
        }
    }

    // 팝업 체크박스의 변경 이벤트에 함수를 연결
    document.getElementById('popup2').addEventListener('change', toggleListVisibility);
	document.getElementById('popup').addEventListener('change', hideVolumnInfo);
	document.getElementById('popup2').addEventListener('change', hideVolumnInfo);
