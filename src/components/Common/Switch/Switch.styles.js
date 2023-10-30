import { StyleSheet } from 'react-native';

export const getStyles = () =>
  StyleSheet.create({
    wrapperOff: {
      flexDirection: 'row',
      gap: 2,
      backgroundColor: '#9B9B9B',
      alignItems: 'center',
      borderRadius: 13.5,
      width: 46,
      height: 22,
      padding: 3,
    },
    wrapperOn: {
      flexDirection: 'row',
      gap: 2,
      backgroundColor: '#62A478',
      alignItems: 'center',
      borderRadius: 13.5,
      width: 46,
      height: 22,
      padding: 3,
      paddingRight: 5,
      paddingLeft: 8,
    },
    circle: {
      backgroundColor: '#FFF',
      width: 18,
      height: 18,
      borderRadius: 50,
    },
  });
