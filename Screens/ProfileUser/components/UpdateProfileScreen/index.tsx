import React, { useContext, useEffect, useState } from 'react';
import { Image, ImageBackground, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './style';
import { UserContext } from '../../../../Configs/UserReducer';
import Toast from 'react-native-toast-message';
import colors from '../../../../assets/color/colors';
import HeaderApp from '../../../../Components/HeaderApp/HeaderApp';
import { AppPickerListBox, AppTextInput } from '../../../../Components';
import { showToast, toastConfigExport } from '../../../../Configs/ToastConfig';
import ImageCropPicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { BASE_MinIO, BASE_URL, useGetUserInfoMutation, useUpdateUserMutation } from '../../../../RTKQuery/Slides/slide';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UpdateProfileProps { };
const errorImage = 'https://i.pinimg.com/564x/25/ee/de/25eedef494e9b4ce02b14990c9b5db2d.jpg';
const UpdateProfile: React.FC<UpdateProfileProps> = ({ }) => {
  const { user, dispatch } = useContext(UserContext);
  const [fetchData, { data, error }] = useGetUserInfoMutation();
  const [updateUser] = useUpdateUserMutation();
  const [firstname, setFirstName] = useState(user?.firstname);
  const [lastname, setLastName] = useState(user?.lastname);
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState(user?.email);
  // const [birth, setBirth] = useState(new Date());
  const [avatar, setAvatar] = useState('https://i.pinimg.com/564x/25/ee/de/25eedef494e9b4ce02b14990c9b5db2d.jpg');
  const [cover, setCover] = useState('https://i.pinimg.com/564x/25/ee/de/25eedef494e9b4ce02b14990c9b5db2d.jpg');
  const [imagePath, setImagePath] = useState<ImageOrVideo | null>(null);
  const [coverPath, setCoverPath] = useState<ImageOrVideo | null>(null);
  const [isChange, setIsChange] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (firstname !== data?.firstname || lastname !== data?.lastname, phone !== data?.phoneNumber || gender !== data?.gender || bio !== data?.bio || email !== data?.email || avatar !== data?.avatar) {
      setIsChange(true);
    }
  }, [firstname, lastname, phone, gender, bio, email, cover, avatar]);

  const handeldFetchData = async () => {
    const result = await fetchData({ username: user?.username || '' }).unwrap();
    if (result) {
      setAvatar(result?.avatar || '');
      setCover(result?.cover || '');
      setPhone(result.phoneNumber || '');
      setBio(result.bio || '');
      setFirstName(result.firstname);
      setLastName(result.lastname);
    }
    setIsChange(!true);
  };

  useEffect(() => {
    handeldFetchData();
  }, [])

  const openImageLibrary = () => {
    ImageCropPicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
      cropperToolbarTitle: 'Cắt ảnh',
      cropperCircleOverlay: true,
    }).then(image => {
      setImagePath(image);
      setAvatar(image.path);
    }).catch(error => {
      console.log('Error selecting image:', error);
    });
  };

  const handleSelectCover = () => {
    ImageCropPicker.openPicker({
      width: 1000,
      height: 450,
      cropping: true,
      cropperToolbarTitle: 'Cắt ảnh',
    }).then(image => {
      setCoverPath(image);
      setCover(image.path);
    }).catch(error => {
      console.log('Error selecting image:', error);
    });
  };

  const uploadImage = async (file: any) => {
    const token = await AsyncStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', {
      uri: file?.path,
      type: file?.mime || 'image/jpeg',
      name: file?.filename || 'image.jpg',
    });

    try {
      const response = await fetch(`${BASE_URL}/api/media/upload-image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      const result = await response.text();
      if (!response.ok) {
        showToast('error', 'Message!', 'Lỗi upload ảnh');
        return '';
      }
      return result;
    } catch (error: any) {
      console.error('Lỗi upload:', error.message);
      throw error;
    }
  };

  const update = async () => {
    setIsLoading(true);
    let avatarUrl = avatar;
    let coverUrl = cover;
    if (imagePath) {
      avatarUrl = await uploadImage(imagePath);
      setAvatar(avatarUrl);
    }
    if (coverPath) {
      coverUrl = await uploadImage(coverPath);
      setCover(coverUrl);
    }

    console.log('====================================');
    console.log(avatarUrl);
    console.log(coverUrl);
    console.log('====================================');

    const result = await updateUser({
      userId: user?.userId || '',
      firstname: firstname || '',
      email: email || '',
      lastname: lastname || '',
      avatar: avatarUrl,
      cover: coverUrl,
      bio: bio || ''
    }).unwrap();
    if (result) {
      await AsyncStorage.setItem('user', JSON.stringify(result));
      dispatch({ type: 'login', payload: result });
      showToast('success', 'Cập nhật thông tin thành công!');
      setImagePath(null);
      setCoverPath(null);
      setIsChange(false);
    }
    setIsLoading(false);
  };

  return <View style={styles.container}>
    <Toast config={toastConfigExport} />
    <HeaderApp
      title={"Update profile"}
      bgColor={colors.trang}
      isShowleftAction
      isButtonHead
      isShowrightAction={false} />
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
      style={{ height: 90, flex: 1 }}>
      <Text style={styles.lable}>Ảnh bìa</Text>
      <Image
        style={{ width: '100%', height: 180, alignSelf: 'center' }}
        source={{ uri: coverPath !== null ? cover : (cover ? BASE_MinIO + cover : errorImage) }} />
      <Pressable
        onPress={handleSelectCover}
        style={[styles.btnUpload]}>
        <Text style={{ fontSize: 17, fontWeight: '500' }}>Chọn ảnh bìa mới</Text>
      </Pressable>
      <Image
        style={{ width: 90, height: 90, alignSelf: 'center' }}
        source={{ uri: imagePath !== null ? avatar : (avatar ? BASE_MinIO + avatar : errorImage) }} />
      <Pressable
        onPress={openImageLibrary}
        style={[styles.btnUpload]}>
        <Text style={{ fontSize: 17, fontWeight: '500' }}>Chọn ảnh đại diện mới</Text>
      </Pressable>
      <View style={{ flexDirection: 'row' }}>
        <AppTextInput
          title='First name'
          setText={setFirstName}
          placeholder='Tên'
          text={firstname || ''}
          checkValidate={{
            unique: 'Mục này không được để trống!',
          }}
        />

        <AppTextInput
          title='Last name'
          setText={setLastName}
          placeholder='Họ' text={lastname || ''} />
      </View>

      <AppTextInput
        title='Bio'
        setText={setBio}
        placeholder='Description' text={bio || ''} />

      <AppTextInput
        title='Phone'
        setText={setPhone}
        placeholder='Phone number' text={phone || ''} />

      <AppTextInput
        title='Email'
        setText={setEmail}
        placeholder='Địa chỉ'
        text={email || ''}
        checkValidate={{
          unique: 'Địa chỉ email không được để trống!',
          hasKey: ['@', '.']
        }}
      />

      <Text style={styles.lable}>Gender</Text>
      <AppPickerListBox text={gender || ''} setText={setGender} lists={["Nam", "Nữ", "khác"]} defaultText='Chọn giới tính' />
      <TouchableOpacity
        onPress={update}
        style={[styles.btnUpdate, isChange && !isLoading ? styles.btnActive : styles.btnNotActive]}>
        <Text style={styles.textBtn}>CẬP NHẬT</Text>
      </TouchableOpacity>
    </ScrollView>
  </View>;
};
export default UpdateProfile;

