const dataImage = () => {
    const command = document.querySelector('.command'),
        commandPhoto = document.querySelectorAll('.command__photo');
    command.addEventListener('mouseover', event => {
        commandPhoto.forEach(item => {
            if (event.target === item) {
                const targetsrc = event.target.src;
                event.target.src = event.target.dataset.img;
                event.target.dataset.img = targetsrc;
            }
        });
    });
    command.addEventListener('mouseout', event => {
        commandPhoto.forEach(item => {
            if (event.target === item) {
                const targetsrc = event.target.src;
                event.target.src = event.target.dataset.img;
                event.target.dataset.img = targetsrc;
            }
        });
    });
};
export default dataImage;