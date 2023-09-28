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
  },
  profileContainer: {
    flex: 1,
    flexWrap: 'wrap',
    borderRadius: 20, 
    borderColor: theme.colors.borderColor, 
    borderWidth: 2, 
    margin: 20, 
  }, 
  profileItem: {
    width: '90%',
    borderBottomWidth: 1,
    borderColor: theme.colors.borderColor, 
    marginLeft: 15, 
    margin: 10
  },
  option: {
    flexDirection: 'row',
    marginVertical: 5,
    paddingHorizontal: 10, 
  },
  optionIcon: {
    marginTop: 3,
    marginLeft: 10, 
  },
  optionText: {
    flex: 1, 
    marginLeft: 7,
    marginBottom: 5, 
  },
});
