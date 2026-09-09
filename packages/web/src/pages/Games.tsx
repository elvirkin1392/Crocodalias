import { ReactElement, useState } from "react";

import { default as ClassicSettings } from "./ClassicSettings";
import { default as AliasSettings } from "./AliasSettings";
import Carousel from "../components/Carousel";
import { Card } from "./styled/games";

enum games {
  crocodile = "crocodile",
  alias = "alias",
  hat = "hat",
}

type SelectGame = (game: games | "") => void;

type GameInfo = {
  type: games;
  name: string;
  image: string;
  getSettingsComponent: (handleClose: SelectGame, name: string) => ReactElement;
};

const gamesInfo: GameInfo[] = [
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
    getSettingsComponent: (_handleClose, name) => <div>{name}</div>,
  },
];

const Games = () => {
  const [selectedGame, setSelectedGame] = useState<games | "">("");

  const cards = gamesInfo.map((item) => (
    <GameCard
      key={item.type}
      onSelect={setSelectedGame}
      selectedGame={selectedGame}
      {...item}
    />
  ));

  return <Carousel items={cards} />;
};

type GameCardProps = GameInfo & {
  onSelect: SelectGame;
  selectedGame: games | "";
};

const GameCard = ({ onSelect, selectedGame, ...gameInfo }: GameCardProps) => {
  return selectedGame === gameInfo.type ? (
    gameInfo.getSettingsComponent(onSelect, gameInfo.name)
  ) : (
    <Card onClick={() => onSelect(gameInfo.type)}>
      <div>{gameInfo.name}</div>
    </Card>
  );
};

export default Games;
