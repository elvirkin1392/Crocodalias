import { useNavigate } from "react-router-dom";

import {
  Container,
  Title,
  Controls,
  Footer,
  CardBack,
  CardFace,
} from "./styled/round";
import CloseIcon from "../assets/close.svg";
import { Timer } from "./Timer";
import { useMachine } from "@xstate/react";
import { timerMachine } from "../state/timer";

const Round = () => {
  const navigate = useNavigate();
  const [state, send] = useMachine(timerMachine);
  const { isPaused } = state.context;

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
      <Title>contestant name</Title>

      <CardBack onClick={() => send("START")}>
        {!isPaused && <CardFace>text</CardFace>}
      </CardBack>

      <Footer>
        <div>team name</div>
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
