import { useContext, useEffect, useState } from "react";
import { useActor, useInterpret } from "@xstate/react";

import Results from "./Results";
import RoundInfo from "./RoundInfo";
import RoundPlay from "./RoundPlay";
import { roundMachine } from "../../state/round";
import { RoundContext } from "../../context/round";
import { ClassicSettingsContext } from "../../context/settings";

const GameRound = () => {
  const roundService = useInterpret(roundMachine);
  const [state] = useActor(
    roundService
  );
  const [stage, setStage] = useState("info");

  const { send } = roundService;
  const classicSettingsContext = useContext(ClassicSettingsContext);
  const [settingsState] = useActor(
    classicSettingsContext.classicSettingsService
  );

  useEffect(() => {
    if(state.context.round > 1) {
      return;
    }
    const teams = settingsState.context.teams.map((item) => ({
      name: item,
      totalScore: 0,
    }));
    send("SET_TEAMS", { value: teams });
  }, []);

  const getStage = () => {
    let component;
    switch (stage) {
      case "play":
        component = <RoundPlay handleSubmit={(results) => {
          send("SET_TEAMS", {value: results});
          setStage("result")
        }} />;
        break;
      case "info":
        component = <RoundInfo handleSubmit={() => setStage("play")} />;
        break;
      case "result":
        component = <Results handleSubmit={() => {
          send("NEXT_ROUND");
          setStage("info");
        }} />;
        break;
    }
    return component;
  };

  return (
    <RoundContext.Provider value={{ roundService }}>
      {getStage()}
    </RoundContext.Provider>
  );
};

export default GameRound;
