// Christmas 2026 — touch screens only.
// Marks the tapped menu item so CSS can show it in the hover green:
//   .is-pressed  while the finger is down (PROJECT link, before navigating)
//   .is-open     while that item's popup is open (INDEX / COLOPHON / ABOUT)
// Remove this <script> tag after the season.
(function () {
	if (!window.matchMedia('(hover: none)').matches) return;

	// Popup ↔ menu item pairs, matching js/index.js
	const pairs = [
		['.list-index', '.index-popup'],
		['.colophon-about', '.colophon-popup'],
		['.list-about', '.about-popup'],
	];

	pairs.forEach(([buttonSel, popupSel]) => {
		const button = document.querySelector(buttonSel);
		const popup = document.querySelector(popupSel);
		if (!button || !popup) return;
		const li = button.closest('li') || button;
		const sync = () => li.classList.toggle('is-open', popup.style.display === 'block');
		new MutationObserver(sync).observe(popup, { attributes: true, attributeFilter: ['style'] });
		sync();
	});

	document.querySelectorAll('.content ul > li').forEach((li) => {
		li.addEventListener('touchstart', () => li.classList.add('is-pressed'), { passive: true });
		const release = () => setTimeout(() => li.classList.remove('is-pressed'), 180);
		li.addEventListener('touchend', release);
		li.addEventListener('touchcancel', release);
	});
})();
