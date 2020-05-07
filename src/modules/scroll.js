const scroll = () => {
    const serviceBlock = document.querySelector('a');
    const str = () => {
        let stra = document.documentElement.scrollTop;
        stra = parseFloat(stra);
        stra += 40;
        document.documentElement.scrollTop = stra;
        if (stra < 827) {
            requestAnimationFrame(str);
        } else {
            return;
        }
    };
    serviceBlock.addEventListener('click', event => { //827
        event.preventDefault();
        str();
       // console.log(document.documentElement.scrollTop);
    });
};
export default scroll;