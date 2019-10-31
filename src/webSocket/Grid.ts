class Grid {
  gridY: Array<Array<number>>;

  constructor() {
    this.gridY = [            // Y Axis(ROW)
      [0, 0, 0, 0, 0, 0, 0], // 0
      [0, 0, 0, 0, 0, 0, 0], // 1
      [0, 0, 0, 0, 0, 0, 0], // 2
      [0, 0, 0, 0, 0, 0, 0], // 3
      [0, 0, 0, 0, 0, 0, 0], // 4
      [0, 0, 0, 0, 0, 0, 0]  // 5
    // 0, 1, 2, 3, 4, 5, 6 => X Axis(COLUMN)
    ];
  };

  gridX = (): Array<Array<number>> => [
    [this.gridY[0][0], this.gridY[1][0], this.gridY[2][0], this.gridY[3][0], this.gridY[4][0], this.gridY[5][0]],
    [this.gridY[0][1], this.gridY[1][1], this.gridY[2][1], this.gridY[3][1], this.gridY[4][1], this.gridY[5][1]],
    [this.gridY[0][2], this.gridY[1][2], this.gridY[2][2], this.gridY[3][2], this.gridY[4][2], this.gridY[5][2]],
    [this.gridY[0][3], this.gridY[1][3], this.gridY[2][3], this.gridY[3][3], this.gridY[4][3], this.gridY[5][3]],
    [this.gridY[0][4], this.gridY[1][4], this.gridY[2][4], this.gridY[3][4], this.gridY[4][4], this.gridY[5][4]],
    [this.gridY[0][5], this.gridY[1][5], this.gridY[2][5], this.gridY[3][5], this.gridY[4][5], this.gridY[5][5]],
    [this.gridY[0][6], this.gridY[1][6], this.gridY[2][6], this.gridY[3][6], this.gridY[4][6], this.gridY[5][6]]
  ];
  botLeftTopRight = (): Array<Array<number>> => [
    [this.gridY[3][0], this.gridY[2][1], this.gridY[1][2], this.gridY[0][3]],
    [this.gridY[4][0], this.gridY[3][1], this.gridY[2][2], this.gridY[1][3], this.gridY[0][4]],
    [this.gridY[5][0], this.gridY[4][1], this.gridY[3][2], this.gridY[2][3], this.gridY[1][4], this.gridY[0][5]],
    [this.gridY[5][1], this.gridY[4][2], this.gridY[3][3], this.gridY[2][4], this.gridY[1][5], this.gridY[0][6]],
    [this.gridY[5][2], this.gridY[4][3], this.gridY[3][4], this.gridY[2][5], this.gridY[1][6]],
    [this.gridY[5][3], this.gridY[4][4], this.gridY[3][5], this.gridY[2][6]]
  ];
  topLeftBotRight = (): Array<Array<number>> => [
    [this.gridY[2][0], this.gridY[3][1], this.gridY[4][2], this.gridY[5][3]],
    [this.gridY[1][0], this.gridY[2][1], this.gridY[3][2], this.gridY[4][3], this.gridY[5][4]],
    [this.gridY[0][0], this.gridY[1][1], this.gridY[2][2], this.gridY[3][3], this.gridY[4][4], this.gridY[5][5]],
    [this.gridY[0][1], this.gridY[1][2], this.gridY[2][3], this.gridY[3][4], this.gridY[4][5], this.gridY[5][6]],
    [this.gridY[0][2], this.gridY[1][3], this.gridY[2][4], this.gridY[3][5], this.gridY[4][6]],
    [this.gridY[0][3], this.gridY[1][4], this.gridY[2][5], this.gridY[3][6]]
  ];

  checkWinner(player: number): Boolean {
