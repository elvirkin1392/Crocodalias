import styled from "styled-components";

const Controls = styled.div`
  button {
    position: absolute;
    background: none;
    bottom: 10px;

    &:focus,
    &:hover {
      border: none;
      outline: none;
      background: none;
    }
  }
`;

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 20px;
`;
export { Controls, Container };
