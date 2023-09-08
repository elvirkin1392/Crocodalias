import FooterControls from "../components/FooterControls";
import { Title } from "./styled/SettingsGeneral";
import { useState } from "react";
import { LEVELS } from "../enums/settings";
import VerticalSelect from "../components/VerticalSelect";
import {Container} from "./styled/SettingsLevel";

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
    <Container >
      <Title>{title}: Level</Title>
      <VerticalSelect items={items} selectedValue={level} onSelect={(value) => setLevel(value)}/>
      <FooterControls onClose={onClose} onSubmit={() => onSubmit(level)} />
    </Container>
  );
};

export default SettingsLevel;
