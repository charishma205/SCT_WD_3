const gameBoard = document.getElementById('game-board');
const status = document.getElementById('status');
const restart = document.getElementById('restart');
const themeSelect = document.getElementById('theme');
const boardSelect = document.getElementById('board');
const modeSelect = document.getElementById('mode');
const sparkleContainer = document.getElementById('sparkle-container');

let currentPlayer = 'X';
let gameBoardArray = Array(9).fill('');
let isGameOver = false;

const themeSparkleColors = {
  Peaceful: ['#ffb6c1', '#ffe4e1', '#fffacd', '#e0ffff'],
  Ocean: ['#a0e7e5', '#b4f8c8', '#f8f7ff', '#72ddf7']
};

function createBoard() {
  gameBoard.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    if (boardSelect.value === 'Rounded') {
      cell.classList.add('rounded');
    }
    cell.setAttribute('data-index', i);
    cell.addEventListener('click', handleClick);
    gameBoard.appendChild(cell);
  }
}

function handleClick(e) {
  const index = e.target.getAttribute('data-index');
  if (gameBoardArray[index] === '' && !isGameOver) {
    makeMove(index, currentPlayer);
    if (!isGameOver && modeSelect.value === 'vsComputer' && currentPlayer === 'O') {
      setTimeout(computerMove, 500);
    }
  }
}

function makeMove(index, player) {
  gameBoardArray[index] = player;
  const cell = document.querySelector(`.cell[data-index="${index}"]`);
  if (cell) cell.textContent = player;

  if (checkWin()) {
    status.textContent = `Player ${player} Wins!`;
    isGameOver = true;
    showSparkles();
  } else if (gameBoardArray.every(cell => cell !== '')) {
    status.textContent = "It's a Draw!";
    isGameOver = true;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

function computerMove() {
  const emptyIndices = gameBoardArray
    .map((val, idx) => val === '' ? idx : null)
    .filter(val => val !== null);

  if (emptyIndices.length === 0) return;

  const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  makeMove(randomIndex, 'O');
}

function checkWin() {
  const winConditions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return winConditions.some(condition =>
    condition.every(index => gameBoardArray[index] === currentPlayer)
  );
}

function restartGame() {
  currentPlayer = 'X';
  gameBoardArray = Array(9).fill('');
  isGameOver = false;
  status.textContent = `Player X's Turn`;
  createBoard();
}

function showSparkles() {
  const icons = ['🎀', '🍃', '🌸', '✨', '💫', '🍂', '🪷', '🧚‍♀️'];
  const theme = themeSelect.value;
  const colors = themeSparkleColors[theme] || ['#ffffff'];
  const total = 50;
  const delay = 50;

  for (let i = 0; i < total; i++) {
    setTimeout(() => {
      const sparkle = document.createElement('div');
      sparkle.classList.add('sparkle');
      sparkle.textContent = icons[Math.floor(Math.random() * icons.length)];
      sparkle.style.left = `${Math.random() * 100}vw`;
      sparkle.style.top = `${Math.random() * 100}vh`;
      sparkle.style.color = colors[Math.floor(Math.random() * colors.length)];
      sparkleContainer.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 2000);
    }, i * delay);
  }
}

function applyTheme() {
  const theme = themeSelect.value;
  switch (theme) {
    case 'Peaceful':
      document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1950&q=80')";
      break;
    case 'Ocean':
      document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1950&q=80')";
      break;
    default:
      document.body.style.backgroundImage = '';
  }
}

themeSelect.addEventListener('change', () => {
  applyTheme();
  restartGame();
});

boardSelect.addEventListener('change', restartGame);
modeSelect.addEventListener('change', restartGame);
restart.addEventListener('click', restartGame);

applyTheme();
createBoard();
