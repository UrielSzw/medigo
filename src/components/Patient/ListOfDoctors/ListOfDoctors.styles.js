import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 20,
  },
  scroll: {
    paddingTop: 10,
    gap: 20,
    paddingBottom: 10,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 100,
    backgroundColor: 'rgba(134, 150, 187, 0.1)',
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 100,
    backgroundColor: 'rgba(134, 150, 187, 0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
