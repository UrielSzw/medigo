import {StyleSheet} from 'react-native';
import {theme} from '../../../theme/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  bodyWrapper: {
    flex: 1,
    paddingHorizontal: '5%',
  },
  input: {
    marginBottom: 10,
  },
  footerWrapper: {
    marginTop: 20,
    marginBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  logo: {
    position: 'relative',
    bottom: 15,
    alignSelf: 'center',
  },
});
