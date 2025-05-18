import { StyleSheet } from 'react-native';
import colors from '../../../../assets/color/colors';

const styles = StyleSheet.create({
  container: {
    height: 400,
    zIndex: 1,
    backgroundColor: colors.white
  },
  cover: {
    width: '100%',
    height: 230,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 90,
    borderWidth: 3,
    borderColor: colors.gold2
  },
  avtView: {
    position: 'absolute',
    top: 180,
    alignSelf: 'center',
    zIndex: 1
  },
  nameText: {
    fontSize: 19,
    fontWeight: '500',
    color: colors.gold2,
    alignSelf: 'center',
    marginTop: 50
  },
  bioText: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.xam,
    alignSelf: 'center',
    backgroundColor: colors.white,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 2
  },
  btnFollow: {
    backgroundColor: colors.gold2,
    alignSelf: 'center',
    margin: 9,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 100,
  },
  thumnable: {
    minHeight: 80,
    backgroundColor: colors.trang,
    margin: 5,
    // android
    elevation: 5,
    borderRadius: 10,
    padding: 5
  },
  inforPrifile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  itemInfor: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  textNum: {
    fontSize: 20,
    color: colors.black,
    fontWeight: '600',
  },
  textTitleNum: {
    color: colors.black,
    fontWeight: '600',
  },
  tabItem: {
  },
  tabbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.white,
    height: 50,
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 5,
    marginTop: 3
  },
  btnTabbar: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollViewTab: {
    flex: 1,
    backgroundColor: 'blue',
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
});

export default styles;
