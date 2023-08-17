import { updateTypingText } from "./uiUpdates.js";

let state = {
    currentIndex: 0,
    text: "",
    isCrawlStarted: false,
    currentWordIndex: 0,
    wordsArray: [],
    mistakes: 0
};

// Retrieve current state
function getState() {
    return state;
}

// Update properties of the state
function setState(newState) {
    state = { ...state, ...newState };
}

// Ensures textarea is empty on load
function resetTextarea() {
    document.querySelector('textarea').value = '';
}

// Sets initial state
function initialize() {
    // Clear the textarea
    resetTextarea();

    // Update the typing text display
    updateTypingText();
}

initialize();

export { getState, setState, state };
