class GridManager {
    constructor(grid) {
        this.grid = grid;
        this.gridY = [
            [this.grid[0][0], this.grid[1][0], this.grid[2][0], this.grid[3][0], this.grid[4][0], this.grid[5][0]],
            [this.grid[0][1], this.grid[1][1], this.grid[2][1], this.grid[3][1], this.grid[4][1], this.grid[5][1]],
            [this.grid[0][2], this.grid[1][2], this.grid[2][2], this.grid[3][2], this.grid[4][2], this.grid[5][2]],
            [this.grid[0][3], this.grid[1][3], this.grid[2][3], this.grid[3][3], this.grid[4][3], this.grid[5][3]],
            [this.grid[0][4], this.grid[1][4], this.grid[2][4], this.grid[3][4], this.grid[4][4], this.grid[5][4]],
            [this.grid[0][5], this.grid[1][5], this.grid[2][5], this.grid[3][5], this.grid[4][5], this.grid[5][5]],
            [this.grid[0][6], this.grid[1][6], this.grid[2][6], this.grid[3][6], this.grid[4][6], this.grid[5][6]]
        ];
        this.botLeftTopRight = [
            [this.grid[3][0], this.grid[2][1], this.grid[1][2], this.grid[0][3]],
            [this.grid[4][0], this.grid[3][1], this.grid[2][2], this.grid[1][3], this.grid[0][4]],
            [this.grid[5][0], this.grid[4][1], this.grid[3][2], this.grid[2][3], this.grid[1][4], this.grid[0][5]],
            [this.grid[5][1], this.grid[4][2], this.grid[3][3], this.grid[2][4], this.grid[1][5], this.grid[0][6]],
            [this.grid[5][2], this.grid[4][3], this.grid[3][4], this.grid[2][5], this.grid[1][6]],
            [this.grid[5][3], this.grid[4][4], this.grid[3][5], this.grid[2][6]]
        ];
        this.topLeftBotRight = [
            [this.grid[2][0], this.grid[3][1], this.grid[4][2], this.grid[5][3]],
            [this.grid[1][0], this.grid[2][1], this.grid[3][2], this.grid[4][3], this.grid[5][4]],
            [this.grid[0][0], this.grid[1][1], this.grid[2][2], this.grid[3][3], this.grid[4][4], this.grid[5][5]],
            [this.grid[0][1], this.grid[1][2], this.grid[2][3], this.grid[3][4], this.grid[4][5], this.grid[5][6]],
            [this.grid[0][2], this.grid[1][3], this.grid[2][4], this.grid[3][5], this.grid[4][6]],
            [this.grid[0][3], this.grid[1][4], this.grid[2][5], this.grid[3][6]]
        ];
    }
    ;
    checkWinner(player) {
        const gridMap = [
            ...this.grid,
            ...this.gridY,
            ...this.botLeftTopRight,
            ...this.topLeftBotRight
        ];
        for (let row of gridMap) {
            let inOrderCounter = 0;
            let prevSlot = 0;
            for (let slot of row) {
                prevSlot === player && slot === prevSlot
                    ? inOrderCounter++
                    : inOrderCounter = 0;
                prevSlot = slot;
                if (inOrderCounter >= 3) {
                    return true;
                }
                ;
            }
            inOrderCounter = 0;
            prevSlot = 0;
        }
        ;
        return false;
    }
    ;
    mapGridColumn() {
        return this.gridY;
    }
}
;
module.exports = GridManager;
//# sourceMappingURL=GridManager.js.map