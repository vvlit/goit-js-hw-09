const startBtn = document.querySelector("button[data-start]");
const stopBtn = document.querySelector("button[data-stop]");
let isActive = false;

stopBtn.disabled = true;

const changeBackgroundColor = () => {
    document.body.style.backgroundColor = getRandomHexColor();
};

const start = event => {
    if (isActive) {
        return;
    };

    startBtn.disabled = true;
    stopBtn.disabled = false;

    isActive = true;

    const timerId = setInterval(changeBackgroundColor, 1000);

    stopBtn.addEventListener("click", () => {
        clearInterval(timerId);
        isActive = false;
        startBtn.disabled = false;
        stopBtn.disabled = true;
    });
};

startBtn.addEventListener("click", start);


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};

