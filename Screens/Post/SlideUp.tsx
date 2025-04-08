import React, { useRef } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import colors from '../../assets/color/colors';

const SlideUp = ({ children }) => {
    const slideAnim = useRef(new Animated.Value(300)).current;

    useFocusEffect(
        React.useCallback(() => {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
            }).start();

            return () => {
                Animated.timing(slideAnim, {
                    toValue: 900,
                    duration: 0,
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
        height: "100%",
        backgroundColor: colors.white,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
});

export default SlideUp;
