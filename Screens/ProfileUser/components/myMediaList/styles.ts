import { StyleSheet } from "react-native";
import colors from "../../../../assets/color/colors";

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.trang
    },
    contentItem: {
        paddingTop: 500,
    },
    item: {
        marginBottom: 9
    },
    itemMedia: {
        flex: 1,
        height: 90,
    }
})

export default styles;