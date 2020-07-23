import styled from 'styled-components';

export const StyledDisplay = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center; 
  margin: 0 0 20px 0;
  padding: 20px;
  border: 4px solid #333;
  min-height: 30px;
  width: 120%;
  border-radius: 20px;
  color: ${props => (props.gameOver ? 'red' : '#999')};
  background: #000;
  font-family: Pixel, Arial, Helvetica, sans-serif;
  font-size: 1rem;
`;

export const StyledDisplay2 = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center; 
  margin: 0 0 20px 22em;
  padding: 7px;
  padding-left: 25px;
  border: 4px solid #333;
  min-height: 10px;
  width: 20%;
  border-radius: 20px;
  color: ${props => (props.gameOver ? 'red' : '#999')};
  background: #000;
  font-family: Pixel, Arial, Helvetica, sans-serif;
  font-size: 30px;
`;