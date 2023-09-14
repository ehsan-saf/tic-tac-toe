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

    const arr = [];

    return {array: arr};

})();

const displayController = (() => {

    function fillCells() {
        
    }

})();

gameController.resetGame();