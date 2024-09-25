import { StyleSheet } from 'react-native';
import colors from '../../assets/color/colors';

const styles = StyleSheet.create({
    container: {
        width: 'auto',
        alignItems: 'center',
    },
    contai_avatar: {
        height: 140,
        width: 140,
        borderRadius: 100,
        backgroundColor: colors.gold,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        width: 135,
        height: 135,
        borderRadius: 100
    },
    contai_name: {
        alignItems: 'center'
    },
    full_name: {
        fontSize: 30,
        color: colors.black,
        fontWeight: '700'
    },
    user_name: {
        fontSize: 18,
        color: colors.gray,
        fontWeight: '400',
        marginBottom: 10,
        fontWeight: '500',
        backgroundColor: colors.light,
        borderRadius: 50,
        padding: 5
    },
    line_border: {
        width: '90%',
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: colors.xamtrang,
    },
    contai_folow: {
        width: '100%',
        height: 'auto',
        margin: 4,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: colors.light
    },
    title: {
        fontSize: 22,
        color: colors.dark,
        fontWeight: '700',
    },
    content: {
        fontSize: 18,
        color: colors.gray,
        fontWeight: '400',
        marginBottom: 4,
    },
    contai_item_flow: {
        alignItems: 'center',
        width: 100,
    },
    contai_tab_view: {
        backgroundColor: colors.success
    },
    scene: {
        flex: 1, height: 5000
    },
    contai_edit_avata: {
        width: "auto",
        height: "auto",
        padding: 4,
        position: 'absolute',
        left: 10,
        top: 5,
        borderRadius: 5,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: colors.gray
    },
    grid: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        backgroundColor: 'tomato',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    row: {
        justifyContent: 'space-between', // Căn đều các item theo chiều ngang
    },
    postContain: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    post: {
        width: '90%',
        height: 'auto',
        backgroundColor: colors.light,
        borderRadius: 15,
        padding: 10
    },
    wrapper: {
        height: 250,
    },
    dot: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        width: 8,
        height: 8,
        borderRadius: 4,
        margin: 3,
    },
    activeDot: {
        backgroundColor: '#ffffff',
        width: 10,
        height: 10,
        borderRadius: 5,
        margin: 3,
    },

});

export default styles;

