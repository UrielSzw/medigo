import {StyleSheet} from 'react-native';
import {theme} from '../../../theme/theme';

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  button: {
    borderRadius: 12,
    flexDirection: 'row',
    gap: 5,
    width: '30%',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    backgroundColor: 'rgba(99, 180, 255, 0.1)',
  },
});
