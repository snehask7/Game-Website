import React from 'react';
import { StyledDisplayWhite } from './styles/StyledDisplay';

//displays the game over text
const HighScoreDisplay = ({ gameOver, text }) => (
  <StyledDisplayWhite gameOver={gameOver}>{text}</StyledDisplayWhite>
)

export default HighScoreDisplay;