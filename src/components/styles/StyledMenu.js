import styled from 'styled-components';
import Card from 'react-bootstrap/Card'
export const MenuItem = styled(Card)`
  display: flex;
  width: 300px;
  height: 250px;
  border: 3px solid ${props => props.color};
  border-radius: 15px;
  justify-content: space-around;
  font-size: 5em;
  background-image: ${props => props.type};
  margin-bottom: 1em;
  margin-right: 1em
  color: ${props => props.color};
`;

export const MenuWrapper = styled.div`
display:flex;
justify-content: center;
align-items: center;
background-color: #000000;
background-image: linear-gradient(147deg, #000000 0%, #04619f 74%);
width: 100vw;
height: 100vh;
`;