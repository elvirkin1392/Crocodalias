import { StyleSheet } from 'react-native';

export const THUMB_SIZE = 28;

export const styles = StyleSheet.create({
  touchArea: {
    flex: 1,
    width: 60,
    alignItems: 'center',
  },
  track: {
    flex: 1,
    width: 8,
    borderRadius: 4,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    backgroundColor: '#eee',
  },
  fill: {
    width: '100%',
    borderRadius: 4,
    backgroundColor: '#e6bc4e',
  },
  thumb: {
    position: 'absolute',
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    borderWidth: 3,
    borderColor: '#fff',
    backgroundColor: '#e6bc4e',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
});
