const form = document.querySelector('.form');
const firstDelayField = document.querySelector('input[name=delay]');
const delayStepField = document.querySelector('input[name=step]');
const amountField = document.querySelector('input[name=amount]');

form.addEventListener('submit', event => {
  event.preventDefault();

  const firstDelay = Number(firstDelayField.value);
  const delayStep = Number(delayStepField.value);
  const amount = Number(amountField.value);

  for (let position = 1; position <= amount; position += 1) {
    let delay = firstDelay + delayStep * (position - 1);
    createPromise(position, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });;
  };
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve({ position, delay });
      };

      reject({ position, delay });
    }, delay);
  });
}
