const wordList = ["javascript", "hangman", "programming", "developer"]; // Word list
let word = "";
let guessed = [];
let incorrect = 0;

// Elements
const wordContainer = document.getElementById("word-container");
const guessedLetters = document.getElementById("guessed-letters");
const hangman = document.getElementById("hangman");
const guessInput = document.getElementById("guess-input");
const guessButton = document.getElementById("guess-button");
const resetButton = document.getElementById("reset-button");
const message = document.getElementById("message");

// Initialize game
function startGame() {
  word = wordList[Math.floor(Math.random() * wordList.length)];
  guessed = [];
  incorrect = 0;
  wordContainer.innerHTML = word
    .split("")
    .map(() => "_")
    .join(" ");
  guessedLetters.innerHTML = "";
  hangman.innerHTML = "";
  message.textContent = "";
  guessInput.value = "";
}

// Update word display
function updateWord() {
  wordContainer.innerHTML = word
    .split("")
    .map((letter) => (guessed.includes(letter) ? letter : "_"))
    .join(" ");
}

// Handle guesses
function handleGuess() {
  const guess = guessInput.value.toLowerCase();
  guessInput.value = "";

  if (!guess || guessed.includes(guess)) {
    message.textContent = "Invalid or repeated guess!";
    return;
  }

  guessed.push(guess);

  if (word.includes(guess)) {
    updateWord();
    message.textContent = "Correct!";
  } else {
    incorrect++;
    drawHangman();
    guessedLetters.textContent += guess + " ";
    message.textContent = "Incorrect!";
  }

  checkGameStatus();
}

// Draw hangman graphics
function drawHangman() {
  const hangmanParts = [
    `<div class="head"></div>`,
    `<div class="body"></div>`,
    `<div class="left-arm"></div>`,
    `<div class="right-arm"></div>`,
    `<div class="left-leg"></div>`,
    `<div class="right-leg"></div>`,
  ];

  if (incorrect <= hangmanParts.length) {
    hangman.innerHTML += hangmanParts[incorrect - 1];
  }
}

// Check game status
function checkGameStatus() {
  if (word.split("").every((letter) => guessed.includes(letter))) {
    message.textContent = "You win!";
  } else if (incorrect >= 6) {
    message.textContent = "You lose! The word was " + word;
  }
}

// Event listeners
guessButton.addEventListener("click", handleGuess);
resetButton.addEventListener("click", startGame);

// Start the game
startGame();
