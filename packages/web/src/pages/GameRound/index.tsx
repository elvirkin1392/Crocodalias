import { useState } from "react";
import { useMachine } from "@xstate/react";

import { Container, Controls } from "../styled/round";
import { timerMachine } from "../../state/timer";
import CloseIcon from "../../assets/close.svg";
import Content from "./Content";
import Quit from "./Quit";

const GameRound = () => {
  const [state, send] = useMachine(timerMachine);
  const [isStopped, stop] = useState(false);

  return (
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
      </Controls>

      {isStopped ? <Quit/> : <Content machine={{ state, send }} />}
    </Container>
  );
};

export default GameRound;
