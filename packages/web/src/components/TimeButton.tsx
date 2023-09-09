import TimeIcon from "../assets/time.svg";
import {Container, Image} from "./styled/timeButton";
import DigitalButton from "./DigitalButton";

const TimeButton = ({handleClick, value}) => {
  return (
    <Container>
      <DigitalButton style={{marginTop: "35px"}}onClick={handleClick}>{value}</DigitalButton>
      <Image src={TimeIcon}/>
    </Container>
  );
};

export default TimeButton;