import { ReactElement, useEffect, useState } from "react";
import { useActor, useInterpret } from "@xstate/react";

import Results from "./Results";
import RoundInfo from "./RoundInfo";
import RoundPlay from "./RoundPlay";
import Loading from "../Loading";
import { roundMachine } from "../../state/round";
import { RoundContext } from "../../context/round";
import { useClassicSettingsService } from "../../context/settings";
import { loadWords, shuffle } from "../../dictionaries";

type Stage = "info" | "play" | "result";

const GameRound = () => {
  const roundService = useInterpret(roundMachine);
  const [state] = useActor(roundService);
  const [stage, setStage] = useState<Stage>("info");
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    let cancelled = false;

    loadWords(settingsState.context.level)
      .then((words) => {
        if (!cancelled) {
          send({ type: "UPDATE_WORDS", value: shuffle(words) });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("Failed to load words. Check your connection.");
        }
      });

    return () => {
      cancelled = true;
    };
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

  if (error || state.context.words.length === 0) {
    return <Loading error={error ?? undefined} />;
  }

  return (
    <RoundContext.Provider value={{ roundService }}>
      {getStage()}
    </RoundContext.Provider>
  );
};

export default GameRound;
