import { StyleSheet } from 'react-native';
import colors from '../../../../assets/color/colors';

const styles = StyleSheet.create({
  actionList: {
    backgroundColor: colors.white,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  },
  textAction: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.danger,
  },

});

export default styles;
