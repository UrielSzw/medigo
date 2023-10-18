import {StyleSheet, Dimensions} from 'react-native';
import {theme} from '../../../theme/theme';

const {height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  docInfoPatWrapper: {
    height: height - 68,
    justifyContent: 'space-between',
    paddingTop: 20,
    flex: 1,
    gap: 20,
  },
  infoDocContainer: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'space-between',
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
  inputStyle: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});
