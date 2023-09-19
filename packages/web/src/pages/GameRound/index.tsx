import { useState } from "react";
import { useMachine } from "@xstate/react";
import { Routes, Route, useParams } from "react-router-dom";

import {Container, Controls, TeamName, RoundTitle, TeamScore, Container2} from "../styled/round";
import { timerMachine } from "../../state/timer";
import CloseIcon from "../../assets/close.svg";
import Content from "./Content";
import Quit from "./Quit";
import FooterControls from "../../components/FooterControls";

const GameRound = () => {
  const { id } = useParams();
  const [state, send] = useMachine(timerMachine);
  const [isStopped, stop] = useState(false);
  const [started, setStarted] = useState(false);

  return id > 1 && !started ? (
    <Container2 >
      <TeamScore>32</TeamScore>
      <TeamName>Team name 1 </TeamName>
      <RoundTitle>Round {id}</RoundTitle>
      <TeamName>Team name 2</TeamName>
      <TeamScore>24</TeamScore>
      <FooterControls
        onClose={() => {}}
        onSubmit={() => {
          setStarted(true);
        }}
      />
    </Container2>
  ) : (
    <Container>
      <Controls>
        <button
          onClick={() => {
            send("PAUSE");
            stop(!isStopped);
          }}
        >
          <img src={CloseIcon} alt="close" />
        </button>
      </Controls>{" "}
      {isStopped ? <Quit /> : <Content machine={{ state, send }} />}
    </Container>
  );
};

export default GameRound;
