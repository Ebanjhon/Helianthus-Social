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
import {
  BASE_URL,
  useGetTokenMutation,
  useGetUserProfileMutation,
} from '../../RTKQuery/Slides/slide';
import { UserContext } from '../../Configs/UserReducer';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const Login = ({ }) => {
  const navigation = useNavigation();
  const [account, setAccout] = useState('jhon123');
  const [password, setPassword] = useState('123');
  const [fetchToken, { isLoading }] = useGetTokenMutation();
  useGetUserProfileMutation();
  const { dispatch } = useContext(UserContext);

  const handleGetUserProfile = async (token: string) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/user/account`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();
      if (!data?.active) {
        navigation.navigate('Active', { userData: data });
      } else {
        await AsyncStorage.setItem('user', JSON.stringify(data));
        dispatch({ type: 'login', payload: data });
      }
    } catch (error: any) {
      console.error('API error:', error.message, "Khi lấy thông tin user!");
      throw error;
    }
  };

  const handleLogin = async () => {
    try {
      const dataToken = await fetchToken({ userInput: account, password: password }).unwrap();
      if (dataToken.token === undefined) {
        showToast('error', 'Đăng nhập thất bại!', 'Vui lòng đăng nhập lại!');
      } else {
        console.log('====================================');
        console.log(dataToken.token);
        console.log('====================================');
        await AsyncStorage.setItem('token', dataToken.token);
        await handleGetUserProfile(dataToken.token);
      }
    } catch (err) {
      console.log('====================================');
      console.log(err);
      console.log('====================================');
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
              label="Tài khoản"
              value={account}
              setValue={setAccout}
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
