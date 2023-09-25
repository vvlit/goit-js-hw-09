import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const startBtn = document.querySelector("[data-start]");
const inputField = document.querySelector("#datetime-picker");

const daysField = document.querySelector("[data-days]");
const hoursField = document.querySelector("[data-hours]");
const minutesField = document.querySelector("[data-minutes]");
const secondsField = document.querySelector("[data-seconds]");

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      alert("Please choose a date in the future");
      return;
    };

    startBtn.disabled = false;
  },
};

const start = () => {
  const timerID = setInterval(() => {
    const startTime = Date.now();
    const finishTime = new Date(inputField.value).getTime();
    const leftTime = finishTime - startTime;

    if (leftTime < 1000) {
      clearInterval(timerID);
    };

    const { days, hours, minutes, seconds } = convertMs(leftTime);

    daysField.textContent = addLeadingZero(days);
    hoursField.textContent = addLeadingZero(hours);
    minutesField.textContent = addLeadingZero(minutes);
    secondsField.textContent = addLeadingZero(seconds);

  }, 1000)
}

  
flatpickr(inputField, options);
startBtn.disabled = true;
startBtn.addEventListener("click", start);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
};
