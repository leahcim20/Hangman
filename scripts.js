// Hangman Game Logic

const words = ["javascript", "hangman", "github", "frontend", "developer"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let guessedWord = Array(selectedWord.length).fill("_");
let wrongGuesses = 0;
const maxGuesses = 6;

const wordDisplay = document.getElementById("wordDisplay");
const message = document.getElementById("message");
const resetButton = document.getElementById("reset");
const keyboard = document.getElementById("keyboard");

function displayWord() {
    wordDisplay.textContent = guessedWord.join(" ");
}

function showKeyboard() {
    keyboard.innerHTML = "";
    "abcdefghijklmnopqrstuvwxyz".split("").forEach(letter => {
        const button = document.createElement("button");
        button.textContent = letter;
        button.addEventListener("click", () => handleGuess(letter));
        keyboard.appendChild(button);
    });
}

function handleGuess(letter) {
    if (selectedWord.includes(letter)) {
        selectedWord.split("").forEach((char, index) => {
            if (char === letter) guessedWord[index] = letter;
        });
    } else {
        wrongGuesses++;
        message.textContent = `Wrong guesses: ${wrongGuesses}`;
    }

    if (guessedWord.join("") === selectedWord) {
        message.textContent = "You won!";
        keyboard.innerHTML = "";
    } else if (wrongGuesses >= maxGuesses) {
        message.textContent = `Game over! The word was "${selectedWord}".`;
        keyboard.innerHTML = "";
    }
    displayWord();
}

resetButton.addEventListener("click", () => {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedWord = Array(selectedWord.length).fill("_");
    wrongGuesses = 0;
    message.textContent = "";
    displayWord();
    showKeyboard();
});

displayWord();
showKeyboard();

