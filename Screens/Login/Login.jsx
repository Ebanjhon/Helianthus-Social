import styles from './LoginStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useState } from 'react';
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
import { showToast, toastConfigExport } from '../../Configs/ToastConfig';
import HeaderApp from '../../Components/HeaderApp/HeaderApp';
import { AppInputFloat } from '../../Components/AppInputFloating/AppInputFloat';
import AppBackground from '../../Components/AppBackground/AppBackground';
import { colorsGradient } from '../../assets/color/colors';
import {
  useGetTokenMutation,
  useGetUserProfileMutation,
} from '../../RTKQuery/Slides/slide';
import { UserContext } from '../../Configs/UserReducer';
import { IconGoogle } from '../../assets/SVG';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('eban123');
  const [password, setPassword] = useState('123456');
  const [fetchToken, { data, error, isLoading }] = useGetTokenMutation();
  const [fetchProfileUser, { data: userData, isLoading: isFetchUserLoading }] =
    useGetUserProfileMutation();
  const { dispatch } = useContext(UserContext);
  const getUserProfile = async () => {
    try {
      await fetchProfileUser(username).unwrap();
      if (userData.active) {
        navigation.navigate('Active', { userData: userData });
      }
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      dispatch({ type: 'login', payload: userData });
    } catch (err) {
      showToast('error', 'Đăng nhập thất bại!', error.data);
    }
  };

  const handleLogin = async () => {
    dispatch({
      type: 'login',
      payload: {
        userId: 'KIUHLYGJYGKJHK',
        username: 'eban123',
        firstname: 'Son',
        lastname: 'Json',
        email: 'eban@eban.vn',
        avatar:
          'https://i.pinimg.com/736x/29/31/bc/2931bce606d71b1c60bd9c6c6596f441.jpg',
        active: true,
        curentUser: true,
      },
    });
    return;
    try {
      await fetchToken({ username, password }).unwrap();
      await AsyncStorage.setItem('token', data.token);
      getUserProfile();
    } catch (err) {
      showToast('error', 'Đăng nhập thất bại!', error.data);
    }
  };

  return (
    <View style={styles.container}>
      <Toast config={toastConfigExport} />
      <KeyboardAvoidingView
        behavior='padding'
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ justifyContent: 'center', flexGrow: 1 }}
        >
          <Text style={styles.textNameApp}>Helianthus</Text>

          <View
            style={{
              marginVertical: 20,
            }}>
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
          {isLoading || isFetchUserLoading ? (
            <LottieView
              source={require('../../assets/animations/Animation - 1726832285926.json')}
              autoPlay
              loop
              style={{ width: 100, height: 100, alignSelf: 'center' }}
            />
          ) : (
            <>
              <TouchableOpacity
                style={styles.buttonLogin}
                onPress={() => {
                  handleLogin();
                }}>
                <Text style={styles.buttonText}>Đăng nhập</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => { }}
                style={{
                  width: 50,
                  alignSelf: 'center',
                  marginTop: 18
                }}>
                <IconGoogle />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
                style={{
                  alignSelf: 'center',
                }}>
                <Text style={styles.registerText}>Đăng ký tài khoản</Text>
              </TouchableOpacity>

            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View >
  );
};

export default Login;
