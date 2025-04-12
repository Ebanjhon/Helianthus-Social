import React, { useRef } from 'react';
import { StyleSheet, Animated, ViewComponent } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import colors from '../../assets/color/colors';

type SlideUpProps = {
    children: React.ReactNode;
};
const SlideUpCreateFeed: React.FC<SlideUpProps> = ({ children }) => {
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
    return (<Animated.View
        style={[styles.container, { transform: [{ translateY: slideAnim }] }]}
    >
        {children}
    </Animated.View>);
}
export default SlideUpCreateFeed;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.xamtrang,
    },
});
