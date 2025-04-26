import React, { useContext } from 'react';
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import styles from './style';
import colors from '../../../../assets/color/colors';
import { useNavigation } from '@react-navigation/native';
import HeaderApp from '../../../../Components/HeaderApp/HeaderApp';
import { IconLogout } from '../../../../assets/SVG';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../../../../Configs/UserReducer';

type SettingProps = {};

const Setting: React.FC<SettingProps> = ({ }) => {
  const navigation = useNavigation();
  const { dispatch } = useContext(UserContext);
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      dispatch({ type: 'logout' });
      navigation.navigate('logout');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  return (
    <View style={styles.container}>
      <HeaderApp
        title={"Setting"}
        bgColor={colors.trang}
        isShowleftAction
        isButtonHead isShowrightAction={false} />
      <View style={styles.box}>
        <Text style={styles.title_box}>Trung tâm tài khoản</Text>
        <TouchableOpacity onPress={() => navigation.navigate("UpdateProfile")}>
          <Text style={styles.itemp}>Chỉnh sửa thông tin cá nhân</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.itemp}>Thay đổi mật khẩu</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.itemp}>Quyền riêng tư</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.itemp}>Bài đăng dã lưu</Text>
        </TouchableOpacity>
      </View>
      <Pressable
        style={[styles.box, styles.box_bottom]}
        onPress={handleLogout}>
        <Text style={styles.text_logout}>Logout</Text>
        <IconLogout width={50} height={50} style={{ top: 10, left: 10 }} />
      </Pressable>
    </View >
  );
};
export default Setting;
