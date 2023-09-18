// Controls the game board array which holds cells' values ----

const gameBoard = (() =>{

    // Add a default value so that
    // empty items are not equal
    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    

    function add(index ,marker) {
        arr[index] = marker;
    }

    function getLength() {
        return arr.length;
    }

    return {array: arr, add};

})();

// Controls the game board cells --------------------------

const displayController = (() => {

    const gameboardContainer = document.querySelector(".gameboard-container");    const cells = document.querySelectorAll(".cell");
    addClickEvent();

    function addClickEvent() {
        cells.forEach(cell => {
            cell.addEventListener("click", clickEvent);
        });
    }

    function removeClickEvent() {
        cells.forEach(cell => {
            cell.removeEventListener("click", clickEvent);
        })
    }

    function clickEvent(e) {
        // Check to see if there is already a marker in place
        const index = e.target.dataset.index;
        if(typeof gameBoard.array[index] == "number") {
            // Add a marker at the corresponding index of the array
            game.play(index);
        }
    }

    function showGameBoard() {
        gameboardContainer.classList.remove("hidden");
        gameboardContainer.classList.add("fadeIn");
    }


    function fillCells() {
        for(let i = 0; i < 9; i++) {
            const marker = gameBoard.array[i];
            if(typeof marker !== 'number') {
                if(marker === "x") {
                    cells[i].style.backgroundImage = "url(./icons/cross.png)";
                }
                else {
                    cells[i].style.backgroundImage = "url(./icons/circle.png)";
                }
            }
        }
    }

    function clearCells() {

    }

    

    return {fillCells, clearCells, removeClickEvent, showGameBoard};

})();

const player = (name ,marker) => {
    return {name ,marker};
};

let player1 = player("", "x");
let player2 = player("", "o");

const playerInput = (() => {

    const infoContainer = document.querySelector(".info-container");
    const playerXName = document.getElementById("x-name").value;
    const playerOName = document.getElementById("o-name").value;
    infoContainer.addEventListener("animationend", animationFinished);

    function setPlayerName() {
        if(playerXName.trim() === "") {
            player1.name = "Player X";
        }
        else {
            player1.name = `${playerOName} as X`;
        }

        if(playerOName.trim() === "") {
            player2.name = "Player O";
        }
        else {
            player2.name = `${playerOName} as O`;
        }
    }

    function hideInputs() {
        infoContainer.classList.add("fadeOut");
    }

    function animationFinished() {
        infoContainer.classList.add("hidden");
        displayController.showGameBoard();
    }

    return { setPlayerName, hideInputs };

})();


// Game module that controls the game flow ----------------

const game = (() => {

    let togglePlayer = true;
    let numberOfTries = 0;
    let startButton = document.querySelector(".start-button");
    startButton.addEventListener("click", start);

    function start() {
        playerInput.setPlayerName();
        playerInput.hideInputs();
    }


    function reset() {
        gameBoard.array = [];
        numberOfTries = 0;
        togglePlayer = true;
    }

    function stop() {
        displayController.removeClickEvent();
    }

    // Continue the game when a cell is clicked -----
    function play(index) {
        // Check if all the cells are NOT clicked
        numberOfTries++;
        if(numberOfTries <= 9){        
            if(togglePlayer) {
                gameBoard.add(index, player1.marker);
            }
            else {
                gameBoard.add(index, player2.marker);
            }
            displayController.fillCells();
            togglePlayer = !togglePlayer;
        }
        checkWinner();
        
    }

    function isTie() {
        console.log("It's a tie");
    }

    function checkWinner() {
        const arr = gameBoard.array;
        let winnerMarker = "";
        if(arr[0] === arr[1] && arr[1] === arr[2]) {
            winnerMarker = arr[0];
        }
        else if(arr[3] === arr[4] && arr[4] === arr[5]) {
            winnerMarker = arr[3];
        }
        else if(arr[6] === arr[7] && arr[7] === arr[8]) {
            winnerMarker = arr[6];
        }
        else if(arr[0] === arr[3] && arr[3] === arr[6]) {
            winnerMarker = arr[0];
        }
        else if(arr[1] === arr[4] && arr[4] === arr[7]) {
            winnerMarker = arr[1];
        }
        else if(arr[2] === arr[5] && arr[5] === arr[8]) {
            winnerMarker = arr[2];
        }
        else if(arr[0] === arr[4] && arr[4] === arr[8]) {
            winnerMarker = arr[0];
        }
        else if(arr[2] === arr[4] && arr[4] === arr[6]) {
            winnerMarker = arr[2];
        }
        if(winnerMarker === "" && numberOfTries === 9) {
            isTie();
            stop();
        }
        else if(player1.marker === winnerMarker)
        {
            console.log(`Player 1 as ${winnerMarker} has won`);
            stop();
        }
        else if(player2.marker === winnerMarker) {
            console.log(`Player 2 as ${winnerMarker} has won`);
            stop();
        }
    }

    return {start, reset, play};
})();

