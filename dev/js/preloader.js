
module.exports = class Preloader {
	constructor(loader) {
		this.loader = document.querySelector('#preloader');
	}

	init() {
		document.body.classList.add('show');

		if(!this.loader) return;

		this.loader.classList.add('hide');

		setTimeout( ()=> {
			if(this.loader.remove) {
				this.loader.remove();
			};
			this.loader.classList.add('remove');
		}, 2000);
	}


}