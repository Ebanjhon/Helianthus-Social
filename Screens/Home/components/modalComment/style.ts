import { StyleSheet } from 'react-native';
import colors from '../../../../assets/color/colors';

const styles = StyleSheet.create({
  commentView: {
    height: '100%',
    backgroundColor: colors.xamtrang,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    width: '100%',
    bottom: 0
  },
  contai_popup: {
    // backgroundColor: colors.danger,
    height: '100%',
  },
  contain_cmt_view: {
    flex: 1,
    backgroundColor: colors.xamtrang,
    // backgroundColor: colors.danger,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 5,
    alignItems: 'center',
    position: 'relative',
  },
  contain_list_cmt: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    paddingBottom: 50,
    // backgroundColor: colors.danger,
  },
  input_cmt: {
    flex: 1,
    // width: '100%',
    height: 50,
    backgroundColor: colors.white,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    paddingLeft: 15,
    paddingRight: 5,
    borderRadius: 30,
    flexDirection: 'row',
    marginBottom: 5,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    // Shadow for Android
    elevation: 5,
    justifyContent: 'flex-start',
  },
  textInput: {
    width: '95%',
    fontSize: 20,
    color: colors.dark,
    position: 'relative',
    paddingRight: 25
  },
  send: {
    position: 'absolute',
    backgroundColor: colors.xamtrang,
    width: 40,
    height: 40,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    right: 5,
  },
  line: {
    width: '95%',
    borderWidth: 0.7,
    borderColor: colors.gray,
    marginBottom: 1,
  },
  contentContainer: {
    paddingVertical: 10,
  },
});

export default styles;
