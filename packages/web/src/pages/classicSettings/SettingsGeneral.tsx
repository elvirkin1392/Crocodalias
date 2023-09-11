import { useContext } from "react";
import { createPortal } from "react-dom";
import { useActor } from "@xstate/react";

import { Title, LevelButton } from "../styled/settingsGeneral";
import FooterControls from "../../components/FooterControls";
import SettingsScore from "./SettingsScore";
import SettingsTime from "./SettingsTime";
import SettingsLevel from "./SettingsLevel";
import SettingsTeam from "./SettingsTeam";
import TimeButton from "../../components/TimeButton";
import ScoreButton from "../../components/ScoreButton";
import { ClassicSettingsContext } from "../../context/settings";

const SettingsGeneral = ({ onClose, children }) => {
  const classicSettingsContext = useContext(ClassicSettingsContext);
  const [state] = useActor(classicSettingsContext.classicSettingsService);
  const { send } = classicSettingsContext.classicSettingsService;

  const { score, level, time, teams } = state.context;

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
              send({ type: "OPEN_TEAM_SETTINGS" });
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
          document.body
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
          document.body
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
          document.body
        )}
      {state.matches("teamSettings") &&
        createPortal(
          <SettingsTeam
            title={children}
            defaultValue={teams}
            onSubmit={(value) => {
              send({ type: "SUBMIT_TEAMS", value });
            }}
            onClose={() => {
              send({ type: "BACK" });
            }}
          />,
          document.body
        )}
    </div>
  );
};

export default SettingsGeneral;