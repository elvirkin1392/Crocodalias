import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
  },
  title: {
    fontSize: 20,
    textTransform: 'uppercase',
    color: '#b3b3b3',
  },
  scroll: {
    flexGrow: 1,
    alignSelf: 'stretch',
  },
  list: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    alignSelf: 'stretch',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
  },
  winnerRow: {
    backgroundColor: '#e6bc4e',
  },
  name: {
    fontSize: 20,
  },
  score: {
    fontSize: 28,
  },
  winnerText: {
    fontWeight: '700',
  },
  button: {
    marginBottom: 40,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 14,
    backgroundColor: '#e6bc4e',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
});
