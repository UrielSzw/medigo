import {StyleSheet} from 'react-native';
import {theme} from '../../../theme/theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    flex: 1,
  },
  background: {
    flex: 1,
  },
  body: {
    flex: 1,
    paddingHorizontal: '5%',
  },
  bodyWrapper: {
    width: '100%',
  },
  input: {
    marginBottom: 8,
  },
  footerWrapper: {
    marginTop: 20,
    marginBottom: 25,
    gap: 5,
  },
  logo: {
    alignSelf: 'center',
    marginLeft: 8,
  },
  secondaryButtonText: {
    color: theme.colors.blue,
  },
});
