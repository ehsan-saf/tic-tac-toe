const gameController = (() => {
    function startGame() {
        gameBoard.array = [];
    }
    function resetGame() {
        gameBoard.array = [];
    }

    return {startGame, resetGame};
})();


const gameBoard = (() =>{

    const arr = ["x", "x", "x", "o", "o","x", "x", "x","o"];
    

    function add(marker) {
        arr.push(marker);
    }

    return {array: arr, add};

})();

const displayController = (() => {

    const cross = "x";
    const circle = "o";
    const cells = document.querySelectorAll(".cell");

    function fillCells() {
        for(let i = 0; i < 9; i++) {
            cells[i].textContent = gameBoard.array[i];
        }
    }

    function clearCells() {

    }

    return {fillCells, clearCells};

})();

const player = (name, marker) => {
    return {name, marker};
};

