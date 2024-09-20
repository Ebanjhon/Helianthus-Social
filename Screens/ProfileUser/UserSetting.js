import { Button, Image, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import colors from '../../assets/color/colors';
import { useEffect } from "react";
import icons from "../../assets/iconApp/icons";

const UserSeting = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: colors.light, width: '100%', height: 50, elevation: 9, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>

                <TouchableOpacity
                    onPress={() => navigation.navigate('ProfileDetail')}
                    style={{ width: 50, alignItems: 'center', height: 50, justifyContent: 'center' }}>
                    <Image
                        style={{ width: 30, height: 30, tintColor: colors.black }}
                        source={{ uri: icons.back_head }}
                    />
                </TouchableOpacity>

                <Text style={styles.title}>Cài đặt</Text>
                <Text style={{ width: 50 }}></Text>
            </View>
            <View style={styles.box}>
                <Text style={styles.title_box}>Trung tâm tài khoản</Text>
                <TouchableOpacity onPress={() => navigation.navigate("UpdatePrifile")}>
                    <Text style={styles.itemp}>Chỉnh sửa thông tin cá nhân</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.itemp}>Thay đổi mật khẩu</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.itemp}>Quyền riêng tư</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.box, styles.box_bottom]}>
                <Text style={styles.title_box}>Trung tâm tài khoản</Text>
                <Text
                    style={styles.text_login}
                    onPress={() => navigation.navigate('Logout')}>
                    Đăng Nhập tài khoản khác</Text>
                <Text
                    style={styles.text_logout}
                    onPress={() => navigation.navigate('Logout')}>
                    Đăng xuất
                    <Image
                        source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC6ElEQVR4nO3duWtUURTH8a8BNdpoGkNGcPsD9F9IE0Qj6CgSXCCdpWsaRU2lKK6dy5+greJSS7SIWGqphUYiRBtXok8uXJuBNzNEJjnn3N8HTn/e/Lhvu3fuAxERERERERERERGR/7EeOAE8Bd4Ac0tcr4EnuadGSdH2A5eB70BltL4Bl3KvoQ0CLwz84FWX9Tz3HFK/szCqXC+B1QR008CPWy2wrhHMZuCngR+2WmD9ADYSyNk2BzsLnAfGgP1LVGO5h9k2fZ4hkKmag5wBhrBjCPhY0+szApmpOciT2DNR0+sHAvldc5Aj2DNS0+s8gdSdl4exZ7hNv2EoEGMUiDEKxBgFYowCMUaBGOMpkAFgN3AaeKXbXluWAXuAt3oOsWVdnqwKw9Mpq84aAvEUyAoK4CGQbXmKeT6/2T1CYNYDGcghtPaXVseEZD2QgyXNp3sIZLzDnPpVgrEeyBDwpUMooUaK9UCSJvCrQyg38sOiex4CSXblJT/tQrkdIRQvgSSjXYRyx3songJJdkYPxVsgyY4uVujfBfpwqFeB9AEbgC09qqPAnw6h3PI4UnoRyPEublUXq9KFvuhA9hoIobUOU3Ag9w0E0FoPKTiQewYCaK0HFBxI00AArXWIggNJjgGfDQSRqviL+j/pdlO3vUZGiIWndT0YLpLw77M8jZDREt74eglkXxdzIi5flXgMpKkJKjuBNDSFa2uEjHc4TWmRwyI7UFIYHq4ha7VQzlYgyda840RaSvpeS0ntWE4BrJ+yuqG/IxjcCS8MzyNkO/Au9xuGp0AG8v8KzwHTLf2G4SmQ4Tb9hqFAjFEgxigQYxSIMQrEGAVijDbBdLJN7CnsmShhm1htpOxsq/FJA1uNTwKfStlqfJM247fneoeFBJXhukJAXj/oMg2sIqjBvDNb5aSm8m5yoaWRcjF/eKsyWl+BC8BKCtLIf7p5nD9ZN2fgs3mPck+WvmkiIiIiIiIiIiIiInjzF0R3vC2AiPChAAAAAElFTkSuQmCC' }}
                        style={{ width: 30, height: 30, tintColor: colors.danger }} />
                </Text>
            </View>
        </View >
    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.xamtrang,
        alignItems: 'center'
    },
    box: {
        width: "97%",
        height: 'auto',
        backgroundColor: colors.white,
        marginTop: 7,
        padding: 10,
        borderRadius: 7,
        shadowColor: '#000',        // Màu sắc của bóng
        shadowOffset: { width: 5, height: 5 },  // Độ dịch chuyển của bóng
        shadowOpacity: 0.8,         // Độ mờ của bóng
        shadowRadius: 3,            // Bán kính làm mờ của bóng
        elevation: 5,               // Đối với Android: độ cao của bóng
    },
    box_bottom: {

    },
    text_logout: {
        fontSize: 30,
        fontWeight: '700',
        color: colors.danger,
        width: '100%',
        textAlign: 'center'
    },
    text_login: {
        fontSize: 20,
        color: colors.info,
        textAlign: 'center',
        margin: 5
    },
    title_box: {
        fontSize: 20,
        fontWeight: '600',
        color: colors.gray,

    },
    itemp: {
        fontSize: 18,
        fontWeight: '500',
        color: colors.dark,
        marginTop: 7
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        color: colors.black
    }

});


export default UserSeting
