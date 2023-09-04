import { useState } from "react";
import Carousel from "../components/Carousel";
import SettingsGeneral from "./SettingsGeneral";
import { Card } from "./styled/Games";

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
    getSettingsComponent: (handleClose) => (
      <SettingsGeneral onClose={() => handleClose("")}>
        Classic: Settings
      </SettingsGeneral>
    ),
  },
  {
    type: games.alias,
    name: "Alias",
    image: "",
    getSettingsComponent: (onClose) => (
      <div onClick={() => onClose("")}>Alias: Settings</div>
    ),
  },
  {
    type: games.hat,
    name: "The hat",
    image: "",
    getSettingsComponent: (onClose) => (
      <div onClick={() => onClose("")}>The hat: Settings</div>
    ),
  },
];

const Games = () => {
  const [selectedGame, setSelectedGame] = useState("");

  const cards = gamesInfo.map((item) => (
    <GameCard
      onSelect={setSelectedGame}
      selectedGame={selectedGame}
      {...item}
    />
  ));

  return <Carousel items={cards} />;
};

const GameCard = ({ onSelect, selectedGame, ...gameInfo }) => {
  return selectedGame === gameInfo.type ? (
    gameInfo.getSettingsComponent(onSelect)
  ) : (
    <Card onClick={() => onSelect(gameInfo.type)}>
      <div>{gameInfo.name}</div>
    </Card>
  );
};

export default Games;
