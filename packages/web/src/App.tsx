import {useInterpret} from "@xstate/react";

import {
  AliasSettingsContext,
  ClassicSettingsContext,
} from "./context/settings";
import {classicSettingsMachine} from "./state/classicSettings";
import {aliasSettingsMachine} from "./state/aliasSettings";
import Routing from "./routing/index";
import "./App.css";

function App() {
  const classicSettingsService = useInterpret(classicSettingsMachine);
  const aliasSettingsService = useInterpret(aliasSettingsMachine);

  return (
    <ClassicSettingsContext.Provider value={{ classicSettingsService }}>
      <AliasSettingsContext.Provider value={{ aliasSettingsService }}>
        <Routing />
      </AliasSettingsContext.Provider>
    </ClassicSettingsContext.Provider>
  );
}

export default App;
