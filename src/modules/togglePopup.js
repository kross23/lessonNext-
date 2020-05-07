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
                requestAnimationFrame(step);
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
export default togglePopup;