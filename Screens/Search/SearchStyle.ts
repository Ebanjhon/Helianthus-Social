import {StyleSheet} from 'react-native';
import colors from '../../assets/color/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headSearch: {
    backgroundColor: colors.gold2,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  searchWrap: {
    flexDirection: 'row',
  },
  search: {
    width: '85%',
    height: 45,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginRight: 5,
    fontSize: 16,
    fontWeight: '500',
  },
  btnSearch: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textType: {
    color: colors.dark,
    fontWeight: '500',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 100,
  },
  textTypeSelected: {
    color: colors.gold2,
    fontWeight: '500',
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 100,
  },
  boxList: {
    backgroundColor: colors.white,
    marginTop: 5,
    paddingHorizontal: 10,
  },
  avatar: {
    borderRadius: 100,
  },
  leftInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnFl: {
    width: 90,
    backgroundColor: colors.gold2,
    height: 35,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textName: {
    fontWeight: '600',
    color: colors.black,
    fontSize: 16,
  },
  itemUser: {
    marginBottom: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: colors.gray,
    paddingBottom: 5,
  },
});

export default styles;
