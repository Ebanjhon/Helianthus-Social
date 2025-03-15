import { StyleSheet } from 'react-native';
import colors from '../../assets/color/colors';

export const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    bottom: 10,
    left: 15,
    right: 15,
    backgroundColor: colors.light,
    borderRadius: 50,
    height: 50,
    zIndex: 2,
  },
  tabBarIconText: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 40,
    height: 40,
  },
  title_top_screen: {
    marginBottom: 0,
    fontSize: 20,
    lineHeight: 23,
  },
  fullname: {
    fontSize: 18,
    color: colors.black,
  },
});
