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
  list: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  remove: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f3f3',
  },
  removeText: {
    fontSize: 18,
    lineHeight: 18,
    color: '#666',
  },
  add: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    backgroundColor: '#e6bc4e',
  },
  addText: {
    fontSize: 24,
    lineHeight: 24,
    fontWeight: '600',
  },
});
