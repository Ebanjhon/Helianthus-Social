import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import colors from "../../assets/color/colors";
import { useContext, useState } from "react";
import { UserContext } from "../../Configs/Context";
import icons from "../../assets/iconApp/icons";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImageCropPicker from "react-native-image-crop-picker";
import { authApi, endpoints } from "../../Configs/APIs";
import Toast from "react-native-toast-message";
import { showToast, toastConfigExport } from "../../Configs/ToastConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";


const UpdateProfile = ({ navigation }) => {
    const [user, dispatch] = useContext(UserContext);
    const [username, setUserName] = useState(user.username);
    const [firstname, setFirstName] = useState(user.firstName);
    const [lastname, setLastName] = useState(user.lastName);
    const [phone, setPhone] = useState(user.phone);
    const [email, setEmail] = useState(user.email);
    const [gender, setGender] = useState(user.gender);
    const [birth, setBirth] = useState(user);
    const [avatar, setAvatar] = useState(user.avatar);
    const [imagePath, setImagePath] = useState(null);


    const openImageLibrary = () => {
        ImageCropPicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,   // Bật tính năng cắt ảnh
            cropperToolbarTitle: 'Cắt ảnh',
            cropperCircleOverlay: true, // Nếu muốn hình cắt là hình tròn
        }).then(image => {
            setImagePath(image);
            setAvatar(image.path); // Đường dẫn ảnh đã cắt
        }).catch(error => {
            console.log('Error selecting image:', error);
        });
    };

    // Mở camera
    const moCam = () => {
        launchCamera({ mediaType: 'photo' }, (response) => {
            if (!response.didCancel && !response.error) {
                console.log(response.assets[0].uri);
            }
        });
    };

    const back = () => {
        if (imagePath !== null) {
            Alert.alert(
                "Thông báo!",
                "Bạn có muốn tiếp tục chỉnh sửa?",
                [
                    {
                        text: "Hủy chỉnh sửa",
                        onPress: () => navigation.navigate('Setting'),
                        style: "cancel"

                    },
                    {
                        text: "Tiếp tục chỉnh sửa",
                    }
                ]
            );
        } else {
            navigation.navigate('Setting');
        }
    };

    const fetdata = async () => {
        try {
            const api = await authApi();

            // Gọi API để lấy thông tin người dùng hiện tại
            const userResponse = await api.get(endpoints['current-user']);

            if (userResponse.status === 200 && userResponse.data) {
                // Lưu thông tin người dùng vào AsyncStorage
                await AsyncStorage.setItem('user', JSON.stringify(userResponse.data));

                // Cập nhật trạng thái ứng dụng (cập nhật avatar)
                dispatch({
                    type: "update_avatar",
                    payload: { avatar: userResponse.data.avatar } // Giả sử API trả về đường dẫn avatar mới
                });

                // Hiển thị thông báo thành công
                showToast('success', 'Cập nhật ảnh đại diện thành công!');

                // Đặt lại đường dẫn hình ảnh
                setImagePath(null);

            } else {
                console.error('Lỗi: Không thể lấy thông tin người dùng.');
            }
        } catch (error) {
            console.error('Lỗi khi gọi API:', error.message);
            showToast('error', 'Đã xảy ra lỗi khi cập nhật ảnh đại diện!');
        }
    };


    const updateAvatar = async () => {
        const fileName = imagePath.path.substring(imagePath.path.lastIndexOf('/') + 1) || `avatar_${user.id}.jpg`;
        // Tạo tên file mới với cả tên ảnh và id của người dùng
        const newFileName = `avatar_${user.id}_${fileName}`;

        // Xác định MIME type dựa trên phần mở rộng của file
        const fileExtension = newFileName.split('.').pop().toLowerCase(); // Lấy phần mở rộng file
        let mimeType = 'image/jpeg'; // Mặc định là JPEG
        if (fileExtension === 'png') {
            mimeType = 'image/png'; // Nếu là PNG, đặt MIME type là image/png
        }

        const formData = new FormData();
        formData.append('file', {
            uri: imagePath.path,
            name: newFileName,  // Đặt tên file mới
            type: mimeType,     // Đặt MIME type phù hợp
        });

        formData.append('idUser', user.id);

        try {
            const api = await authApi();
            const response = await api.put(endpoints['update-avatar'], formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                fetdata();
            }

        } catch (error) {
            showToast('error', 'Lỗi Cập nhật ảnh!', error);
        }

    };

    const update = () => {
        updateAvatar();
    };

    return (
        <>
            <Toast config={toastConfigExport} />
            <View style={{ backgroundColor: colors.light, width: '100%', height: 50, elevation: 9, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                <TouchableOpacity
                    onPress={back}
                    style={{ width: 50, alignItems: 'center', height: 50, justifyContent: 'center' }}>
                    <Image
                        style={{ width: 30, height: 30, tintColor: colors.black }}
                        source={{ uri: icons.back_head }}
                    />
                </TouchableOpacity>

                <Text style={styles.title}>Cập nhật tài khoản</Text>
                <Text style={{ width: 50 }}></Text>
            </View>

            <ScrollView style={{ height: 90 }}>
                <View style={styles.container}>

                    <Image
                        style={{ width: 130, height: 130, borderRadius: 3, borderRadius: 100, borderColor: colors.info, borderWidth: 4 }}
                        source={{
                            uri: avatar === null
                                ? 'https://i.pinimg.com/564x/25/ee/de/25eedef494e9b4ce02b14990c9b5db2d.jpg'
                                : avatar
                        }} />

                    <TouchableOpacity
                        onPress={openImageLibrary}
                        style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}
                    >
                        <Image
                            style={{ width: 40, height: 40 }}
                            source={{ uri: icons.camera }}
                        />
                        <Text style={styles.title}>Chọn ảnh đại diện</Text>
                    </TouchableOpacity>


                    <View style={{ width: '90%', marginBottom: 10 }}>
                        <Text style={styles.title}>Tên</Text>
                        <View style={styles.contain_item}>
                            <TextInput
                                value={firstname}
                                onChange={() => setFirstName}
                                style={styles.input}
                            />
                        </View>
                    </View>

                    <View style={{ width: '90%', marginBottom: 10 }}>
                        <Text style={styles.title}>Họ</Text>
                        <View style={styles.contain_item}>
                            <TextInput
                                value={lastname}
                                onChange={() => setLastName}
                                style={styles.input}
                            />
                        </View>
                    </View>

                    <View style={{ width: '90%', marginBottom: 10 }}>
                        <Text style={styles.title}>Email</Text>
                        <View style={styles.contain_item}>
                            <TextInput
                                value={email}
                                onChange={() => setEmail}
                                style={styles.input}
                            />
                        </View>
                    </View>

                    <View style={{ width: '90%', marginBottom: 10 }}>
                        <Text style={styles.title}>Số điện thoại</Text>
                        <View style={styles.contain_item}>
                            <TextInput
                                value={phone}
                                onChange={() => setPhone}
                                style={styles.input}
                            />
                        </View>
                    </View>

                    <View style={{ width: '90%', marginBottom: 10 }}>
                        <Text style={styles.title}>Ngày sinh</Text>
                        <View style={[styles.contain_item, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
                            {/* <Text>{birth}</Text> */}
                            <Image
                                style={{ width: 30, height: 30, tintColor: colors.black }}
                                source={{ uri: icons.email }}
                            />
                        </View>
                    </View>

                    <View style={{ width: '90%', marginBottom: 10, }}>
                        <Text style={styles.title}>Giới tính</Text>
                        <View style={styles.contain_item}>
                            <Text style={styles.input}>{gender}</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={update}
                        style={{ width: '90%', height: 60, backgroundColor: colors.info, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                        <Text style={{ fontSize: 30, fontWeight: '700' }}>Cập nhật</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        padding: 10,
        alignContent: 'center',
        alignItems: 'center',

    },
    contain_item: {
        width: '100%',
        height: "auto",
        backgroundColor: colors.white,
        borderRadius: 10,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.dark,

    },
    input: {
        fontSize: 18,
        fontWeight: '500',
        paddingLeft: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        color: colors.black
    }
});
export default UpdateProfile