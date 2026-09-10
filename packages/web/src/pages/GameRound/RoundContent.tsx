import { useEffect, useState } from "react";
import { useActor } from "@xstate/react";
import type { InterpreterFrom, StateFrom } from "xstate";

import { useClassicSettingsService } from "../../context/settings";
import { useRoundService } from "../../context/round";
import { Footer, Title } from "../styled/round";
import ContentCards from "./ContentCards";
import { Timer } from "./Timer";
import { timerMachine } from "../../state/timer";
import type { Team } from "../../state/round";

export type TimeMachine = {
  state: StateFrom<typeof timerMachine>;
  send: InterpreterFrom<typeof timerMachine>["send"];
};

type RoundContentProps = {
  timeMachine: TimeMachine;
  handleFinishRound: (results: Team[]) => void;
};

const RoundContent = ({
  timeMachine,
  handleFinishRound,
}: RoundContentProps) => {
  const { state: stateTime, send: sendTime } = timeMachine;
  const [score, setScore] = useState(0);
  const [competitorScore, setCompetitorScore] = useState(0);

  const [settingsState] = useActor(useClassicSettingsService());
  const [state] = useActor(useRoundService());
  const { teams, turn, words } = state.context;

  useEffect(() => {
    sendTime("DURATION.UPDATE", { value: settingsState.context.time });
  }, []);

  const { isPaused, elapsed, duration } = stateTime.context;
  const isTimerUp = elapsed > duration;

  return (
    <>
      <Title style={{ color: isTimerUp ? "#000" : undefined }}>
        {teams[(turn + 1) % (teams.length + 1)].name} {competitorScore}
      </Title>
      <ContentCards
        words={words}
        setCompetitorScore={setCompetitorScore}
        competitorScore={competitorScore}
        setScore={setScore}
        isPaused={isPaused}
        score={score}
        handlePlay={() => {
          sendTime("START");
        }}
        isTimerUp={isTimerUp}
        handleFinishRound={() => {
          //TODO run after state has been update or another solution
          const results: Team[] = [];
          results[turn % (teams.length + 1)] = {
            name: teams[turn % (teams.length + 1)].name,
            totalScore: score,
          };
          results[(turn + 1) % (teams.length + 1)] = {
            name: teams[(turn + 1) % (teams.length + 1)].name,
            totalScore: competitorScore,
          };

          handleFinishRound(results);
        }}
      />
      <Footer>
        <div>
          {teams[turn % (teams.length + 1)].name} {score}
        </div>
      </Footer>
      <Timer
        value={stateTime.context}
        onStart={() => sendTime("START")}
        onPause={() => sendTime("PAUSE")}
      />
    </>
  );
};

export default RoundContent;
