import { Container } from "./styled/general";
import { Title } from "./styled/settingsGeneral";

type LoadingProps = {
  error?: string;
};

const Loading = ({ error }: LoadingProps) => {
  return (
    <Container>
      <Title>{error ?? "Loading..."}</Title>
    </Container>
  );
};

export default Loading;
