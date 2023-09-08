import starIcon from "../assets/star.svg";
import {Container} from "./styled/scoreButton";
import Stars from "./Stars";
import DigitalButton from "./DigitalButton";

const ScoreButton = ({ handleClick, value }) => {
  return (
    <Container>
      <Stars>
        <img src={starIcon} style={{ left: "30%" }} />
        <img src={starIcon} style={{ left: "47%", top: '-10px' }} />
        <img src={starIcon} style={{ right: "30%" }} />
      </Stars>

      <DigitalButton onClick={handleClick}>{value}</DigitalButton>
    </Container>
  );
};

export default ScoreButton;