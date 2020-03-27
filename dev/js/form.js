

module.exports = class ValidForm {
	constructor (form) {
		this.form = $(form)
	}

	init () {
		this.start();
		this.events();
	}

	start () {
		let form = this.form;
		let input = form.find('.form-item input');
		let select = form.find('.form-item select');

			if(jQuery().inputmask) {
				var tel = $('input[type="tel"], .tel');
				if(tel.length == 0) return;
				tel.inputmask("+38 (999) (999 99 99)", {
					showMaskOnHover: false,
				});
			}

			for(var i=0;i<select.length;i++) {
				if(select[i].options[select[i].selectedIndex].text) {
					var parent = $(select[i]).closest('.form-item');
					parent.addClass('active');
				}
			};

			for(var i=0;i<input.length;i++) {
				if(input[i].value) {					
					$(input[i]).closest('.form-item').addClass('active');
				}
			};
	}

	events () {
			let form = this.form;
			let validItem = form.find('.valid');
			let self = this;

			form.on('click', '[type="submit"]', function (e) {
				let btn = $(this);
				let form = btn.closest('form');
				
				if (!self.validInput(form)) {
					e.preventDefault();
				} else {
				//	e.preventDefault();
					if(form.hasClass('ajax')) {
						self.sendAjax(form);
					} else {
						self.thankForm(form, function(){
							form.submit();
						});	
					}
				}
			});

			form.on('focus', 'input, textarea', function () {
				$(this).closest('.valid').removeClass('error');
			});			

			form.on('blur', 'input, textarea', self.checkLengthInput);

			this.checkSelect(form);
	}

	checkLengthInput () {
		let input = $(this);
		let parent = input.closest('.form-item');
		if(input.val().length > 0) {
			parent.addClass('active');
		} else {
			parent.removeClass('active');
		}
	}

	checkSelect (form) {
			let select = form.find('select');
			select.on('change',function(e){
				let _this = $(this);
				let parent = _this.closest('.form-item, .filters__item');
				let val = _this.val();
				_this.closest('.valid').removeClass('error');
				if(val != 0) {
					parent.addClass('active');
				} else {
					parent.removeClass('active');
				}
			});

			select.on('focus', function(e){
				$(this).closest('.form-item, .filters__item').addClass('open');
			})			
			select.on('change', function(e){
				$(this).closest('.form-item, .filters__item').removeClass('open');
			})
	}

	sendAjax (form) {
     let data = form.serialize(); 
     $.ajax({
       type: "POST", 
       url: "mail.php",
       data: data,
       success: (e) => {
					this.thankForm(form);
       }, 
     });
  }

 	thankForm (form, callBack) {
		var formThanks = $('.formThanks');
		if(!formThanks.length) return

		formThanks.fadeIn();
		setTimeout(function(){
			formThanks.fadeOut(function(){
				form.fadeIn().find('.form-item').removeClass('active');
				form[0].reset();
				callBack();
			//	formTitle.fadeIn();
			})
		},3000);
	}

	validInput (form) {
		let formValid = form.find('.valid');
		let email = formValid.find('[type=email]');
		let bull;
		let textInError = '';

		bull = false;

		formValid.each((key) => {
				let _this = $(formValid[key]);
				let formInput = _this.find('input');
				let formTextarea = _this.find('textarea');
				let select = _this.find('select');
				let formCheckbox = _this.find('[type="checkbox"]');

				checkForElem(formInput, function(){
					if (formInput.val().length < 1) {
						formInput.closest('.valid').addClass('error').removeClass('ok');
					} else {
						_this.closest('.valid').addClass('ok');
					};
				});					
				checkForElem(formTextarea, function(){
					if (formTextarea.val().length < 1) {
						formTextarea.closest('.valid').addClass('error').removeClass('ok');
					} else {
						_this.closest('.valid').addClass('ok');
					};
				});
				checkForElem(select, function(){
					if (select.val()  == 0) {
						select.closest('.valid').addClass('error').removeClass('ok');
					} else {
						_this.closest('.valid').addClass('ok');
					};
				});
				if (!formCheckbox.prop("checked")) {
					formCheckbox.closest('.valid').addClass('error').removeClass('ok');
				} else {
					_this.closest('.valid').removeClass('error').addClass('ok');
				};
			});

						//	проверка на email
			if (email.length  && !this.isEmail(email) &&  email.val().length > 1) {
				var parent = email.closest('.valid');
				parent.addClass('error').removeClass('ok');
				textInError += 'E-mail не корректен';
			};

			function checkForElem(input, f) {
				if(!input.length) {
					
				} else {
					f();
				}
			};

			if (form.find('.error').length) {
				return bull = false;
			}
			else {
				return bull = true;
			}
	}

	isEmail (email) {								
		if (!email) return true;
		let valEmail = email.val();
		let reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;;

		return reg.test(valEmail);
	}




}
