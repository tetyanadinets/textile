
module.exports = class Common {
	constructor() {

	}

	init() {
		this.scrollWindow();
		this.colorCtrl();
	}


	scrollWindow(){
		$(window).scroll(function(){
			if($(window).scrollTop() > 150) {
				$('body').addClass('scroll');
			} else {
				$('body').removeClass('scroll')
			}
		})
	}


	scrollAnchors(btn, offset, callback) {
			var hash = window.location.hash;
			var anhor = hash.replace(/#/, '');
			var reqElem = $('[data-anchor= "'+ anhor +'"]');
			var anchorItem = $('.anchorItem');
			var topElem;

			if(reqElem.length) {
				topElem = reqElem.offset().top - offset;

				$('html, body').scrollTop(topElem);
			}

			if (!btn.length) return;

			$(btn).on('click', function(e){
				e.preventDefault();

				var btn = $(this);

				if(this.tagName == 'A') {
					var hash = btn.attr('href');
					var anhor = hash.replace(/#/, '');
				} else {
					var anhor = btn.attr('data-link');
				};

				if(!reqElem.length) return;

				reqElem = $('[data-anchor= "'+ anhor +'"]');
				topElem = reqElem.offset().top - offset;

				$('html, body').stop().animate({'scrollTop':topElem},1000, 'easeInOutCubic', function(){
					if (callback) {
						callback();
					}
				});
				window.location.hash = anhor;

			});


			$(window).scroll(function(){
				$('.header__nav a').removeClass('active');
				anchorItem.each(function(i, el){
					var el = $(el);
					var scrollTop = $(window).scrollTop();
					var elementsHeight = el.height();
					var topElements = el.offset().top - (offset+5);
					if(scrollTop > topElements && scrollTop < (topElements + elementsHeight)) {
						var reqElemData = el.data('anchor');
						$('a[href$="'+ reqElemData +'"]').addClass('active');
					}
				});


			});
	}

	colorCtrl() {
		$('.card__color').on('click', function(e){
			e.preventDefault();
			$('.card__color').removeClass('active');
			$(this).addClass('active');
		});

		$('.card__color').on('mouseenter click', function(e){
			var img = $(this).parents('.card').find('.card__img');
			var src = $(this).data('img');
			img.css('background-image', src)
		});

		$('.card__color').on('mouseleave', function(e){
			var img = $(this).parents('.card').find('.card__img');
			var src = $('.card__color.active').data('img');
			img.css('background-image', src)
		});

	}




}
