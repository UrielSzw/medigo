import {StyleSheet} from 'react-native';
import {theme} from '../../../theme/theme';

export const styles = StyleSheet.create({
  DropdownWrapper: {
    borderWidth: 1,
    borderColor: theme.colors.grey,
    borderRadius: 5,
  },
  DropdownButton: {
    width: '100%',
    height: 40,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.grey,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  DropdownText: {
    borderColor: theme.colors.grey,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  iconDown: {
    transform: [{rotate: '90deg'}],
  },
  iconUp: {
    transform: [{rotate: '270deg'}],
  },
});
