import styles from './LoginStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useContext, useEffect, useState} from 'react';
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
import AppBackground from '../../Components/AppBackground/AppBackground';
import {colorsGradient} from '../../assets/color/colors';
import useFetchApi from '../../CallAPI/api_fetch_data/AuthApp';
import {URL_API} from '../../CallAPI';

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [dispatch] = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const handleSaveToken = async () => {
    await AsyncStorage.setItem('token', data);
    handleSubmitUserProfile();
  };

  const handleGetProfile = () => {
    setLoading(false);
    console.log(userData);
    // navigation.navigate('Active', {userData: userResponse.data});
    // dispatch({
    //   type: 'login',
    //   payload: userData,
    // });
  };

  const {
    data,
    submit: handleSubmitLogin,
    error: errorFetchToken,
  } = useFetchApi({
    url: URL_API.LOGIN,
    method: 'POST',
    body: {username: username, password: password},
    handleDonefetch: handleSaveToken,
  });

  const {
    data: userData,
    submit: handleSubmitUserProfile,
    error: errorFetchUser,
  } = useFetchApi({
    url: URL_API.GET_PROFILE,
    method: 'GET',
    params: {username: username},
    handleDonefetch: handleGetProfile,
  });

  useEffect(() => {
    setLoading(false);
    errorFetchUser &&
      showToast('error', 'Đăng nhập thất bại!', errorFetchUser.response.data);
    errorFetchToken &&
      showToast('error', 'Đăng nhập thất bại!', errorFetchToken.response.data);
  }, [errorFetchUser, errorFetchToken]);

  return (
    <AppBackground groupColor={colorsGradient.GC}>
      <Toast config={toastConfigExport} />
      <HeaderApp />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          flex: 1,
          height: '100%',
          width: '100%',
          justifyContent: 'center',
        }}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={styles.container}
          contentContainerStyle={{justifyContent: 'center', flex: 1}}>
          <Text style={styles.titleLogin}>Đăng nhập</Text>
          <View
            style={{
              marginVertical: 23,
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
          {loading ? (
            <LottieView
              source={require('../../assets/animations/Animation - 1726832285926.json')}
              autoPlay
              loop
              style={{width: 100, height: 100, alignSelf: 'center'}}
            />
          ) : (
            <>
              <TouchableOpacity
                style={styles.buttonLogin}
                onPress={() => {
                  handleSubmitLogin();
                  setLoading(true);
                }}>
                <Text style={styles.buttonText}>Xác nhận</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
                style={{
                  marginTop: 10,
                  alignSelf: 'center',
                }}>
                <Text style={styles.registerText}>Đăng ký tài khoản</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {}}
                style={{
                  width: 50,
                  alignSelf: 'center',
                }}>
                <Image
                  source={require('../../assets/images/googleIcon.png')}
                  style={styles.loginGoogle}
                />
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </AppBackground>
  );
};

export default Login;
