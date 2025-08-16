
const { stackedCombination } = require('./board_conditions');

describe('sliding down with 3 of the same value', () => {

    it('should stack tiles correctly when sliding down', () => {
        const board = stackedCombination();
        expect(board[0][0].value).toBe(0);
        expect(board[1][0].value).toBe(0);
        expect(board[2][0].value).toBe(2);
        expect(board[3][0].value).toBe(4);
    });

    // it('should not merge tiles that are not equal', () => {
    //     const board = new Board(document.createElement('canvas'), document.createElement('canvas').getContext('2d'));
    //     board.setTile(0, 0, 2);
    //     board.setTile(1, 0, 4);
    //     board.tilt("down");
    //     expect(board.tiles[0][0].value).toBe(2);
    //     expect(board.tiles[1][0].value).toBe(4);
    // });

});