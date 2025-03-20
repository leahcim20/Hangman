const word = "javascript"; // Replace with any word you'd like
const wordContainer = document.getElementById("word-container");
const guessedLetters = document.getElementById("guessed-letters");
const hangman = document.getElementById("hangman");
const guessInput = document.getElementById("guess-input");
const guessButton = document.getElementById("guess-button");
const message = document.getElementById("message");

let guessed = [];
let incorrect = 0;

// Initialize the word display
function initializeWord() {
    wordContainer.innerHTML = word
        .split("")
        .map((letter) => (guessed.includes(letter) ? letter : "_"))
        .join(" ");
}

// Handle a new guess
guessButton.addEventListener("click", () => {
    const guess = guessInput.value.toLowerCase();
    guessInput.value = ""; // Clear input

    if (!guess || guessed.includes(guess)) {
        message.textContent = "Invalid or repeated guess.";
        return;
    }

    guessed.push(guess);

    if (word.includes(guess)) {
        message.textContent = "Correct!";
    } else {
        message.textContent = "Incorrect!";
        incorrect++;
        drawHangman(); // Update hangman graphic
    }

    initializeWord();

    if (word.split("").every((letter) => guessed.includes(letter))) {
        message.textContent = "You win!";
    } else if (incorrect >= 6) {
        message.textContent = "You lose! The word was " + word;
    }
});

// Draw hangman parts based on incorrect guesses
function drawHangman() {
    // Add CSS manipulation or use div elements inside #hangman
}
initializeWord();
