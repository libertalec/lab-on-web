document.querySelectorAll('.slider').forEach((n, i) => {
	window[`slider${i+1}`] = new Swiper(n, {
		freeMode: true,
		centeredSlides: true,
		direction: 'vertical',
		mousewheel: true,
		slidesPerView: 1.75,
		slidesOffsetBefore: -125
	})
})
bindSwipers(slider1, slider2, slider3, slider4)

window.addEventListener('load', () => {
	const links = document.querySelectorAll('.nav-link');

	links.forEach( (link) =>{
		if (link.href === window.location.href) {
			link.classList.add('active');
		}
	});
});