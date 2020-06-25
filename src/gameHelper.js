export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

//creates the grid. initially everything is cleared
export const createStage = () =>
  Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([0, 'clear']),
  );

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  for (let y = 0; y < player.tetromino.length; y += 1) {  //number of rows in tetromino(2 or 3 or 4)
    for (let x = 0; x < player.tetromino[y].length; x += 1) {//number of columns in tetromino row
      if (player.tetromino[y][x] !== 0) { //contains a letter
        if (
          //empty cell and within game area
          !stage[y + player.pos.y + moveY] ||
          !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !==
          'clear'
        ) {
          return true;
        }
      }
    }
  }
};
