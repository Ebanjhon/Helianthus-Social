import { Button, FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./PostStyle";
import SlideUpView from "./SlideUp";
import React, { useContext, useEffect, useRef, useState } from "react";
import colors from "../../assets/color/colors";
import icons from '../../assets/iconApp/icons';
import ImagePicker from 'react-native-image-crop-picker';
import { authApi, endpoints } from "../../Configs/APIs";
import Toast from 'react-native-toast-message';
import { showToast, toastConfigExport } from '../../Configs/ToastConfig';
import PhotoManipulator from 'react-native-photo-manipulator';
import Slider from '@react-native-community/slider';  // Import Slider
import ViewShot, { captureRef } from 'react-native-view-shot';
import {
    Grayscale,
    Sepia,
    Tint,
    ColorMatrix,
    concatColorMatrices,
    invert,
    contrast,
    saturate,
    Saturate,
    Brightness,
    Contrast,
    Invert,
    HueRotate,
    brightness
} from 'react-native-color-matrix-image-filters';
import filter from "../../assets/color/filter";
import { UserContext } from "../../Configs/UserReducer";

const Post = ({ navigation }) => {
    const [content, setContent] = React.useState('');
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user, dispatch } = useContext(UserContext);
    const [showEditor, setShowEditor] = useState(false);
    const [loadUpdate, setLoadUpdate] = useState(true);
    const [imageUri, setImageUri] = useState(null);
    const viewShotRef = useRef();
    const [typeEdit, setTypeEdit] = useState(null);

    const filterData = Object.keys(filter).map(key => ({
        name: key,
        matrix: filter[key],
    }));

    const [filterImage, setFilterImage] = useState(filter.normal);

    // lấy ảnh sau khi sửa
    const captureImage = () => {
        viewShotRef.current.capture().then(uri => {
            console.log("Image saved to", uri);
            // Tìm vị trí của ảnh hiện tại trong mảng images
            const imageIndex = images.indexOf(imageUri);

            if (imageIndex !== -1) {
                // Tạo mảng mới với ảnh tại vị trí hiện tại được thay thế bằng ảnh mới
                const updatedImages = [...images];
                updatedImages[imageIndex] = uri;

                // Cập nhật mảng images và ảnh hiện tại
                setImages(updatedImages);
                setImageUri(uri); // Cập nhật ảnh hiện tại với URI mới
            }
            // cập nhật giá trị thanh kéo
            setBrightness(0);
            setSaturation(1);
            setContrast(1);
            // tắt màn chỉnh
            setShowEditor(false);
        });
    };
    // huyr chinh ảnh
    const cancel_edit = () => {
        setBrightness(0);
        setSaturation(1);
        setContrast(1);
        // tắt màn chỉnh
        setShowEditor(false);
    };

    // hàm lấy ảnh
    // Chọn nhiều ảnh từ thư viện
    const openImageLibrary = () => {
        ImagePicker.openPicker({
            multiple: true,      // Cho phép chọn nhiều ảnh
            mediaType: 'photo',
        }).then(selectedImages => {
            if (selectedImages.length > 0) {
                const imageUris = selectedImages.map(image => image.path); // Lấy đường dẫn của các ảnh
                setImages(prevImages => [...prevImages, ...imageUris]);
            } else {
                console.log('Không có ảnh nào được chọn');
            }
        }).catch(error => {
            if (error.code === 'E_PICKER_CANCELLED') {
                // Người dùng đã hủy bỏ chọn ảnh
                console.log('Người dùng đã hủy quá trình chọn ảnh');
            } else {
                console.log('Có lỗi xảy ra: ', error);
            }
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

    // hàm tạo bài viết
    const createPost = async () => {
        let formData = new FormData();
        // Thêm dữ liệu userId và content vào form
        formData.append('userId', user.id);
        formData.append('content', content);
        // Thêm từng ảnh vào FormData
        if (images.length === 0) {
            formData.append('files', []);
        } else {
            images.forEach((image, index) => {
                const file = {
                    uri: image, // Sử dụng đúng đường dẫn ảnh từ ImagePicker (path)
                    type: 'image/jpeg', // Loại MIME của ảnh
                    name: `photo_${index}.jpg`, // Tên ảnh
                };
                formData.append('files', file);
            });
        }

        try {
            setLoadUpdate(false);
            const api = await authApi();
            const response = await api.post(endpoints['create-post'], formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
                setImages([]);
                setContent('');
                showToast('success', 'Message!', 'Đăng tải bài viết thành công.');
                setTimeout(() => {
                    setLoadUpdate(true);
                    navigation.navigate('Home');
                }, 3000);
            }
        } catch (error) {
            setLoadUpdate(true);
            console.error('Error creating post:', error);
            throw error;
        }
    };

    // chọn ảnh để edit
    const pick_edit_filter = (uri, type) => {
        setShowEditor(true);
        setImageUri(uri);
        setTypeEdit(type);
    };

    // Hàm cắt ảnh tự dộng
    // const cropImage = async (uri) => {
    //     const cropRegion = { x: 0, y: 0, height: 200, width: 200 }; // Định nghĩa vùng cắt
    //     try {
    //         const croppedImageUri = await PhotoManipulator.crop(uri, cropRegion);
    //         console.log('Cropped Image URI:', croppedImageUri);
    //         setImages(prevImages => prevImages.map(img => (img === uri ? croppedImageUri : img))); // Thay thế ảnh gốc bằng ảnh đã cắt
    //     } catch (error) {
    //         console.error('Có lỗi xảy ra khi cắt ảnh:', error);
    //     }
    // };

    // Hàm cắt ảnh và cập nhật danh sách
    const cropImage = (uri) => {
        ImagePicker.openCropper({
            path: uri,
            width: 300,  // Chiều rộng vùng cắt
            height: 400, // Chiều cao vùng cắt, để đảm bảo tỉ lệ 3:4
            cropping: true, // Bật tính năng cắt ảnh
        }).then(croppedImage => {
            const croppedImageUri = croppedImage.path;
            // Cập nhật danh sách ảnh sau khi cắt
            setImages(prevImages => prevImages.map(img => (img === uri ? croppedImageUri : img)));
        }).catch(error => {
            if (error.code === 'E_PICKER_CANCELLED') {
                console.log('Người dùng đã hủy quá trình cắt ảnh');
            } else {
                console.error('Có lỗi xảy ra khi cắt ảnh:', error);
            }
        });
    };

    // Ma trận độ sáng
    const [brightness, setBrightness] = useState(0); // Độ sáng (mặc định là 0)
    const [saturation, setSaturation] = useState(1); // Độ bão hòa (mặc định là 1)
    const [contrast, setContrast] = useState(1); // Độ tương phản (mặc định là 1)
    const contrastFactor = (contrast + 1) / 2;
    // Ma trận độ sáng (với độ sáng 0, ma trận sẽ không thay đổi màu sắc)
    const brightnessMatrix = [
        contrastFactor, 0, 0, 0, brightness, // Cột cho kênh đỏ
        0, contrastFactor, 0, 0, brightness, // Cột cho kênh xanh lá
        0, 0, contrastFactor, 0, brightness, // Cột cho kênh xanh dương
        0, 0, 0, 1, 0  // Cột cho alpha (độ trong suốt)
    ];

    // Ma trận độ bão hòa (với độ bão hòa 1, màu sắc sẽ không thay đổi)
    // Ma trận độ bão hòa (mặc định không thay đổi)
    const saturationMatrix = [
        (1 - saturation) * 0.2126 + saturation, (1 - saturation) * 0.2126, (1 - saturation) * 0.2126, 0, 0, // Kênh đỏ
        (1 - saturation) * 0.7152, (1 - saturation) * 0.7152 + saturation, (1 - saturation) * 0.7152, 0, 0, // Kênh xanh lá
        (1 - saturation) * 0.0722, (1 - saturation) * 0.0722, (1 - saturation) * 0.0722 + saturation, 0, 0, // Kênh xanh dương
        0, 0, 0, 1, 0  // Alpha (độ trong suốt)
    ];

    // Kết hợp hai ma trận độ sáng và độ bão hòa
    const combinedMatrix = [
        brightnessMatrix[0] * saturationMatrix[0] + brightnessMatrix[1] * saturationMatrix[5] + brightnessMatrix[2] * saturationMatrix[10], // Kênh đỏ
        brightnessMatrix[0] * saturationMatrix[1] + brightnessMatrix[1] * saturationMatrix[6] + brightnessMatrix[2] * saturationMatrix[11],
        brightnessMatrix[0] * saturationMatrix[2] + brightnessMatrix[1] * saturationMatrix[7] + brightnessMatrix[2] * saturationMatrix[12],
        0,
        brightnessMatrix[0] * saturationMatrix[4] + brightnessMatrix[1] * saturationMatrix[9] + brightnessMatrix[2] * saturationMatrix[14] + brightnessMatrix[4], // Độ sáng kênh đỏ

        brightnessMatrix[5] * saturationMatrix[0] + brightnessMatrix[6] * saturationMatrix[5] + brightnessMatrix[7] * saturationMatrix[10], // Kênh xanh lá
        brightnessMatrix[5] * saturationMatrix[1] + brightnessMatrix[6] * saturationMatrix[6] + brightnessMatrix[7] * saturationMatrix[11],
        brightnessMatrix[5] * saturationMatrix[2] + brightnessMatrix[6] * saturationMatrix[7] + brightnessMatrix[7] * saturationMatrix[12],
        0,
        brightnessMatrix[5] * saturationMatrix[4] + brightnessMatrix[6] * saturationMatrix[9] + brightnessMatrix[7] * saturationMatrix[14] + brightnessMatrix[9], // Độ sáng kênh xanh lá

        brightnessMatrix[10] * saturationMatrix[0] + brightnessMatrix[11] * saturationMatrix[5] + brightnessMatrix[12] * saturationMatrix[10], // Kênh xanh dương
        brightnessMatrix[10] * saturationMatrix[1] + brightnessMatrix[11] * saturationMatrix[6] + brightnessMatrix[12] * saturationMatrix[11],
        brightnessMatrix[10] * saturationMatrix[2] + brightnessMatrix[11] * saturationMatrix[7] + brightnessMatrix[12] * saturationMatrix[12],
        0,
        brightnessMatrix[10] * saturationMatrix[4] + brightnessMatrix[11] * saturationMatrix[9] + brightnessMatrix[12] * saturationMatrix[14] + brightnessMatrix[14], // Độ sáng kênh xanh dương

        0, 0, 0, 1, 0  // Alpha
    ];

    // Sử dụng useEffect để log combinedMatrix
    // useEffect(() => {
    //     console.log(combinedMatrix);
    // }, [combinedMatrix]);

    return (
        <View style={styles.contai_post}>
            {showEditor && <>
                <View style={styles.fullScreenView}>
                    <View style={styles.head_edit}>
                        <TouchableOpacity
                            onPress={cancel_edit}>
                            <Text style={styles.text_edit_head}>Hủy</Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 19, fontWeight: '500' }}>Chỉnh sửa ảnh</Text>
                        <TouchableOpacity
                            onPress={captureImage}
                        >
                            <Text style={styles.text_edit_head}>Lưu</Text>
                        </TouchableOpacity>
                    </View>

                    {typeEdit === 0 ? (<>
                        {/* chỉnh ảnh  */}
                        <ViewShot
                            style={styles.view_shot}
                            ref={viewShotRef}
                            options={{ format: 'jpg', quality: 0.9 }}>
                            <ColorMatrix matrix={combinedMatrix}>
                                <Image
                                    style={styles.image_edit}
                                    source={imageUri ? { uri: imageUri } : null}
                                />
                            </ColorMatrix>
                        </ViewShot>

                        <Text style={styles.text_edit_img}>Độ sáng {brightness}</Text>

                        <Slider
                            style={styles.slider}
                            minimumValue={-100}       // Giá trị tối thiểu (rất tối)
                            maximumValue={100}        // Giá trị tối đa (rất sáng)
                            value={brightness}
                            onValueChange={(value) => setBrightness(value)}  // Cập nhật độ sáng
                            minimumTrackTintColor={colors.black} // Màu của phần bên trái nút kéo
                            maximumTrackTintColor={colors.light}  // Màu của phần bên phải nút kéo
                            thumbTintColor={colors.gold}         // Màu của nút kéo
                        />

                        <Text style={styles.text_edit_img}>Độ bảo hòa</Text>

                        <Slider
                            style={styles.slider}
                            minimumValue={0.5}        // Giá trị tối thiểu (không bão hòa)
                            maximumValue={1.5}        // Giá trị tối đa (bão hòa cao nhất)
                            value={saturation}
                            onValueChange={(value) => setSaturation(value)} // Cập nhật độ bão hòa
                            minimumTrackTintColor={colors.black} // Màu của phần bên trái nút kéo
                            maximumTrackTintColor={colors.light}  // Màu của phần bên phải nút kéo
                            thumbTintColor={colors.gold}         // Màu của nút kéo
                        />


                        <Text style={styles.text_edit_img}>Độ tương phản {contrast}</Text>

                        <Slider
                            style={styles.slider}
                            minimumValue={0}       // Giá trị tối thiểu (giảm độ tương phản)
                            maximumValue={3}       // Giá trị tối đa (tăng độ tương phản)
                            value={contrast}
                            onValueChange={(value) => setContrast(value)}  // Cập nhật độ tương phản
                            minimumTrackTintColor={colors.black} // Màu của phần bên trái nút kéo
                            maximumTrackTintColor={colors.light}  // Màu của phần bên phải nút kéo
                            thumbTintColor={colors.gold}         // Màu của nút kéo
                        />
                    </>) : (<>
                        {/* chỉnh ảnh bộ lọc */}
                        <ViewShot
                            style={styles.view_shot}
                            ref={viewShotRef}
                            options={{ format: 'jpg', quality: 0.9 }}>
                            <ColorMatrix matrix={filterImage}>
                                <Image
                                    style={styles.image_edit}
                                    source={imageUri ? { uri: imageUri } : null}
                                />
                            </ColorMatrix>
                        </ViewShot>

                        {/* hiện thị các bộ lọc */}
                        <Text style={{ fontSize: 20, color: colors.light }}>Bộ lọc</Text>

                        <View style={styles.contain_filter}>
                            <FlatList
                                data={filterData}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => setFilterImage(item.matrix)}
                                        style={styles.item_filter}
                                    >
                                        <Text style={styles.text_filter}>{item.name}</Text>
                                        <ColorMatrix matrix={item.matrix}>
                                            <Image
                                                style={styles.image_edit}
                                                source={imageUri ? { uri: imageUri } : null}
                                            />
                                        </ColorMatrix>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={item => item.id}
                                horizontal // Hiển thị theo chiều ngang
                                showsHorizontalScrollIndicator={false} // Tắt thanh cuộn ngang
                            />
                        </View>

                    </>)}
                </View>
            </>}

            <SlideUpView>
                <View style={styles.head_post}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        {loadUpdate && <>
                            <Text style={{ fontSize: 18, fontWeight: '500', color: colors.dark }}>Hủy</Text>
                        </>}
                    </TouchableOpacity>
                    {loadUpdate ? (
                        <Text style={{ fontSize: 20, fontWeight: '500' }}>Tạo bài viết</Text>
                    ) : (
                        <Text style={{ fontSize: 20, fontWeight: '500' }}>Vui lòng không thoát khỏi màn hình này!</Text>
                    )}
                    <TouchableOpacity onPress={createPost}>
                        {loadUpdate && <>
                            <Text style={{ fontSize: 18, fontWeight: '500', color: colors.dark }}>Đăng</Text>
                        </>}
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
                                source={{ uri: item }}
                            />
                            {loadUpdate && <>
                                <TouchableOpacity style={styles.remove} onPress={() => removeImage(index)}>
                                    <Image style={{ width: 30, height: 30 }} source={{ uri: icons.remove }} />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => cropImage(item)}
                                    style={styles.edit_crop_media}>
                                    <Text style={{ fontSize: 18, fontWeight: '700', color: colors.xamtrang }}>Cắt</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => pick_edit_filter(item, 1)}
                                    style={styles.edit_filter_media}>
                                    <Text style={{ fontSize: 18, fontWeight: '700', color: colors.xamtrang }}>Bộ lọc</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => pick_edit_filter(item, 0)}
                                    style={styles.edit_media}>
                                    <Text style={{ fontSize: 18, fontWeight: '700', color: colors.xamtrang }}>điều chỉnh</Text>
                                </TouchableOpacity>
                            </>}
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
                                    style={{ width: 50, height: 50, borderRadius: 50 }}

                                    source={{
                                        uri: user.avatar === ''
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
            <Toast style={{}} config={toastConfigExport} />
        </View >
    )
};

export default Post
