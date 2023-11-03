import {StyleSheet} from 'react-native';
import {theme} from '../../../theme/theme';

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: theme.colors.white,
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  container: {
    flex: 1,
    borderRadius: 20,
    borderColor: theme.colors.lightGrey,
    borderWidth: 2,
    margin: 20,
    alignItems: 'center',
    paddingTop: 5,
  },
  logout: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 15,
  },
});
