import {StyleSheet} from 'react-native';
import {theme} from '../../../theme/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%',
    paddingTop: 50,
    justifyContent: 'space-between',
  },
  wrapper: {
    marginTop: 15,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.blue,
    padding: 10,
    paddingBottom: 20,
    borderRadius: 8,
  },
  dataWrapper: {
    flexDirection: 'row',
    gap: 15,
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 3,
    marginRight: 3,
  },
  footer: {
    width: '100%',
    gap: 15,
    alignItems: 'center',
  },
});
