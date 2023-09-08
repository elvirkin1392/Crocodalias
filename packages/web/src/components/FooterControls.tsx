import { Container, Controls } from "./styled/footerControls";

const FooterControls = ({ onClose, onSubmit }) => {
  return (
    <Container>
      <Controls>
        <button style={{right: '20px'}} onClick={() => onSubmit()}>✅</button>
        <button style={{left: '20px'}} onClick={() => onClose()}>❌</button>
      </Controls>
    </Container>
  );
};

export default FooterControls;
