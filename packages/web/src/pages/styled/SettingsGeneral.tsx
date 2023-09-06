import styled from "styled-components";
import Slider from "@mui/material/Slider";

const Title = styled.div`
  margin-bottom: 40px;
`;
const SSlider = styled(Slider)({
  height: 8,
  "&.MuiSlider-root": { color: "#e6bc4e",  },

  "& .MuiSlider-thumb" : {
    height: 17,
    width: 35,
    borderRadius: "10px"
  }
});
const ScoreButton = styled.button`
  background: none;
  border-radius: 50%;
  box-sizing: border-box;
  font-size: 72px;
  color: #e6bc4e;

  //margin-bottom: 40px;

  height: 200px;

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
  align-self: center;
  background: #e6bc4e;
  border-radius: 50%;

  margin-bottom: 40px;

  height: 120px;
  width: 120px;
`;

const Time = styled.button``;

export { Time, Title, ScoreButton, LevelButton, SSlider };
