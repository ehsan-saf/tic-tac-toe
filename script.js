const game = (() => {

    let togglePlayer = true;
    let numberOfTries = 0;
    let index = 0;
    let combinations = {
    
    };

    function start() {
        reset();
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

    function isGameOver() {
        // numberOfTries++;
        // if(numberOfTries < 9 && !checkWinner()) {
        //     return false;
        // }
        // else if(numberOfTries === 9 && !checkWinner()) {
        //     isTie();
        //     return true;
        // }
        // else if(numberOfTries === 9 && checkWinner()) {
        //     return true;
        // }
        
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
        console.log(winnerMarker);
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

const displayController = (() => {

    const cells = document.querySelectorAll(".cell");
    addClickEvent();

    function addClickEvent() {
        cells.forEach(cell => {
            cell.addEventListener("click", clickEvent)
        });
    }

    function removeClickEvent() {
        cells.forEach(cell => {
            cell.removeEventListener("click", clickEvent);
        })
    }

    function clickEvent(e) {
        // Check to see if there is already a marker in place
        if(e.target.textContent == "") {
            // Add a marker at the corresponding index of the array
            game.play(e.target.dataset.index);
        }
    }


    function fillCells() {
        for(let i = 0; i < 9; i++) {
            const marker = gameBoard.array[i];
            if(typeof marker !== 'number') {
                cells[i].textContent = marker;
            }
        }
    }

    function clearCells() {

    }

    return {fillCells, clearCells, removeClickEvent};

})();

const player = (marker) => {
    return {marker};
};

let player1 = player("x");
let player2 = player("o"); 

