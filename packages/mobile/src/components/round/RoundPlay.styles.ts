import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#eaf7db',
  },
  header: {
    alignSelf: 'stretch',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  closeIcon: {
    width: 14,
    height: 14,
    opacity: 0.3,
  },
  opponent: {
    fontSize: 20,
    color: '#b3b3b3',
  },
  opponentCanSteal: {
    color: '#000',
  },
  cardArea: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  showTime: {
    alignItems: 'center',
    gap: 16,
  },
  showTimeText: {
    fontSize: 44,
  },
  footer: {
    alignSelf: 'stretch',
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  team: {
    fontSize: 20,
  },
  timer: {
    position: 'absolute',
    right: 24,
    bottom: 4,
  },
});
