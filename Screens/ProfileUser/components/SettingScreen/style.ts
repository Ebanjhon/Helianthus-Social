import { StyleSheet } from 'react-native';
import colors from '../../../../assets/color/colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.xamtrang,
    alignItems: 'center'
  },
  box: {
    width: "97%",
    height: 'auto',
    backgroundColor: colors.white,
    marginTop: 7,
    padding: 10,
    borderRadius: 7,
    shadowColor: '#000',        // Màu sắc của bóng
    shadowOffset: { width: 5, height: 5 },  // Độ dịch chuyển của bóng
    shadowOpacity: 0.8,         // Độ mờ của bóng
    shadowRadius: 3,            // Bán kính làm mờ của bóng
    elevation: 5,               // Đối với Android: độ cao của bóng
  },
  box_bottom: {

  },
  text_logout: {
    fontSize: 30,
    fontWeight: '700',
    color: colors.danger,
    width: '100%',
    textAlign: 'center'
  },
  text_login: {
    fontSize: 20,
    color: colors.info,
    textAlign: 'center',
    margin: 5
  },
  title_box: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.gray,

  },
  itemp: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.dark,
    marginTop: 7
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.black
  }
});

export default styles;
