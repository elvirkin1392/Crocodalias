import timeIcon from "../assets/time.svg";
import {Container, Image} from "./styled/timeButton";
import DigitalButton from "./DigitalButton";

const TimeButton = ({handleClick, value}) => {
  return (
    <Container>
      <DigitalButton onClick={handleClick}>{value}</DigitalButton>
      <Image src={timeIcon}/>
    </Container>
  );
};

export default TimeButton;