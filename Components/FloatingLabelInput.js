// FloatingLabelInput.js
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, TextInput, View, Animated } from 'react-native';
import colors from '../assets/color/colors';

const FloatingLabelInput = ({ label, value, setValue, isPassword }) => {
    const [isFocused, setIsFocused] = useState(false);
    const labelAnimation = useRef(new Animated.Value(value ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(labelAnimation, {
            toValue: isFocused || value ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [isFocused, value]);

    const labelStyle = {
        position: 'absolute',
        left: 16,
        top: labelAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [10, -17],
        }),
        fontSize: labelAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [19, 15],
        }),
        color: labelAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: ['#aaa', colors.dark], // Màu khi placeholder chuyển động
        }),
        fontWeight: labelAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: ['400', '600'], // Thay đổi độ đậm của font chữ
        }),
        backgroundColor: labelAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: ['transparent', colors.white], // Thay đổi màu nền khi placeholder chuyển động
        }),
    };

    return (
        <View style={styles.container}>
            <Animated.Text style={labelStyle}>{label}</Animated.Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={setValue}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                secureTextEntry={isPassword} // Ẩn văn bản nếu là trường password
                placeholder=""
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 50,
        marginVertical: 12,
        borderWidth: 2,
        borderColor: colors.black,
        borderRadius: 10,
        textAlign: 'center',
        justifyContent: 'center',
    },
    input: {
        paddingHorizontal: 16,
        fontSize: 20,
        color: '#000',
    },
});

export default FloatingLabelInput;