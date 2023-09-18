import { useState } from "react";

import FooterControls from "../../components/FooterControls";
import VerticalSelect from "../../components/VerticalSelect";
import { Title } from "../styled/settingsGeneral";
import { LEVELS } from "../../enums/settings";
import { Container } from "../styled/general";

//TODO use names for levels
const items = [
  { name: "easy", id: LEVELS.easy },
  { name: "medium", id: LEVELS.medium },
  { name: "mature", id: LEVELS.advanced },
  { name: "pro", id: LEVELS.pro },
];

const SettingsLevel = ({ onSubmit, onClose, title, defaultValue }) => {
  const [level, setLevel] = useState(defaultValue);

  return (
    <Container style={{ background: "#f3dda6" }}>
      <Title>{title}: Level</Title>
      <VerticalSelect
        items={items}
        selectedValue={level}
        handleSelect={(value) => setLevel(value)}
        handleClose={() => onSubmit(level)}
      />
      <FooterControls onClose={onClose} onSubmit={() => onSubmit(level)} />
    </Container>
  );
};

export default SettingsLevel;
