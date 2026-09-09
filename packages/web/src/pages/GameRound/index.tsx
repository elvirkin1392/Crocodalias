import { ReactElement, useEffect, useState } from "react";
import { useActor, useInterpret } from "@xstate/react";

import Results from "./Results";
import RoundInfo from "./RoundInfo";
import RoundPlay from "./RoundPlay";
import { roundMachine } from "../../state/round";
import { RoundContext } from "../../context/round";
import { useClassicSettingsService } from "../../context/settings";

type Stage = "info" | "play" | "result";

const GameRound = () => {
  const roundService = useInterpret(roundMachine);
  const [state] = useActor(roundService);
  const [stage, setStage] = useState<Stage>("info");

  const { send } = roundService;
  const [settingsState] = useActor(useClassicSettingsService());

  useEffect(() => {
    if (state.context.round > 1) {
      return;
    }
    const teams = settingsState.context.teams.map((item) => ({
      name: item,
      totalScore: 0,
    }));
    send({ type: "SET_TEAMS", value: teams });
  }, []);

  const getStage = (): ReactElement => {
    switch (stage) {
      case "play":
        return (
          <RoundPlay
            handleSubmit={(results) => {
              send({ type: "SET_TEAMS", value: results });
              setStage("result");
            }}
          />
        );
      case "info":
        return <RoundInfo handleSubmit={() => setStage("play")} />;
      case "result":
        return (
          <Results
            handleSubmit={() => {
              send({ type: "NEXT_ROUND" });
              setStage("info");
            }}
          />
        );
    }
  };

  return (
    <RoundContext.Provider value={{ roundService }}>
      {getStage()}
    </RoundContext.Provider>
  );
};

export default GameRound;
