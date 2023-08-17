const API = "https://baconipsum.com/api/?type=all-meat&paras=1&start-with-lorem=1";

// Async function to fetch the typing text.
export async function fetchTypingText() {
    try {
        const response = await fetch(API);
        const text = await response.json();

        return text.join(' ');

    } catch (error) {

        alert('There was an error fetching the text');
        console.error(error);
    }
}
