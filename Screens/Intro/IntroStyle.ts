import { StyleSheet } from 'react-native';
import colors from '../../assets/color/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7F9',
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'

  },
  textNameApp: {
    fontSize: 60,
    color: colors.gold,
    fontFamily: 'Pacifico-Regular',
  },
  button_login: {
    // width: '100%',
    paddingVertical: 15,
    marginHorizontal: 10,
    borderRadius: 40,
    alignItems: 'center',
    margin: 10,
    borderWidth: 4,
    backgroundColor: '#010101',
  },
  buttonText: {
    color: colors.dark,
    fontSize: 22,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  footer: {
    paddingTop: 10,
    color: colors.black,
    fontSize: 18,
    fontWeight: '600',
  },
  imgIntro: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    marginBottom: -37,
  },
});

export default styles;
