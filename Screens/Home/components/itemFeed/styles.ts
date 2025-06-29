import { StyleSheet } from 'react-native';
import colors from '../../../../assets/color/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.trang,
    flexDirection: 'row',
    maxHeight: 480,
    marginBottom: 9,
  },
  viewMedia: {
    minHeight: 130,
    backgroundColor: colors.dark,
    borderRadius: 20,
    marginVertical: 10,
    marginLeft: 16,
    overflow: 'hidden',
  },

  infoFeed: {
    flexGrow: 1,
    height: 55,
    flexDirection: 'row',
    zIndex: 1,
    overflow: 'hidden',
    position: 'absolute',
    width: '96%',
    alignItems: 'center',
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 6,
  },
  infoContent: {
    position: 'absolute',
    bottom: 0,
    maxHeight: 70,
    minHeight: 50,
    width: '100%',
    overflow: 'hidden',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  textUsername: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.trang,
  },
  textContent: {
    color: colors.trang,
    paddingHorizontal: 10,
    margin: 5,
  },
  textTime: {
    color: colors.xamtrang,
  },
  viewAction: {
    width: 44,
    alignItems: 'center',
    paddingTop: 15,
  },
  lableFollow: {
    color: colors.black,
    fontSize: 15,
    fontWeight: '800',
  },
  scrollView: {
    maxHeight: 50, // Giới hạn chiều cao khi chưa mở rộng (tùy chỉnh)
  },
  expanded: {
    maxHeight: 200, // Khi mở rộng có thể cuộn
  },
  text: {
    fontSize: 13,
    color: '#fff',
  },
  readMore: {
    fontSize: 13,
    color: 'blue',
    marginTop: 5,
  },
  ScrollText: {
    flexGrow: 1,
    position: 'absolute',
    zIndex: 1,
    top: 60,
    paddingHorizontal: 10,
    maxHeight: 390,
    borderRadius: 5,
    marginHorizontal: 10,
    marginTop: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },
  avatarImage: {
    marginLeft: 5,
  },
  image: {
    borderColor: colors.gold2,
    borderRadius: 100,
  },
});
