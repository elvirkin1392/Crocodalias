import { createContext, useContext } from "react";
import type { InterpreterFrom } from "xstate";

import { roundMachine } from "../state/round";

export type RoundService = InterpreterFrom<typeof roundMachine>;

export const RoundContext = createContext<{
  roundService: RoundService;
} | null>(null);

export function useRoundService(): RoundService {
  const context = useContext(RoundContext);

  if (!context) {
    throw new Error(
      "useRoundService must be used within a RoundContext.Provider"
    );
  }

  return context.roundService;
}
