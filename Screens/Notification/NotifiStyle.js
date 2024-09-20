import { StyleSheet } from 'react-native';
import colors from '../../assets/color/colors';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.gold
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

});

export default styles;

