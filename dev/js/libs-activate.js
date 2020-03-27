
function libsActivate() {
	// swiper slider
	(function(){
		var heroSliderThumbs = new Swiper('.heroSlider', {
			slidesPerView:1,
			effect:'fade',
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			pagination: {
				el: '.heroSlider .swiper-pagination',
				type: 'bullets',
				clickable: 'true'
			},
		});

		var doogsBestsellersThumbs = new Swiper('.doogsBestsellersSlider', {
			slidesPerView:4,
			loop: true,
			spaceBetween: 20,
			navigation: {
				nextEl: '.doogs-bestsellers-slider .arr_next',
				prevEl: '.doogs-bestsellers-slider .arr_prev',
			},
		});

		var doogsNewThumbs = new Swiper('.doogsNewSlider', {
			slidesPerView:4,
			loop: true,
			spaceBetween: 20,
			navigation: {
				nextEl: '.doogs-new-slider .arr_next',
				prevEl: '.doogs-new-slider .arr_prev',
			}
		});

		var doogsRatingThumbs = new Swiper('.doogsRatingSlider', {
			slidesPerView:4,
			loop: true,
			spaceBetween: 20,
			navigation: {
				nextEl: '.doogs-rating-slider .arr_next',
				prevEl: '.doogs-rating-slider .arr_prev',
			}
		});


	})();



}



module.exports = libsActivate();
