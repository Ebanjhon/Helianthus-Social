import { StyleSheet } from 'react-native';
import colors from '../../assets/color/colors';

const styles = StyleSheet.create({
    cont: { flex: 1 },
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        position: 'relative',
    },
    title: {
        fontWeight: '800',
        fontSize: 70,
    },
    button: {
        width: 330,
        height: 70,
        backgroundColor: colors.gold,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderStyle: 'solid',
        borderWidth: 0,
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        // Shadow for Android
        elevation: 3,

    },
    buttonText: {
        fontSize: 38,
        fontWeight: '600'
    },
    input: {
        fontSize: 20,
        backgroundColor: colors.xamnhe,
        padding: 10,
        width: 350,
        borderRadius: 30,
        marginBottom: 20
    },
    input: {
        height: 50,
        borderColor: '#000',  // Màu viền
        borderWidth: 1,        // Độ dày viền
        borderRadius: 10,      // Độ bo tròn viền
        paddingHorizontal: 16, // Khoảng cách nội dung bên trong
    },
});

export default styles;

