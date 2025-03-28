import {StyleSheet} from 'react-native';
import colors from '../../../../assets/color/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 5,
    backgroundColor: colors.white,
    height: 130,
  },
  itemUser: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
  },
  newUser: {
    fontSize: 10,
    padding: 2,
    position: 'absolute',
    backgroundColor: colors.danger,
    color: colors.white,
    zIndex: 1,
    borderRadius: 5,
    top: 5,
  },
});
