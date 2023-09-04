import styled from "styled-components";

const Card = styled.div`
  box-sizing: border-box;
  padding: 20px;
  
  position: absolute;
  left: 0;
  top: 0;
  
  height: 100vh;
  width: 100vw;
`;

const Carousel = styled.div`
  overflow: hidden;
  
  position: absolute;
  top: 0;
  left: 0;
  
  height: 100vh;
  width: 100vw;
`;

export { Card, Carousel };
