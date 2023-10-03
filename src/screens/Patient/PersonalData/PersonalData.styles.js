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
    marginHorizontal: 20,
    gap: 200,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 20,
  },
  userData: {
    justifyContent: 'space-between',
  },
  buttonsContainer: {
    gap: 25,
    paddingHorizontal: 20,
  },
});
