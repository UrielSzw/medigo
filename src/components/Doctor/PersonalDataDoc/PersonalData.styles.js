import {StyleSheet} from 'react-native';
import {theme} from '../../../theme/theme';

export const styles = StyleSheet.create({
  infoDocContainer: {
    marginHorizontal: 20,
    gap: 120,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  userData: {
    justifyContent: 'space-between',
  },
  buttonsContainer: {
    gap: 25,
    paddingHorizontal: 20,
  },
  paddLeft: {
    paddingHorizontal: 20,
  }
});
