import {StyleSheet} from 'react-native';
import {theme} from '../../../theme/theme';

export const styles = StyleSheet.create({
  selectDocWrapper: {
    backgroundColor: theme.colors.white,
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 30,
  },
  selectDocContainer: {
    gap: 10,
    justifyContent: 'space-between',
    flex: 1,
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
  contentScroll: {
    gap: 10,
  },
  scroll: {
    // flex: 1,
    height: 450,
    // borderWidth: 1,
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
    gap: 20,
  },
  activityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  buttonsContainer: {
    gap: 15,
  },
  button: {
    width: '90%',
    alignSelf: 'center',
  },
});
