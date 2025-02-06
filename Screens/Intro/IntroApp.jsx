import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './IntroStyle';
import colors from '../../assets/color/colors';
import LinearGradient from 'react-native-linear-gradient';

export class IntroApp extends Component {
  render() {
    const {navigation} = this.props;
    const handleLoginPress = () => {
      navigation.navigate('Login');
    };
    const handleRegisterPress = () => {
      navigation.navigate('Register');
    };

    return (
      <View style={styles.container}>
        <Image
          height={9}
          resizeMode="contain"
          style={styles.imgIntro}
          source={require('./../../assets/images/imageIntro.png')}
        />
        <Text style={styles.textNameApp}>Helianthus</Text>
        <TouchableOpacity onPress={handleLoginPress} style={{width: '100%'}}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            colors={['#EFEB77', '#F6AF04']}
            style={styles.button_login}>
            <Text style={styles.buttonText}>Đăng nhập</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleRegisterPress} style={{width: '100%'}}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            colors={['#EFEB77', '#F6AF04']}
            style={styles.button_login}>
            <TouchableOpacity onPress={handleLoginPress}>
              <Text style={styles.buttonText}>Đăng ký tài khoản</Text>
            </TouchableOpacity>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.footer}>Design by Êban</Text>
      </View>
    );
  }
}

export default IntroApp;
