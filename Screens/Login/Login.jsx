/* eslint-disable react/react-in-jsx-scope */
import styles from './LoginStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useContext, useState} from 'react';
import apiWithoutAuth, {authApi, endpoints} from '../../Configs/APIs';
import {UserContext} from '../../Configs/Context';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LottieView from 'lottie-react-native';
import Toast from 'react-native-toast-message';
import {showToast, toastConfigExport} from '../../Configs/ToastConfig';
import HeaderApp from '../../Components/HeaderApp/HeaderApp';
import {AppInputFloat} from '../../Components/AppInputFloating/AppInputFloat';

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, dispatch] = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const loginPress = async () => {
    if (username.length === 0 || password.length === 0) {
      showToast('warning', 'Vui lòng điền đầy đủ thông tin!');
      return;
    }
    try {
      setLoading(true);
      const response = await apiWithoutAuth.post(endpoints.login, {
        username,
        password,
      });

      if (response.status === 200) {
        await AsyncStorage.setItem('token', response.data.jwtToken);
        const api = await authApi(); // Đợi authApi hoàn thành và lấy instance axios
        const userResponse = await api.get(endpoints['current-user']);
        console.log(userResponse.data.active);
        if (!userResponse.data.active) {
          setLoading(false);
          navigation.navigate('Active', {userData: userResponse.data});
          return;
        }
        await AsyncStorage.setItem('user', JSON.stringify(userResponse.data));
        dispatch({
          type: 'login',
          payload: userResponse.data,
        });
        setLoading(false);
      } else {
        showToast('error', 'Đăng nhập thất bại!', 'Sai thông tin đăng nhập!');
        setLoading(false);
        throw new Error(`Login failed with status ${response.status}`);
      }
    } catch (error) {
      showToast('error', 'Đăng nhập thất bại!', 'Sai thông tin đăng nhập!');
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{position: 'relative', flex: 1}}>
      <HeaderApp />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{alignItems: 'center'}}>
        <Image
          source={require('../../assets/images/sun.png')}
          style={styles.imgLogin}
        />
        <Toast config={toastConfigExport} />
        <Text style={styles.titleLogin}>Đăng nhập</Text>
        <View style={{padding: 16, width: '95%'}}>
          <AppInputFloat
            label="Tên đăng nhập"
            value={username}
            setValue={setUsername}
            isPassword={false}
          />
          <AppInputFloat
            label="Mật khẩu"
            value={password}
            setValue={setPassword}
            isPassword={true}
          />
        </View>
        {loading ? (
          <LottieView
            source={require('../../assets/animations/Animation - 1726832285926.json')} // Đường dẫn tới file Lottie
            autoPlay
            loop
            style={{width: 100, height: 100}}
          />
        ) : (
          <TouchableOpacity style={styles.buttonLogin} onPress={loginPress}>
            <Text style={styles.buttonText}>Xác nhận</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={{marginTop: 10}}>
          <Text style={styles.registerText}>Đăng ký tài khoản</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
