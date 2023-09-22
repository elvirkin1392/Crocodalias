import { useContext, useEffect, useState } from "react";
import { useActor } from "@xstate/react";

import { ClassicSettingsContext } from "../../context/settings";
import { RoundContext } from "../../context/round";
import { Footer, Title } from "../styled/round";
import ContentCards from "./ContentCards";
import { Timer } from "./Timer";

const RoundContent = ({ timeMachine, handleFinishRound }) => {
  const { state: stateTime, send: sendTime } = timeMachine;
  const [score, setScore] = useState(0);
  const [competitorScore, setCompetitorScore] = useState(0);

  const cSContext = useContext(ClassicSettingsContext);
  const [settingsState] = useActor(cSContext.classicSettingsService);

  const roundContext = useContext(RoundContext);
  const [state] = useActor(roundContext.roundService);
  const { teams, words, turn } = state.context;

  useEffect(() => {
    sendTime("DURATION.UPDATE", { value: settingsState.context.time });
  }, []);

  const { isPaused, elapsed, duration } = stateTime.context;
  const isTimerUp = elapsed > duration;

  return (
    <>
      <Title style={{ color: isTimerUp && "#000" }}>
        {teams[(turn + 1) % (teams.length + 1)].name} {competitorScore}
      </Title>
      <ContentCards
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
          const results = [];
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
