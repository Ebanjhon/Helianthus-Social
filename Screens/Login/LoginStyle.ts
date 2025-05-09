import { StyleSheet } from 'react-native';
import colors from '../../assets/color/colors';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
    // paddingHorizontal: 20,
  },
  titleLogin: {
    fontSize: 50,
    color: '#BFBFBF',
    fontFamily: 'FrancoisOne-Regular',
    alignSelf: 'center',
  },
  textNameApp: {
    fontSize: 60,
    color: colors.gold,
    fontFamily: 'Pacifico-Regular',
    alignSelf: 'center'
  },
  imgLogin: {
    width: '70%',
    height: undefined,
    aspectRatio: 1,
    marginBottom: -37,
    alignSelf: 'center',
  },
  animatedImg: {
    width: 200,
    height: 200,
    marginTop: 180,
    position: 'absolute',
    zIndex: -1,
  },
  buttonLogin: {
    width: 330,
    height: 64,
    backgroundColor: colors.gold,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderStyle: 'solid',
    elevation: 3,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 33,
    fontWeight: '800',
    color: colors.black,
  },
  input: {
    fontSize: 20,
    backgroundColor: colors.xamnhe,
    padding: 10,
    width: 350,
    borderRadius: 30,
    marginBottom: 20,
  },
  registerText: {
    paddingTop: 10,
    color: colors.dark,
    fontSize: 20,
    fontWeight: '600',
    alignSelf: 'center',
  },
  loginGoogle: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default styles;
