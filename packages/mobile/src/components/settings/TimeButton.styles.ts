import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  clock: {
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 16,
  },
  icon: {
    ...StyleSheet.absoluteFill,
  },
  value: {
    fontSize: 44,
    fontVariant: ['tabular-nums'],
    color: '#e6bc4e',
  },
  caption: {
    fontSize: 14,
    color: '#b3b3b3',
  },
});
