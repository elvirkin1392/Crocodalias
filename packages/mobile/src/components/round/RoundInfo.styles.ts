import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
  },
  round: {
    fontSize: 32,
    color: '#e6bc4e',
  },
  scoreboard: {
    alignSelf: 'stretch',
    marginTop: 40,
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
    marginTop: 40,
    fontSize: 16,
    color: '#b3b3b3',
  },
  ruleHint: {
    marginTop: 16,
    marginHorizontal: 40,
    fontSize: 15,
    textAlign: 'center',
    color: '#666',
  },
});
