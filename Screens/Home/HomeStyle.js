import { StyleSheet } from 'react-native';
import colors from '../../assets/color/colors';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    contai_head: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.white,
        marginBottom: 5,
        elevation: 9,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
        paddingTop: 5
    },
    contain: {
        minWidth: '95%',
        maxWidth: '95%',
        backgroundColor: colors.white,
        borderRadius: 20,
        paddingTop: 10,
        elevation: 5,
        marginBottom: 10,
        //ios
        shadowColor: '#000',           // Màu bóng
        shadowOffset: { width: 0, height: 2 }, // Độ lệch của bóng (chiều ngang, chiều dọc)
        shadowOpacity: 0.25,           // Độ mờ của bóng
        shadowRadius: 3.84,            // Bán kính của shadow
    },
    txt_post: {
        fontSize: 20,
    },
    add_post: {
        width: 70,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        opacity: 0.5,
        backgroundColor: 'rgba(0, 0, 0, 0.14)',
    },
    logo: {
        fontSize: 22,
        color: colors.dark,
        fontFamily: 'Pacifico-Regular',

    },
    message: {
        alignItems: 'center'
    },
    post_contain: {
        flex: 1,
        minHeight: 60,
        overflow: 'hidden',
        marginBottom: 10,
        // backgroundColor: colors.info,
    },
    media: {
        width: '100%',
        height: 450,
    },
    btn_like: {
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
    btn_cmt: {
        width: 'auto',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
    btn_follow: {
        width: 'auto',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    line_border: {
        width: '100%',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.xamnhe,
        marginBottom: 10
    },

    container_view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '95%',
        height: 500,
        // backgroundColor: colors.danger
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 250,
        height: 330,
        margin: 10,
    },
    contai_image: {
        width: '100%',
        // marginBottom: 50,
        // backgroundColor: colors.gold
    },
    post_infor: {
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 10
    },
    contain_action: {
        flex: 1,
        // position: 'relative',
        height: 45,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    contai_popup: {
        // backgroundColor: colors.danger,
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
    contain_Input: {
        position: 'absolute',
        bottom: 0,
        // backgroundColor: colors.danger,
        height: 50,
        width: '95%',
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
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        // Shadow for Android
        elevation: 5,
        justifyContent: 'flex-start'
    },
    textInput: {
        flex: 1,
        width: '88%',
        fontSize: 20,
        color: colors.dark
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
    contentContainer: {
        // Giới hạn chiều cao của nội dung bên trong
        paddingVertical: 10, // Điều chỉnh padding trên/dưới nếu cần
    },

});

export default styles;