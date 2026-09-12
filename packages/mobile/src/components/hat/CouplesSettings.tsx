import { Image } from 'expo-image';
import { useEffect, useRef, useState } from 'react';
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
  const inputRef = useRef<TextInput>(null);
  const [captains, setCaptains] = useState<string[]>([]);

  const coupleNumber = captains.length + 1;
  const defaultName = t('hat.coupleDefaultName', { number: coupleNumber });
  const [draft, setDraft] = useState(defaultName);
  const canStart = captains.length >= MIN_COUPLES;
  const styles = useThemedStyles(createStyles, { canStart });

  // The suggested name arrives selected: typing replaces it, Enter or + keeps it.
  useEffect(() => {
    inputRef.current?.setSelection(0, defaultName.length);
  }, [defaultName]);

  const saveCouple = (name: string) => {
    const nextName = t('hat.coupleDefaultName', { number: coupleNumber + 1 });

    setCaptains([...captains, name.trim() || defaultName]);
    setDraft(nextName);
  };

  // Reads the field's own text: with fast typing, `draft` from the last
  // render can still lag a few letters behind what was entered.
  const handleSubmitEditing = (
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => saveCouple(event.nativeEvent.text);
  const handleAddPress = () => saveCouple(draft);
  const handleStart = () => onSubmit(captains);
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
        ref={inputRef}
        style={styles.input}
        value={draft}
        placeholder={defaultName}
        placeholderTextColor={colors.textMuted}
        autoFocus
        selectTextOnFocus
        autoCapitalize="words"
        autoCorrect={false}
        returnKeyType="next"
        submitBehavior="submit"
        onChangeText={setDraft}
        onSubmitEditing={handleSubmitEditing}
      />
      <View style={styles.bar}>
        <Pressable
          style={styles.side}
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
        <Pressable
          style={styles.add}
          accessibilityRole="button"
          accessibilityLabel={t('hat.addCouple')}
          onPress={handleAddPress}
        >
          <Text style={styles.addText}>+</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
