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
    padding: 30,
  },
  textState: {
    marginTop: 50,
    gap: 40,
    width: '90%',
    alignItems: 'center',
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
  headerModalWrapper: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  dataWrapper: {
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  nameWrapper: {
    gap: 15,
    flexDirection: 'row',
  },
  timeWrapper: {
    gap: 3,
    flexDirection: 'row',
  },
  icon: {
    marginTop: 3,
  },
  detailsWrapper: {
    gap: 10,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  button: {
    marginTop: 15,
  },
});
