import Tile from './tile.js';
class Board {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.ctx = context;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.tiles = []; // 4x4 grid
        this.tileSpacing = 20; // space between tiles
        this.tileSize = (this.width - (this.tileSpacing * 5)) / 4; // calculate tile size based on canvas width and spacing
        this.initBoard();
        this.drawBoard();
        this.score = 0; // Initialize score
        this.bestScore = 0; // Initialize best score
        this.gameOver = false; // Initialize game over state
    }

    initBoard() {
        for (let i = 0; i < 4; i++) {
            this.tiles[i] = [];
            for (let j = 0; j < 4; j++) {
                this.tiles[i][j] = new Tile(i, j, 0); // initialize all tiles to 0
            }
        }

        while (this.tiles.flat().filter(tile => tile.value === 2).length < 2) {
            this.setRandomTile();
        }
    }

    // Create a tile object for each tile in the matrix and draw it on the canvas
    drawBoard() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                // Draw tiles
                const tile = this.tiles[i][j];
                this.ctx.fillStyle = tile.color;
                const x = j * (this.tileSize + this.tileSpacing) + this.tileSpacing;
                const y = i * (this.tileSize + this.tileSpacing) + this.tileSpacing;
                this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
                if (tile.value !== 0) {
                    // Draw tile value
                    this.ctx.font = 'bold 50px Clear Sans'; // Use a clear font for better readability
                    this.ctx.fillStyle = 'black';
                    this.ctx.textAlign = 'center'; // Align text horizontally within the rectangle
                    this.ctx.textBaseline = 'middle';
                    const textX = x + this.tileSize / 2;
                    const textY = y + this.tileSize / 2;
                    this.ctx.fillText(tile.value, textX, textY);
                }
            }
        }
    }

    setRandomTile() {
        const row = Math.floor(Math.random() * 4);
        const col = Math.floor(Math.random() * 4);
        // console.log(`Setting tile at (${row}, ${col}) to 2`);
        if (this.tiles[row][col].value === 0) {
            this.setTile(row, col, 2); // set the tile to 2 
        } else {
            this.setRandomTile(); // if the tile is not empty, try again
        }
    }

    setTile(row, col, value) {
        this.tiles[row][col] = new Tile(row, col, value); // create a new Tile instance with the value
    }

    getTile(row, col) {
        return this.tiles[row][col]; // return the Tile instance at the specified position
    }

    slideDown() {
        for (let col = 0; col < 4; col++) {
            let emptyRow = 3; // Start from the bottom of the column
            for (let row = 3; row >= 0; row--) {
                const tile = this.getTile(row, col);
                if (tile.value !== 0) {
                    if (emptyRow !== row) {
                        this.setTile(emptyRow, col, tile.value); // Move tile down
                        this.setTile(row, col, 0); // Clear the original position
                    }
                    emptyRow--; // Move the empty row up
                }
            }
        }

        // Merge tiles after sliding
        for (let i = 3; i >= 0; i--) {
            for (let j = 0; j < 4; j++) {
                this.merge(i, j); // Merge tiles in the specified direction
            }
        }

        // Slide down again after merging to fill any gaps
        for (let col = 0; col < 4; col++) {
            let emptyRow = 3; // Start from the bottom of the column
            for (let row = 3; row >= 0; row--) {
                const tile = this.getTile(row, col);
                if (tile.value !== 0) {
                    if (emptyRow !== row) {
                        this.setTile(emptyRow, col, tile.value); // Move tile down
                        this.setTile(row, col, 0); // Clear the original position
                    }
                    emptyRow--; // Move the empty row up
                }
            }
        }
    }

    rotateClockwise(matrix) {
        this.tiles = matrix[0].map((val, index) => matrix.map(row => row[index]).reverse());
    }
    
    rotateCCW(matrix) {
        this.tiles = matrix[0].map((val, index) => matrix.map(row => row[row.length-1-index]));    
    }

    tilt(direction) {
        if (direction === "up") {
            this.rotateClockwise(this.tiles);
            this.rotateClockwise(this.tiles);
            this.slideDown();
            this.rotateCCW(this.tiles);
            this.rotateCCW(this.tiles);
            this.drawBoard();
        } else if (direction === "down") {
            this.slideDown();
            this.drawBoard();
        } else if (direction === "left") {
            this.rotateCCW(this.tiles);
            this.slideDown();
            this.rotateClockwise(this.tiles);  
            this.drawBoard();
        } else if (direction === "right") {
            this.rotateClockwise(this.tiles);
            this.slideDown();
            this.rotateCCW(this.tiles);
            this.drawBoard();
        }
    }

    merge(x, y) {
        if (x > 0 && this.tiles[x][y].value === this.tiles[x-1][y].value) {
            const curr_tile = this.tiles[x][y];
            const top_tile = this.tiles[x-1][y];
            this.score += curr_tile.value * 2; // Update score
            if (this.score > this.bestScore) {
                this.bestScore = this.score; // Update best score if current score exceeds it
            }
            this.setTile(x, y, top_tile.value * 2); // Merge tiles
            this.setTile(x-1, y, 0); // Clear the original tile
        }
    }
}

window.addEventListener('load', function(){
    const canvas = this.document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    const score = this.document.getElementById('score-value');
    const gameOver = this.document.getElementById('gameover');
    canvas.width = 500;
    canvas.height = 500;

    const board = new Board(canvas, ctx);
    console.log(board.tiles)

    window.addEventListener('keydown', (event) => {
        if (event.key === "ArrowDown") {
            board.tilt("down"); // Implement tilt logic here
        } else if (event.key === "ArrowUp") {
            board.tilt("up"); // Implement tilt logic here
        } else if (event.key === "ArrowLeft") {
            // Implement left slide logic here
            board.tilt("left"); // Implement tilt logic here
        } else if (event.key === "ArrowRight") {
            // Implement right slide logic here
            board.tilt("right"); // Implement tilt logic here
        }
        board.setRandomTile();
        board.drawBoard(); // Redraw the board after each move
        score.textContent = board.score; // Update score display
        if (board.tiles.flat().every(tile => tile.value !== 0)) {
            // Check for game over condition
            var canMerge = board.tiles.some((row, i) => row.some((tile, j) => {
                return (i < 3 && tile.value === board.tiles[i + 1][j].value) || // Down merge
                       (j < 3 && tile.value === board.tiles[i][j + 1].value); // Right merge
            }));
            if (!canMerge) {
                gameOver.textContent = "Game Over!";
                gameOver.style.display = "block"; // Show game over message
                // alert("Game Over! Your score: " + board.score);
                // board.gameOver = true; // Set game over state
            }
        }
    });

});