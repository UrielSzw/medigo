import {Dimensions, StyleSheet} from 'react-native';
import {theme} from '../../../theme/theme';

const {width} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    flex: 1,
  },
  header: {
    width: width * 1.5,
    height: 300,
    backgroundColor: theme.colors.blue,
    transform: [{rotate: '20deg'}],
    position: 'relative',
    top: -110,
    left: -100,
  },
  title: {
    color: theme.colors.white,
    fontSize: 36,
    position: 'absolute',
    top: 65,
    zIndex: 1,
    alignSelf: 'center',
  },
  body: {
    alignItems: 'center',
  },
  buttonsWrapper: {
    paddingTop: 25,
    flexDirection: 'row',
    gap: 15,
  },
  loginWrapper: {
    flexDirection: 'row',
    marginTop: 150,
    gap: 4,
  },
});
