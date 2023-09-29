import {StyleSheet} from 'react-native';
import {theme} from '../../../theme/theme';

export const styles = StyleSheet.create({
  wrapper: {
    width: '90%',
    borderBottomWidth: 1,
    borderColor: theme.colors.lightGrey,
    padding: 10,
    paddingLeft: 0,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionText: {
    flexDirection: 'row',
    gap: 10,
  },
});
