let startBtn = document.getElementById('start-btn');
let pauseBtn = document.getElementById('pause-btn');
let resetBtn = document.getElementById('reset-btn');
let lapBtn = document.getElementById('lap-btn');
let restartBtn = document.getElementById('restart-btn');
let timeDisplay = document.getElementById('time-display');
let lapList = document.getElementById('lap-list');

let timer;
let isRunning = false;
let time = 0;
let lapTime = 0;

function formatTime(ms) {
    let hours = Math.floor(ms / 3600000);
    let minutes = Math.floor((ms % 3600000) / 60000);
    let seconds = Math.floor((ms % 60000) / 1000);

    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(num, length = 2) {
    return num.toString().padStart(length, '0');
}

function startTimer() {
    isRunning = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    resetBtn.disabled = false;
    lapBtn.disabled = false;
    restartBtn.disabled = false;
    timer = setInterval(() => {
        time++;
        timeDisplay.textContent = formatTime(time * 1000); // Convert time to milliseconds
    }, 1000); // Update every second
}

function pauseTimer() {
    isRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    clearInterval(timer);
}

function resetTimer() {
    time = 0;
    timeDisplay.textContent = '00:00:00';
    lapList.innerHTML = '';
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    restartBtn.disabled = true;
    startBtn.disabled = false;
}

function restartTimer() {
    time = 0;
    lapTime = 0;
    timeDisplay.textContent = '00:00:00';
    lapList.innerHTML = '';
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    restartBtn.disabled = true;
}

function recordLap() {
    let lap = document.createElement('li');
    lap.textContent = `Lap: ${formatTime(time * 1000 - lapTime * 1000)}`;
    lapList.appendChild(lap);
    lapTime = time;
}

// Event Listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);
restartBtn.addEventListener('click', restartTimer);
