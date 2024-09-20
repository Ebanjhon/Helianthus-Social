import React, { Component } from 'react';
import { Button, Image, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import styles from './IntroStyle';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../../assets/color/colors';
import FastImage from 'react-native-fast-image';

export class IntroApp extends Component {
    render() {
        const { navigation } = this.props; // Truy cập navigation từ props
        const handleLoginPress = () => {
            navigation.navigate('Login');
        };
        const handleRegisterPress = () => {
            navigation.navigate('Register');
        };
        return (
            <View style={styles.container}>
                <View style={styles.content_img}>
                    <FastImage
                        style={{ width: '100%', height: 350 }}
                        source={require('../../assets/images/gif31.gif')}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                    <Text style={styles.textNameApp}>Helianthus</Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.button_login} onPress={handleLoginPress}>
                        <Text style={styles.buttonText}>Đăng nhập</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button_login} onPress={handleRegisterPress}>
                        <Text style={styles.buttonText}>Đăng ký tài khoản</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footer}>
                    <Text style={{ color: colors.dark }}>Design by ÊBan</Text>
                </View>
            </View >
        )
    }
}

export default IntroApp
