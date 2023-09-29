import {StyleSheet} from 'react-native';
import {theme} from '../../../theme/theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    flex: 1,
  },
  bodyWrapper: {
    width: '100%',
    height: 370,
    paddingHorizontal: '5%',
    marginBottom: 50,
  },
  input: {
    marginBottom: 5,
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
