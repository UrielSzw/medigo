import {StyleSheet, Dimensions} from 'react-native';
import {theme} from '../../../theme/theme';

const {height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    height: height,
  },
  wrapper: {
    height: height - 130,

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
