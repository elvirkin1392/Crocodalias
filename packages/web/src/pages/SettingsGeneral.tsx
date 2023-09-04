import { useMachine } from "@xstate/react";
import { settingsMachine } from "../state/settingsPage";
import { useState } from "react";
import { ScoreButton, Title, Time, LevelButton } from "./styled/SettingsGeneral";
import FooterControls from "../components/FooterControls";

const SettingsGeneral = ({ onClose, children }) => {
  const [state, send] = useMachine(settingsMachine);
  let { score, level, time } = state.context;

  return (
    <div>
      <Title>{children}</Title>

      <ScoreButton
        onClick={() => {
          send({ type: "OPEN_SCORE_SETTINGS" });
        }}
      >
        {score}
      </ScoreButton>

      {state.matches("scoreSettings") && (
        <>
          <ScoreSettings
            defaultValue={score}
            onSubmit={(value) => {
              send({ type: "SUBMIT_SCORE", value });
            }}
            onClose={() => {
              send({ type: "BACK" });
            }}
          />
        </>
      )}

      <LevelButton
        onClick={() => {
          send({ type: "OPEN_LEVEL_SETTINGS" });
        }}
      >
        {level}
      </LevelButton>

      <ScoreButton
        onClick={() => {
          send({ type: "OPEN_TIME_SETTINGS" });
        }}
      >
        {time}
      </ScoreButton>

      <FooterControls onClose={onClose} />
    </div>
  );
};

const ScoreSettings = ({
  defaultValue,
  onSubmit,
  onClose,
}: {
  defaultValue: number;
}) => {
  const [score, setScore] = useState(defaultValue);
  return (
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
  );
};

export default SettingsGeneral;
