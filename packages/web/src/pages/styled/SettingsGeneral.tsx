import styled from "styled-components";

const Title = styled.div`
  margin-bottom: 40px;
`;

const ScoreButton = styled.button`
  background: none;
  border-radius: 50%;
  font-size: 64px;
  color: #E6BC4E;
  
  margin-bottom: 40px;

  &:hover,
  &:focus,
  &:active,
  &:focus-within,
  &:focus-visible {
    outline: none;
    border: none;
  }
`;

const LevelButton = styled.button`
  background: #E6BC4E;
  border-radius: 50%;
  
  margin-bottom: 40px;

  height: 120px;
  width: 120px;
`

const Time = styled.button``;

export { Time, Title, ScoreButton, LevelButton };
