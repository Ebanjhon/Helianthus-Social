import {ActivityIndicator, Image, View} from 'react-native';
import styles from './style';
import colors from '../../assets/color/colors';
import UserReducer from '../../Configs/UserReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useReducer} from 'react';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
const SplashScreen = () => {
  const navigation = useNavigation();
  const [user, dispatch] = useReducer<any>(UserReducer, null);
  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData !== null) {
        dispatch({
          type: 'login',
          payload: JSON.parse(userData),
        });
        navigation.replace('Home');
      } else {
        navigation.replace('Login');
      }
    } catch (error) {
      navigation.replace('Login');
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        style={styles.img}
        source={require('../../assets/images/bg33.png')}
      />
    </View>
  );
};

export default SplashScreen;
