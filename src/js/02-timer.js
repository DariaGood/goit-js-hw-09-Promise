import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
require('flatpickr/dist/themes/dark.css');

let refs = {
  myInput: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('button'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
};

let timerId = null;
let selectedNewDate;
let difInSeconds;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    //Умова для вибору дати
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.warning('Please choose a date in the future');
    } else {
      refs.btnStart.removeAttribute('disabled');
      //Записуємо обрану дату в зовн.змінну
      selectedNewDate = selectedDates[0].getTime();
      console.log(new Date());
    }
  },
};

refs.btnStart.setAttribute('disabled', true);

//Викликаємо екземпляр flatpickr
flatpickr(refs.myInput, options);

function controlTimer() {
  const currentTime = new Date().getTime();
  difInSeconds = selectedNewDate - currentTime;

  if (difInSeconds > 0) {
    convertMs(difInSeconds);
  } else {
    timerId = null;
    clearInterval(timerId);
  }
}

//Функція розрахунку кіл-ті днів, годин, хв, секунд
function convertMs(difInSeconds) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining
  const days = Math.floor(difInSeconds / day);
  const hours = Math.floor((difInSeconds % day) / hour);
  const minutes = Math.floor(((difInSeconds % day) % hour) / minute);
  const seconds = Math.floor((((difInSeconds % day) % hour) % minute) / second);

  refs.dataDays.textContent = addLeadingZero(days);
  refs.dataHours.textContent = addLeadingZero(hours);
  refs.dataMinutes.textContent = addLeadingZero(minutes);
  refs.dataSeconds.textContent = addLeadingZero(seconds);

  // Кількість символів на таймері
  // refs.dataDays.textContent = days  < 10 ? '0' + days : days;
  // refs.dataHours.textContent = hours < 10 ? '0' + hours : hours;
  // refs.dataMinutes.textContent = minutes < 10 ? '0' + minutes : minutes;
  // refs.dataSeconds.textContent = seconds < 10 ? '0' + seconds : seconds;
  return { days, hours, minutes, seconds };
}

//Функція для задання кількості символів в таймері
function addLeadingZero(value) {
  //return value < 10 ? '00' : String(value).padStart(2, '0');
  return value < 10 ? '0' + value : value;
}

refs.btnStart.addEventListener('click', () => {
  timerId = setInterval(controlTimer, 1000);
  refs.btnStart.disabled = true;
});
