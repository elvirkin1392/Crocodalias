import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 24,
    backgroundColor: '#eaf7db',
  },
  note: {
    fontSize: 13,
    color: '#8a9a7a',
  },
  team: {
    marginTop: 12,
    fontSize: 20,
  },
  card: {
    marginTop: 32,
    width: 245,
    height: 360,
    borderRadius: 20,
    borderWidth: 10,
    borderColor: '#68877c',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  word: {
    fontSize: 28,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 32,
  },
  action: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  skip: {
    backgroundColor: '#f3d4d4',
  },
  guess: {
    backgroundColor: '#cfe8bf',
  },
  actionText: {
    fontSize: 16,
  },
});
