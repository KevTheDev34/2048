import Tile from './tile.js';
class Board {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.ctx = context;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.tiles = []; // 4x4 grid
        this.tileSpacing = 25; // space between tiles
        this.tileSize = (this.width - (this.tileSpacing * 5)) / 4; // calculate tile size based on canvas width and spacing
        this.initTiles();
    }

    render() {
    }

    initTiles() {
        for (let i = 0; i < 4; i++) {
            this.tiles[i] = [];
            for (let j = 0; j < 4; j++) {
                this.tiles[i][j] = new Tile(0); // initialize all tiles to 0
            }
        }
        console.log(this.tiles);
        this.drawBoard();
    }

    drawBoard() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                const tile = this.tiles[i][j];
                this.ctx.fillStyle = tile.color;
                const x = j * (this.tileSize + this.tileSpacing) + this.tileSpacing;
                const y = i * (this.tileSize + this.tileSpacing) + this.tileSpacing;
                this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
            }
        }
    }
}

window.addEventListener('load', function(){
    const canvas = this.document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;

    const board = new Board(canvas, ctx);
    board.render();
    console.log(board.tiles)
});