// import React, { Component } from 'react';
// import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
// import styles from './IntroStyle';
// import colors from '../../assets/color/colors';
// import LinearGradient from 'react-native-linear-gradient';

// export class IntroApp extends Component {
//   render() {
//     const { navigation } = this.props;
//     return (

//     );
//   }
// }

// export default IntroApp;



import React from 'react';
import { Pressable, Text, View } from 'react-native';
import styles from './IntroStyle';

interface Myprops {
  navigation: any
};

const IntroApp: React.FC<Myprops> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textNameApp}>Helianthus</Text>
      <Pressable
        onPress={() => {
          navigation.navigate('Login');
        }}
        style={styles.button_login}>
        {/* <Text style={styles.buttonText}>Đăng nhập</Text> */}
      </Pressable>

      {/* <Pressable
        onPress={() => navigation.navigate('Register')}
        style={{ width: '100%' }}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={['#EFEB77', '#F6AF04']}
          style={styles.button_login}>
          <Text style={styles.buttonText}>Đăng ký tài khoản</Text>
        </LinearGradient>
      </Pressable> */}

      <Text style={styles.footer}>Design by Êban</Text>
    </View>
  );
};
export default IntroApp;
