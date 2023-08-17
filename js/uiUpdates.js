import { fetchTypingText } from "./apiHandler.js";
import { stopTimer, updateMistakes } from "./timer.js";
import { state } from "./main.js";
import { textarea, divText } from "./eventHandlers.js";

const wordDisplay = document.querySelector('.current-word');
const timerScoreDisplay = document.querySelector('.timer-score');
const wpmScoreDisplay = document.querySelector('.wpm-score');
const mistakesScoreDisplay = document.querySelector('.mistakes-score');
const accuracyScoreDisplay = document.querySelector('.accuracy-score');

// Handles user mistakes, change chars color to red & update mistakes count
function handleMistake(userInput, expectedChar) {
    updateCharColor(userInput, expectedChar);

    if (userInput[userInput.length - 1] !== expectedChar) {
        state.mistakes++;
        updateMistakes(state.mistakes);
        mistakesScoreDisplay.innerText = `${state.mistakes}`;
    }
    // Updates display word if user input matches expected char (' ')
    if (expectedChar === ' ' && userInput[userInput.length - 1] === ' ') {
        state.currentWordIndex++;
        showCurrentWord();
    }
}

// Update color of the char based on correctness
function updateCharColor(userInput, expectedChar) {
    const chars = document.querySelectorAll('.typing-text span');

    if (userInput[userInput.length - 1] === expectedChar) {
        chars[state.currentIndex - 1].style.color = 'lightgreen';
    } else {
        chars[state.currentIndex - 1].style.color = 'darkred';
    }
}

// Reset display values to initial state
function setInitialValues() {
    timerScoreDisplay.innerText = '60s';
    wpmScoreDisplay.innerText = '0';
    mistakesScoreDisplay.innerText = '0';
    accuracyScoreDisplay.innerText = '0%';

    const chars = document.querySelectorAll('.typing-text span');
    chars.forEach(char => {
        char.style.color = 'initial';
    });
}

// Restart the typing test.
function restartTest() {
    stopTimer();
    textarea.value = "";
    setInitialValues();
    state.currentWordIndex = 0;
    state.mistakes = 0;
    showCurrentWord();
}

// Reset typing test & fetch a new text
function resetTest() {
    restartTest();
    updateTypingText();
}

// Fetch and display a new typing text
async function updateTypingText() {
    try {
        state.text = await fetchTypingText();
        state.wordsArray = state.text.split(' ');
        divText.innerHTML = state.text.split('').map(char => `<span>${char}</span>`).join('');
        state.currentWordIndex = 0;
        showCurrentWord();
    } catch (error) {
        console.error(error);
        alert('There was an error updating the text');
    }
}

// Display current word
function showCurrentWord() {
    if (state.currentWordIndex < state.wordsArray.length) {
        wordDisplay.innerText = state.wordsArray[state.currentWordIndex];
    } else {
        wordDisplay.innerText = "";
    }
}

export { updateTypingText, resetTest, restartTest, handleMistake, showCurrentWord};
