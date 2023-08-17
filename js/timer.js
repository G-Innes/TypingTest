import { storeMetrics, displayMetrics } from './userMetrics.js';

let state = {
    timerStarted: false,
    timerDuration: 10,
    timerInterval: null,
    mistakesInTimer: 0
};

// Sets average chars per word for use in WPM calculation
const avgCharsPerWord = 5;

// Executed when the timer ends & calculates user's WPM & accuracy, updates the display & stores the metrics
function updateMetrics(textarea) {
    // Total number of chars typed
    const totalCharsTyped = textarea.value.length;

    // Calculate WPM & accuracy
    const wpm = calculateWPM(totalCharsTyped);
    const accuracy = calculateAccuracy(totalCharsTyped, state.mistakesInTimer);

    // Update the displayed scores for the user.
    updateDisplayScores(wpm, accuracy);

    // Save the current metrics and update the metrics table.
    storeMetrics(wpm, accuracy);
    displayMetrics();
}

function calculateWPM(totalCharsTyped) {
    return (totalCharsTyped / avgCharsPerWord).toFixed(2);
}

function calculateAccuracy(totalCharsTyped, mistakes) {
    return ((totalCharsTyped - mistakes) / totalCharsTyped * 100).toFixed(2);
}

// Update the displayed scores (timer, WPM, accuracy)
function updateDisplayScores(wpm, accuracy) {

    const timerDisplay = document.querySelector('.timer-score');
    const wpmScoreDisplay = document.querySelector('.wpm-score');
    const accuracyScoreDisplay = document.querySelector('.accuracy-score');

    // Update their values.
    timerDisplay.innerText = '0s';
    wpmScoreDisplay.innerText = `${wpm}`;
    accuracyScoreDisplay.innerText = `${accuracy}%`;
}

// Start the timer.
function startTimer(textarea) {
    // If the timer has already started, exit the function.
    if (state.timerStarted) return;

    state.timerStarted = true;
    let timeLeft = state.timerDuration;

    // Stop any existing timer intervals.
    clearInterval(state.timerInterval);

    // Set up a new timer interval that decreases the time left every second.
    state.timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            // If time is up, stop the timer and execute end timer logic.
            clearInterval(state.timerInterval);
            updateMetrics(textarea);
        } else {
            // Otherwise, update the displayed time left and decrease the time left by 1 second.
            const timerDisplay = document.querySelector('.timer-score');
            timerDisplay.innerText = `${timeLeft}s`;
            timeLeft--;
        }
    }, 1000);
}

// Stops timer
function stopTimer() {
    clearInterval(state.timerInterval);
    state.timerStarted = false;
}

// Updates mistakes count
function updateMistakes(count) {
    state.mistakesInTimer = count;
}

// Checks if timer started
function isTimerStarted(){
    return state.timerStarted;
}

export { startTimer, stopTimer, isTimerStarted, updateMistakes };
