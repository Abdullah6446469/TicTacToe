const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("statusText");
const restartBtn = document.getElementById("restartBtn");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = true;

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");

    if (options[cellIndex] !== "" || !running) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();

    // After player's move, it's the computer's turn
    if (running && currentPlayer === "X") {
        setTimeout(computerMove, 1000);  // Delay for 1 second before the computer's move
    }
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (options[a] && options[a] === options[b] && options[a] === options[c]) {
            statusText.textContent = `${currentPlayer} wins!`;
            running = false;
            return;
        }
    }

    if (!options.includes("")) {
        statusText.textContent = "Draw!";
        running = false;
    } else {
        changePlayer();
    }
}

function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}

function getRandomStep() {
    const availableCells = [];
    for (let i = 0; i < options.length; i++) {
        if (options[i] === "") {
            availableCells.push(i);
        }
    }

    if (availableCells.length === 0) {
        return null;  // No available cells
    }

    const randomIndex = Math.floor(Math.random() * availableCells.length);
    return availableCells[randomIndex];
}

function computerMove() {
    const randomStep = getRandomStep();

    if (randomStep !== null) {
        updateCell(cells[randomStep], randomStep);
        checkWinner();
    } else {
        console.log("No available cells. The game is over.");
    }
}
