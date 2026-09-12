import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { FooterControls } from '@/components/FooterControls';
import { HAT_STAGE_SECONDS, HAT_STAGES } from '@/state/hat';
import { useThemedStyles } from '@/theme/useThemedStyles';
import { createStyles } from './HatStageTimes.styles';

type HatStageTimesProps = {
  onClose: () => void;
};

/** Read-only: the Hat's turn times are set by its rules, one per stage. */
export function HatStageTimes({ onClose }: HatStageTimesProps) {
  const { t } = useTranslation();
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('hat.stageTimesTitle')}</Text>
      {HAT_STAGES.map((stage) => (
        <View
          key={stage}
          style={styles.slot}
        >
          <Text style={styles.value}>
            {t('hat.stageSeconds', { seconds: HAT_STAGE_SECONDS[stage] })}
          </Text>
          <Text style={styles.caption}>{t(`hat.stageName${stage}`)}</Text>
        </View>
      ))}
      <FooterControls
        onClose={onClose}
        onSubmit={onClose}
      />
    </View>
  );
}
