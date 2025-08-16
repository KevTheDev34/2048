const Board = require('../assets/scripts/main.js');

function stackedCombination() {
    const board = new Board(document.createElement('canvas'), document.createElement('canvas').getContext('2d'));
    // Clear all tiles to 0 tiles, because creating a new board will automatically set 2 tiles to 2
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            board.setTile(i, j, 0); // Initialize all tiles to 0
        }
    }
    
    board.setTile(0, 0, 2);
    board.setTile(1, 0, 2);
    board.setTile(2, 0, 2);
    board.printBoard(); // Print initial board state
    board.tilt("down"); // Slide down
    board.printBoard(); // Print board state after sliding down
    return board.tiles;

}

module.exports = {
    stackedCombination
};