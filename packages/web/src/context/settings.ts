import { createContext, useContext } from "react";
import type { InterpreterFrom } from "xstate";

import { classicSettingsMachine } from "../state/classicSettings";
import { aliasSettingsMachine } from "../state/aliasSettings";

export type ClassicSettingsService = InterpreterFrom<
  typeof classicSettingsMachine
>;
export type AliasSettingsService = InterpreterFrom<typeof aliasSettingsMachine>;

export const ClassicSettingsContext =
  createContext<{ classicSettingsService: ClassicSettingsService } | null>(null);

export const AliasSettingsContext =
  createContext<{ aliasSettingsService: AliasSettingsService } | null>(null);

export function useClassicSettingsService(): ClassicSettingsService {
  const context = useContext(ClassicSettingsContext);

  if (!context) {
    throw new Error(
      "useClassicSettingsService must be used within a ClassicSettingsContext.Provider"
    );
  }

  return context.classicSettingsService;
}

export function useAliasSettingsService(): AliasSettingsService {
  const context = useContext(AliasSettingsContext);

  if (!context) {
    throw new Error(
      "useAliasSettingsService must be used within an AliasSettingsContext.Provider"
    );
  }

  return context.aliasSettingsService;
}
