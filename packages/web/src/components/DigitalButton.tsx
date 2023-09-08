import styled from "styled-components";

const DigitalButton = styled.button`
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

export default DigitalButton;
