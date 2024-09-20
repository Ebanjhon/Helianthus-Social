import React, { useEffect, useState } from 'react'
import { Button, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native'
import colors from '../../assets/color/colors';
import icons from '../../assets/iconApp/icons';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import apiWithoutAuth, { endpoints } from '../../Configs/APIs';


const Register = ({ navigation }) => {
    const [userName, setUserName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [passConfirm, setPassConfirm] = useState("");
    const [gender, setGender] = useState("");
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios'); // Sử dụng Platform để kiểm tra nếu đang chạy trên iOS
        setDate(currentDate);
    };

    const showDatepicker = () => {
        setShow(true);
    };
    // bắt lỗi và hiển thị

    const [errors, setErrors] = useState({
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
        pass1: '',
        pass2: '',
        date: '',
    });

    // Hàm kiểm tra tất cả các trường input
    function validateInputs() {
        let newErrors = {};

        if (userName.length === 0) {
            newErrors.userName = 'Không được để trống tên người dùng!';
        }

        if (hasWhitespace(userName)) {
            newErrors.userName = 'Tên người dùng không được chứa khoảng trắng!';
        }

        if (firstName.length === 0) {
            newErrors.firstName = 'Không được để trống mục này!';
        }

        if (lastName.length === 0) {
            newErrors.lastName = 'Không được để trống mục này!';
        }

        if (!validateEmail(email)) {
            newErrors.email = 'email nhập chưa chính xác!';
        }

        if (email.length === 0) {
            newErrors.email = 'email không được bỏ trống!';
        }

        if (password !== passConfirm) {
            newErrors.pass1 = 'mật khẩu không khớp!';
            newErrors.pass2 = 'mật khẩu không khớp!';
        }

        if (password.length === 0) {
            newErrors.pass1 = 'vui lòng nhập mật khẩu!';
        }

        if (passConfirm.length === 0) {
            newErrors.pass2 = 'vui lòng nhập mật khẩu!';
        }

        setErrors(newErrors);

        // Nếu không có lỗi nào, thực hiện hành động tiếp theo
        if (Object.keys(newErrors).length === 0) {
            return true;
        }
        return false;
    };

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function hasWhitespace(str) {
        const whitespaceRegex = /\s/;
        return whitespaceRegex.test(str);
    }


    // hiển thị nội dung chạy chữ
    const [displayText, setDisplayText] = useState('');  // Lưu văn bản hiển thị
    const [isDeleting, setIsDeleting] = useState(false);  // Kiểm soát trạng thái nhập hay xóa
    const [index, setIndex] = useState(0);  // Đặt index trong state để kiểm soát ký tự hiện tại
    const fullText = 'Đăng ký tài khoản và tham gia cùng bạn bè'; // Văn bản đầy đủ
    useEffect(() => {
        let intervalId;

        const handleTyping = () => {
            if (isDeleting) {
                // Khi đang xóa từng ký tự
                if (displayText.length > 0) {
                    setDisplayText((prev) => prev.slice(0, -1));  // Xóa ký tự cuối cùng
                } else {
                    setIsDeleting(false);  // Khi xóa hết, chuyển lại trạng thái nhập
                    setIndex(0);  // Đặt lại index về 0 để nhập lại từ đầu
                }
            } else {
                // Khi đang nhập từng ký tự
                if (index < fullText.length) {
                    setDisplayText((prev) => prev + fullText[index]);  // Thêm ký tự vào
                    setIndex(index + 1);  // Tăng index
                } else {
                    setIsDeleting(true);  // Khi nhập đủ, chuyển trạng thái sang xóa
                }
            }
        };

        intervalId = setInterval(handleTyping, 50); // Điều chỉnh tốc độ ở đây (100ms)

        return () => clearInterval(intervalId);  // Dọn dẹp interval khi component unmount
    }, [displayText, isDeleting, index]); // Thực thi lại khi displayText, isDeleting, hoặc index thay đổi

    // định dạng ngày sinh
    function formatDate(isoString) {
        const date = new Date(isoString);

        const day = date.getDate().toString().padStart(2, '0');   // Lấy ngày (định dạng 2 chữ số)
        const month = (date.getMonth() + 1).toString().padStart(2, '0');  // Lấy tháng (tháng trong JS bắt đầu từ 0)
        const year = date.getFullYear();  // Lấy năm

        return `${day}/${month}/${year}`;  // Định dạng ngày/tháng/năm
    }

    // hàm đăng ký

    const register = async () => {
        if (validateInputs()) {
            const userData = {
                role: 'ROLE_USER',
                gender: gender,
                username: userName,
                firstname: firstName,
                lastname: lastName,
                password: password,
                email: email,
                avatar: "",
                phone: phone,
            };
            try {
                // Gọi API để đăng nhập
                const response = await apiWithoutAuth.post(endpoints.register, userData);

                if (response.status === 201) {
                    console.log("User created successfully with ID:", response.data.id);
                    navigation.navigate('Login');
                } else {
                    console.log("Có lỗi xảy ra:", response.data);
                }
            } catch (error) {
                if (error.response && error.response.status === 409) {
                    console.log("Lỗi:", error.response.data); // Xử lý lỗi do email hoặc username đã tồn tại
                } else {
                    console.log("Lỗi kết nối hoặc lỗi không xác định:", error.message);
                }
            }
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}  // Điều chỉnh khoảng cách cho bàn phím
            style={{ flex: 1, backgroundColor: 'transparent' }}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
                style={styles.background}>

                <View style={styles.container}>
                    <Text style={styles.logo}>Register</Text>
                    <Text style={styles.text}>{displayText}</Text>
                </View>
                <View style={styles.contai_form}>

                    <View style={{ width: '90%', marginBottom: 5 }}>
                        <Text style={styles.text_show}>UserName</Text>
                        <View style={styles.input_contai}>
                            <Image
                                style={{ width: 30, height: 30 }}
                                source={{ uri: icons.username }} />
                            <TextInput
                                value={userName}
                                onChangeText={setUserName}
                                placeholder='Tên người dùng'
                                style={styles.text_input}>
                            </TextInput>
                        </View>
                        {errors.userName ? <Text style={styles.text_error}>{errors.userName}</Text> : null}
                    </View>

                    <View style={{ width: '90%', marginBottom: 5 }}>
                        <Text style={styles.text_show}>FirstName</Text>
                        <View style={styles.input_contai}>
                            <Image
                                style={{ width: 30, height: 30 }}
                                source={{ uri: icons.firstname }} />
                            <TextInput
                                value={firstName}
                                onChangeText={setFirstName}
                                placeholder='Tên'
                                style={styles.text_input}>

                            </TextInput>
                        </View>
                        {errors.firstName ? <Text style={styles.text_error}>{errors.firstName}</Text> : null}
                    </View>

                    <View style={{ width: '90%', marginBottom: 5 }}>
                        <Text style={styles.text_show}>LastName</Text>
                        <View style={styles.input_contai}>
                            <Image
                                style={{ width: 30, height: 30 }}
                                source={{ uri: icons.lastname }} />
                            <TextInput
                                value={lastName}
                                onChangeText={setLastName}
                                placeholder='Họ'
                                style={styles.text_input}>
                            </TextInput>
                        </View>
                        {errors.lastName ? <Text style={styles.text_error}>{errors.lastName}</Text> : null}
                    </View>

                    <View style={{ width: '90%', marginBottom: 5 }}>
                        <Text style={styles.text_show}>Email</Text>
                        <View style={styles.input_contai}>
                            <Image
                                style={{ width: 30, height: 30 }}
                                source={{ uri: icons.email }} />
                            <TextInput
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                placeholder='Email liên hệ'
                                style={styles.text_input}>
                            </TextInput>
                        </View>
                        {errors.email ? <Text style={styles.text_error}>{errors.email}</Text> : null}
                    </View>

                    <View style={{ width: '90%', marginBottom: 5 }}>
                        <Text style={styles.text_show}>Phone</Text>
                        <View style={styles.input_contai}>
                            <Image
                                style={{ width: 30, height: 30 }}
                                source={{ uri: icons.phone }} />
                            <TextInput
                                value={phone}
                                onChangeText={setPhone}
                                keyboardType="phone-pad"
                                placeholder='Số điện thoại'
                                style={styles.text_input}>

                            </TextInput>
                        </View>
                    </View>

                    <View style={{ width: 'auto', marginBottom: 5 }}>
                        <Text style={styles.text_show}>Gender</Text>
                        <View style={styles.input_contai}>
                            <Picker
                                selectedValue={gender}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                            >
                                <Picker.Item label="Nam" value="MALE" />
                                <Picker.Item label="Nữ" value="FEMALE" />
                                <Picker.Item label="Khác" value="OTHER" />
                            </Picker>
                        </View>
                    </View>

                    <View style={{ width: '90%', marginBottom: 5 }}>
                        <Text style={styles.text_show}>Birth</Text>
                        <View style={styles.input_contai}>
                            <Image
                                style={{ width: 30, height: 30 }}
                                source={require('../../assets/images/icondate.png')} />
                            <Button onPress={showDatepicker} title="Chọn ngày" />
                            {show && (
                                <DateTimePicker
                                    value={date}
                                    mode="date"
                                    display="default"
                                    onChange={onChange}
                                />
                            )}
                            {Platform.OS === 'android' && (
                                <Text style={{ fontSize: 19, fontWeight: '400', marginLeft: 10 }}>
                                    {date.toLocaleDateString()}
                                </Text>
                            )}
                        </View>
                    </View>

                    <View style={{ width: '90%', marginBottom: 5 }}>
                        <Text style={styles.text_show}>Password</Text>
                        <View style={styles.input_contai}>
                            <Image
                                style={{ width: 25, height: 25 }}
                                source={{ uri: icons.pass }} />
                            <TextInput
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={showPass}
                                placeholder='Nhập mật khẩu'
                                style={styles.text_input}>

                            </TextInput>
                            <TouchableOpacity onPress={() => setShowPass(prevShowPass => !prevShowPass)}>
                                <Image
                                    style={{ width: 30, height: 30 }}
                                    source={showPass
                                        ? require('../../assets/images/iconhide.png')  // Nếu showPass là true
                                        : require('../../assets/images/iconsee.png')  // Nếu showPass là false
                                    } />
                            </TouchableOpacity>
                        </View>
                        {errors.pass1 ? <Text style={styles.text_error}>{errors.pass1}</Text> : null}
                    </View>

                    <View style={{ width: '90%', marginBottom: 5 }}>
                        <Text style={styles.text_show}>Password Again</Text>
                        <View style={styles.input_contai}>
                            <Image
                                style={{ width: 25, height: 25 }}
                                source={{ uri: icons.pass }} />
                            <TextInput
                                value={passConfirm}
                                onChangeText={setPassConfirm}
                                returnKeyType="done"
                                secureTextEntry={showPass}
                                placeholder='Nhập lại mật khẩu'
                                style={styles.text_input}>

                            </TextInput>
                            <TouchableOpacity onPress={() => setShowPass(prevShowPass => !prevShowPass)}>
                                <Image
                                    style={{ width: 30, height: 30 }}
                                    source={showPass
                                        ? require('../../assets/images/iconhide.png')  // Nếu showPass là true
                                        : require('../../assets/images/iconsee.png')  // Nếu showPass là false
                                    } />
                            </TouchableOpacity>
                        </View>
                        {errors.pass2 ? <Text style={styles.text_error}>{errors.pass2}</Text> : null}
                    </View>

                    <TouchableOpacity style={styles.btn_register} onPress={register}>
                        <Text style={{ fontSize: 21, fontWeight: '700', color: colors.black }}>Đăng Ký</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={{ width: '100%', alignItems: 'center' }}
                    onPress={() => navigation.navigate('Login')}>
                    <Text style={{ color: colors.dark }}>Bạn đã có tài khoản</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    background: {
        backgroundColor: colors.white
    },
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 10,
    },
    logo: {
        fontSize: 43,
        color: colors.gold,
        fontWeight: '900',
    },
    text: {
        fontSize: 18,
        color: colors.black,
    },
    contai: {

        justifyContent: 'flex-end'
    },
    contai_form: {
        width: '100%',
        height: 'auto',
        alignItems: 'center',
        marginBottom: 40,
    },
    input_contai: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 30,
        padding: 8,
        borderColor: colors.gold,
        alignItems: 'center',
    },
    text_input: {
        fontSize: 19,
        width: '80%',
        paddingLeft: 5,
        fontWeight: '500',
    },
    text_show: {
        fontSize: 17,
        fontWeight: '500',
        color: colors.dark
    },
    picker: {
        width: 200,
    },
    btn_register: {
        width: '90%',
        height: 60,
        borderRadius: 50,
        backgroundColor: colors.gold,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    text_error: {
        color: colors.danger,

    }

});

export default Register

// https://icons8.com/icons/3d-fluency