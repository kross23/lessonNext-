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
    export default calck;