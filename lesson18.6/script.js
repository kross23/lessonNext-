'use strict';


window.addEventListener('DOMContentLoaded', () => {

	const countTimer = () => {
		const Hours = document.querySelector('.hours'),
			Minuts = document.querySelector('.minuts'),
			Secunds = document.querySelector('.secunds'),
			weeK = document.querySelector('.wick'),
			day = document.querySelector('.day'),
			newEar = document.querySelector('#newear');

		console.log('weeK: ', weeK);

		function getTaimRemaining() {
			const dateNow = new Date(),
				seconds = dateNow.getSeconds(),
				minets = dateNow.getMinutes(),
				hours = dateNow.getHours(),
				weeks = dateNow.getDay();
			return { weeks, hours, minets, seconds, dateNow, };
		}

		function apDetClock() {
			const timer = getTaimRemaining();
			const	arr = [ 'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота' ];
			const  taimDay =  ['доброе утро', 'доброго дня!', 'доброго вечера', 'доброй ночи'];
			console.log('timer.weeks: ', timer.weeks);

			const one = new Date('Dec 31 2020 24:00:00'); // дата, до которой считаем.

			 let   eartyme = one - timer.dateNow; // текущее время
			 eartyme = Math.floor((((eartyme /  1000) / 60) / 60) / 24);


			for (const key in timer) {
				if (timer[key] >= 0 && timer[key] <= 9) {
					timer[key] = '0' + timer[key];
				}
			}
			if (timer.hours > '6' && timer.hours < '9') {
				day.textContent = taimDay[0];
			} else if (timer.hours > '9' && timer.hours < '15') {
				day.textContent = taimDay[1];
			} else if (timer.hours > '15' && timer.hours < '21') {
				day.textContent = taimDay[2];
			} else {
				day.textContent = taimDay[3];
			}

			//(year % 4 === 0 && year % 100 > 0) || year %400 == 0) ? 366 : 365

			weeK.textContent = arr[parseInt(timer.weeks)];
			Hours.textContent = timer.hours;
			Minuts.textContent = timer.minets;
			Secunds.textContent = timer.seconds;
			setTimeout(apDetClock, 1000);
			newEar.textContent = eartyme;

		}


		apDetClock();
	};
	countTimer();

});
