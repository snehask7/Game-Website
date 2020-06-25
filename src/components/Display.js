import React from 'react';
import { StyledDisplay } from './styles/StyledDisplay';

//displayes the game over text
const Display = ({ gameOver, text }) => (
  <StyledDisplay gameOver={gameOver}>{text}</StyledDisplay>
)

export default Display;