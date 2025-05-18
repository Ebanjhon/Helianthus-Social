import { StyleSheet } from 'react-native';
import colors from '../../../../assets/color/colors';

const styles = StyleSheet.create({
  commentView: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '90%'
  },
  contain_cmt_view: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 5,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: colors.gray,
  },
  input_cmt: {
    height: 50,
    backgroundColor: colors.gold2,
    alignItems: 'center',
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
    alignSelf: 'center'

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
  containerComment: {
    paddingTop: 10
  },
  contentItemList: {
    paddingHorizontal: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    flex: 1,
  },
  detailComment: {
    flex: 1,
    paddingLeft: 5
  },
  nameText: {
    fontSize: 16,
    fontWeight: '500'
  },
  commentText: {
    fontSize: 16,
    fontWeight: '500',
    backgroundColor: 'rgba(214, 214, 214, 0.4)',
    minHeight: 27,
    padding: 2,
    color: colors.black,
    borderRadius: 2
  },
  textReply: {
    fontSize: 15,
    fontWeight: '500',
    minHeight: 27,
    padding: 2,
    color: colors.dark,
    borderRadius: 2
  },
  textDelete: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.danger,
  },
  line: {
    flex: 1,
    position: 'absolute',
    backgroundColor: colors.gold2,
    width: 4,
    zIndex: 2,
    top: 60,
    left: 36,
    height: '90%'
  },
  reply: {
    width: 'auto',
    height: 40,
    backgroundColor: colors.gold,
    position: 'absolute',
    bottom: 55,
    borderRadius: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
    flexDirection: 'row',
    paddingRight: 10,
  },
});

export default styles;
