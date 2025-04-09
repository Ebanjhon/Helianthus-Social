import { StyleSheet } from 'react-native';
import colors from '../../assets/color/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginBottom: 5,
  },
  box: {
    flex: 1,
    elevation: 5,
    backgroundColor: colors.white,
    borderRadius: 10,
    height: 47,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  itemList: {
    flex: 1,
    height: 40,
    backgroundColor: colors.white,
    marginHorizontal: 20,
    elevation: 1,
    marginBottom: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.dark
  }
});

export default styles;
