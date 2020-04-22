/* eslint-disable no-mixed-spaces-and-tabs */
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
	//countTimer('23 aprel 2020');
	//......menu..............
	const toglMenu = () => {
		const btnMenu = document.querySelector('.menu'),
			menu = document.querySelector('menu'),
			menuItem = menu.querySelectorAll('ul>li'),
			clousBtn = document.querySelector('.close-btn');
		const handlerMenu = () => {
			menu.classList.toggle('active-menu');
		};
		btnMenu.addEventListener('click', handlerMenu);
		clousBtn.addEventListener('click', handlerMenu);
		menuItem.forEach(element => {
			element.addEventListener('click', handlerMenu);
		});
	};
	//toglMenu();
	//..popap..
	const togglePopup = () => {
		const popap = document.querySelector('.popup'),
			popupBtn = document.querySelectorAll('.popup-btn'),
			popupClouse = document.querySelector('.popup-close'),
			popupContent = popap.querySelector('.popup-content');
		function printNumbers(from, to) {
			let current = from;
			setTimeout(function go() {
			  console.log(current);
			  if (current > 10) {
				  const p1 = current;
					popupContent.style.top = `${p1}%`;//10
			  }
			  if (current > 38) {
				  const p2 = current;
				  popupContent.style.left = `${p2}%`;//38
			  }
			  // eslint-disable-next-line no-mixed-spaces-and-tabs
			  if (current > to) {
					setTimeout(go, 8);
	 	  }
				current -= 2;
			}, 90);
		}

		    // eslint-disable-next-line no-mixed-spaces-and-tabs
		    popupBtn.forEach(element => {
			element.addEventListener('click', () => {
				if (document.body.clientWidth > 768) {
					popap.style.display = 'block';
					popupContent.style.left = `100%`;
					popupContent.style.top = `100%`;
					  printNumbers(100, 10);
					  console.log(document.body.clientWidth);
				} else {
					popap.style.display = 'block';
				}
			});
		});
		popupClouse.addEventListener('click', () => {
			popap.style.display = 'none';
		});
	};
	togglePopup();
});
