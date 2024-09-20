import React from 'react';
import { Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import colors from '../assets/color/colors';

const toastConfig = {
    success: ({ text1, text2 }) => (
        <View style={{
            height: 60,
            width: '90%',
            backgroundColor: '#4CAF50',
            borderRadius: 10,
            padding: 10,
            justifyContent: 'center',
        }}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>{text1}</Text>
            <Text style={{ color: 'white', fontSize: 14 }}>{text2}</Text>
        </View>
    ),
    error: ({ text1, text2 }) => (
        <View style={{
            height: 60,
            width: '90%',
            backgroundColor: '#F44336',
            borderRadius: 10,
            padding: 10,
            justifyContent: 'center',
        }}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>{text1}</Text>
            <Text style={{ color: 'white', fontSize: 14 }}>{text2}</Text>
        </View>
    ),
    warning: ({ text1 }) => (
        <View style={{
            height: 60,
            width: '90%',
            backgroundColor: '#F5EFDA',
            borderRadius: 10,
            padding: 10,
            justifyContent: 'center',
        }}>
            <Text style={{ color: colors.gold, fontSize: 16, fontWeight: 'bold' }}>{text1}</Text>
        </View>
    ),
    successRegister: ({ text1, text2 }) => (
        <View style={{
            height: 60,
            width: '90%',
            backgroundColor: '#4CAF50',
            borderRadius: 10,
            padding: 10,
            justifyContent: 'center',
            alignSelf: 'center', // Đảm bảo view được căn giữa
        }}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>{text1}</Text>
            <Text style={{ color: 'white', fontSize: 14 }}>{text2}</Text>
        </View>
    ),
};

// Hàm để hiển thị toast message
export const showToast = (type, text1, text2) => {
    Toast.show({
        type: type,  // 'success' hoặc 'error'
        text1: text1,
        text2: text2,
    });
};

export const showToastBottom = (type, text1, text2) => {
    Toast.show({
        type: type,  // 'success' hoặc 'error'
        text1: text1,
        text2: text2,
        position: 'bottom',
    });
};

// Xuất toastConfig để dùng trong component gốc
export const toastConfigExport = toastConfig;
