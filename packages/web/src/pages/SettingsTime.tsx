import { useState } from "react";
import FooterControls from "../components/FooterControls";
import { ScoreButton } from "./styled/SettingsGeneral";

const SettingsTime = ({
  defaultValue,
  onSubmit,
  onClose,
}: {
  defaultValue: number;
}) => {
  const [time, setTime] = useState(defaultValue);

  return (
    <>
      <div>
        <input
          type="range"
          min={10}
          max={100}
          value={time}
          onChange={(event) => {
            setTime(Number(event.target.value));
          }}
        />
        <FooterControls onClose={onClose} onSubmit={() => onSubmit(time)} />
      </div>

      <ScoreButton onClick={onClose}>{time}</ScoreButton>
    </>
  );
};

export default SettingsTime;
