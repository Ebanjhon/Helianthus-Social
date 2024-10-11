import { StyleSheet } from 'react-native';
import colors from '../../assets/color/colors';

const styles = StyleSheet.create({
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
        marginBottom: 10
    },
    border_content: {
        width: '70%',
        borderRadius: 10,
        borderWidth: 1,
        borderBlockColor: colors.xamnhe,
        marginTop: 5,
        marginBottom: 5,
    },
    content_post: {
        width: '100%',
        maxHeight: 200,
        // borderRadius: 5,
        // borderWidth: 1,
        // borderColor: colors.gold
    },
    textInput: {
        fontSize: 16,
        height: "auto",
        textAlignVertical: 'top', // Giúp văn bản bắt đầu từ trên cùng
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
    edit_crop_media: {
        minWidth: 50,
        height: 35,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        position: 'absolute',
        bottom: 10,
        right: 10,
        borderRadius: 50,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row'
    },
    edit_filter_media: {
        minWidth: 80,
        height: 35,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        position: 'absolute',
        bottom: 10,
        right: 80,
        borderRadius: 50,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row'
    },
    edit_media: {
        minWidth: 110,
        height: 35,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        position: 'absolute',
        bottom: 10,
        right: 180,
        borderRadius: 50,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row'
    },
    get_media: {
        width: '100%',
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        // backgroundColor: colors.danger,
        justifyContent: 'space-around',
        alignItems: 'center'

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
        fontWeight: '400',
        color: colors.xam
    },
    remove: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(250, 250, 250, 0.4)',
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

