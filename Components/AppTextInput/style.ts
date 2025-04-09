import { StyleSheet } from 'react-native';
import colors from '../../assets/color/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginBottom: 5,
  },
  input: {
    height: 47,
    backgroundColor: colors.white,
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 18,
    elevation: 5,
    fontWeight: '500',
    color: colors.dark,

    borderWidth: 2,
  },
  title: {
    fontSize: 19,
    fontWeight: '700',
    color: colors.black
  },
  error: {
    color: colors.danger
  }

});

export default styles;
