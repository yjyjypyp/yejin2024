// 팝업이 열릴 때 다른 li 요소들의 스타일을 조작하는 함수
function toggleListVisibility() {
    var popup2 = document.getElementById('popup2');
    var listItems = document.querySelectorAll('ul li:not(:first-child)');

    for (var item of listItems) {
        if (popup2.checked) {
            item.style.display = 'none';
        } else {
            item.style.display = 'block';
        }
    }
}

// volumn 숨기기
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
