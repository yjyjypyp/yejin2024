const listItems = document.querySelectorAll('.list ul li');

// Check if touch event is supported
let isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints;

// Loop through each list item and add event listener
listItems.forEach((item, index) => {
    if (!isTouchDevice) {
        // Only add mouseover and mouseout event listeners if not a touch device
        item.addEventListener('mouseover', () => {
            // Hide all now-titles
            document.querySelectorAll('.now-title').forEach((title) => {
                title.classList.remove('show-now-title');
            });

            // Show corresponding now-title
            const nowTitle = document.querySelectorAll('.now-title')[index];
            nowTitle.classList.add('show-now-title');
        });

        item.addEventListener('mouseout', () => {
            // Hide all now-titles when mouse leaves the list item
            document.querySelectorAll('.now-title').forEach((title) => {
                title.classList.remove('show-now-title');
            });
        });
    } else {
        // For touch devices, toggle now-title on tap
        item.addEventListener('click', () => {
            const nowTitle = document.querySelectorAll('.now-title')[index];
            nowTitle.classList.toggle('show-now-title');
        });
    }
});
