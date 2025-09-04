const $time = document.getElementById('time');
const $start = document.getElementById('start');
const $stop = document.getElementById('stop');
const $reset = document.getElementById('reset');

class Stopwatch {
    #elapsedTimeInSeconds = 0;
    #intervalID = null;

    start(callback = () => {}) {
        this.#intervalID = setInterval(() => {
            this.#elapsedTimeInSeconds++;
            callback()
        }, 1000);
    }

    stop(callback = () => {}) {
        clearInterval(this.#intervalID);
        callback()
    }

    reset(callback = () => {}) {
        this.#elapsedTimeInSeconds = 0;
        callback()
    }

    get elapsedTime() {
        return Stopwatch.formatTime(this.#elapsedTimeInSeconds);
    }

    static formatTime(timeInSeconds) {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds - hours * 3600 - minutes * 60;

        return `${Stopwatch.zeroPadding(hours)}:${Stopwatch.zeroPadding(
            minutes
        )}:${Stopwatch.zeroPadding(seconds)}`;
    }

    static zeroPadding(originalNumber, desiredAmountDigits = 2) {
        let stringNumber = String(originalNumber);
        const zerorequired = desiredAmountDigits - stringNumber.length;

        if (zerorequired <= 0) {
            return stringNumber;
        }
        for (let count = 0; count < zerorequired; count++) {
            stringNumber = `0${stringNumber}`;
        }

        return stringNumber;
    }
}

const sw1 = new Stopwatch();


function updateDisplay() {
  $time.textContent =  sw1.elapsedTime
}

$start.addEventListener('click', () => {
  sw1.start(() => updateDisplay())
});

$stop.addEventListener('click', () => {
  sw1.stop()
  
})
$reset.addEventListener('click', () => {
  sw1.reset(() => {

    sw1.stop()
    updateDisplay()
  })
  
})

