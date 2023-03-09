import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
require("flatpickr/dist/themes/dark.css");

const myInput =  document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button');
let refs = {
    dataDays: document.querySelector('[data-days]'),
     dataHours: document.querySelector('[data-hours]'),
     dataMinutes: document.querySelector('[data-minutes]'),
     dataSeconds: document.querySelector('[data-seconds]'),
};

let timerId = null;
let ms;


btnStart.setAttribute('disabled', true);
 
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
    //Обрати дату 
        if (selectedDates[0] < new Date()){
            Notiflix.Notify.warning("Please choose a date in the future");   
        } else{
            //Розрахунок різниці між сьогоднішньою датою і обратною
            btnStart.removeAttribute('disabled');
            ms = selectedDates[0]  -  new Date(); 
        }  
    },
  };
 
//Викликаємо екземпляр flatpickr
 flatpickr(myInput, options);


//Функція розрахунку кіл-ті днів, годин, хв, секунд
function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
    
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
  };

   // Функція для задання кількості символів на таймері  
  function addLeadingZero(value) {
    return value < 0 ? '00' : String(value).padStart(2, '0');
   
  };
function controlTimer() {

            if(ms > 0) {
                ms -= 1000;
                convertMs(ms);
                
            } else {
                timerId = null; 
                clearInterval(timerId);
               
            }
        }

  
  btnStart.addEventListener('click', () =>  {
        timerId = setInterval(controlTimer, 1000)})

       
            
  
