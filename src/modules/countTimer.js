const countTimer = dedline => {
    const timerhours = document.querySelector('#timer-hours'),
        timerMinuts = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');
    const getTaimRemaining = () => {
        const dateStop = new Date(dedline).getTime(),
            dateNow = new Date().getTime(),
            timeRamaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRamaining % 60),
            minets = Math.floor((timeRamaining / 60) % 60),
            hours = Math.floor(timeRamaining / 60 / 60);
        return {
            timeRamaining,
            hours,
            minets,
            seconds,
        };
    };
    const updateClock = setInterval(() => {
        const timer = getTaimRemaining(); //getTimeRamaining
        for (const key in timer) {
            if (timer[key] >= 0 && timer[key] <= 9) {
                timer[key] = '0' + timer[key];
            }
        }
        timerhours.textContent = timer.hours;
        timerMinuts.textContent = timer.minets;
        timerSeconds.textContent = timer.seconds;

        if (timer.timeRamaining < 0) {
            clearInterval(updateClock);
            timerhours.textContent = '00';
            timerMinuts.textContent = '00';
            timerSeconds.textContent = '00';
        }
    }, 1000);
};
export default countTimer;