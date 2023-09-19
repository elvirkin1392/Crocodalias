import React, {useState} from 'react';
import {Footer, Title} from "../styled/round";
import Cards from "./Cards";
import {Timer} from "./Timer";

const Content = ({machine}) => {
  const {state, send} = machine;
  const [score, setScore] = useState(0);
  const [competitorScore, setCompetitorScore] = useState(0);

  const { isPaused, elapsed, duration } = state.context;
  const isTimerUp = elapsed > duration;
  return (
    <>
      <Title style={{ color: isTimerUp && "#000" }}>
        competitor name {competitorScore}
      </Title>
      <Cards
        setCompetitorScore={setCompetitorScore}
        competitorScore={competitorScore}
        setScore={setScore}
        isPaused={isPaused}
        score={score}
        handlePlay={() => {
          send("START");
        }}
        isTimerUp={isTimerUp}
      />
      <Footer>
        <div>team name {score}</div>
      </Footer>
      <Timer
        value={state.context}
        onStart={() => send("START")}
        onPause={() => send("PAUSE")}
      />
    </>
  );
};

export default Content;