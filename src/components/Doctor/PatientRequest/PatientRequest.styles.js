import {StyleSheet} from 'react-native';
import {theme} from '../../../theme/theme';

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: theme.colors.blue,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.lightGrey,
    paddingBottom: 10,
    gap: 10,
    width: '100%',
  },
  headerWrapper: {
    backgroundColor: theme.colors.white,
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  dataWrapper: {
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  nameWrapper: {
    gap: 15,
    flexDirection: 'row',
  },
  timeWrapper: {
    gap: 3,
    flexDirection: 'row',
  },
  icon: {
    marginTop: 3,
  },
  buttonWrapper: {
    paddingHorizontal: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: theme.colors.white,
  },
});
