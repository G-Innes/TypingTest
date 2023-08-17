import { handleMistake, showCurrentWord, resetTest, restartTest } from './uiUpdates.js';
import { state } from './main.js';
import { isTimerStarted, startTimer } from "./timer.js";

const textarea = document.querySelector('textarea');
const divText = document.querySelector('.typing-text');

// Handles focus event on text area, starting text animation
function handleTextareaFocus(e) {
    if (!state.isCrawlStarted) {
        divText.classList.add('start-crawl');
        state.isCrawlStarted = true;
    }
}

// Handle the keyup but ignore Shift
function handleTextareaKeyup(e) {
    if (e.key !== 'Shift' && !isTimerStarted()) {
        startTimer(textarea);
    }
}

// Restarts/resets typing test
function handleDocumentKeydown(e) {
    if (e.key === "Enter") restartTest();
    else if (e.key === "Escape") resetTest();
}

// Checks for mistakes & updates the current word
function handleTextareaInput(e) {
    state.currentIndex = e.target.value.length;
    handleMistake(e.target.value, state.text.charAt(state.currentIndex - 1));

}

// Set the event listeners
function setupEventListeners() {
    textarea.addEventListener('focus', handleTextareaFocus);
    textarea.addEventListener('keyup', handleTextareaKeyup);
    document.addEventListener('keydown', handleDocumentKeydown);
    textarea.addEventListener('input', handleTextareaInput);
}

setupEventListeners();

export { textarea, divText }
