import {StyleSheet} from 'react-native';
import {theme} from '../../../theme/theme';

export const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    width: '100%',
    paddingBottom: 16,
    paddingTop: 16,
    alignItems: 'center',
    borderWidth: 1,
  },
  primary: {
    backgroundColor: theme.colors.blue,
    borderColor: theme.colors.blue,
  },
  secondary: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.blue,
  },
  empty: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  warning: {
    backgroundColor: theme.colors.red,
    borderColor: theme.colors.red,
  },
});
