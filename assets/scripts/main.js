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
            // console.log(`Random tile set to 2, current board:`, this.tiles.map(row => row.map(tile => tile.value)));
        }
    }

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
        this.setTile(row, col, 2); // set the tile to 2
    }

    setTile(row, col, value) {
        this.tiles[row][col] = new Tile(row, col, value); // create a new Tile instance with the value
    }
}

window.addEventListener('load', function(){
    const canvas = this.document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;

    const board = new Board(canvas, ctx);
    console.log(board.tiles)
});