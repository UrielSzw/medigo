import {StyleSheet} from 'react-native';
import {theme} from '../../../theme/theme';

export const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    paddingHorizontal: '10%',
  },
  inputWrapper: {
    width: '100%',
    height: 250,
    marginBottom: 50,
  },

  input: {
    marginBottom: 8,
  },
  logo: {
    position: 'relative',
    bottom: -30,
    alignSelf: 'center',
  },
  background: {
    backgroundColor: theme.colors.white,
    height: '100%',
  },
  principalButton: {
    marginBottom: 15,
  },
});
