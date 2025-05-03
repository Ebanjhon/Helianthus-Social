import styles from './LoginStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LottieView from 'lottie-react-native';
import Toast from 'react-native-toast-message';
import { showToast, toastConfigExport } from '../../Configs/ToastConfig';
import { AppInputFloat } from '../../Components/AppInputFloating/AppInputFloat';
import { UserResponse } from '../../RTKQuery/Slides/types';
import {
  BASE_URL,
  useGetTokenMutation,
  useGetUserProfileMutation,
} from '../../RTKQuery/Slides/slide';
import { UserContext } from '../../Configs/UserReducer';
import { IconGoogle } from '../../assets/SVG';
import React from 'react';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('hon123');
  const [password, setPassword] = useState('123');
  const [fetchToken, { data: tokenData, error, isLoading }] =
    useGetTokenMutation();
  useGetUserProfileMutation();
  const { dispatch } = useContext(UserContext);
  const handleGetUserProfile = async (token: string) => {
    console.log(token);
    try {
      const response = await fetch(
        `${BASE_URL}/api/user?username=${encodeURIComponent(username)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const text = await response.text();

      if (!response.ok) {
        throw new Error(`Lỗi server: ${response.status}`);
      }

      const result: UserResponse = text
        ? JSON.parse(text)
        : ({} as UserResponse);
      if (result?.active === false) {
        navigation.navigate('Active', { userData: result });
      } else {
        await AsyncStorage.setItem('user', JSON.stringify(result));
        dispatch({ type: 'login', payload: result });
      }
    } catch (error: any) {
      console.error('API error:', error.message);
      throw error;
    }
  };

  const handleLogin = async () => {
    // dispatch({
    //   type: 'login',
    //   payload: {
    //     userId: 'KIUHLYGJYGKJHK',
    //     username: 'eban123',
    //     firstname: 'Son',
    //     lastname: 'Json',
    //     email: 'eban@eban.vn',
    //     avatar:
    //       'https://i.pinimg.com/736x/29/31/bc/2931bce606d71b1c60bd9c6c6596f441.jpg',
    //     active: true,
    //     curentUser: true,
    //     id: undefined,
    //   },
    // });
    // return;
    try {
      const dataToken = await fetchToken({ username, password }).unwrap();
      if (dataToken.token === undefined) {
        showToast('error', 'Đăng nhập thất bại!', 'Vui lòng đăng nhập lại!');
      } else {
        await AsyncStorage.setItem('token', dataToken.token);
        await handleGetUserProfile(dataToken.token);
      }
    } catch (err) {
      showToast('error', 'Đăng nhập thất bại!', "Mật khẩu hoặc tên người dùng không chính xác!");
    }
  };

  return (
    <View style={styles.container}>
      <Toast config={toastConfigExport} />
      <KeyboardAvoidingView behavior="padding">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ justifyContent: 'center', flexGrow: 1 }}>
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
          {isLoading ? (
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
                  marginTop: 18,
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
    </View>
  );
};

export default Login;
