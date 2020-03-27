'use strict';


// popup windows
module.exports = class GetPopup {
	constructor() {
		this.$ = jQuery;
		this.popupBtn = $('.popupBtn');
		this.popup = $('.popup');
		this.hash = window.location.hash

		this.openPopup(this.hash);
	}

	events() {
		let that = this;

		this.popupBtn.on('click', function(e) {
			e.preventDefault();
			let href = this.getAttribute('href');
			that.openPopup(href);
		});

		this.popup.on('click', '.close, .anchorBtn', (e) =>{
			e.preventDefault();
			this.closePopup();
		});

		document.addEventListener('keydown', (e)=>{
			if(e.keyCode === 27) {this.closePopup();}
		})

	}


	openPopup(href) {
		let popup = $(href);

		if(this.popup.hasClass('show_popap')) {
			popup = $('.show_popap')
		};

		if(!popup.length) return;

		document.body.classList.add('hidden');
		setTimeout( ()=> {
			popup.addClass('show_popup');
		},100);
	}

	closePopup(){
		let loc = window.location;

		this.popup.removeClass('show_popup');
		setTimeout(function(){
			document.body.classList.remove('hidden');
		},300);

		history.pushState('', '', loc.pathname + loc.search); 
	}

};
