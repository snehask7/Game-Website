import React from 'react';
import { StyledDisplay2 } from './styles/StyledDisplay';

//displays the game over text
const HighScoreDisplay = ({ gameOver, text }) => (
  <StyledDisplay2 gameOver={gameOver}><p className="neon3">{text}</p></StyledDisplay2>
)

export default HighScoreDisplay;