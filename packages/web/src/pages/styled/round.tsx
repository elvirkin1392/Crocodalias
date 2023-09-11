import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  padding-top: 60px;

  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
`;

export const Title = styled.div`
  color: #b3b3b3;
`;

export const Controls = styled.div`
  position: absolute;
  top: 55px;
  left: 20px;

  button {
    position: absolute;
    background: none;

    &:focus,
    &:hover {
      border: none;
      outline: none;
      background: none;
    }

    img {
      height: 14px;
      opacity: 30%;
    }
  }
`;

export const Card = styled.div`
  background: #68877C;
  border-radius: 20px;
  margin: 100px 0;
  
  height: 450px;
  width: 245px;
`;

export const Footer = styled.div`
  position: absolute;
  bottom: 40px;

  subtitle {
  }
`;

export const Time = styled.div`
  font-size: 62px;
  color: #e6bc4e;
  position: absolute;

  bottom: 10px;
  right: 30px;
`;
