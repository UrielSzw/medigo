import {StyleSheet} from 'react-native';
import {theme} from '../../../theme/theme';

export const styles = StyleSheet.create({
  selectDocWrapper: {
    backgroundColor: theme.colors.white,
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 5,
    gap: 10,
  },
  selectDocContainer: {
    gap: 10,
  },
  specialtyFilterContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  addressTop: {
    alignSelf: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  specialty: {
    fontSize: 14,
    backgroundColor: 'rgb(250, 250, 250)',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  nearDocsContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
    gap: 5,
  },
});
