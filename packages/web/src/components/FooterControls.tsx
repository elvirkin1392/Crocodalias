import { Container, Controls } from "./styled/FooterControls";

const FooterControls = ({ onClose, onSubmit }) => {
  return (
    <Container>
      <Controls>
        <button onClick={() => onSubmit()}>✅</button>
        <button onClick={() => onClose()}>❌</button>
      </Controls>
    </Container>
  );
};

export default FooterControls;
