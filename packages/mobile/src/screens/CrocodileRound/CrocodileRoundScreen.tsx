import { useTranslation } from 'react-i18next';

import { RoundScreen } from '@/screens/Round/RoundScreen';
import { CrocodileSettingsContext } from '@/context/settings';

/** Crocodile: explain the word using only gestures, no talking or sounds. */
export function CrocodileRoundScreen() {
  const { t } = useTranslation();
  const level = CrocodileSettingsContext.useSelector(
    (state) => state.context.level,
  );
  const teamNames = CrocodileSettingsContext.useSelector(
    (state) => state.context.teams,
  );
  const scoreLimit = CrocodileSettingsContext.useSelector(
    (state) => state.context.score,
  );
  const roundTime = CrocodileSettingsContext.useSelector(
    (state) => state.context.time,
  );

  return (
    <RoundScreen
      level={level}
      teamNames={teamNames}
      scoreLimit={scoreLimit}
      roundTime={roundTime}
      allowSteal={false}
      ruleHint={t('crocodile.ruleHint')}
    />
  );
}
