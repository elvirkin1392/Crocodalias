import { RoundScreen } from '@/screens/Round/RoundScreen';
import { AliasSettingsContext } from '@/context/settings';

/** Alias: explain the word with any words except the word itself. */
export function AliasRoundScreen() {
  const level = AliasSettingsContext.useSelector(
    (state) => state.context.level,
  );
  const teamNames = AliasSettingsContext.useSelector(
    (state) => state.context.teams,
  );
  const scoreLimit = AliasSettingsContext.useSelector(
    (state) => state.context.score,
  );
  const roundTime = AliasSettingsContext.useSelector(
    (state) => state.context.time,
  );

  return (
    <RoundScreen
      level={level}
      teamNames={teamNames}
      scoreLimit={scoreLimit}
      roundTime={roundTime}
      allowSteal
    />
  );
}
