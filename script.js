const board = document.getElementById("board");
const message = document.getElementById("message");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

// Winning combinations
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Create board
function createBoard() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    board.innerHTML = "";
    gameActive = true;
    currentPlayer = "X";
    message.textContent = "Player X's Turn";

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleCellClick);
        board.appendChild(cell);
    }
}

// Handle cell click
function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.dataset.index;

    if (gameState[cellIndex] !== "" || !gameActive) return;

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        message.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
    } else if (gameState.every(cell => cell !== "")) {
        message.textContent = "It's a Draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        message.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

// Check for winner
function checkWinner() {
    return winningConditions.some(combination => {
        const [a, b, c] = combination;
        return (
            gameState[a] !== "" &&
            gameState[a] === gameState[b] &&
            gameState[a] === gameState[c]
        );
    });
}

// Restart the game
resetButton.addEventListener("click", createBoard);

// Initialize the game
createBoard();
