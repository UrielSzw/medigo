import {StyleSheet} from 'react-native';
import {theme} from '../../../theme/theme';

export const styles = StyleSheet.create({
  wrapper: {
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: 'rgba(134, 150, 187, 0.1)',
  },
  data: {
    paddingBottom: 20,
    borderBottomColor: theme.colors.lightGrey,
    borderBottomWidth: 1,
  },
  info: {
    borderTopWidth: 1,
    paddingTop: 20,
    borderColor: '#F5F5F5',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoReviews: {
    flexDirection: 'row',
  },
  infoPrice: {
    flexDirection: 'row',
  },
  styleButton: {
    borderTopColor: theme.colors.lightGrey,
    borderTopWidth: 1,
  },
});
