import { Container, Controls } from "./styled/footerControls";
import OkayIcon from "../assets/okay.svg";
import CloseIcon from "../assets/close.svg";

const FooterControls = ({ onClose, onSubmit }) => {
  return (
    <Container>
      <Controls>
        <button style={{ right: "20px" }} onClick={() => onSubmit()}>
          <img style={{ height: "14px" }} src={OkayIcon} alt="" />
        </button>
        <button style={{ left: "20px" }} onClick={() => onClose()}>
          <img style={{ height: "14px" }} src={CloseIcon} alt="" />
        </button>
      </Controls>
    </Container>
  );
};

export default FooterControls;
