const game = (() => {

    let togglePlayer = true;
    let numberOfTries = 0;

    function start() {
        reset();
    }
    function reset() {
        gameBoard.array = [];
        numberOfTries = 0;
        togglePlayer = true;
    }

    // Continue the game when a cell is clicked -----
    function play(index) {
        // Check if all the cells are NOT clicked
        if(numberOfTries != 9) {
            numberOfTries++;
            if(togglePlayer) {
                gameBoard.add(index, player1.marker);
            }
            else {
                gameBoard.add(index, player2.marker);
            }
            displayController.fillCells();
            togglePlayer = !togglePlayer;
        }
    }

    return {start, reset, play};
})();


const gameBoard = (() =>{

    const arr = new Array(9);
    

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

    function clickEvent(e) {
        if(e.target.textContent == "") {
            // Add a marker at the corresponding index of the array
            game.play(e.target.dataset.index);
        }
    }


    function fillCells() {
        for(let i = 0; i < 9; i++) {
            const marker = gameBoard.array[i];
            if(marker !== undefined) {
                cells[i].textContent = marker;
            }
        }
    }

    function clearCells() {

    }

    return {fillCells, clearCells};

})();

const player = (marker) => {
    return {marker};
};

let player1 = player("x");
let player2 = player("o"); 

