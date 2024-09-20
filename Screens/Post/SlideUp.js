import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import colors from '../../assets/color/colors';

const SlideUp = ({ children }) => {
    const slideAnim = useRef(new Animated.Value(300)).current; // Giá trị khởi tạo ngoài màn hình

    useFocusEffect(
        React.useCallback(() => {
            // Khi màn hình được focus
            Animated.timing(slideAnim, {
                toValue: 0, // Vị trí cuối cùng (trong màn hình)
                duration: 400, // Thời gian animation
                useNativeDriver: true, // Sử dụng native driver cho hiệu suất tốt hơn
            }).start();

            return () => {
                // Reset animation khi màn hình mất focus
                Animated.timing(slideAnim, {
                    toValue: 900, // Trở về vị trí ngoài màn hình
                    duration: 0, // Không cần hiệu ứng khi quay lại
                    useNativeDriver: true,
                }).start();
            };
        }, [slideAnim])
    );

    return (
        <Animated.View
            style={[styles.container, { transform: [{ translateY: slideAnim }] }]}
        >
            {children}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "95%",
        backgroundColor: colors.white,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
});

export default SlideUp;
