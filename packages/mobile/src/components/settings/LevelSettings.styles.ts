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
  options: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  option: {
    minWidth: 220,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 14,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  optionSelected: {
    backgroundColor: '#e6bc4e',
  },
  optionText: {
    fontSize: 20,
    fontWeight: '600',
  },
});
