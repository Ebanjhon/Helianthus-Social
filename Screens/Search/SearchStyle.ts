import { StyleSheet } from 'react-native';
import colors from '../../assets/color/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.xamtrang
    },
    searchContent: {
        width: '100%', alignItems: 'center', top: 35,
        backgroundColor: colors.gold2,
        borderBottomWidth: 2,
        borderTopWidth: 2,
        paddingBottom: 5,
    },
    contai_search: {
        width: '95%',
        height: 40,
        backgroundColor: colors.gold,
        borderRadius: 20,
        paddingLeft: 10,
        margin: 5,
        justifyContent: 'center',
    },
    item_notifi: {
        width: '100%',
        height: 80,
        backgroundColor: colors.white,
        borderBottomWidth: 4,
        borderColor: colors.gray,
        paddingLeft: 10,
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    image_avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 5
    },
    title_top_screen: {
        marginBottom: 0,
        fontSize: 20,
        lineHeight: 23,
    },
    fullname: {
        fontSize: 18,
        color: colors.black
    },
});

export default styles;

