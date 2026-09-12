import { Pressable, ScrollView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { CrocodileContext } from '@/context/crocodile';
import { guessedCount } from '@/state/crocodile';
import { useThemedStyles } from '@/theme/useThemedStyles';
import { createStyles } from './CrocodileResults.styles';
import { ShownWord } from './ShownWord';

type CrocodileResultsProps = {
  onClose: () => void;
};

/** The end of the game: every word acted out, in the order it was shown. */
export function CrocodileResults({ onClose }: CrocodileResultsProps) {
  const { t } = useTranslation();
  const styles = useThemedStyles(createStyles);
  const shownWords = CrocodileContext.useSelector(
    (state) => state.context.shownWords,
  );
  const guessed = CrocodileContext.useSelector((state) =>
    guessedCount(state.context),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('results.finalTitle')}</Text>
      <Text style={styles.summary}>
        {t('crocodile.guessedCount', { guessed, total: shownWords.length })}
      </Text>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.list}
      >
        {shownWords.map((entry, index) => (
          <ShownWord
            key={`${entry.word}-${index}`}
            entry={entry}
          />
        ))}
      </ScrollView>
      <Pressable
        style={styles.button}
        accessibilityRole="button"
        onPress={onClose}
      >
        <Text style={styles.buttonText}>{t('common.done')}</Text>
      </Pressable>
    </View>
  );
}
