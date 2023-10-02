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
    gap: 50,
    marginHorizontal: 20,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  userData: {
    justifyContent: 'space-between',
  },
});
