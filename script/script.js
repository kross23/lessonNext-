
'use strict';
window.addEventListener('DOMContentLoaded', () => {

	const countTimer = dedline => {
		const Hours = document.querySelector('#timer-hours'),
			TimerMinuts = document.querySelector('#timer-minutes'),
			TimerSeconds = document.querySelector('#timer-seconds');

		function getTaimRemaining() {
			const dateStop = new Date(dedline).getTime(),
				dateNow = new Date().getTime(),
				timerRemaring = (dateStop - dateNow) / 1000,
				seconds = Math.floor(timerRemaring % 60),
				minets = Math.floor((timerRemaring / 60) % 60),
				hours = Math.floor(timerRemaring / 60 / 60);
			return { timerRemaring, hours, minets, seconds, };
		}

		function apDetClock() {
			const timer = getTaimRemaining();
			for (const key in timer) {
				if (timer[key] >= 0 && timer[key] <= 9) {
					timer[key] = '0' + timer[key];
				}
			}
			Hours.textContent = timer.hours;
			TimerMinuts.textContent = timer.minets;
			TimerSeconds.textContent = timer.seconds;
			setTimeout(apDetClock, 1000);
			if (timer.timerRemaring > 0) {
				setInterval(apDetClock, 1000);
			} else {
				Hours.textContent = '00';
				TimerMinuts.textContent = '00';
				TimerSeconds.textContent = '00';
			}
		}
		apDetClock();
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
			nt =  parseFloat(nt);
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
					console.log('popap.style.opacity: ', popap.style.opacity);
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

	const Scroll = () => {
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
	Scroll();
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
	//...........................

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

		clayder.addEventListener('click',  event => {
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
	//.................................dot...................



});
