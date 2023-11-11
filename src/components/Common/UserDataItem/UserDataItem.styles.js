import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wrapperCenter: {
    // flexDirection: 'row',
    // width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataWrapper: {
    // borderWidth: 1,
    flexDirection: 'row',
    width: 190,
    gap: 15,
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 3,
    marginRight: 3,
  },
  carIcon: {
    marginBottom: 2,
    marginRight: 2,
  },
});
