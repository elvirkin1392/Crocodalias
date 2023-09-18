import { useState } from "react";
import { useMachine } from "@xstate/react";
import { useNavigate } from "react-router-dom";

import { Container, Title, Controls, Footer } from "../styled/round";
import { timerMachine } from "../../state/timer";
import CloseIcon from "../../assets/close.svg";
import { Timer } from "./Timer";
import Cards from "./Cards";

const Round = () => {
  const [state, send] = useMachine(timerMachine);

  const [score, setScore] = useState(0);
  const [competitorScore, setCompetitorScore] = useState(0);

  const navigate = useNavigate();
  const { isPaused, elapsed, duration } = state.context;
  const isTimerUp = elapsed > duration;
  return (
    <Container>
      <Controls>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={CloseIcon} alt="" />
        </button>
      </Controls>
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
    </Container>
  );
};

export default Round;
