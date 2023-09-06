import FooterControls from "../components/FooterControls";
import { Title } from "./styled/SettingsGeneral";
import { useState } from "react";
import { LEVELS } from "../enums/settings";
import VerticalSelect from "../components/VerticalSelect";


const items = [
  { name: "Easy", id: LEVELS.easy },
  { name: "Medium", id: LEVELS.medium },
  { name: "Mature", id: LEVELS.advanced },
  { name: "Pro", id: LEVELS.pro }
];

const SettingsLevel = ({ onSubmit, onClose, title, defaultValue }) => {
  const [level, setLevel] = useState(defaultValue);

  return (
    <div>
      <Title>{title}: Level</Title>
      {defaultValue}

      <VerticalSelect items={items} initialValue={level}/>
      <FooterControls onClose={onClose} onSubmit={() => onSubmit(level)} />
    </div>
  );
};

export default SettingsLevel;
