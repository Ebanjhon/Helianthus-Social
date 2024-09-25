import styles from './LoginStyle';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useState } from 'react';
import FloatingLabelInput from '../../Components/FloatingLabelInput';
import apiWithoutAuth, { authApi, endpoints } from '../../Configs/APIs';
import { UserContext } from '../../Configs/Context';
import { Text, View } from 'react-native';
import LottieView from 'lottie-react-native';
import Toast from 'react-native-toast-message';
import { showToast, toastConfigExport } from '../../Configs/ToastConfig';

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, dispatch] = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    const loginPress = async () => {
        if (username.length === 0 || password.length === 0) {
            showToast('warning', 'Vui lòng điền đầy đủ thốn tin!');
            return;
        }
        try {
            setLoading(true);
            // Gọi API để đăng nhập
            const response = await apiWithoutAuth.post(endpoints.login, {
                username,
                password,
            });

            if (response.status === 200) {
                // Lưu token vào AsyncStorage
                await AsyncStorage.setItem('token', response.data.jwtToken);

                // Lấy token từ AsyncStorage và gọi API để lấy thông tin người dùng
                const api = await authApi(); // Đợi authApi hoàn thành và lấy instance axios
                const userResponse = await api.get(endpoints['current-user']);
                // Lưu user vào AsyncStorage
                await AsyncStorage.setItem('user', JSON.stringify(userResponse.data));
                console.log(userResponse.data);
                // Cập nhật trạng thái ứng dụng
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
        <View style={styles.container}>
            <LottieView
                source={require('../../assets/animations/Animation - 1726832984119.json')} // Đường dẫn tới file Lottie
                autoPlay
                loop
                style={{ width: 200, height: 200, marginTop: 10 }}
            />
            <Toast config={toastConfigExport} />

            <Text style={styles.title}>Sign in</Text>

            <View style={{ padding: 16, width: '95%' }}>
                <FloatingLabelInput
                    label="Username"
                    value={username}
                    setValue={setUsername}
                    isPassword={false}
                />
                <FloatingLabelInput
                    label="Password"
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
                    style={{ width: 100, height: 100 }}
                />
            ) : (
                <TouchableOpacity style={styles.button} onPress={loginPress}>
                    <Text style={styles.buttonText}>Đăng Nhập</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
            >
                <Text>Đăng ký tài khoản</Text>
            </TouchableOpacity>

        </View>
    );
};

export default Login