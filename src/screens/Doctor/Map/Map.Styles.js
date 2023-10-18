import {StyleSheet} from 'react-native';
import {theme} from '../../../theme/theme';

export const styles = StyleSheet.create({
  principalButton: {
    marginBottom: 15,
    width: 279,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  footer: {
    borderTopWidth: 1,
    borderColor: theme.colors.grey,
    pointerEvents: 'none',
  },
  confirmLocation: {
    position: 'absolute',
    top: 35,
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 8,
    zIndex: 10,
    backgroundColor: theme.colors.grey,
  },
});
