import {StyleSheet} from 'react-native';
import colors from '../../assets/color/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textNameApp: {
    fontSize: 60,
    color: colors.gold,
    fontFamily: 'Pacifico-Regular',
  },
  button_login: {
    paddingVertical: 15,
    borderRadius: 40,
    alignItems: 'center',
    margin: 10,
    borderWidth: 4,
    borderColor: colors.dark,
  },
  buttonText: {
    color: colors.dark,
    fontSize: 22,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  footer: {
    paddingTop: 10,
    color: colors.gold2,
    fontSize: 18,
    fontWeight: '700',
  },
  imgIntro: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    marginBottom: -37,
  },
});

export default styles;
