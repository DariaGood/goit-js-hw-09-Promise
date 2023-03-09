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

refs.btnStart.setAttribute('disabled', true);
let timerId = null;
let difInSeconds;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    //Обрати дату
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.warning('Please choose a date in the future');
    } else {
      refs.btnStart.removeAttribute('disabled');
      //Розрахунок різниці між сьогоднішньою датою і обратною
      difInSeconds = selectedDates[0] - new Date();
    }
  },
};

//Викликаємо екземпляр flatpickr
flatpickr(refs.myInput, options);

//Функція розрахунку кіл-ті днів, годин, хв, секунд
function convertMs(difInSeconds) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining 
  const days = addLeadingZero(Math.floor(difInSeconds / day));
  const hours = addLeadingZero(Math.floor((difInSeconds % day) / hour));
  const minutes = addLeadingZero(Math.floor(((difInSeconds % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((difInSeconds % day) % hour) % minute) / second)
  );

  refs.dataDays.textContent = days;
  refs.dataHours.textContent = hours;
  refs.dataMinutes.textContent = minutes;
  refs.dataSeconds.textContent = seconds;

  // Кількість символів на таймері
  // refs.dataDays.textContent = days  < 10 ? '0' + days : days;
  // refs.dataHours.textContent = hours < 10 ? '0' + hours : hours;
  // refs.dataMinutes.textContent = minutes < 10 ? '0' + minutes : minutes;
  // refs.dataSeconds.textContent = seconds < 10 ? '0' + seconds : seconds;
  return { days, hours, minutes, seconds };
}

// Функція для задання кількості символів на таймері
function addLeadingZero(value) {
  return value < 10 ? '00' : String(value).padStart(2, '0');
}
function controlTimer() {
  if (difInSeconds > 0) {
    difInSeconds -= 1000;
    convertMs(difInSeconds);
  } else {
    timerId = null;
    clearInterval(timerId);
  }
}

refs.btnStart.addEventListener('click', () => {
  timerId = setInterval(controlTimer, 1000);
});
