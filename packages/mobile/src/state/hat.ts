import { assign, setup } from 'xstate';

import { shuffle } from '../dictionaries';
import type { Team } from './team';

export type { Team } from './team';

export type HatWordResult = 'guessed' | 'skipped';

export type HatTurnEntry = { word: string; result: HatWordResult };

/** Stage 1 — describe in words, stage 2 — one word, stage 3 — mime only. */
export type HatStage = 1 | 2 | 3;

export type HatContext = {
  teams: Team[];
  /** The fixed words drawn for this game; the same set is reused every stage. */
  wordPool: string[];
  /** Words left to guess in the current stage; skipped words move to the back. */
  queue: string[];
  stage: HatStage;
  /** Words resolved during the current turn, in order. */
  turnLog: HatTurnEntry[];
  /** Total turns played; the playing team is derived from it. */
  turn: number;
};

export type HatEvent =
  | { type: 'UPDATE_WORDS'; value: string[] }
  | { type: 'SET_TEAMS'; value: Team[] }
  | { type: 'RESOLVE_WORD'; result: HatWordResult }
  | { type: 'NEXT_TURN' };

/** Index of the team playing now. Safe before any team is set. */
export function currentTeamIndex({ teams, turn }: HatContext): number {
  return teams.length === 0 ? 0 : turn % teams.length;
}

export function currentWord({ queue }: HatContext): string {
  return queue[0] ?? '';
}

export function turnPoints({ turnLog }: HatContext): number {
  return turnLog.filter((entry) => entry.result === 'guessed').length;
}

export function isStageComplete({ queue }: HatContext): boolean {
  return queue.length === 0;
}

export function isGameComplete({ stage, queue }: HatContext): boolean {
  return stage === 3 && queue.length === 0;
}

function addPoints(teams: Team[], teamIndex: number): Team[] {
  return teams.map((team, index) =>
    index === teamIndex ? { ...team, totalScore: team.totalScore + 1 } : team,
  );
}

export const hatMachine = setup({
  types: {
    context: {} as HatContext,
    events: {} as HatEvent,
  },
}).createMachine({
  id: 'hat',
  initial: 'game',
  context: {
    teams: [],
    wordPool: [],
    queue: [],
    stage: 1,
    turnLog: [],
    turn: 0,
  },
  states: {
    game: {
      on: {
        UPDATE_WORDS: {
          actions: assign({
            wordPool: ({ event }) => event.value,
            queue: ({ event }) => shuffle(event.value),
            stage: 1,
          }),
        },
        SET_TEAMS: {
          actions: assign({ teams: ({ event }) => event.value }),
        },
        RESOLVE_WORD: {
          actions: assign(({ context, event }) => {
            const [word, ...rest] = context.queue;
            const entry = { word, result: event.result };
            const turnLog = [...context.turnLog, entry];

            if (event.result === 'skipped') {
              return { queue: [...rest, word], turnLog };
            }

            const teamIndex = currentTeamIndex(context);
            const teams = addPoints(context.teams, teamIndex);

            if (rest.length > 0 || context.stage === 3) {
              return { queue: rest, teams, turnLog };
            }

            return {
              queue: shuffle(context.wordPool),
              stage: (context.stage + 1) as HatStage,
              teams,
              turnLog,
            };
          }),
        },
        NEXT_TURN: {
          actions: assign(({ context }) => ({
            turn: context.turn + 1,
            turnLog: [],
          })),
        },
      },
    },
  },
});
