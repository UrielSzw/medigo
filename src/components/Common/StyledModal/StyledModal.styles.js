import {StyleSheet} from 'react-native';
import {theme} from '../../../theme/theme';

export const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(52, 52, 52, 0.6)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    backgroundColor: theme.colors.white,
    minHeight: 150,
    width: '80%',
    borderRadius: 8,
  },
  header: {
    backgroundColor: theme.colors.blue,
    borderTopEndRadius: 8,
    borderTopStartRadius: 8,
    alignItems: 'center',
    padding: 3,
  },
  body: {
    padding: 15,
  },
  defaultText: {
    marginBottom: 40,
  },
});
