import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import { LevelSettings } from '@/components/settings/LevelSettings';
import { CrocodileSettingsContext } from '@/context/settings';
import { LEVELS } from '@/enums/settings';
import { styles } from './CrocodileSettingsScreen.styles';

export function CrocodileSettingsScreen() {
  const { t } = useTranslation();
  const actor = CrocodileSettingsContext.useActorRef();
  const level = CrocodileSettingsContext.useSelector(
    (state) => state.context.level,
  );

  const handleClose = () => router.back();
  const handleSubmit = (value: LEVELS) => {
    actor.send({ type: 'SUBMIT_LEVEL', value });
    router.push('/crocodile-round');
  };

  return (
    <SafeAreaView style={styles.screen}>
      <LevelSettings
        title={t('crocodile.levelTitle')}
        defaultValue={level}
        onSubmit={handleSubmit}
        onClose={handleClose}
      />
    </SafeAreaView>
  );
}
