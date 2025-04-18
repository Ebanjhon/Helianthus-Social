import { StyleSheet } from 'react-native';
import colors from '../../assets/color/colors';

const styles = StyleSheet.create({
  background: {
    paddingTop: 20,
  },
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 39,
    color: colors.gold,
    fontWeight: '900',
  },
  text: {
    fontSize: 15,
    color: colors.dark,
    fontWeight: '600'
  },
  contai: {
    justifyContent: 'flex-end',
  },
  contai_form: {
    width: '100%',
    height: 'auto',
    alignItems: 'center',
    marginBottom: 40,
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
    color: colors.trang,
  },
  text_show: {
    fontSize: 17,
    fontWeight: '500',
    color: colors.black,
  },
  picker: {
    width: 200,
  },
  btn_register: {
    width: '90%',
    height: 60,
    borderRadius: 50,
    backgroundColor: colors.gold,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    alignSelf: 'center',
    marginBottom: 10
  },
  text_error: {
    color: colors.danger,
  },
});

export default styles;
