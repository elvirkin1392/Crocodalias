import styled from "styled-components";

const Controls = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  
  button {
    background: none;
    
    &:focus, &:hover {
      border: none;
      outline: none;
      background: none;
    }
  }
`;

const Container = styled.div`
  position: absolute;
  left: 20px;
  right: 20px;
  bottom: 0;
`;
export { Controls, Container };
