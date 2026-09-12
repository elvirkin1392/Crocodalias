import { Image } from 'expo-image';
import { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  type NativeSyntheticEvent,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  type TextInputSubmitEditingEventData,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import closeIcon from '@/assets/icons/close.svg';
import { useTheme } from '@/theme/useTheme';
import { useThemedStyles } from '@/theme/useThemedStyles';
import { createStyles } from './CouplesSettings.styles';

const MIN_COUPLES = 2;

type CouplesSettingsProps = {
  onSubmit: (captains: string[]) => void;
  onClose: () => void;
};

/** The Hat is played in couples, each named after its captain — names stick, team names don't. */
export function CouplesSettings({ onSubmit, onClose }: CouplesSettingsProps) {
  const { t } = useTranslation();
  const colors = useTheme();
  const listRef = useRef<ScrollView>(null);
  const [captains, setCaptains] = useState<string[]>([]);
  const [draft, setDraft] = useState('');

  const coupleNumber = captains.length + 1;
  const defaultName = t('hat.coupleDefaultName', { number: coupleNumber });
  const typedName = draft.trim();
  const finalCaptains = typedName ? [...captains, typedName] : captains;
  const canStart = finalCaptains.length >= MIN_COUPLES;
  const styles = useThemedStyles(createStyles, { canStart });

  // Reads the field's own text: with fast typing, `draft` from the last
  // render can still lag a few letters behind what was entered.
  const handleAddCouple = (
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => {
    const enteredName = event.nativeEvent.text.trim();

    setCaptains([...captains, enteredName || defaultName]);
    setDraft('');
  };
  const handleStart = () => onSubmit(finalCaptains);
  const handleListSizeChange = () => listRef.current?.scrollToEnd();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>{t('hat.couplesTitle')}</Text>
      <ScrollView
        ref={listRef}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        onContentSizeChange={handleListSizeChange}
      >
        {captains.map((captain, index) => (
          <Text
            key={`${captain}-${index}`}
            style={styles.couple}
          >
            {`${index + 1}. ${captain}`}
          </Text>
        ))}
      </ScrollView>
      <Text style={styles.label}>
        {t('hat.captainLabel', { number: coupleNumber })}
      </Text>
      <TextInput
        style={styles.input}
        value={draft}
        placeholder={defaultName}
        placeholderTextColor={colors.textMuted}
        autoFocus
        autoCapitalize="words"
        autoCorrect={false}
        returnKeyType="next"
        submitBehavior="submit"
        onChangeText={setDraft}
        onSubmitEditing={handleAddCouple}
      />
      <View style={styles.bar}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t('common.close')}
          hitSlop={16}
          onPress={onClose}
        >
          <Image
            source={closeIcon}
            style={styles.close}
            contentFit="contain"
          />
        </Pressable>
        <Pressable
          style={styles.start}
          accessibilityRole="button"
          accessibilityState={{ disabled: !canStart }}
          disabled={!canStart}
          onPress={handleStart}
        >
          <Text style={styles.startText}>{t('hat.start')}</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
