import FooterControls from "../components/FooterControls";
import { Title } from "./styled/settingsGeneral";
import { useState } from "react";
import { LEVELS } from "../enums/settings";
import VerticalSelect from "../components/VerticalSelect";
import {Container} from "./styled/general";

//TODO use names for levels
const items = [
  { name: "Easy", id: LEVELS.easy },
  { name: "Medium", id: LEVELS.medium },
  { name: "Mature", id: LEVELS.advanced },
  { name: "Pro", id: LEVELS.pro },
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
        handleClose={() =>onSubmit(level)}
      />
      <FooterControls onClose={onClose} onSubmit={() => onSubmit(level)} />
    </Container>
  );
};

export default SettingsLevel;
