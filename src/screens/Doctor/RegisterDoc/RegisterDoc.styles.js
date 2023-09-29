import {Dimensions, StyleSheet} from 'react-native';
import {theme} from '../../../theme/theme';

const {width} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    flex: 1,
  },
  bodyWrapper: {
    flex: 1,
    paddingHorizontal: '5%',
  },
  input: {
    marginBottom: 25,
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
