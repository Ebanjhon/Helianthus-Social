import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../assets/color/colors";
import { useContext, useEffect, useState } from "react";
import { authApi, endpoints } from "../../Configs/APIs";
import Toast from "react-native-toast-message";
import { showToast, toastConfigExport } from '../../Configs/ToastConfig';
import { UserContext } from "../../Configs/Context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ActiveAccount = ({ route }) => {
    const [timeLeft, setTimeLeft] = useState(60); // Đặt thời gian bắt đầu là 60 giây
    const [showSendOTP, setShowSendOTP] = useState(false);
    const [u, dispatch] = useContext(UserContext);
    const { userData } = route.params;
    const [user, setUser] = useState(userData);
    const [otp, setOTP] = useState('');
    useEffect(() => {
        if (timeLeft === 0) {
            setShowSendOTP(true);
            return;
        } // Nếu thời gian còn lại là 0, không cần tiếp tục đếm ngược

        const intervalId = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1); // Giảm thời gian mỗi giây
        }, 1000); // 1000ms = 1 giây

        // Cleanup: Hủy interval khi component unmount hoặc thời gian đếm ngược kết thúc
        return () => clearInterval(intervalId);
    }, [timeLeft]); // Chạy effect này khi timeLeft thay đổi

    const createOTP = async () => {
        try {
            const api = await authApi();
            const response = await api.post(endpoints['create_otp'](userData.id));
            if (response.status === 200) {
                setShowSendOTP(false);
                setTimeLeft(60);
            }
        } catch (error) {

        }
    };

    const sendOTP = async () => {
        const api = await authApi();
        try {
            const response = await api.post(endpoints['checking-otp'](userData.id, otp));
            if (response.status === 200) {
                showToast('success', 'Thông báo!', 'Xác nhận tài khoản thành công');
                // Lưu user vào AsyncStorage
                await AsyncStorage.setItem('user', JSON.stringify(userData));
                // Cập nhật trạng thái ứng dụng
                dispatch({
                    type: 'login',
                    payload: userData,
                });
            }
        } catch (error) {
            showToast('error', 'Thông báo!', 'Mã OTP không chính xác!');
        }
    };

    useEffect(() => {
        createOTP();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../../assets/images/LOGOPNG.png')} // Đảm bảo đúng đường dẫn và tên file
                style={{ width: 260, height: 260 }}
            />
            <Toast config={toastConfigExport} />
            <Text style={{ fontSize: 20 }}>Vui lòng kiểm tra email</Text>
            <Text style={{ fontSize: 20 }}>{user.email}</Text>
            {!showSendOTP ? (
                <Text style={styles.time}>{timeLeft}s</Text>
            ) : (
                <TouchableOpacity
                    onPress={createOTP}
                >
                    <Text style={{ fontSize: 20, color: colors.danger }}>Gửi lại mã</Text>
                </TouchableOpacity>
            )}

            <TextInput
                style={styles.input}
                placeholder="Nhập mã OTP"
                keyboardType="phone-pad"
                onChange={(e) => setOTP(e.nativeEvent.text)}
            />

            <TouchableOpacity
                onPress={sendOTP}
                style={styles.btn}>
                <Text style={styles.textBtn}>Xác nhận</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: '100%',
        // backgroundColor: colors.danger,
        alignItems: 'center'
    },
    time: {
        fontSize: 30,
        fontWeight: '500',
        color: colors.info
    },
    input: {
        fontSize: 20,
        borderColor: colors.black,
        borderWidth: 1,
        padding: 10,
        width: "70%",
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 10
    },
    btn: {
        width: "70%",
        height: 50,
        marginTop: 10,
        backgroundColor: colors.success,
        borderRadius: 4,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    textBtn: {
        fontSize: 23,
        color: colors.light
    }
});

export default ActiveAccount