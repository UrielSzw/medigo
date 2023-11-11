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
    height: 300,
  },
  input: {
    marginBottom: 8,
  },
  footerWrapper: {
    marginTop: 20,
    gap: 5,
  },
  logo: {
    position: 'relative',
    bottom: 2,
    alignSelf: 'center',
  },
  secondaryButtonText: {
    color: theme.colors.blue,
  },
});
