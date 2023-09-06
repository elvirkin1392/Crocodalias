import { useState } from "react";
import FooterControls from "../components/FooterControls";
import { ScoreButton, Title, SSlider } from "./styled/SettingsGeneral";

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
    <>
      <Title>{title}: Winner score</Title>
      <ScoreButton onClick={() => onSubmit(score)}>{score}</ScoreButton>

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
    </>
  );
};

export default ScoreSettings;
