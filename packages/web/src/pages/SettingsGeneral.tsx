import { useMachine } from "@xstate/react";
import { settingsMachine } from "../state/settingsPage";
import { createPortal } from "react-dom";
import { Title, Time, LevelButton } from "./styled/settingsGeneral";

import FooterControls from "../components/FooterControls";
import SettingsScore from "./SettingsScore";
import SettingsTime from "./SettingsTime";
import SettingsLevel from "./SettingsLevel";
import TimeButton from "../components/TimeButton";
import ScoreButton from "../components/ScoreButton";

const SettingsGeneral = ({ onClose, children }) => {
  const [state, send] = useMachine(settingsMachine);
  const { score, level, time } = state.context;

  function saveChanges() {}

  return (
    <div style={{ paddingTop: "40px" }}>
      {state.matches("generalSettings") && (
        <div style={{ flex: 1, flexDirection: "column", display: "flex" }}>
          <Title>{children}: Settings</Title>
          <ScoreButton
            handleClick={() => {
              send({ type: "OPEN_SCORE_SETTINGS" });
            }}
            value={score}
          />

          <LevelButton>
            <button
              onClick={() => {
                send({ type: "OPEN_LEVEL_SETTINGS" });
              }}
            >
              {level}
            </button>
          </LevelButton>

          <TimeButton
            handleClick={() => {
              send({ type: "OPEN_TIME_SETTINGS" });
            }}
            value={time}
          />

          <FooterControls
            onClose={onClose}
            onSubmit={() => {
              saveChanges();
              onClose();
            }}
          />
        </div>
      )}

      {state.matches("scoreSettings") &&
        createPortal(
          <SettingsScore
            title={children}
            defaultValue={score}
            onSubmit={(value) => {
              send({ type: "SUBMIT_SCORE", value });
            }}
            onClose={() => {
              send({ type: "BACK" });
            }}
          />,
          document.getElementById("portalContainer") || document.body
        )}
      {state.matches("timeSettings") &&
        createPortal(
          <SettingsTime
            title={children}
            defaultValue={time}
            onSubmit={(value) => {
              send({ type: "SUBMIT_TIME", value });
            }}
            onClose={() => {
              send({ type: "BACK" });
            }}
          />,
          document.getElementById("portalContainer") || document.body
        )}
      {state.matches("levelSettings") &&
        createPortal(
          <SettingsLevel
            title={children}
            defaultValue={level}
            onSubmit={(value) => {
              send({ type: "SUBMIT_LEVEL", value });
            }}
            onClose={() => {
              send({ type: "BACK" });
            }}
          />,
          document.getElementById("portalContainer") || document.body
        )}
    </div>
  );
};

export default SettingsGeneral;
