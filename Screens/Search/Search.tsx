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
import {SearchUsers} from './data';
const Search = () => {
  const {state, dispatch} = useTabBar();
  const title = 'Tìm kiếm';
  const [text, setText] = useState('');
  const {user, dispatchUser} = useContext(UserContext);
  const [result, setResult] = useState([]);
  const [isSearchAccount, setIssSearchAccount] = useState(true);

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
            <Text
              style={[
                isSearchAccount ? styles.textTypeSelected : styles.textType,
              ]}>
              Tài khoản
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={[
                !isSearchAccount ? styles.textTypeSelected : styles.textType,
              ]}>
              Bài Viết
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        style={styles.boxList}
        data={SearchUsers}
        renderItem={({item, index}) => {
          return (
            <>
              <View style={styles.itemUser}>
                <View style={styles.leftInfo}>
                  <AppImage
                    uri={item.avatar}
                    width={60}
                    height={60}
                    style={{marginRight: 10}}
                    imageStyle={styles.avatar}
                  />
                  <View>
                    <Text style={styles.textName}>
                      {item.firstname} {item.lastname}
                    </Text>
                    <Text>@{item.username}</Text>
                  </View>
                </View>
                {item.isFollow ? (
                  <TouchableOpacity style={styles.btnUnFl}>
                    <Text style={[styles.text, {color: colors.black}]}>
                      {' '}
                      Unfollow
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.btnFl}>
                    <Text style={[styles.text, {color: colors.black}]}>
                      Follow
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </>
          );
        }}
      />
    </View>
  );
};

export default Search;
