import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { FooterControls } from '@/components/FooterControls';
import { LevelButton } from '@/components/settings/LevelButton';
import { LevelSettings } from '@/components/settings/LevelSettings';
import { ScoreButton } from '@/components/settings/ScoreButton';
import { ScoreSettings } from '@/components/settings/ScoreSettings';
import { TeamsSettings } from '@/components/settings/TeamsSettings';
import { TimeButton } from '@/components/settings/TimeButton';
import { TimeSettings } from '@/components/settings/TimeSettings';
import { type GameId } from '@/components/home/games';
import { LEVELS } from '@/enums/settings';
import { useThemedStyles } from '@/theme/useThemedStyles';
import { createStyles } from './GameSettingsView.styles';

type SettingsStage = 'overview' | 'score' | 'level' | 'time' | 'teams';

type GameSettingsViewProps = {
  gameId: GameId;
  stage: SettingsStage;
  score: number;
  level: LEVELS;
  time: number;
  teams: string[];
  onOpenScore: () => void;
  onOpenLevel: () => void;
  onOpenTime: () => void;
  onOpenTeams: () => void;
  onSubmitScore: (value: number) => void;
  onSubmitLevel: (value: LEVELS) => void;
  onSubmitTime: (value: number) => void;
  onSubmitTeams: (value: string[]) => void;
  onBack: () => void;
  onClose: () => void;
};

export function GameSettingsView({
  gameId,
  stage,
  score,
  level,
  time,
  teams,
  onOpenScore,
  onOpenLevel,
  onOpenTime,
  onOpenTeams,
  onSubmitScore,
  onSubmitLevel,
  onSubmitTime,
  onSubmitTeams,
  onBack,
  onClose,
}: GameSettingsViewProps) {
  const { t } = useTranslation();
  const styles = useThemedStyles(createStyles);

  if (stage === 'score') {
    return (
      <ScoreSettings
        title={t('settings.score')}
        defaultValue={score}
        onSubmit={onSubmitScore}
        onClose={onBack}
      />
    );
  }

  if (stage === 'level') {
    return (
      <LevelSettings
        title={t('settings.level')}
        defaultValue={level}
        onSubmit={onSubmitLevel}
        onClose={onBack}
      />
    );
  }

  if (stage === 'time') {
    return (
      <TimeSettings
        title={t('settings.time')}
        defaultValue={time}
        onSubmit={onSubmitTime}
        onClose={onBack}
      />
    );
  }

  if (stage === 'teams') {
    return (
      <TeamsSettings
        title={t('settings.teams')}
        defaultValue={teams}
        onSubmit={onSubmitTeams}
        onClose={onBack}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {t('settings.title', { game: t(`games.${gameId}`) })}
      </Text>
      <View style={styles.slot}>
        <ScoreButton
          value={score}
          onPress={onOpenScore}
        />
      </View>
      <View style={styles.slot}>
        <LevelButton
          value={level}
          onPress={onOpenLevel}
        />
      </View>
      <View style={styles.slot}>
        <TimeButton
          value={time}
          onPress={onOpenTime}
        />
      </View>
      <FooterControls
        onClose={onClose}
        onSubmit={onOpenTeams}
      />
    </View>
  );
}
