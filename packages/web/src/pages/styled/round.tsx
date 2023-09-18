import styled from "styled-components";

export const Container = styled.div`
  background: linear-gradient(45deg,#E4F2D5, #EFFDE1);
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

export const CardBack = styled.div`
  background: #68877c;
  border-radius: 20px;
  margin: 100px 0;
  padding: 10px;
  display: flex;
  justify-content: center;

  height: 450px;
  width: 245px;
`;

export const CardFace = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  background: #fff;
  border-radius: 20px;

  height: 430px;
  width: 225px;
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
