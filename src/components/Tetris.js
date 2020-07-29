import React, { useState, useEffect } from 'react';

import Nav from '../Nav'
import { createStage, checkCollision } from '../gameHelper';

import GameOver from '../gameover.png'
// Styled Components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';
import Confetti from 'react-confetti'

import Modal from 'simple-react-modal'

// Custom Hooks
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useInterval } from '../hooks/useInterval';
import { useGameStatus } from '../hooks/useGameStatus'
// Components
import Stage from './Stage';
import Display from './Display';
import HighScoreDisplay from './HighScoreDisplay';

import firebase from '../base'
import 'firebase/firestore';

import StartButton from './StartButton';

import Leaderboard from './Leaderboard';

import Grid from '@material-ui/core/Grid';


const Tetris = () => {

  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const user = firebase.auth().currentUser;
  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared)
  const [paused, setPaused] = useState(0);
  const [gameStarted, setGameStarted] = useState(0);
  const [highScore, setHighScore] = useState(0)
  const [newScore, setNewScore] = useState(0)
  const [HighScoreText, setHighScoreText] = useState('High Score: ')

  const [celebrate, setCelebrate] = useState(0)
  useEffect(() => {
    if (score > highScore) {
      setHighScoreText('New High Score: ')
      setHighScore(score)
      setNewScore(1)
    }

  }, [score],
  );

  function useWindowSize() {
    const isClient = typeof window === 'object';

    function getSize() {
      return {
        width: isClient ? window.innerWidth : undefined,
        height: isClient ? window.innerHeight : undefined
      };
    }

    const [windowSize, setWindowSize] = useState(getSize);

    useEffect(() => {
      if (!isClient) {
        return false;
      }

      function handleResize() {
        setWindowSize(getSize());
      }

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty array ensures that effect is only run on mount and unmount

    return windowSize;
  }

  useEffect(() => {
    var high = 0;
    const db = firebase.firestore();
    db.collection("Users")
      .doc(user.uid)
      .get()
      .then(doc => {
        high = doc.data().TetrisHighScore;
        setHighScore(high)
        console.log(doc)
      })
  }, [],
  );

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
    setHighScoreText('High Score: ')
    setCelebrate(0)
    setNewScore(0)
    //resetting the game
    setGameStarted(1)
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0)
    setRows(0)
    setLevel(1)
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
        var user = firebase.auth().currentUser;
        console.log("GAME OVER!!!");
        if (newScore)
          setCelebrate(1)
        setGameOver(true);
        const db = firebase.firestore();
        db.collection("Users").doc(user.uid).update({
          TetrisHighScore: highScore
        })
          .then(function () {
            console.log("Document successfully written!");
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
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

  const { width, height } = useWindowSize()

  return (
    <div className="disableScrolling" >
      <Nav />
      <br></br>
      <br>
      </br>
      <br></br>
      {
        celebrate === 1 ?
          <Confetti
            width={width}
            height={height}
          />
          :
          null
      }
      <Grid container >
        <Grid style={{marginRight: '-35em',marginLeft: '10em',marginTop: '10em',width: '30em'}} >

          <Leaderboard score={score} game="Tetris"/>
        </Grid>
        <Grid item xs={15} sm={6}>

          <StyledTetrisWrapper
            role="button"
            tabIndex="0"
            onKeyDown={e => move(e)}
            onKeyUp={keyUp}
          >
            <br></br>
            {/* {
              user.email !== 'guest@gmail.com' ?

                <div style={{ marginBottom: '-4em', width: '10em`' }}>
                  <HighScoreDisplay text={`${HighScoreText} ${highScore}`} />
                </div>
                :
                <>
                </>

            } */}

            <StyledTetris>

              <Stage stage={stage} />
              <aside>
                {gameOver ? (
                  <div>
                    <Display text={`Score: ${score}`} />
                  </div>

                ) : (
                    <div>
                      <HighScoreDisplay text={`Score: ${score}`} />
                      <HighScoreDisplay text={`Rows: ${rows}`} />
                      <HighScoreDisplay text={`Level: ${level}`} />
                    </div>
                  )}
                {
                  gameOver === true ?
                    <Modal
                      className="test-class" //this will completely overwrite the default css completely
                      // style={{ background: 'red' }} //overwrites the default background
                      containerStyle={{ background: 'white', width: '18em', height: '7em', marginLeft: '-25em', borderRadius: '5em' }} //changes styling on the inner content are
                      containerClassName="test"
                      closeOnOuterClick={true}
                      show={true}
                    // onClose={this.close.bind(this)}
                    >
                      <img style={{ marginTop: '1em', borderRadius: '5em' }} src={GameOver}></img>
                    </Modal>
                    :
                    null
                }

                <StartButton text={gameStarted === 0 ? 'Start Game' : 'Restart Game'} callback={startGame} />
                <StartButton text={paused === 0 ? 'Pause' : 'Continue'} callback={pauseGame} />

              </aside>
            </StyledTetris>
          </StyledTetrisWrapper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Tetris;


