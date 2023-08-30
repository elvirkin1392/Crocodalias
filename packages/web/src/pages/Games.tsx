import { useState} from "react";

enum games {
  classic = "classic",
  alias = "alias",
  hat = "hat",
}

const gamesInfo = [
  {
    type: games.classic,
    name: "Classic",
    image: "",
    getSettingsComponent: (onClose) => (
      <div onClick={() => onClose("")}>Classic Settings</div>
    ),
  },
  {
    type: games.alias,
    name: "Alias",
    image: "",
    getSettingsComponent: (onClose) => (
      <div onClick={() => onClose("")}>Alias Settings</div>
    ),
  },
  {
    type: games.hat,
    name: "The hat",
    image: "",
    getSettingsComponent: (onClose) => (
      <div onClick={() => onClose("")}>The hat Settings</div>
    ),
  },
];

const Games = () => {
  const [selectedGame, setSelectedGame] = useState("");

  return gamesInfo.map((item) => (
    <GameCard
      onSelect={setSelectedGame}
      selectedGame={selectedGame}
      {...item}
    />
  ));
};

const GameCard = ({ onSelect, selectedGame, ...gameInfo }) => {
  return selectedGame === gameInfo.type ? (
    gameInfo.getSettingsComponent(onSelect)
  ) : (
    <div onClick={() => onSelect(gameInfo.type)}>{gameInfo.name}</div>
  );
};
export default Games;
