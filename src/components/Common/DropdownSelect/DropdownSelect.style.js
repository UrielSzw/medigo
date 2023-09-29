import {StyleSheet} from 'react-native';
import {theme} from '../../../theme/theme';

export const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: theme.colors.white,
    width: '100%',
    paddingBottom: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: theme.colors.blue,
    backgroundColor: theme.colors.blue,
    textAlign: 'center',
  },
  options: {
    alignItems: 'center',
  },
  option: {
    paddingVertical: 15,
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: theme.colors.grey,
  },
  optionSelected: {
    paddingVertical: 15,
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: theme.colors.grey,
    backgroundColor: theme.colors.grey,
  },
});
