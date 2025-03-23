// script.js
const words = ["javascript", "hangman", "coding", "computer", "developer"];
let chosenWord, displayedWord, guessedLetters;

function initializeGame() {
    chosenWord = words[Math.floor(Math.random() * words.length)];
    displayedWord = "_".repeat(chosenWord.length).split("");
    guessedLetters = [];
    updateDisplay();
}

function updateDisplay() {
    document.getElementById("word-display").textContent = displayedWord.join(" ");
    document.getElementById("guessed-letters").textContent = `Guessed Letters: ${guessedLetters.join(", ")}`;
}

function handleGuess(letter) {
    if (guessedLetters.includes(letter) || displayedWord.includes(letter)) return;
    guessedLetters.push(letter);
    
    if (chosenWord.includes(letter)) {
        for (let i = 0; i < chosenWord.length; i++) {
            if (chosenWord[i] === letter) {
                displayedWord[i] = letter;
            }
        }
    }
    updateDisplay();
    checkGameOver();
}

function checkGameOver() {
    if (!displayedWord.includes("_")) {
        alert("Congratulations! You've won!");
    } else if (guessedLetters.length - displayedWord.filter(char => char !== "_").length >= 6) {
        alert(`Game Over! The word was "${chosenWord}".`);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const keyboard = document.getElementById("keyboard");
    "abcdefghijklmnopqrstuvwxyz".split("").forEach(letter => {
        const button = document.createElement("button");
        button.textContent = letter;
        button.onclick = () => handleGuess(letter);
        keyboard.appendChild(button);
    });

    document.getElementById("new-game").addEventListener("click", initializeGame);
    initializeGame();
});
