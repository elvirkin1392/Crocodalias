import { useState } from "react";
import FooterControls from "../components/FooterControls";
import { Title, SSlider } from "./styled/settingsGeneral";
import {Container, DigitalButton} from "./styled/general";

const ScoreSettings = ({
  defaultValue,
  onSubmit,
  onClose,
  title,
}: {
  defaultValue: number;
}) => {
  const [score, setScore] = useState(defaultValue);
  function preventHorizontalKeyboardNavigation(event: React.KeyboardEvent) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
    }
  }
  return (
    <Container>
      <Title>{title}: Winner score</Title>
      <DigitalButton onClick={() => onSubmit(score)}>{score}</DigitalButton>

      <div style={{ height: "400px" }}>
        <SSlider
          sx={{
            '& input[type="range"]': {
              WebkitAppearance: "slider-vertical",
            },
          }}
          orientation="vertical"
          defaultValue={defaultValue}
          aria-label="score"
          valueLabelDisplay="auto"
          onKeyDown={preventHorizontalKeyboardNavigation}
          onChange={(event, newValue) => {
            if (Array.isArray(newValue)) {
              return;
            }
            setScore(newValue);
          }}
        />

        <FooterControls onClose={onClose} onSubmit={() => onSubmit(score)} />
      </div>
    </Container>
  );
};

export default ScoreSettings;
