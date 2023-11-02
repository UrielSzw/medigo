import {StyleSheet} from 'react-native';
import {theme} from '../../../theme/theme';

export const getStyles = () =>
  StyleSheet.create({
    wrapper: {
      flexDirection: 'row',
      gap: 10,
      backgroundColor: theme.colors.red,
      alignItems: 'center',
      borderRadius: 27,
      width: 92,
      height: 44,
      padding: 3,
    },
    wrapperOn: {
      backgroundColor: '#62A478',
      paddingLeft: 24,
    },
    circle: {
      backgroundColor: '#FFF',
      width: 36,
      height: 36,
      borderRadius: 50,
    },
  });
