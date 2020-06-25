import React, { useState } from 'react';

import { createStage, checkCollision } from '../gameHelper';

// Styled Components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

// Custom Hooks
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useInterval } from '../hooks/useInterval';
import { useGameStatus } from '../hooks/useGameStatus'
// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared)
  const [paused, setPaused] = useState(0);
  const[gameStarted,setGameStarted]=useState(0);

  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });  //moving to the right or left if no collision
    }
  }

  const pauseGame = () => {
    if (paused) {
      setPaused(0)
      setDropTime(1000 / (level + 1) + 200)
    }
    else {
      setDropTime(null);
      setPaused(1)
    }
  }
  const startGame = () => {
    //resetting the game
    setGameStarted(1)
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0)
    setRows(0)
    setLevel(0)
  }

  const drop = () => {
    //need to calculate the level when 10 rows cleared
    if (rows > (level + 1) * 10) {
      setLevel(level + 1)
      //increase speed
      setDropTime(1000 / (level + 1) + 200)
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) { //if no collision
      updatePlayerPos({ x: 0, y: 1, collided: false })   //moving 1 down the y axis
    }
    else {
      // Game Over
      if (player.pos.y < 1) {
        console.log("GAME OVER!!!");
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });//setting position back to the top
    }
  }

  useInterval(() => {
    drop();
  }, dropTime);

  const keyUp = ({ keyCode }) => {
    if (!gameOver && !paused) {
      if (keyCode === 40) {
        setDropTime(1000 / (level + 1));
      }
    }
  }
  const dropPlayer = () => {
    setDropTime(null)
    drop();
  }

  //called onkeyPress
  const move = ({ keyCode }) => {
    if (!gameOver && !paused) {
      if (keyCode === 37) {
        movePlayer(-1); //right
      } else if (keyCode === 39) {
        movePlayer(1);  //left
      } else if (keyCode === 40) {
        dropPlayer(); //bottom
      } else if (keyCode === 38) {
        playerRotate(stage, 1); //up
      }
    }
  }

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={e => move(e)}
      onKeyUp={keyUp}
    >
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
              <div>
                <Display text={`Score: ${score}`} />
                <Display text={`rows: ${rows}`} />
                <Display text={`Level: ${level}`} />
              </div>
            )}
          <StartButton text={gameStarted===0 ? 'Start Game' : 'Restart Game'} callback={startGame} />
          <StartButton text={paused === 0 ? 'Pause' : 'Continue'} callback={pauseGame} />

        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;


