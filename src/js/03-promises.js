import Notiflix from 'notiflix';


const form = document.querySelector('.form');
const delayIn = document.querySelector('[name="delay"]');
const stepIn = document.querySelector('[name="step"]');
const amountIn = document.querySelector('[name="amount"]');

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        res({ position, delay });
        // Fulfill
      } else {
        rej({ position, delay });
        // Reject
      }
    }, delay);
  });
}


function onClick(e) {
  e.preventDefault();
  let delay = delayIn.valueAsNumber;
  const step = stepIn.valueAsNumber;
  const amount = amountIn.valueAsNumber;
  
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${i} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${i} in ${delay}ms`
        );
      });
    delay += step;
   //position +=1;
  }
}


form.addEventListener('submit', onClick);

