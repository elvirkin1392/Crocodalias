import { useState } from "react";

import { Container } from "../styled/general";
import TimeButton from "../../components/TimeButton";
import { Title, SSlider } from "../styled/settingsGeneral";
import FooterControls from "../../components/FooterControls";

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
    <Container>
      <Title>{title}: Time</Title>

      <div style={{ height: "436px", paddingTop: "60px" }}>
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
      <TimeButton handleClick={() => onSubmit(time)} value={time} />

      <FooterControls onClose={onClose} onSubmit={() => onSubmit(time)} />
    </Container>
  );
};

export default SettingsTime;
