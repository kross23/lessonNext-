'use strict';
window.addEventListener('DOMContentLoaded', () => {

	const countTimer = dedline => {
		const timerhours = document.querySelector('#timer-hours'),
			timerMinuts = document.querySelector('#timer-minutes'),
			timerSeconds = document.querySelector('#timer-seconds');

		const getTaimRemaining = () => {
			const dateStop = new Date(dedline).getTime(),
				dateNow = new Date().getTime(),
				timeRamaining = (dateStop - dateNow) / 1000,
				seconds = Math.floor(timeRamaining % 60),
				minets = Math.floor((timeRamaining / 60) % 60),
				hours = Math.floor(timeRamaining / 60 / 60);
			return {
				timeRamaining,
				hours,
				minets,
				seconds,
			};
		};

		const updateClock = setInterval(() => {
			const timer = getTaimRemaining(); //getTimeRamaining
			for (const key in timer) {
				if (timer[key] >= 0 && timer[key] <= 9) {
					timer[key] = '0' + timer[key];
				}
			}
			timerhours.textContent = timer.hours;
			timerMinuts.textContent = timer.minets;
			timerSeconds.textContent = timer.seconds;

			if (timer.timeRamaining < 0) {
				clearInterval(updateClock);
				timerhours.textContent = '00';
				timerMinuts.textContent = '00';
				timerSeconds.textContent = '00';
			}
		}, 1000);
	};
	countTimer('14 may 2020');
	//......menu..............

	const toglMenu = () => {
		const menu = document.querySelector('menu'),
			maiN = document.querySelector('main');

		maiN.addEventListener('click', event => {
			const target = event.target;
			if (target.closest('.menu')) {
				menu.classList.add('active-menu');
			} else {
				menu.classList.remove('active-menu');
			}
		});
		menu.addEventListener('click', event => {
			const target = event.target;
			if (target.classList.contains('close-btn') || target.tagName === 'A' || target.matches('active-menu')) {
				menu.classList.toggle('active-menu');
			}
		});
	};
	toglMenu();
	//..popap....................

	const togglePopup = () => {
		const popap = document.querySelector('.popup'),
			popupBtn = document.querySelectorAll('.popup-btn'),
			popupContent = popap.querySelector('.popup-content');
		const step = () => {
			let nt = popap.style.opacity;
			nt = parseFloat(nt);
			nt += 0.1;
			let top = popupContent.style.top;
			top = parseInt(top);
			top -= 1;
			popap.style.opacity = `nt`;
			popap.style.opacity = `${nt}`;
			popupContent.style.top = `${top}%`;
			if (nt < 1 || top > 10) {
				requestAnimationFrame(step);
			}
		};
		popupBtn.forEach(element => {
			element.addEventListener('click', () => {
				if (document.body.clientWidth > 768) {
					popap.style.display = 'block';
					popap.style.opacity = `0`;
					//	popupContent.style.top = `100%`;
					requestAnimationFrame(step);
					//	console.log('popap.style.opacity: ', popap.style.opacity);
				} else {
					popap.style.display = 'block';
				}
			});
		});
		popap.addEventListener('click', event => {
			let target = event.target;
			if (target.classList.contains('popup-close')) {
				popap.style.display = 'none';
			} else {
				target = target.closest('.popup-content');
			}
			if (!target) {
				popap.style.display = 'none';
			}
		});
	};
	togglePopup();
	//........кнопка прокрутки

	const scroll = () => {
		const serviceBlock = document.querySelector('a');
		const str = () => {
			let stra = document.documentElement.scrollTop;
			stra = parseFloat(stra);
			stra += 40;
			document.documentElement.scrollTop = stra;
			if (stra < 827) {
				requestAnimationFrame(str);
			} else {
				return;
			}
		};
		serviceBlock.addEventListener('click', event => { //827
			event.preventDefault();
			str();
			console.log(document.documentElement.scrollTop);


		});
	};
	scroll();
	//.............................taby.....................

	const tabs = () => {
		const tabHeder = document.querySelector('.service-header'),
			tab = tabHeder.querySelectorAll('.service-header-tab'),
			tabContent = document.querySelectorAll('.service-tab');
		const togglTabContent = index => {
			for (let i = 0; i < tabContent.length; i++) {
				if (index === i) {
					tabContent[i].classList.remove('d-none');
					tab[i].classList.add('active');
				} else {
					tabContent[i].classList.add('d-none');
					tab[i].classList.remove('active');
				}
			}
		};
		tabHeder.addEventListener('click', event => {
			let target = event.target;
			target = target.closest('.service-header-tab');
			if (target !== null) {
				tab.forEach((item, index) => {
					if (item === target) {
						togglTabContent(index);
					}
				});
			}
		});
	};
	tabs();

	//................слайдер......
	const slayder = () => {
		const uL = document.createElement('ul');
		uL.classList.add('portfolio-dots');
		const portofino = document.querySelector('.portfolio-content');
		for (let i = 0; i < 6; i++) {
			const Li = document.createElement('li');
			Li.classList.add('dot');
			uL.append(Li);
		}
		portofino.append(uL);

		const slayde = document.querySelectorAll('.portfolio-item'),
			dot = document.querySelectorAll('.dot'),
			clayder = document.querySelector('.portfolio-content');
		let carentSlayd = 0,
			interval;
		const prew = (elem, index, strClass) => {
			elem[index].classList.remove(strClass);
		};
		const next = (elem, index, strClass) => {
			elem[index].classList.add(strClass);
		};

		const autoplaySlayd = () => {
			prew(dot, carentSlayd, 'dot-active');
			prew(slayde, carentSlayd, 'portfolio-item-active');
			carentSlayd++;
			if (carentSlayd >= slayde.length) {
				carentSlayd = 0;
			} else if (carentSlayd < 0) {
				carentSlayd = slayde.length - 1;
			}
			next(slayde, carentSlayd, 'portfolio-item-active');
			next(dot, carentSlayd, 'dot-active');

		};
		const startSlayde = (time = 3000) => {
			interval = setInterval(autoplaySlayd, time);
		};
		const stopSlayde = () => {
			clearInterval(interval);
		};

		clayder.addEventListener('click', event => {
			event.preventDefault();
			const target = event.target;
			if (!target.matches('.portfolio-btn, .dot ')) {
				return;
			}
			prew(dot, carentSlayd, 'dot-active');
			prew(slayde, carentSlayd, 'portfolio-item-active');

			if (target.matches('#arrow-right')) {
				carentSlayd++;
			} else if (target.matches('#arrow-left')) {
				carentSlayd--;
			} else if (target.matches('.dot')) {
				dot.forEach((item, index) => {
					if (item === target) {
						carentSlayd = index;
					}
				});
			}
			if (carentSlayd >= slayde.length) {
				carentSlayd = 0;
			}
			if (carentSlayd < 0) {
				carentSlayd = slayde.length - 1;
			}
			next(slayde, carentSlayd, 'portfolio-item-active');
			next(dot, carentSlayd, 'dot-active');

		});
		clayder.addEventListener('mouseover', event => {
			if (event.target.matches('.portfolio-btn') ||
				event.target.matches('.dot')) {
				stopSlayde();
			}
		});
		clayder.addEventListener('mouseout', event => {
			if (event.target.matches('.portfolio-btn') ||
				event.target.matches('.dot')) {
				startSlayde();
			}
		});
		startSlayde(1500);
	};
	slayder();
	//.................................data-image...................
	const dataImage = () => {
		const command = document.querySelector('.command'),
			commandPhoto = document.querySelectorAll('.command__photo');
		command.addEventListener('mouseover', event => {
			commandPhoto.forEach(item => {
				if (event.target === item) {
					const targetsrc = event.target.src;
					event.target.src = event.target.dataset.img;
					event.target.dataset.img = targetsrc;

				}
			});
		});
		command.addEventListener('mouseout', event => {
			commandPhoto.forEach(item => {
				if (event.target === item) {
					const targetsrc = event.target.src;
					event.target.src = event.target.dataset.img;
					event.target.dataset.img = targetsrc;

				}
			});
		});

	};
	dataImage();
	const calck = (prise = 100) => {
		const calcBlock = document.querySelector('.calc-block'),
			calcSquare = document.querySelector('.calc-square'),
			calcCount = document.querySelector('.calc-count'),
			calcType = document.querySelector('.calc-type'),
			totalValue = document.getElementById('total'),
			calcDay = document.querySelector('.calc-day');
		let count = 0;
		let numer = 0;
		const nums = (to, total) => {
			totalValue.textContent = count;
			count += 100;
			console.log('count : ', count);
			//	count = parseInt(count);

			if (count < to) {
				requestAnimationFrame(nums);
			} else {
				totalValue.textContent = total;
				return;
			}
		};
		const countSum = () => {
			let total = 0,
				cauntValue = 1,
				dayValue = 1;
			const typeValue = calcType.options[calcType.selectedIndex].value,
				squareValue = +calcSquare.value;
			if (calcCount.value > 1) {
				cauntValue += (calcCount.value - 1) / 10;
			}
			if (calcDay.value && calcDay.value < 5) {
				dayValue *= 2;
			} else if (calcDay.value && calcDay.value < 10 && calcDay.value > 5) {
				dayValue *= 1.5;
			}
			if (typeValue && squareValue) {
				total = prise * typeValue * squareValue * cauntValue * dayValue;
				total = Math.floor(total);
			} else {
				total = 0;
			}
			numer = total;
			//console.log('numer: ', numer);
			// nums(numer, numer);
			//setTimeout(() => totalValue.textContent = total, 1000);
			totalValue.textContent = total;

		};

		calcBlock.addEventListener('input', event => {
			const target = event.target;
			if (target.matches('input')) {
				target.value = target.value.replace(/\D/g, '');
			}
			if (target.matches('input') || target.matches('select')) {
				countSum();
			}
		});
	};
	calck(100);
	//.......................................send..............ajax
	const sendForm = () => {
		const errorMesage = 'что то пошло не так ',
			loadMesage = 'загрузка....',
			succsesMesage = 'мы скоро с вами свяжемся!';
		const htmlBody = document.querySelector('body');
		const statusMesage = document.createElement('div');
		statusMesage.style.cssText = `font-size:2rem; color: #fff;`;

		console.log('name: ', name);
		const email = document.querySelectorAll('input[name = "user_email"]');
		console.log('email: ', email);
		//const phones = document.querySelectorall('input[name = "user_phone"]');
		//console.log('phone: ', phones);
		//
		const postData = (body, outputData, errorData) => {
			const request = new XMLHttpRequest();
			request.addEventListener('readystatechange', () => {
				statusMesage.textContent = loadMesage;
				if (request.readyState !== 4) {
					return;
				}
				if (request.status === 200) {
					outputData();
				} else {
					errorData(request.status);
				}
			});
			request.open('POST', './server.php');
			request.setRequestHeader('Content-Type', 'application/json');
			request.send(JSON.stringify(body));
		};
		//
		htmlBody.addEventListener('input', event => {
			const targetid = event.target.id;
			const form = targetid.substring(0, 5);
			const forms = document.getElementById(form);
			const name = forms.querySelector('input[name = "user_name"]');
			const phone = forms.querySelector('input[name = "user_phone"]');
			name.value = name.value.trim().replace(/^[\%/\\&\?\,\'\;\.:!-+!@#\$\^*)(a-zA-Z0-9]+$/, '');
			if (event.target === phone) {
				phone.value = phone.value.trim().replace(/^\D$/, '');
				console.log('phone.value: ', phone.value);
			}
			forms.addEventListener('submit', event => {
				event.preventDefault();
				forms.appendChild(statusMesage);
				const formData = new FormData(forms);
				const body = {};
				for (const key of formData.entries()) {
					body[key[0]] = key[1];
				}
				postData(body, () => {
					statusMesage.textContent = succsesMesage;
					setTimeout(() => {
						forms.querySelectorAll('input[name], textarea').forEach(el => el.value = '');
						const pop = document.querySelector('.popup');
						pop.style.display = 'none';
					}, 1000);
					//
				}, error => {
					statusMesage.textContent = errorMesage;
					console.error(error);
				});
			});
		});

	};
	sendForm();
});
// if (target.matches('.calc-type') || target.matches(.calc-square')||
//  target.matches('.calc-count') || target.matches('.calc-day')){
// 	console.log(1);