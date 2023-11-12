import {StyleSheet} from 'react-native';
import {theme} from '../../../theme/theme';

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: theme.colors.white,
    flex: 1,
    paddingTop: 20,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  buttonsContainer: {
    gap: 25,
  },
  inputWrapper: {
    width: '100%',
  },
  inputContent: {
    marginHorizontal: '5%',
  },
  input: {
    marginBottom: 8,
  },
});
