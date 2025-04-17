import { StyleSheet } from 'react-native';
import colors from '../../../assets/color/colors';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10
  },
  text_show: {
    fontSize: 17,
    fontWeight: '500',
    color: colors.black,
  },
  input_contai: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 30,
    paddingLeft: 8,
    borderColor: colors.gold,
    alignItems: 'center',
    backgroundColor: colors.trang,
  },
  text_input: {
    fontSize: 19,
    width: '80%',
    paddingLeft: 5,
    fontWeight: '500',
    color: colors.dark,
  },
  text_error: {
    color: colors.danger,
  },
});

export default styles;
