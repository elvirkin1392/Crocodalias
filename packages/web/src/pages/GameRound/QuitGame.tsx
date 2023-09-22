import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Button = styled.div`
  height: 218px;
  justify-content: center;
  display: flex;

  button {
    align-self: center;
    background: #e6bc4e;
    border-radius: 50%;

    height: 180px;
    width: 180px;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 85vh;
`;

const QuitGame = () => {
  const navigate = useNavigate();
  const handleQuit = (isToBeContinued) => {
    navigate("/");
  };
  return (
    <Container>
      <Button>
        <button onClick={handleQuit}>Finish the game</button>
      </Button>
      <Button>
        <button onClick={() => handleQuit(true)}>Continue later </button>
      </Button>
    </Container>
  );
};

export default QuitGame;
