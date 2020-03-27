module.exports = class Nav {
	constructor() {
		this.body = $('body');
		this.hamburger = $('#hamburger');
		this.headerNav = $('.headerNav');
	}

	init() {
		this.events()
	}

	events() {
		this.hamburger.on('click', () => {
			if(this.body.hasClass('openNav')) {
			this.closeNav()
		} else {
			this.openNav()
		}
		});	

		// this.headerNav.on('click', '.popupBtn', ()=> {
		// 	this.closeNav()
		// })		
	}

	openNav() {
		let openPromise = new Promise((resolve,regect) => {
			this.body.addClass('openNav');
			setTimeout(resolve, 0)
		})
	
		openPromise.then(()=>{
			this.headerNav.addClass('openNav')
		})	
	}

	closeNav() {
		let closePromise = new Promise((resolve, regect) =>{
			this.headerNav.removeClass('openNav')
			setTimeout(resolve, 300)
		}); 
		closePromise.then(()=>{
			this.body.removeClass('openNav');
		})
	}

	


}