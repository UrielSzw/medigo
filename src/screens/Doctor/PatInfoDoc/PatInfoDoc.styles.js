import {StyleSheet} from 'react-native';
import {theme} from '../../../theme/theme';

export const styles = StyleSheet.create({
  docInfoPatWrapper: {
    backgroundColor: theme.colors.white,
    flex: 1,
    paddingTop: 20,
    gap: 30,
    justifyContent: 'space-between',
  },
  infoDocContainer: {
    justifyContent: 'space-between',
    gap: 50,
    flex: 1,
    marginHorizontal: 20,
  },
  container: {
    gap: 10,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  userData: {
    marginTop: 20,
    justifyContent: 'space-between',
  },
});
