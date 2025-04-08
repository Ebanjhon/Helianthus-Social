import { StyleSheet } from "react-native";
import colors from "../../../../assets/color/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 10,
        borderBottomWidth: 2,
        borderColor: colors.gold2
    },
    contentItem: {
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    itemHeader: {
        flexDirection: 'row',
    },
    avatar: {
        borderRadius: 100,
    },
    name: {
        fontSize: 17,
        fontWeight: '500',
        color: colors.black,
    },
    time: {
        fontSize: 14,
        fontWeight: '400',
        color: colors.dark,
    },
    viewMedia: {
        flex: 1,
    },
    actionBottom: {
        borderRadius: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 2,
    },
    countMedia: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#000000b0',
        height: 35,
        width: 35,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default styles;