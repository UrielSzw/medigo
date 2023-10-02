import {Dimensions, StyleSheet} from 'react-native';
import {theme} from '../../../theme/theme';

const {width} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  wrapper: {
    width: width * 1.5,
    height: 300,
    backgroundColor: theme.colors.blue,
    transform: [{rotate: '20deg'}],
    position: 'relative',
    top: -110,
    left: -100,
  },
  logo: {
    position: 'absolute',
    zIndex: 10,
    top: 65,
    width: '100%',
    alignItems: 'center',
  },
});
