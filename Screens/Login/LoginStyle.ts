import {StyleSheet} from 'react-native';
import colors from '../../assets/color/colors';

const styles = StyleSheet.create({
  cont: {flex: 1},
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.gold,
    position: 'relative',
  },
  titleLogin: {
    fontSize: 50,
    color: colors.dark,
    fontFamily: 'FrancoisOne-Regular',
  },
  imgLogin: {
    width: '70%',
    height: undefined,
    aspectRatio: 1,
    marginBottom: -37,
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
    height: 70,
    backgroundColor: colors.gold,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 3,
    elevation: 3,
  },
  buttonText: {
    fontSize: 38,
    fontWeight: '800',
    color: colors.dark,
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
    fontSize: 21,
    fontWeight: '700',
  },
});

export default styles;
