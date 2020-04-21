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
	countTimer('22 aprel 2020');

});
