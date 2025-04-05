import { StyleSheet } from 'react-native';
import colors from '../../assets/color/colors';

const styles = StyleSheet.create({
  Container: {
    height: 42,
    width: '100%',
    // position: 'absolute',
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  itemHeader: {
    width: 40,
    height: 38,
    alignItems: 'center',
    top: 1
  },
  btnAction: {
    backgroundColor: colors.white,
    borderRadius: 90,
  }
});

export default styles;
