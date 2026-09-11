import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    fontSize: 16,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#b3b3b3',
  },
  stepper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 28,
  },
  step: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e6bc4e',
  },
  stepDisabled: {
    opacity: 0.3,
  },
  stepText: {
    fontSize: 32,
    fontWeight: '600',
  },
  value: {
    minWidth: 120,
    textAlign: 'center',
    fontSize: 72,
    fontVariant: ['tabular-nums'],
    color: '#e6bc4e',
  },
});
