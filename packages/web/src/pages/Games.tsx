import { useState } from "react";
import { useInterpret } from "@xstate/react";

import { default as ClassicSettings } from "./classicSettings/SettingsGeneral";
import { default as AliasSettings } from "./aliasSettings/SettingsGeneral";
import {
  AliasSettingsContext,
  ClassicSettingsContext,
} from "../context/settings";
import { classicSettingsMachine } from "../state/classicSettings";
import { aliasSettingsMachine } from "../state/aliasSettings";
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
  const classicSettingsService = useInterpret(classicSettingsMachine);
  const aliasSettingsService = useInterpret(aliasSettingsMachine);

  const cards = gamesInfo.map((item) => (
    <GameCard
      onSelect={setSelectedGame}
      selectedGame={selectedGame}
      {...item}
    />
  ));

  return (
    <ClassicSettingsContext.Provider value={{ classicSettingsService }}>
      <AliasSettingsContext.Provider value={{ aliasSettingsService }}>
        <Carousel items={cards} />
      </AliasSettingsContext.Provider>
    </ClassicSettingsContext.Provider>
  );
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
