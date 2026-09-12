import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import closeIcon from '@/assets/icons/close.svg';
import { ExternalLink } from '@/components/ExternalLink';
import { WORD_CREDITS } from '@/dictionaries/credits';
import { useThemedStyles } from '@/theme/useThemedStyles';
import { createStyles } from './AboutScreen.styles';

export function AboutScreen() {
  const { t } = useTranslation();
  const styles = useThemedStyles(createStyles);

  const handleClose = () => router.back();

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t('common.close')}
          hitSlop={16}
          onPress={handleClose}
        >
          <Image
            source={closeIcon}
            style={styles.close}
            contentFit="contain"
          />
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{t('about.title')}</Text>

        <Text style={styles.sectionTitle}>{t('about.wordsTitle')}</Text>
        <Text style={styles.text}>{t('about.wordsText')}</Text>
        {WORD_CREDITS.sources.map((source) => (
          <ExternalLink
            key={source.url}
            label={source.name}
            url={source.url}
          />
        ))}
        <Text style={styles.text}>{t('about.licenseText')}</Text>
        <ExternalLink
          label={WORD_CREDITS.license.name}
          url={WORD_CREDITS.license.url}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
