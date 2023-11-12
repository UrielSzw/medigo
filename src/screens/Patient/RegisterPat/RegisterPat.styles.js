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
  bodyTop: {
    alignItems: 'center',
    paddingHorizontal: '5%',
    flex: 1,
  },
  body: {
    alignItems: 'center',
    paddingTop: 25,
    marginBottom: 10,
  },
  inputWrapper: {
    width: '100%',
  },
  input: {
    marginBottom: 8,
  },
  principalButton: {
    marginBottom: 15,
  },
  logo: {
    marginLeft: 8,
    marginTop: 15,
    alignSelf: 'center',
  },
});
