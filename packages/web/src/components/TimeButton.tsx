import TimeIcon from "../assets/time.svg";
import { Container, Image } from "./styled/timeButton";
import DigitalButton from "./DigitalButton";

type TimeButtonProps = {
  handleClick: () => void;
  value: number;
};

const TimeButton = ({ handleClick, value }: TimeButtonProps) => {
  return (
    <Container>
      <DigitalButton style={{ marginTop: "35px" }} onClick={handleClick}>
        {value}
      </DigitalButton>
      <Image src={TimeIcon} />
    </Container>
  );
};

export default TimeButton;
