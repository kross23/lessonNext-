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
export default toglMenu;