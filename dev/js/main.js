const Preloader = require('./preloader.js');
const Common = require('./common.js');
const Popup = require('./popup.js');
const Nav = require('./nav.js');
const ValidForm = require('./form');


require('./form');
require('./libs-activate');


window.addEventListener('load', () => {
	svg4everybody({});

	let preloader = new Preloader();
	preloader.init();

	let sendForm = new ValidForm('.sendForm').init()


	let nav = new Nav().init();

	let popup = new Popup().events();
	let common = new Common().init();
	let scrollAnchors = new Common().scrollAnchors('.anchorBtn', 65, function(){
		$('body').removeClass('openNav')
	});


}); 



