import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  position: absolute;
  overflow: hidden;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  
  padding-top: 60px;
  
  left: 0;
  right: 0;
  height: 100vh;
`;

export const DigitalButton = styled.button`
  background: none;
  border-radius: 50%;
  box-sizing: border-box;
  font-size: 72px;
  color: #e6bc4e;
  outline: none;
  border: none;
  
  height: 240px;

  &:hover,
  &:focus,
  &:active,
  &:focus-within,
  &:focus-visible {
    outline: none;
    border: none;
  }
`;