// DOM Elements
const landingPage = document.querySelector('.landing-page');
const gameContainer = document.querySelector('.game-container');
const cardsGrid = document.querySelector('.cards-grid');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');
const finalScoreDisplay = document.getElementById('final-score');
const gameOverScreen = document.querySelector('.game-over');
const restartButton = document.getElementById('restart');

// Game Variables
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let score = 0;
let timeLeft = 30;
let timer;

// Categories
const categories = {
  fruits: ['🍎', '🍌', '🍇', '🍓', '🍊', '🍍', '🥭', '🍒'],
  emojis: ['😀', '😎', '🤩', '😍', '🥳', '😜', '🤔', '😇'],
  animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'],
  planets: ['🌍', '🌕', '🌞', '🌙', '🪐', '🌌', '🌠', '🌑'],
  flags: ['🇺🇸', '🇬🇧', '🇨🇦', '🇦🇺', '🇯🇵', '🇫🇷', '🇩🇪', '🇮🇳']
};

// Sound Effects
const flipSound = new Audio('flip.mp3');
const matchSound = new Audio('match.mp3');
const winSound = new Audio('win.mp3');
const loseSound = new Audio('lose.mp3');

// Event Listeners for Category Buttons
document.querySelectorAll('.category-buttons button').forEach(button => {
  button.addEventListener('click', () => {
    const category = button.getAttribute('data-category');
    startGame(category);
  });
});

// Start Game Function
function startGame(category) {
  landingPage.classList.add('hidden');
  gameContainer.classList.remove('hidden');
  gameOverScreen.classList.add('hidden');

  // Initialize Cards
  cards = [...categories[category], ...categories[category]];
  cards.sort(() => Math.random() - 0.5);

  // Render Cards
  cardsGrid.innerHTML = '';
  cards.forEach((item, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.index = index;
    card.dataset.item = item; // Store the item in a data attribute
    card.textContent = ''; // Hide the content initially
    card.addEventListener('click', handleCardClick);
    cardsGrid.appendChild(card);
  });

  // Reset Game State
  flippedCards = [];
  matchedPairs = 0;
  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = score;
  timerDisplay.textContent = timeLeft;

  // Start Timer
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);

  // Save Initial Game State
  saveGameState();
}

// Handle Card Click
function handleCardClick(event) {
  const card = event.target;
  if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
    flipSound.play();
    card.classList.add('flipped');
    card.textContent = card.dataset.item; // Reveal the content
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

// Check for Matches
function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.item === card2.dataset.item) {
    matchSound.play();
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedPairs++;
    score += 10;
    scoreDisplay.textContent = score;

    if (matchedPairs === 8) {
      winSound.play();
      endGame(true);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      card1.textContent = ''; // Hide the content
      card2.textContent = ''; // Hide the content
    }, 1000);
  }
  flippedCards = [];

  // Save Game State After Each Move
  saveGameState();
}

// Update Timer
function updateTimer() {
  timeLeft--;
  timerDisplay.textContent = timeLeft;

  if (timeLeft === 0) {
    loseSound.play();
    endGame(false);
  }
}

// End Game
function endGame(isWin) {
  clearInterval(timer);
  gameContainer.classList.add('hidden');
  gameOverScreen.classList.remove('hidden');
  finalScoreDisplay.textContent = score;

  if (isWin) {
    gameOverScreen.querySelector('h2').textContent = 'You Win!';
  } else {
    gameOverScreen.querySelector('h2').textContent = 'Game Over!';
  }

  // Clear Saved Game State
  localStorage.removeItem('memoryMatchGame');
}

// Restart Game
restartButton.addEventListener('click', () => {
  landingPage.classList.remove('hidden');
  gameOverScreen.classList.add('hidden');
});

// Save Game State
function saveGameState() {
  const gameState = {
    cards: cards,
    flippedCards: flippedCards.map(card => card.dataset.index),
    matchedPairs: matchedPairs,
    score: score,
    timeLeft: timeLeft
  };
  localStorage.setItem('memoryMatchGame', JSON.stringify(gameState));
}

// Load Game State
function loadGameState() {
  const savedState = JSON.parse(localStorage.getItem('memoryMatchGame'));
  if (savedState) {
    cards = savedState.cards;
    matchedPairs = savedState.matchedPairs;
    score = savedState.score;
    timeLeft = savedState.timeLeft;

    // Render Cards
    cardsGrid.innerHTML = '';
    cards.forEach((item, index) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.dataset.index = index;
      card.dataset.item = item;
      card.textContent = ''; // Hide the content initially
      if (savedState.flippedCards.includes(index.toString())) {
        card.classList.add('flipped');
        card.textContent = item; // Reveal the content for flipped cards
      }
      if (card.textContent === cards[savedState.flippedCards[0]]?.textContent) {
        card.classList.add('matched');
      }
      card.addEventListener('click', handleCardClick);
      cardsGrid.appendChild(card);
    });

    // Update UI
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
  }
}

// Load Game State on Page Load
window.addEventListener('load', loadGameState);