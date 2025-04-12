import React, { useContext, useRef, useState } from 'react';
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './Styles';
import SlideUp from './SlideUp';
import colors from '../../assets/color/colors';
import Navigation from '../../Components/NavigationApp/Navigation';
import { UserContext } from '../../Configs/UserReducer';
import HeaderApp from '../../Components/HeaderApp/HeaderApp';
import ImagePicker from 'react-native-image-crop-picker';
import { AppImage } from '../../Components';
import { IconCamera, IconCrop, IconEdit, IconFilter, IconImage, IconX } from '../../assets/SVG';

type CreateFeedProps = {};

const CreateFeed: React.FC<CreateFeedProps> = ({ }) => {
    const [content, setContent] = React.useState('');
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user, dispatch } = useContext(UserContext);
    const [showEditor, setShowEditor] = useState(false);
    const [loadUpdate, setLoadUpdate] = useState(true);
    const [imageUri, setImageUri] = useState(null);
    const viewShotRef = useRef();
    const [typeEdit, setTypeEdit] = useState(null);

    // chọn ảnh từ thư viện
    const openImageLibrary = () => {
        ImagePicker.openPicker({
            multiple: true,
            mediaType: 'photo',
        }).then(selectedImages => {
            if (selectedImages.length > 0) {
                const imageUris = selectedImages.map(image => image.path); // Lấy đường dẫn của các ảnh
                setImages(prev => [...prev, ...imageUris]);
            } else {
                console.log('Không có ảnh nào được chọn');
            }
        }).catch(error => {
            if (error.code === 'E_PICKER_CANCELLED') {
                console.log('Người dùng đã hủy quá trình chọn ảnh');
            } else {
                console.log('Có lỗi xảy ra: ', error);
            }
        });
    };

    // chọn ảnh từ cam
    const openCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            setImages([image.path, ...images]);
        });
    };

    // xóa ảnh
    const removeImage = (index: number) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
    };

    const cropImage = (uri: string) => {
        ImagePicker.openCropper({
            path: uri,
            width: 300,
            height: 400,
            cropping: true,
            mediaType: 'photo'
        }).then(croppedImage => {
            const croppedImageUri = croppedImage.path;
            setImages(prev => prev.map(img => (img === uri ? croppedImageUri : img)));
        }).catch(error => {
            if (error.code === 'E_PICKER_CANCELLED') {
                console.log('Người dùng đã hủy quá trình cắt ảnh');
            } else {
                console.error('Có lỗi xảy ra khi cắt ảnh:', error);
            }
        });
    };

    return (
        <SlideUp>
            <HeaderApp title='Tạo bài viết'
                rightView={<TouchableOpacity
                    onPress={() => Navigation.goBack()}
                >
                    <Text style={styles.textBtnHead}>Đăng bài</Text>
                </TouchableOpacity>}
                style={{ backgroundColor: colors.white }}
            />
            <FlatList
                ListHeaderComponent={
                    <>
                        <View style={{ flexDirection: 'row', marginTop: 9, paddingHorizontal: 10 }}>
                            <AppImage uri={user?.avatar} width={45} height={45} imageStyle={{ borderRadius: 100 }} />
                            <View>
                                <Text style={styles.text_name}>{user?.firstname} {user?.lastname}</Text>
                                <Text style={{ marginLeft: 10, color: colors.gray }}>@Jhon123</Text>
                            </View>
                        </View>
                        <TextInput
                            style={styles.textInput}
                            multiline={true}
                            value={content}
                            onChangeText={(text) => setContent(text)}
                            placeholder="Bạn đang nghĩ gì?..."
                        />
                    </>
                }
                showsVerticalScrollIndicator={false}
                style={{ width: '100%', minHeight: 90 }}
                data={images}
                renderItem={({ item, index }) => (
                    <View style={styles.media_contai} key={index}>
                        <Image
                            style={styles.media}
                            source={{ uri: item }}
                        />
                        {loadUpdate && <>
                            <TouchableOpacity style={styles.BGIcon} onPress={() => removeImage(index)}>
                                <IconX width={23} />
                            </TouchableOpacity>

                            <View style={styles.box_Edit}>
                                <TouchableOpacity
                                    onPress={() => cropImage(item)}
                                    style={styles.edit_media}>
                                    <IconCrop width={30} height={30} />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    // onPress={() => pick_edit_filter(item, 1)}
                                    style={styles.edit_media}>
                                    <IconEdit width={25} />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    // onPress={() => pick_edit_filter(item, 0)}
                                    style={styles.edit_media}>
                                    <IconFilter width={27} />
                                </TouchableOpacity>
                            </View>
                        </>}
                    </View>
                )}
                ListEmptyComponent={
                    <>
                        {
                            loading && (
                                <View>
                                    <Text>Loading...</Text>
                                </View>)
                        }
                    </>
                }

            />
            <View style={styles.get_media}>
                <TouchableOpacity
                    onPress={openImageLibrary}
                    style={styles.get_media_contain}>
                    <Text style={styles.textv1}>Ảnh/video</Text>
                    <IconImage width={33} height={33} fill={colors.dark} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={openCamera}
                    style={styles.get_media_contain}>
                    <Text style={styles.textv1}>Chụp ảnh</Text>
                    <IconCamera width={35} height={35} fill={colors.dark} />
                </TouchableOpacity>
            </View>
        </SlideUp >
    )
};
export default CreateFeed;
