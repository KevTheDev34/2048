
class Tile {
    constructor(x, y, value) {
        this.value = value;
        this.color = Tile.getColor(value);
        this.x = x; // x position in the grid
        this.y = y; // y position in the grid
    }

    static getColor(value) {
        const colors = {
            0: '#d0bfae',      // none
            2: '#eee4da',
            4: '#ede0c8',
            8: '#f2b179',
            16: '#f59563',
            32: '#f67c5f',
            64: '#f65e3b',
            128: '#edcf72',
            256: '#edcc61',
            512: '#edc850',
            1024: '#edc53f',
            2048: '#edc22e'
        };
        return colors[value] || '#3c3a32'; // fallback for higher values
    }
}

module.exports = Tile;