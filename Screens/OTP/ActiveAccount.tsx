import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../assets/color/colors";
import { useContext, useEffect, useState } from "react";
import { authApi, endpoints } from "../../Configs/APIs";
import Toast from "react-native-toast-message";
import { showToast, toastConfigExport } from '../../Configs/ToastConfig';
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { UserResponse } from "../../RTKQuery/Slides/types";
import { UserContext } from "../../Configs/UserReducer";
import { useCreateOTPMutation, useVerifyOTPMutation } from "../../RTKQuery/Slides/slide";

type ActiveAccountProps = {
    route: {
        params: {
            userData: UserResponse;
        };
    };
    navigation: any;
};

const ActiveAccount = ({ route }: ActiveAccountProps) => {
    const { userData } = route.params;
    const [create_otp, { data, error: errOTP, isLoading: isLoadingOTP }] = useCreateOTPMutation();
    const [verifty, { error: errVerify, isLoading: isLoadingVerify }] = useVerifyOTPMutation();
    const [timeLeft, setTimeLeft] = useState(0); // Đặt thời gian bắt đầu là 60 giây
    const [showSendOTP, setShowSendOTP] = useState(false);
    const { user, dispatch } = useContext(UserContext);
    const [otp, setOTP] = useState('');

    useEffect(() => {
        if (timeLeft === 0) {
            setShowSendOTP(true);
            return;
        }
        const intervalId = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1); // Giảm thời gian mỗi giây
        }, 1000); // 1000ms = 1 giây
        return () => clearInterval(intervalId);
    }, [timeLeft]); // Chạy effect này khi timeLeft thay đổi

    const createOTP = async () => {
        try {
            await create_otp().unwrap();
            setShowSendOTP(false);
            setTimeLeft(60);
            console.log("OTP: ", data);
        } catch (error) {
            showToast('error', 'Thông báo!', 'Lỗi tạo mã OTP!');
        }
    };

    const sendOTP = async () => {
        try {
            const { status } = await verifty(otp).unwrap();
            if (status === 200) {
                showToast('success', 'Thông báo!', 'Xác nhận tài khoản thành công');
                await AsyncStorage.setItem('user', JSON.stringify(userData));
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
                source={require('../../assets/images/LOGOPNG.png')}
                style={{ width: 260, height: 260 }}
            />
            <Toast config={toastConfigExport} />
            <Text style={{ fontSize: 20 }}>Vui lòng kiểm tra email</Text>
            <Text style={{ fontSize: 20 }}>{userData?.email}</Text>
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
                maxLength={6}
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

function dispatch(arg0: { type: string; payload: any; }) {
    throw new Error("Function not implemented.");
}
