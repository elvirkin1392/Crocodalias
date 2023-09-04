import { useState } from "react";
import FooterControls from "../components/FooterControls";
import { ScoreButton } from "./styled/SettingsGeneral";

const ScoreSettings = ({
  defaultValue,
  onSubmit,
  onClose,
}: {
  defaultValue: number;
}) => {
  const [score, setScore] = useState(defaultValue);

  return (
    <>
      <ScoreButton onClick={onClose}>{score}</ScoreButton>

      <div>
        <input
          type="range"
          min={10}
          max={100}
          value={score}
          onChange={(event) => {
            setScore(Number(event.target.value));
          }}
        />

        <FooterControls onClose={onClose} onSubmit={() => onSubmit(score)} />
      </div>
    </>
  );
};

export default ScoreSettings;
