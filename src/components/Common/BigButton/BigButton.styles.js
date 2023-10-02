import {StyleSheet} from 'react-native';
import {theme} from '../../../theme/theme';

export const styles = StyleSheet.create({
  wrapper: {
    width: 140,
    height: 140,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    paddingTop: 10,
    borderColor: theme.colors.blue,
  },
  doctor: {
    backgroundColor: theme.colors.white,
  },
  patient: {
    backgroundColor: theme.colors.blue,
  },
});
