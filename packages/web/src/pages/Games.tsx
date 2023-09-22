import { useState } from "react";

import { default as ClassicSettings } from "./ClassicSettings";
import { default as AliasSettings } from "./AliasSettings";
import Carousel from "../components/Carousel";
import { Card } from "./styled/games";

enum games {
  crocodile = "crocodile",
  alias = "alias",
  hat = "hat",
}

const gamesInfo = [
  {
    type: games.crocodile,
    name: "Crocodile",
    image: "",
    getSettingsComponent: (handleClose, name) => (
      <ClassicSettings onClose={() => handleClose("")}>{name}</ClassicSettings>
    ),
  },
  {
    type: games.alias,
    name: "Alias",
    image: "",
    getSettingsComponent: (handleClose, name) => (
      <AliasSettings onClose={() => handleClose("")}>{name}</AliasSettings>
    ),
  },
  {
    type: games.hat,
    name: "The hat",
    image: "",
    getSettingsComponent: (handleClose, name) => (
      <div onClose={() => handleClose("")}>{name}</div>
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
    gameInfo.getSettingsComponent(onSelect, gameInfo.name)
  ) : (
    <Card onClick={() => onSelect(gameInfo.type)}>
      <div>{gameInfo.name}</div>
    </Card>
  );
};

export default Games;
