import { StyleSheet } from 'react-native';
import colors from '../../../../assets/color/colors';
import { opacity } from 'react-native-reanimated/lib/typescript/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contain_item: {
    width: '100%',
    height: "auto",
    backgroundColor: colors.white,
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.dark,

  },
  input: {
    fontSize: 18,
    fontWeight: '500',
    paddingLeft: 16,
  },
  btnUpdate: {
    marginHorizontal: 10,
    borderRadius: 14,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  btnActive: {
    backgroundColor: colors.gold2
  },
  btnNotActive: {
    backgroundColor: colors.dark,
    opacity: 0.5
  },
  textBtn: {
    fontSize: 40,
    fontWeight: '800'
  },
  lable: {
    fontSize: 19,
    fontWeight: '700',
    color: colors.black,
    paddingHorizontal: 10
  },
  btnUpload: {
    backgroundColor: colors.xamtrang,
    margin: 10,
    borderRadius: 5,
    padding: 7,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default styles;
