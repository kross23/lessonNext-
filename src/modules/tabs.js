const tabS = () => {
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
export default tabS;