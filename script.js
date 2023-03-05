const timeElement = document.querySelector('.time');
const dateElement = document.querySelector('.date');

function formatTime(date) {
    const hours12 = date.getHours() % 12 || 12;
    const minutes = date.getMinutes();
    const ampm = date.getHours() >= 12? 'PM' : 'AM';

    return `${hours12}:${minutes < 10? `0${minutes}` : minutes} ${ampm}`;
}

function formatDate(date) {
    const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return `${DAYS[date.getDay()]}, ${date.getDate()} ${MONTHS[date.getMonth()]}  ${date.getFullYear()}`;
}

setInterval(()=>{
    const now = new Date();

    timeElement.textContent = formatTime(now);
    dateElement.textContent = formatDate(now);
}, 200)

