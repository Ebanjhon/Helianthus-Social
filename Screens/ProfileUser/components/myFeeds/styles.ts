import { StyleSheet } from "react-native";
import colors from "../../../../assets/color/colors";

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.trang,
        // marginHorizontal: 5,
        borderRadius: 10,
        elevation: 4,

    },
    contentItem: {
        marginHorizontal: 5,
        paddingTop: 500,
    },
    item: {
        marginBottom: 9
    }
})

export default styles;