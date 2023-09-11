import { Container, Title, Controls, Footer, Time, Card } from "./styled/round";
import CloseIcon from "../assets/close.svg";

const Round = () => {
  const time = 60;
  return (
    <Container>
      <Controls>
        <button onClick={() => {}}>
          <img src={CloseIcon} alt="" />
        </button>
      </Controls>
      <Title>contestant name</Title>

      <Card />

      <Footer>
        <subtitle>team name</subtitle>
      </Footer>
      <Time>{time}</Time>
    </Container>
  );
};

export default Round;
