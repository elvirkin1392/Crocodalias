import { useState } from "react";
import { useMachine } from "@xstate/react";

import QuitGame from "./QuitGame";
import RoundContent from "./RoundContent";
import CloseIcon from "../../assets/close.svg";
import { timerMachine } from "../../state/timer";
import { Container, Controls } from "../styled/round";

const RoundPlay = ({handleSubmit}) => {
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
      {isStopped ? (
        <QuitGame />
      ) : (
        <RoundContent
          handleFinishRound={handleSubmit}
          timeMachine={{ state, send }}
        />
      )}
    </Container>
  );
};

export default RoundPlay;
