import {StyleSheet} from 'react-native';
import {theme} from '../../../theme/theme';

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: theme.colors.white,
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  buttonWrapper: {
    paddingHorizontal: '15%',
  },
  adressButtonWrapper: {
    width: '100%',
    flexDirection: 'row',
    gap: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginBottom: 5,
  },
  contentWrapper: {
    justifyContent: 'space-between',
    gap: 30,
  },
  contentAskMedicWrapper: {
    gap: 10,
  },
  contentAskMedicWrapperScroll: {
    justifyContent: 'space-between',
  },
  buttonsWrapper: {
    paddingTop: 10,
  },
});
