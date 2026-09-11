import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    padding: 24,
  },
  card: {
    flex: 1,
    gap: 16,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e6bc4e',
  },
  cardDisabled: {
    backgroundColor: '#e4e4e4',
  },
  name: {
    fontSize: 36,
    fontWeight: '700',
  },
  soon: {
    overflow: 'hidden',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    backgroundColor: '#fff',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingBottom: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
  },
  dotActive: {
    backgroundColor: '#333',
  },
});
