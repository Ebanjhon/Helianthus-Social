import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Text, View } from 'react-native';
import colors from '../../assets/color/colors';
import icons from '../../assets/iconApp/icons';
import LottieView from 'lottie-react-native';
import Toast from 'react-native-toast-message';
import {
  showToast,
  showToastBottom,
  toastConfigExport,
} from '../../Configs/ToastConfig';
import HeaderApp from '../../Components/HeaderApp/HeaderApp';
import styles from './Style';
import { IconGoogle } from '../../assets/SVG';
import InputText from './InputText';
import { useCreateAccountMutation } from '../../RTKQuery/Slides/slide';

const Register = ({ navigation }) => {
  const [createAccount, { data, error: err, isLoading }] = useCreateAccountMutation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userName, setUserName] = useState<string>();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [emailAndress, setEmailAndress] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [passConfirm, setPassConfirm] = useState<string>();
  const [isAllowBtn, setIsAllowBtn] = useState({
    username: false,
    firstName: false,
    email: false,
    password: false,
    passConfirm: false
  });

  const register = async () => {
    const isFormValid = Object.values(isAllowBtn).every(value => value === true);
    if (isFormValid) {
      if (password === passConfirm) {
        try {
          await createAccount({ username: userName, firstname: firstName, email: emailAndress, password: password }).unwrap();
          showToast('success', 'Đăng ký tài khoản thành công', "Chuyên sang màn hình đăng nhập");
          setTimeout(() => {
            navigation.navigate('Login');
          }, 3000);
        } catch {
          showToast('error', 'Lỗi đăng ký tài khoản', err?.data);
        }
      } else {
        showToast('warning', 'Mật khẩu không khớp');
      }
    } else {
      showToastBottom('warning', 'Vui lòng nhập đầy đủ thông tin!');
      !userName && setUserName("");
      !firstName && setFirstName("");
      !emailAndress && setEmailAndress("");
      !password && setPassword("");
      !passConfirm && setPassConfirm("");
    }
  };

  const setAllowField = (key: keyof typeof isAllowBtn, value: boolean) => {
    setIsAllowBtn(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <View style={{ backgroundColor: '#F6F6F6', flex: 1 }}>
      <HeaderApp bgColor='transparent' />
      <KeyboardAvoidingView
        behavior='position'
        style={{ flex: 1, backgroundColor: 'transparent' }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
          keyboardShouldPersistTaps="handled"
          style={styles.background}>
          <View style={styles.container}>
            <Text style={styles.logo}>Đăng ký tài khoản</Text>
            <TitleAction />
          </View>


          <InputText
            text={userName}
            setText={setUserName}
            onErrorChange={(hasError) => setAllowField('username', hasError)}
            placeholder={'Nhập tên người dùng...'}
            title={'Username'}
            iconUri={icons.username}
            checkValidate={{
              unique: 'Tên người dùng không được để trống!',
              max: { length: 8, text: 'Username bắt buộc phải có 8 ký tự' }
            }}
          />

          <InputText
            text={firstName}
            setText={setFirstName}
            onErrorChange={(hasError) => setAllowField('firstName', hasError)}
            placeholder={'Nhập tên'}
            title={'First name'}
            iconUri={icons.firstname}
            checkValidate={{
              unique: 'Tên không được để trống!',
            }}
          />
          {/* 
          <InputText
            text={lastName}
            setText={setLastName}
            placeholder={'Nhập tên người dùng...'}
            title={'Last name'}
            iconUri={icons.lastname}
          /> */}

          <InputText
            text={emailAndress}
            setText={setEmailAndress}
            onErrorChange={(hasError) => setAllowField('email', hasError)}
            placeholder={'Nhập Email người dùng...'}
            title={'Email'}
            iconUri={icons.email}
            checkValidate={{
              unique: 'Email không được để trống!',
            }}
            type='Email'
          />

          <InputText
            text={password}
            setText={setPassword}
            onErrorChange={(hasError) => setAllowField('password', hasError)}
            placeholder={'Nhập mật khẩu...'}
            title={'Password'}
            iconUri={icons.pass}
            checkValidate={{
              unique: 'Mật khẩu không được để trống!',
            }}
            type='Password'
          />

          <InputText
            text={passConfirm}
            setText={setPassConfirm}
            onErrorChange={(hasError) => setAllowField('passConfirm', hasError)}
            placeholder={'Xác nhận mật khẩu...'}
            title={'Password confirm'}
            iconUri={icons.pass}
            checkValidate={{
              unique: 'Mật khẩu không được để trống!',
            }}
            type='Password'
          />

          {!isLoading ? (
            <TouchableOpacity style={styles.btn_register} onPress={register}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: '800',
                  color: colors.black,
                }}>
                Đăng Ký
              </Text>
            </TouchableOpacity>
          ) : (
            <LottieView
              source={require('../../assets/animations/Animation - 1726832285926.json')}
              autoPlay
              loop
              style={{ width: 100, height: 100, alignSelf: 'center' }}
            />
          )}

          <View style={{ alignSelf: 'center' }}>
            <IconGoogle />
          </View>
          <TouchableOpacity
            style={{ width: '100%', alignItems: 'center', paddingBottom: 10 }}
            onPress={() => navigation.navigate('Login')}>
            <Text style={{ color: colors.gray, fontSize: 16 }}>
              Bạn đã có tài khoản
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <Toast config={toastConfigExport} />
      </KeyboardAvoidingView>
    </View>
  );
};

export default Register;

const TitleAction = () => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);
  const fullText = 'Đăng ký tài khoản và tham gia cùng bạn bè mới🌻';
  useEffect(() => {
    let intervalId;

    const handleTyping = () => {
      if (isDeleting) {
        if (displayText.length > 0) {
          setDisplayText(prev => prev.slice(0, -1));
        } else {
          setIsDeleting(false);
          setIndex(0);
        }
      } else {
        if (index < fullText.length) {
          setDisplayText(prev => prev + fullText[index]);
          setIndex(index + 1);
        } else {
          setIsDeleting(true);
        }
      }
    };

    intervalId = setInterval(handleTyping, 90);

    return () => clearInterval(intervalId);
  }, [displayText, isDeleting, index]);
  return (
    <View>
      <Text style={styles.text}>{displayText}</Text>
    </View>
  )
}
