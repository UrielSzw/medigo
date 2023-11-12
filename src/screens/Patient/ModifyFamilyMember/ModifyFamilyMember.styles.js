import {StyleSheet} from 'react-native';
import {theme} from '../../../theme/theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    flex: 1,
    paddingTop: 20,
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
    gap: 10,
  },
  wrapperTitle: {
    paddingVertical: 10,
    flexDirection: 'row',
    gap: 3,
  },
  wrapperTitleText: {
    lineHeight: 20,
  },
  wrapperForm: {
    height: 350,
  },
  wrapperFormContent: {
    gap: 15,
    paddingBottom: 25,
  },
  wrapperButtons: {
    gap: 15,
  },
});
