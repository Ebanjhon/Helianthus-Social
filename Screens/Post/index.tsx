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
import { showToast, toastConfigExport } from '../../Configs/ToastConfig';
import Toast from 'react-native-toast-message';
import ViewShot from 'react-native-view-shot';
import Slider from '@react-native-community/slider';
import { ColorMatrix } from 'react-native-color-matrix-image-filters';
import filter from '../../assets/color/filter';

type CreateFeedProps = {
};

const CreateFeed: React.FC<CreateFeedProps> = ({ }) => {
    const navigation = useNavigation();
    const [createFeed] = useCreateFeedMutation();
    const [content, setContent] = React.useState('');
    const [files, setFiles] = useState<mediaType[]>([]);
    const [loading, setLoading] = useState(false);
    const { user, dispatch } = useContext(UserContext);
    const [showEditor, setShowEditor] = useState(false);
    const [indexFileEdit, setIndexFileEdit] = useState<number | 0>(0);
    const [brightness, setBrightness] = useState(0);
    const [saturation, setSaturation] = useState(1);
    const [contrast, setContrast] = useState(1);
    const viewShotRef = useRef<ViewShot>();
    const [typeEdit, setTypeEdit] = useState<number>();
    const [filterImage, setFilterImage] = useState(filter.normal);

    const filterData = Object.keys(filter).map(key => ({
        name: key,
        matrix: filter[key],
    }));

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

    const pick_edit_filter = (indexFile: number, type: number) => {
        setIndexFileEdit(indexFile)
        setTypeEdit(type);
        setShowEditor(true);
    };

    const captureImage = () => {
        if (viewShotRef.current) {
            viewShotRef.current.capture().then((uri) => {
                const newFile = {
                    uri: uri,
                    name: files[indexFileEdit].name,
                    type: files[indexFileEdit].type,
                };
                setFiles(prevArray => {
                    const updatedArray = [...prevArray];
                    updatedArray[indexFileEdit] = newFile;
                    return updatedArray;
                });
                cancel_edit();
            });
        }
    };

    const cancel_edit = () => {
        setBrightness(0);
        setSaturation(1);
        setContrast(1);
        setIndexFileEdit(0);
        setShowEditor(false);
    };

    const contrastFactor = (contrast + 1) / 2;
    // Ma trận độ sáng (với độ sáng 0, ma trận sẽ không thay đổi màu sắc)
    const brightnessMatrix = [
        contrastFactor, 0, 0, 0, brightness, // Cột cho kênh đỏ
        0, contrastFactor, 0, 0, brightness, // Cột cho kênh xanh lá
        0, 0, contrastFactor, 0, brightness, // Cột cho kênh xanh dương
        0, 0, 0, 1, 0  // Cột cho alpha (độ trong suốt)
    ];
    const saturationMatrix = [
        (1 - saturation) * 0.2126 + saturation, (1 - saturation) * 0.2126, (1 - saturation) * 0.2126, 0, 0, // Kênh đỏ
        (1 - saturation) * 0.7152, (1 - saturation) * 0.7152 + saturation, (1 - saturation) * 0.7152, 0, 0, // Kênh xanh lá
        (1 - saturation) * 0.0722, (1 - saturation) * 0.0722, (1 - saturation) * 0.0722 + saturation, 0, 0, // Kênh xanh dương
        0, 0, 0, 1, 0  // Alpha (độ trong suốt)
    ];

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

    return (
        <>
            {showEditor ?
                <SlideUp>
                    <View style={styles.head_edit}>
                        <TouchableOpacity
                            onPress={cancel_edit}>
                            <Text style={styles.text_edit_head}>Hủy</Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 19, fontWeight: '500' }}>Chỉnh sửa ảnh</Text>
                        <TouchableOpacity onPress={captureImage}>
                            <Text style={styles.text_edit_head}>Lưu</Text>
                        </TouchableOpacity>
                    </View>

                    <ViewShot
                        style={styles.view_shot}
                        ref={viewShotRef}
                        options={{ format: 'jpg', quality: 0.9 }}>
                        <ColorMatrix matrix={typeEdit === 0 ? filterImage : combinedMatrix}>
                            <Image
                                style={styles.image_edit}
                                source={{ uri: files[indexFileEdit].uri }}
                            />
                        </ColorMatrix>
                    </ViewShot>

                    {typeEdit === 0 ?
                        <>
                            <View style={styles.viewControlEdit}>
                                <Text style={styles.text_edit_img}>Bộ lọc</Text>
                                <View style={styles.contain_filter}>
                                    <FlatList
                                        data={filterData}
                                        renderItem={({ item, index }) => (
                                            <TouchableOpacity
                                                key={index}
                                                onPress={() => setFilterImage(item.matrix)}
                                                style={styles.item_filter}
                                            >
                                                <Text style={styles.text_filter}>{item.name}</Text>
                                                <ColorMatrix matrix={item.matrix}>
                                                    <Image
                                                        style={styles.image_edit}
                                                        source={{ uri: files[indexFileEdit].uri }}
                                                    />
                                                </ColorMatrix>
                                            </TouchableOpacity>
                                        )}
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                    />
                                </View>
                            </View>
                        </> : <>
                            <View style={styles.viewControlEdit}>
                                <Text style={styles.text_edit_img}>Độ sáng {brightness}</Text>

                                <Slider
                                    style={styles.slider}
                                    minimumValue={-100}
                                    maximumValue={100}
                                    value={brightness}
                                    onValueChange={(value) => setBrightness(value)}
                                    minimumTrackTintColor={colors.gold2}
                                    maximumTrackTintColor={colors.primary}
                                    thumbTintColor={colors.black}
                                />

                                <Text style={styles.text_edit_img}>Độ bảo hòa {saturation}</Text>

                                <Slider
                                    style={styles.slider}
                                    minimumValue={0.5}
                                    maximumValue={1.5}
                                    value={saturation}
                                    onValueChange={(value) => setSaturation(value)}
                                    minimumTrackTintColor={colors.gold2}
                                    maximumTrackTintColor={colors.primary}
                                    thumbTintColor={colors.black}
                                />

                                <Text style={styles.text_edit_img}>Độ tương phản {contrast}</Text>

                                <Slider
                                    style={styles.slider}
                                    minimumValue={0}
                                    maximumValue={3}
                                    value={contrast}
                                    onValueChange={(value) => setContrast(value)}
                                    minimumTrackTintColor={colors.gold2}
                                    maximumTrackTintColor={colors.primary}
                                    thumbTintColor={colors.black}
                                />
                            </View>
                        </>
                    }
                </SlideUp>
                :
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
                                            onPress={() => pick_edit_filter(index, 1)}
                                            style={styles.edit_media}>
                                            <IconEdit width={25} />
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            onPress={() => pick_edit_filter(index, 0)}
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
            }
        </>
    )
};
export default CreateFeed;
