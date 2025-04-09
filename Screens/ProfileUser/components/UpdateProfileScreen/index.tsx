import React, { useContext, useState } from 'react';
import { Image, ImageBackground, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './style';
import { UserContext } from '../../../../Configs/UserReducer';
import Toast from 'react-native-toast-message';
import colors from '../../../../assets/color/colors';
import icons from '../../../../assets/iconApp/icons';
import HeaderApp from '../../../../Components/HeaderApp/HeaderApp';
import { AppImage, AppPickerListBox, AppTextInput } from '../../../../Components';
import { toastConfigExport } from '../../../../Configs/ToastConfig';
import ImageCropPicker from 'react-native-image-crop-picker';

interface UpdateProfileProps { };

const UpdateProfile: React.FC<UpdateProfileProps> = ({ }) => {
  const { user, dispatch } = useContext(UserContext);
  const [firstname, setFirstName] = useState(user?.firstname);
  const [lastname, setLastName] = useState(user?.lastname);
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState(user?.email);
  const [birth, setBirth] = useState("");
  const [avatar, setAvatar] = useState("");
  const [cover, setCover] = useState("");
  const [imagePath, setImagePath] = useState(null);
  const [isChange, setIsChange] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const openImageLibrary = () => {
    ImageCropPicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
      cropperToolbarTitle: 'Cắt ảnh',
      cropperCircleOverlay: true,
    }).then(image => {
      // setImagePath(image);
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
      cropperCircleOverlay: true,
    }).then(image => {
      // setImagePath(image);
      setCover(image.path);
    }).catch(error => {
      console.log('Error selecting image:', error);
    });
  };


  return <View style={styles.container}>
    <Toast config={toastConfigExport} />
    <HeaderApp
      title={"Update profile"}
      bgColor={colors.trang}
      isShowleftAction
      isButtonHead isShowrightAction={false} />
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ height: 90, flex: 1 }}>
      <Text style={styles.lable}>Ảnh bìa</Text>
      <Image
        style={{ width: '100%', height: 180, alignSelf: 'center' }}
        source={{
          uri: cover === ""
            ? 'https://i.pinimg.com/564x/25/ee/de/25eedef494e9b4ce02b14990c9b5db2d.jpg'
            : cover
        }} />
      <Pressable
        onPress={handleSelectCover}
        style={[styles.btnUpload]}>
        <Text style={{ fontSize: 17, fontWeight: '500' }}>Chọn ảnh bìa mới</Text>
      </Pressable>
      <Image
        style={{ width: 90, height: 90, alignSelf: 'center' }}
        source={{
          uri: avatar === ""
            ? 'https://i.pinimg.com/564x/25/ee/de/25eedef494e9b4ce02b14990c9b5db2d.jpg'
            : avatar
        }} />
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


      <AppTextInput
        title='Birth'
        setText={setBirth}
        placeholder='Ngày sinh'
        text={birth || ''}
      />
      <Text style={styles.lable}>Gender</Text>
      <AppPickerListBox text={gender} setText={setGender} lists={["Nam", "Nữ", "khác"]} defaultText='Chọn giới tính' />

    </ScrollView>
    <Pressable
      style={[styles.btnUpdate, { backgroundColor: !true ? colors.gold2 : colors.dark }]}>
      <Text style={styles.textBtn}>CẬP NHẬT</Text>
    </Pressable>
  </View>;
};
export default UpdateProfile;

