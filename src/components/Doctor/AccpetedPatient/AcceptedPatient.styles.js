import {StyleSheet} from 'react-native';
import {theme} from '../../../theme/theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.blue,
    alignItems: 'center',
    gap: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: theme.colors.grey,
    borderRadius: 8,
    width: '100%',
  },
  dataWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
  nameWrapper: {
    gap: 15,
    flexDirection: 'row',
  },
  timeWrapper: {
    gap: 3,
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    marginBottom: 3,
  },
});
