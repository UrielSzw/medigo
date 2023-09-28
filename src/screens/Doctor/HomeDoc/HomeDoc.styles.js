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
    alignItems: 'center', 
    justifyContent: 'flex-start', 
  },
  textState: {
    marginTop: 50, 
  },
  activarButtonWrapper: {
    width: '100%',
    flexDirection: 'row',
    gap: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 1,
    paddingHorizontal: '15%',
    marginBottom: 40,
    justifyContent: 'flex-end',
  },
  contentWrapper: {
    justifyContent: 'space-between',
    gap: 30,
  },
});
