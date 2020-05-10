const slayder = () => {
    const uL = document.createElement('ul');
    uL.classList.add('portfolio-dots');
    let portofino = document.querySelector('.portfolio-content');
    for (let i = 0; i < 6; i++) {
        const Li = document.createElement('li');
        Li.classList.add('dot');
        uL.insertBefore(Li, uL.firstChild);
    }
    portofino.insertBefore(uL, portofino.firstChild);
    const dota = document.querySelectorAll('.dot');
    dota[0].classList.add('dot-active');//правка
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
export default slayder;