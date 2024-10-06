import { StyleSheet } from 'react-native';
import colors from '../../assets/color/colors';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.xamtrang,
        alignItems: 'center'
    },
    item_contai: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 90,

    },
    item_notifi: {
        width: '95%',
        height: 100,
        backgroundColor: colors.white,
        borderRadius: 10,
        margin: 5,
        elevation: 5,
    },
    title: {
        fontWeight: '700',
        color: colors.black,
        fontSize: 17
    },
    content: {
        fontWeight: '400',
        fontSize: 17,
    },
    contain_notifi: {
        backgroundColor: colors.light,
        elevation: 9,
        minHeight: 70,
        marginTop: 5,
        paddingLeft: 10,
        borderRadius: 10,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center'
    },
    notifi: {
        width: '82%'
    }

});

export default styles;

