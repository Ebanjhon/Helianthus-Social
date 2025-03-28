import {StyleSheet} from 'react-native';
import colors from '../../../../assets/color/colors';

const styles = StyleSheet.create({
  container: {flex: 1, width: '100%', backgroundColor: 'red'},
  contai_popup: {
    height: '100%',
  },
  contain_cmt_view: {
    width: '100%',
    height: '80%',
    backgroundColor: colors.xamtrang,
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
  },
  input_cmt: {
    flex: 1,
    width: '100%',
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
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    // Shadow for Android
    elevation: 5,
    justifyContent: 'flex-start',
  },
});

export default styles;
