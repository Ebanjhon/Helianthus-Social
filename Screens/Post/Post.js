import { Button, FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./PostStyle";
import SlideUpView from "./SlideUp";
import React, { useContext, useState } from "react";
import colors from "../../assets/color/colors";
import icons from '../../assets/iconApp/icons';
import { UserContext } from "../../Configs/Context";
import ImagePicker from 'react-native-image-crop-picker';
import { ActivityIndicator } from "react-native";
import Slider from '@react-native-community/slider';
import { launchImageLibrary } from 'react-native-image-picker';
import { authApi, endpoints } from "../../Configs/APIs";

const Post = ({ navigation }) => {
    const [content, setContent] = React.useState('');
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, dispatch] = useContext(UserContext);

    const [showEditor, setShowEditor] = useState(false);

    // hàm lấy ảnh
    // Chọn nhiều ảnh từ thư viện
    const openImageLibrary = () => {
        ImagePicker.openPicker({
            multiple: true,      // Cho phép chọn nhiều ảnh
            mediaType: 'photo',
        }).then(selectedImages => {
            const imageUris = selectedImages.map(image => image.path); // Lấy đường dẫn của các ảnh
            setImages(imageUris); // Lưu vào state
        });
    };

    // Mở camera và thêm ảnh vào danh sách
    const openCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            setImages([...images, image.path]); // Thêm ảnh từ camera vào danh sách
        });
    };

    // xóa ảnh danh sách
    const removeImage = (index) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);  // Xóa phần tử tại vị trí 'index'
        setImages(updatedImages);  // Cập nhật state
    };

    // hàm gọi edit ảnh
    const startEdit = (url) => {
        setShowEditor(true);
        manipulateImage(url);
    };


    // hàm tạo bài viết
    const createPost = async () => {
        let formData = new FormData();

        // Thêm dữ liệu userId và content vào form
        formData.append('userId', user.id);
        formData.append('content', content);
        // Thêm từng ảnh vào FormData
        images.forEach((image, index) => {
            const file = {
                uri: image, // Sử dụng đúng đường dẫn ảnh từ ImagePicker (path)
                type: 'image/jpeg', // Loại MIME của ảnh
                name: `photo_${index}.jpg`, // Tên ảnh
            };
            formData.append('files', file);
        });

        try {
            console.log(formData)
            const api = await authApi();
            const response = await api.post(endpoints['create-post'], formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            setImages([]);
            setContent('');
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error creating post:', error);
            throw error;
        }
    };

    return (
        <View style={styles.contai_post}>
            {showEditor && <>
                <View style={styles.fullScreenView}>

                </View>
            </>}

            <SlideUpView>
                <View style={styles.head_post}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={{ fontSize: 18, fontWeight: '500', color: colors.dark }}>Hủy</Text>
                    </TouchableOpacity>

                    <Text style={{ fontSize: 20, fontWeight: '500' }}>Tạo bài viết</Text>

                    <TouchableOpacity onPress={createPost}>
                        <Text style={{ fontSize: 18, fontWeight: '500', color: colors.dark }}>Đăng</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.border_head} />

                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{ width: '100%', minHeight: 90 }}
                    data={images}
                    keyExtractor={(item, index) => index.toString()}  // Đảm bảo mỗi ảnh có key duy nhất
                    renderItem={({ item, index }) => (
                        <View style={styles.media_contai}>
                            {/* hiện thị hình đã chọn tại đây */}
                            <Image
                                style={styles.media}
                                source={{ uri: item }}  // Sử dụng item trực tiếp nếu nó là đường dẫn ảnh
                            />

                            <TouchableOpacity style={styles.remove} onPress={() => removeImage(index)}>
                                <Image style={{ width: 30, height: 30 }} source={{ uri: icons.remove }} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={startEdit}
                                style={styles.edit_media}>
                                <Text style={{ fontSize: 18, fontWeight: '700', color: colors.xamtrang }}>Chỉnh sửa</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    ListEmptyComponent={
                        loading && (
                            <View>
                                <Text>Loading...</Text>
                            </View>)
                    }
                    ListHeaderComponent={
                        <>
                            <View style={{ marginBottom: 7, flexDirection: 'row' }}>
                                <Image
                                    style={{ width: 50, height: 50, borderRadius: 3 }}

                                    source={{
                                        uri: user.avatar === ""
                                            ? 'https://i.pinimg.com/564x/25/ee/de/25eedef494e9b4ce02b14990c9b5db2d.jpg'
                                            : user.avatar
                                    }} />
                                <View>
                                    <Text style={styles.text_name}>{user.firstName} {user.lastName}</Text>
                                    <Text style={{ marginLeft: 10, color: colors.gray }}>Bài viết đang ở chế độ công khai</Text>
                                </View>
                            </View>
                            <View style={styles.content_post}>
                                <TextInput
                                    style={styles.textInput}
                                    multiline={true}
                                    numberOfLines={3} // Số dòng hiển thị mặc định (có thể tuỳ chỉnh)
                                    value={content}
                                    onChangeText={(text) => setContent(text)}
                                    placeholder="Hãy nhập nội dung tại đây..."
                                />
                            </View>

                            <View style={{ alignItems: 'center' }}>
                                {/* <View style={styles.border_content} /> */}
                                <View style={styles.get_media}>
                                    <TouchableOpacity
                                        onPress={openImageLibrary}
                                        style={styles.get_media_contain}>
                                        <Text style={styles.textv1}>Ảnh/video</Text>
                                        <Image
                                            style={{ width: 35, height: 35, tintColor: colors.xam }}
                                            source={{ uri: icons.image }} />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={openCamera}
                                        style={styles.get_media_contain}>
                                        <Text style={styles.textv1}>Chụp ảnh</Text>
                                        <Image
                                            style={{ width: 40, height: 40, tintColor: colors.xam }}
                                            source={{ uri: icons.camera }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </>
                    }
                />
            </SlideUpView >
        </View >
    )
};

export default Post
