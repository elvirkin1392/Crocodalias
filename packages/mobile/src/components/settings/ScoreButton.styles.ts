import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  stars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 14,
  },
  star: {
    width: 24,
    height: 23,
  },
  starRaised: {
    marginBottom: 10,
  },
  value: {
    fontSize: 64,
    fontVariant: ['tabular-nums'],
    color: '#e6bc4e',
  },
  caption: {
    fontSize: 14,
    color: '#b3b3b3',
  },
});
