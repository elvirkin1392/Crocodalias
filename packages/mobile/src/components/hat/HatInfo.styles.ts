import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  stage: {
    fontSize: 28,
    color: '#e6bc4e',
  },
  stageRule: {
    marginTop: 8,
    marginHorizontal: 40,
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  scoreboard: {
    alignSelf: 'stretch',
    marginTop: 32,
    paddingHorizontal: 40,
    gap: 16,
  },
  team: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  name: {
    fontSize: 20,
    color: '#666',
  },
  playing: {
    color: '#000',
    fontWeight: '600',
  },
  score: {
    fontSize: 32,
  },
  caption: {
    marginTop: 32,
    fontSize: 16,
    color: '#b3b3b3',
  },
  wordsLeft: {
    marginTop: 8,
    fontSize: 14,
    color: '#b3b3b3',
  },
});
