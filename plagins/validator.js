'use strict';
class Validator {
	constructor({ selector, pattern = {}, method }) {
		this.forms = document.querySelector(selector);
		this.pattern = pattern; //шаблоны
		this.method = method; //настройки
		this.elementsForm = [...this.forms.elements].filter(item => {
		return	item.tagName.toLowerCase() !== 'button' && item.type !== 'button';
	});
		this.error = new Set();
	}
	init() {
		this.applyStyle();
		this.setPattern();
		this.elementsForm.forEach(item => item.addEventListener('change', this.chekIt.bind(this)));
		this.forms.addEventListener('submit', e => {
			if (this.error.size) {
				e.preventDefault();
			}
			//this.elementsForm.forEach(elem => this.chekIt({ target: elem }));
			
		});
	}
	isValid(elem) {
		const validatorMethod = {
			notEmpty(elem) {
				if (elem.value.trim() === '') {
					return false;
				}
				return true;
			},
			pattern(elem, pattern) {
				return pattern.test(elem.value);
			}
		};
		if (this.method) {
			const methot = this.method[elem.id];
			if (methot) {
				return methot.every(item =>  validatorMethod[item[0]](elem, this.pattern[item[1]]));
			}
		} else {
			console.warn('необходимо передать методы полей');
		}

		//return true;
	}
	chekIt(event) {
		const target = event.target;
		if (this.isValid(target)) {
			this.showSuccess(target);
			this.error.delete(target);
		} else {
			this.showError(target);
			this.error.add(target);
		}
		console.log(this.error);
	}
	showError(elem) {
		elem.classList.remove('success');
		elem.classList.add('error');
		if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
			return;
		}
		const errorDiv = document.createElement('div');
		errorDiv.textContent = 'Ошибка в этом поле';
		errorDiv.classList.add('validator-error');
		elem.insertAdjacentElement('afterend', errorDiv);
	}
	showSuccess(elem) {
		console.log('elem: ', elem);
		elem.classList.remove('error');
		elem.classList.add('success');
		if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
			elem.nextElementSibling.remove();
		}
	}
	applyStyle() {
		const style = document.createElement('style');
		style.textContent = `
        input.success {
            border:2px solid green
        }
        input.error {
            border: 2px solid red
        }
        .validator-error{
          font-size:  10 px;
          font-family :sans-serif;
          color : red
        }
        `;
		document.head.appendChild(style);
	}
	setPattern() {
		
		if (!this.pattern.phone) {
			this.pattern.phone = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
		}
		if (!this.pattern.name) {
			this.pattern.message = /^[?!,.а-яА-ЯёЁ\s]+$/;
        }
        if (!this.pattern.email) {
			this.pattern.email = /^\w+@\w+\.\w{2,}$/;
		}
		if (!this.pattern.message) {
			this.pattern.message = /^[?!,.а-яА-ЯёЁ0-9\s]+$/;
			
		}
		console.log('this.pattern: ', this.pattern);
	}
}
///(^[?!,.а-яА-ЯёЁ0-9\s]+$  ) кирилица