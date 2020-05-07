const sendForm = () => {
    const errorMesage = 'что то пошло не так ',
        loadMesage = 'загрузка....',
        succsesMesage = 'мы скоро с вами свяжемся!';
    const statusMesage = document.createElement('div');
    statusMesage.style.cssText = `font-size:2rem; color: #fff;`;
    const forms = document.querySelectorAll('form');

    const postData = body => {
        return fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        });
    };
    forms.forEach(item => {
        item.addEventListener('input', event => {
            const phone = item.querySelector('input[name = "user_phone"]'),
                message = item.querySelector('input[name = "user_message"]'),
                name = item.querySelector('input[name = "user_name"]'),
                formBtn = item.querySelector('.form-btn');
            //console.log(phone);
            const onBtn = () => {
                formBtn.removeAttribute('disabled');
            };
            const offBtn = () => {
                formBtn.setAttribute('disabled', true);
            };
            if (event.target === name) {
                //console.log('name validation work');
                name.value = name.value.replace(/([^А-Яа-яЁё])*/g, '');
            }
            if (event.target === phone && !phone.value.match(/(\+|\d){1}(\d){8,20}(?![A-Za-zА-Яа-яЁё])/g)) {
                //	console.log('phone validation work');
                item.appendChild(statusMesage);
                statusMesage.style.color = 'red';

                statusMesage.textContent = 'Номер должен быть не менее 8 цифр';
                offBtn();
            } else if (phone.value.match(/(\+|\d){1}(\d){8,20}(?![A-Za-zА-Яа-яЁё])/g)) {
                phone.value = phone.value.trim().replace(/^[A-Za-zА-Яа-яЁё]$/g, '');
                statusMesage.style.color = '#fff';
                statusMesage.textContent = '';
                onBtn();
            }
            if (event.target === message) {
                //console.log('message validation work');
                message.value = message.value.replace(/([^А-Яа-яЁё.,\-'"!\s])*/g, '');
            }
        });
        item.addEventListener('submit', event => {
            event.preventDefault();
            statusMesage.textContent = loadMesage;
            item.appendChild(statusMesage);
            const formData = new FormData(item);
            // console.dir( formData);
                 const body = {};
                 formData.forEach((val, key) => body[key] = val);
            postData(body)
                .then((response) => {
                    if (response.status !== 200) {
                        throw new Error('status network not 200.');
                    }
                    const allInput = document.querySelectorAll('input').forEach(el => el.value = '');
                    const pop = document.querySelector('.popup');
                    pop.style.display = 'none';
                    statusMesage.textContent = succsesMesage;
                })
                .catch(error => {
                    statusMesage.textContent = errorMesage;
                    console.error(error);
                });
        });
    });
};
export default sendForm;