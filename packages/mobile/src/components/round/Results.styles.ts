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
  },
  score: {
    fontSize: 56,
    marginTop: 16,
  },
  name: {
    fontSize: 20,
  },
  opponent: {
    color: '#d64545',
  },
  words: {
    flex: 1,
    alignSelf: 'stretch',
    marginVertical: 16,
  },
  wordsContent: {
    paddingHorizontal: 40,
    gap: 10,
  },
  wordRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wordText: {
    fontSize: 18,
  },
  stolenText: {
    color: '#d64545',
  },
});
