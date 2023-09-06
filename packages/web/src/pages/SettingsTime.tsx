import { useState } from "react";
import FooterControls from "../components/FooterControls";
import { ScoreButton, Title, SSlider } from "./styled/SettingsGeneral";

const SettingsTime = ({
  defaultValue,
  onSubmit,
  onClose,
  title,
}: {
  defaultValue: number;
}) => {
  const [time, setTime] = useState(defaultValue);

  function preventHorizontalKeyboardNavigation(event: React.KeyboardEvent) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
    }
  }

  return (
    <>
      <Title>{title}: Time</Title>
      <div>
        <div style={{ height: "360px" }}>
          <SSlider
            step={5}
            sx={{
              '& input[type="range"]': {
                WebkitAppearance: "slider-vertical",
              },
            }}
            orientation="vertical"
            defaultValue={defaultValue}
            aria-label="time"
            valueLabelDisplay="auto"
            onKeyDown={preventHorizontalKeyboardNavigation}
            onChange={(event, newValue) => {
              if (Array.isArray(newValue)) {
                return;
              }
              setTime(newValue);
            }}
          />
        </div>
        <ScoreButton onClick={() => onSubmit(time)}>{time}</ScoreButton>
        <FooterControls onClose={onClose} onSubmit={() => onSubmit(time)} />
      </div>
    </>
  );
};

export default SettingsTime;
