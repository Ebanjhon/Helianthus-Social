import { StyleSheet } from 'react-native';
import colors from '../../assets/color/colors';

const styles = StyleSheet.create({
    container: {},
    textBtnHead: {
        fontSize: 19,
        color: colors.gold2,
        fontWeight: '600',
        lineHeight: 38
    },
    contai_post: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        backgroundColor: colors.xamtrang,
        position: 'relative',
    },
    head_post: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    border_head: {
        width: '100%',
        borderRadius: 10,
        borderWidth: 1,
        borderBlockColor: colors.xamnhe,
        marginTop: 5,
    },
    border_content: {
        width: '90%',
        borderRadius: 10,
        borderWidth: 1,
        borderBlockColor: colors.xamnhe,
        marginTop: 5,
        marginBottom: 5,
    },
    textInput: {
        paddingHorizontal: 10,
        fontSize: 17,
        height: "auto",
        textAlignVertical: 'top',
    },
    text_name: {
        fontSize: 18,
        marginLeft: 10,
        fontWeight: '500',
        color: colors.dark
    },
    media_contai: {
        width: '100%',
        aspectRatio: 3 / 4,
        marginBottom: 10,
        position: 'relative',
    },
    media: {
        width: '100%',
        height: '100%',
    },
    box_Edit: {
        position: 'absolute',
        bottom: 9,
        right: 0,
        flexDirection: 'row',
        width: 150,
        justifyContent: 'space-between'
    },
    edit_media: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        bottom: 10,
        right: 10,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    get_media: {
        width: '100%',
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: colors.xamnhe,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18
    },
    get_media_contain: {
        width: 100,
        alignItems: 'center',
        flexDirection: 'row'
    },
    icon_media: {
        width: 35,
        height: 35,
    },
    textv1: {
        fontSize: 15,
        fontWeight: '500',
        color: colors.dark
    },
    BGIcon: {
        width: 35,
        height: 35,
        backgroundColor: 'rgba(32, 32, 32, 0.6)',
        position: 'absolute',
        borderRadius: 50,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        right: 10,
        top: 10,
    },
    fullScreenView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colors.dark,
        // justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9
    },
    img_edit: {
        flex: 1,
        zIndex: 9,
    },
    head_edit: {
        backgroundColor: colors.light,
        width: '100%',
        height: 50,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    text_edit_head: {
        fontSize: 18,
        fontWeight: '500',
        color: colors.black
    },
    image_edit: {
        width: '100%',
        aspectRatio: 3 / 4,
        marginBottom: 10,
        position: 'relative',
    },
    slider: {
        width: 300,
        height: 40,
    },
    view_shot: {
        marginTop: 20,
        width: '90%',
        aspectRatio: 3 / 4,
        backgroundColor: colors.danger,
        marginBottom: 9
    },
    text_edit_img: {
        color: colors.light
    },
    contain_filter: {
        // backgroundColor: colors.danger,
        // height: 100,
        width: '100%',
        marginTop: 10
    },
    item_filter: {
        backgroundColor: colors.light,
        height: 100,
        aspectRatio: 3 / 4,
        marginRight: 5,
        marginLeft: 5,
        alignItems: 'center'
    },
    text_filter: {
        overflow: 'hidden',
        height: 20
    }


});

export default styles;

