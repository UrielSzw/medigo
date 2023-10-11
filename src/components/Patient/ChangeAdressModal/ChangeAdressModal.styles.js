import {StyleSheet} from 'react-native';
import {theme} from '../../../theme/theme';

export const styles = StyleSheet.create({
  contentWrapper: {
    justifyContent: 'space-between',
    gap: 20,
  },
  input: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.grey,
    borderRadius: 8,
    paddingLeft: 10,
    fontFamily: 'Poppins-Regular',
    color: theme.colors.black,
  },
});
