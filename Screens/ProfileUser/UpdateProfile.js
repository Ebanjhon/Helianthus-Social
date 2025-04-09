import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import colors from "../../assets/color/colors";
import { useContext, useEffect, useState } from "react";
import icons from "../../assets/iconApp/icons";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImageCropPicker from "react-native-image-crop-picker";
import { authApi, endpoints } from "../../Configs/APIs";
import Toast from "react-native-toast-message";
import { showToast, toastConfigExport } from "../../Configs/ToastConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { UserContext } from "../../Configs/UserReducer";

const UpdateProfile = ({ navigation }) => {
    const [user, dispatch] = useContext(UserContext);
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [birth, setBirth] = useState("");
    const [avatar, setAvatar] = useState("");
    const [imagePath, setImagePath] = useState(null);
    const [isChange, setIsChange] = useState(false);
    const [loading, setLoading] = useState(false);


    // chọn ngày sinh 
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setBirth(formatDate(date));
        hideDatePicker();
    };

    // hàm định dạng ngày
    const formatDate = (date) => {
        // Lấy ngày, đảm bảo luôn có 2 chữ số
        const day = String(date.getDate()).padStart(2, '0');
        // Lấy tháng, cộng thêm 1 vì tháng bắt đầu từ 0
        const month = String(date.getMonth() + 1).padStart(2, '0');
        // Lấy năm
        const year = date.getFullYear();

        // Trả về chuỗi ngày tháng theo định dạng yyyy-MM-dd
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setPhone(user.phone);
        setEmail(user.email);
        setBirth(user.birth);
        setAvatar(user.avatar);
    }, []);

    const openImageLibrary = () => {
        ImageCropPicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,   // Bật tính năng cắt ảnh
            cropperToolbarTitle: 'Cắt ảnh',
            cropperCircleOverlay: true,
        }).then(image => {
            setImagePath(image);
            setAvatar(image.path);
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
        if (imagePath !== null || isChange) {
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
                // showToast('success', 'Thông báo!', 'Cập nhật thông tin hoàn tất.');
                showToast('success', 'Cập nhật thông tin thành công!');

                // Đặt lại đường dẫn hình ảnh
                setImagePath(null);
                setIsChange(false);
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
            const response = await api.post(endpoints['update-avatar'], formData, {
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
        if (imagePath !== null && isChange) {
            updateProfile();
            updateAvatar();
        } else if (isChange) {
            updateProfile();
        } else {
            updateAvatar();
        }
    };

    const updateProfile = async () => {
        const userData = {
            id: user.id,
            firstName: firstname,
            lastName: lastname,
            username: user.username,
            gender: '',
            email: email,
            avatar: '',
            phone: phone,
            role: 'ROLE_USER',
            birth: birth,
            active: true,
        };

        try {
            setLoading(true);
            console.log("1");
            const api = await authApi();
            const response = await api.put(endpoints['update-profile'], userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                setLoading(false);
                fetdata();
            } else {
                setLoading(false);
                console.log("Có lỗi xảy ra:", response.data);
            }
        } catch (error) {
            console.log("Lỗi kết nối hoặc lỗi không xác định:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (firstname !== user.firstName || lastname !== user.lastName || phone !== user.phone || email !== user.email || birth !== user.birth || avatar !== user.avatar) {
            setIsChange(true);
            console.log("change");
        } else {
            setIsChange(false);
            console.log("change!");
        }
    }, [avatar, email, phone, firstname, lastname, birth])

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

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ height: 90 }}>
                <View style={styles.container}>

                    <Image
                        style={{ width: 130, height: 130, borderRadius: 3, borderRadius: 100, borderColor: colors.info, borderWidth: 4 }}
                        source={{
                            uri: avatar === ""
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
                                onChangeText={(e) => setFirstName(e)}
                                style={styles.input}
                            />
                        </View>
                    </View>

                    <View style={{ width: '90%', marginBottom: 10 }}>
                        <Text style={styles.title}>Họ</Text>
                        <View style={styles.contain_item}>
                            <TextInput
                                value={lastname}
                                onChangeText={(e) => setLastName(e)}
                                style={styles.input}
                            />
                        </View>
                    </View>

                    <View style={{ width: '90%', marginBottom: 10 }}>
                        <Text style={styles.title}>Email</Text>
                        <View style={styles.contain_item}>
                            <TextInput
                                value={email}
                                keyboardType="email-address"
                                onChangeText={(e) => setEmail(e)}
                                style={styles.input}
                            />
                        </View>
                    </View>

                    <View style={{ width: '90%', marginBottom: 10 }}>
                        <Text style={styles.title}>Số điện thoại</Text>
                        <View style={styles.contain_item}>
                            <TextInput
                                value={phone}
                                onChangeText={(e) => setPhone(e)}
                                style={styles.input}
                                keyboardType="phone-pad"
                                maxLength={10}
                                placeholder='Số điện thoại'
                            />
                        </View>
                    </View>

                    <View style={{ width: '90%', marginBottom: 40 }}>
                        <Text style={styles.title}>Ngày sinh</Text>
                        <View style={[styles.contain_item, { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', height: 50, paddingLeft: 10 }]}>
                            <TouchableOpacity
                                onPress={showDatePicker}>
                                <Image
                                    style={{ width: 30, height: 30, tintColor: colors.black }}
                                    source={{ uri: icons.email }}
                                />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 18, fontWeight: '500', color: colors.black, paddingLeft: 10 }}>{birth}</Text>

                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                maximumDate={new Date()} // Giới hạn ngày tối đa là hôm nay
                                date={new Date(2000, 0, 1)} // Ngày mặc định (1/1/2000)
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                            />
                        </View>

                    </View>

                    {isChange ? (
                        <>
                            {loading ? (
                                <>
                                    <Text>loading...</Text>
                                </>
                            ) : (
                                <TouchableOpacity
                                    onPress={update}
                                    style={{ width: '90%', height: 60, backgroundColor: colors.info, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                                    <Text style={{ fontSize: 30, fontWeight: '700' }}>Cập nhật</Text>
                                </TouchableOpacity>
                            )}
                        </>
                    ) : (
                        <View
                            onPress={update}
                            style={{ width: '90%', height: 60, backgroundColor: colors.gray, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                            <Text style={{ fontSize: 30, fontWeight: '700' }}>Cập nhật</Text>
                        </View>
                    )}
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