import styled from "styled-components";
import Slider from "@mui/material/Slider";

const Title = styled.div`
  margin-bottom: 20px;
`;
const SSlider = styled(Slider)({
  height: 8,
  "&.MuiSlider-root": { color: "#e6bc4e" },

  "& .MuiSlider-thumb": {
    height: 17,
    width: 35,
    borderRadius: "10px",
  },
});

const LevelButton = styled.div`
  height: 218px;
  justify-content: center;
  display: flex;
  
  button {
    align-self: center;
    background: #e6bc4e;
    border-radius: 50%;

    height: 180px;
    width: 180px;
  }
`;

const Time = styled.button``;

export { Time, Title, LevelButton, SSlider };
