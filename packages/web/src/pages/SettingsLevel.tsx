import FooterControls from "../components/FooterControls";

const SettingsLevel = ({ onSubmit, onClose }) => {
  return (
    <div>
      <FooterControls onClose={onClose} onSubmit={() => onSubmit()} />
    </div>
  );
};

export default SettingsLevel;
