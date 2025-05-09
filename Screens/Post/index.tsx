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
import { BASE_URL, useCreateFeedMutation } from '../../RTKQuery/Slides/slide';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mediaType } from './type';
import { useNavigation } from '@react-navigation/native';
import { showToast } from '../../Configs/ToastConfig';

type CreateFeedProps = {
};

const CreateFeed: React.FC<CreateFeedProps> = ({ }) => {
    const navigation = useNavigation();
    const [createFeed] = useCreateFeedMutation();
    const [content, setContent] = React.useState('');
    const [images, setImages] = useState([]);
    const [files, setFiles] = useState<mediaType[]>([]);
    const [loading, setLoading] = useState(false);
    const { user, dispatch } = useContext(UserContext);
    const [showEditor, setShowEditor] = useState(false);
    const [loadUpdate, setLoadUpdate] = useState(true);
    const [imageUri, setImageUri] = useState(null);
    const viewShotRef = useRef();
    const [typeEdit, setTypeEdit] = useState(null);

    const handleReset = () => {
        setFiles([]);
        setContent('');
    }

    // chọn ảnh từ thư viện
    const openFilePicker = () => {
        ImagePicker.openPicker({
            multiple: true,
            mediaType: 'any',
        })
            .then(selectedFiles => {
                if (selectedFiles.length > 0) {
                    const files = selectedFiles.map(file => ({
                        uri: file.path,
                        name: file.filename || `file-${Date.now()}`,
                        type: file.mime,
                    }));
                    setFiles(prev => [...prev, ...files]);
                } else {
                    console.log('Không có file nào được chọn');
                }
            })
            .catch(error => {
                if (error.code === 'E_PICKER_CANCELLED') {
                    console.log('Người dùng đã hủy quá trình chọn file');
                } else {
                    console.log('Có lỗi xảy ra: ', error);
                }
            });

        console.log(files);
    };

    // chụp ảnh
    const openCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: !true,
            mediaType: 'photo',
        })
            .then(image => {
                const newFile = {
                    uri: image.path,
                    name: image.filename || `camera-${Date.now()}.jpg`,
                    type: image.mime,
                };

                setFiles(prev => [...prev, newFile]);
            })
            .catch(error => {
                if (error.code === 'E_PICKER_CANCELLED') {
                    console.log('Người dùng đã hủy camera');
                } else {
                    console.error('Lỗi khi mở camera:', error);
                }
            });
    };

    // xóa ảnh
    const removeImage = (index: number) => {
        const updatedFIles = [...files];
        updatedFIles.splice(index, 1);
        setFiles(updatedFIles);
    };

    // cắt ảnh
    const cropImage = (uri: string) => {
        ImagePicker.openCropper({
            path: uri,
            width: 300,
            height: 400,
            cropping: true,
            mediaType: 'photo',
        })
            .then(croppedImage => {
                const newCroppedFile = {
                    uri: croppedImage.path,
                    name: croppedImage.filename || `cropped-${Date.now()}`,
                    type: croppedImage.mime,
                };
                setFiles(prev =>
                    prev.map(file => (file.uri === uri ? newCroppedFile : file))
                );
            })
            .catch(error => {
                if (error.code === 'E_PICKER_CANCELLED') {
                    console.log('Người dùng đã hủy quá trình cắt ảnh');
                } else {
                    console.error('Có lỗi xảy ra khi cắt ảnh:', error);
                }
            });
    };

    const uploadPostFiles = async (postId: string) => {
        if (files.length === 0) {
            setLoading(false);
            setContent('');
            showToast('success', 'Message!', 'Đăng tải bài viết thành công.');
            setTimeout(() => {
                navigation.goBack();
            }, 3000);
            return;
        }
        const token = await AsyncStorage.getItem('token');
        try {
            const formData = new FormData();
            formData.append('postId', postId);

            files.forEach((file, index) => {
                formData.append('files', file);
            });
            const response = await fetch(`${BASE_URL}/api/media/upload-multiple`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Upload thất bại');
            }
            handleReset()
            showToast('success', 'Message!', 'Đăng tải bài viết thành công.');
            setTimeout(() => {
                navigation.goBack();
            }, 3000);
        } catch (error: any) {
            console.error('Lỗi upload:', error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const createPost = async () => {
        setLoading(true);
        try {
            const result = await createFeed({ content: content }).unwrap();
            setLoading(false);
            if (result) {
                uploadPostFiles(result.feedId)
            } else {
                setLoading(false);
                console.log("Lỗi tạo bài viết");
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    return (
        <SlideUp>
            <HeaderApp title='Tạo bài viết'
                onActionBack={handleReset}
                isShowleftAction={!loading}
                rightView={
                    <TouchableOpacity
                        disabled={loading}
                        onPress={() => {
                            createPost();
                        }}
                    >
                        <Text style={[styles.textBtnHead, { opacity: loading ? 0.5 : 1 }]}>Đăng bài</Text>
                    </TouchableOpacity>}
                style={{ backgroundColor: colors.white }}
            />
            <FlatList
                ListHeaderComponent={
                    <>
                        <View style={{ flexDirection: 'row', marginTop: 9, paddingHorizontal: 10 }}>
                            <AppImage uri={user?.avatar || ''} width={45} height={45} imageStyle={{ borderRadius: 100 }} />
                            <View>
                                <Text style={styles.text_name}>{user?.firstname} {user?.lastname}</Text>
                                <Text style={{ marginLeft: 10, color: colors.gray }}>@{user?.username}</Text>
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
                data={files}
                renderItem={({ item, index }) => (
                    <View style={styles.media_contai} key={index}>
                        <Image
                            style={styles.media}
                            source={{ uri: item.uri }}
                        />
                        {!loading && <>
                            <TouchableOpacity style={styles.BGIcon} onPress={() => removeImage(index)}>
                                <IconX width={23} />
                            </TouchableOpacity>

                            <View style={styles.box_Edit}>
                                <TouchableOpacity
                                    onPress={() => cropImage(item.uri)}
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
            <View style={[styles.get_media, { display: loading ? 'none' : 'flex' }]}>
                <TouchableOpacity
                    onPress={openFilePicker}
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
