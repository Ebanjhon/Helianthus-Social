import {
  FlatList,
  Image,
  Keyboard,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useContext, useEffect, useState} from 'react';
import styles from './SearchStyle';
import {useTabBar} from '../../Configs/TabBarContext';
import {authApi, endpoints} from '../../Configs/APIs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';
import React from 'react';
import AppBackground from '../../Components/AppBackground/AppBackground';
import HeaderApp from '../../Components/HeaderApp/HeaderApp';
import {UserContext} from '../../Configs/UserReducer';
import {AppImage} from '../../Components';
import colors from '../../assets/color/colors';
const Search = () => {
  const {state, dispatch} = useTabBar();
  const title = 'Tìm kiếm';
  const [text, setText] = useState('');
  const {user, dispatchUser} = useContext(UserContext);
  const [result, setResult] = useState([]);

  const hideTabBar = () => {
    dispatch({type: 'HIDE_TAB_BAR'});
  };

  const showTabBar = () => {
    dispatch({type: 'SHOW_TAB_BAR'});
  };

  return (
    <View style={styles.container}>
      <HeaderApp
        title={'Tìm kiếm'}
        isShowleftAction={false}
        isShowrightAction={false}
        bgColor={colors.gold2}
      />
      <View style={styles.headSearch}>
        <View style={styles.searchWrap}>
          <TextInput style={styles.search} placeholder="Tìm kiếm" />
          <Pressable style={styles.btnSearch}>
            <Text style={{color: colors.white}}>Tìm</Text>
          </Pressable>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <TouchableOpacity>
            <Text style={[true ? styles.textTypeSelected : styles.textType]}>
              Bài Viết
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={[!true ? styles.textTypeSelected : styles.textType]}>
              Tài khoản
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        style={styles.boxList}
        data={[1, 2, 3]}
        renderItem={({item, index}) => {
          return (
            <>
              <View style={styles.itemUser}>
                <View style={styles.leftInfo}>
                  <AppImage
                    uri={''}
                    width={60}
                    height={60}
                    style={{marginRight: 10}}
                    imageStyle={styles.avatar}
                  />
                  <View>
                    <Text style={styles.textName}>JhonEBan</Text>
                    <Text>@SonJiHons</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.btnFl}>
                  <Text>Follow</Text>
                </TouchableOpacity>
              </View>
            </>
          );
        }}
      />
    </View>
  );
};

export default Search;
