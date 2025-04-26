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
import { useContext, useEffect, useState } from 'react';
import styles from './SearchStyle';
import { useTabBar } from '../../Configs/TabBarContext';
import FastImage from 'react-native-fast-image';
import React from 'react';
import AppBackground from '../../Components/AppBackground/AppBackground';
import HeaderApp from '../../Components/HeaderApp/HeaderApp';
import { UserContext } from '../../Configs/UserReducer';
import { AppImage } from '../../Components';
import colors from '../../assets/color/colors';
import { SearchUsers } from './data';
import { useFollowUserMutation, useSearchUserMutation, useUnFollowUserMutation } from '../../RTKQuery/Slides/slide';
import { UserSearchResult } from '../../RTKQuery/Slides/types';
const Search = () => {
  const { state, dispatch } = useTabBar();
  const [text, setText] = useState('');
  const { user, dispatchUser } = useContext(UserContext);
  const [result, setResult] = useState([]);
  const [isSearchAccount, setIssSearchAccount] = useState(true);
  const [getUser, { data, isLoading, error }] = useSearchUserMutation();
  const hideTabBar = () => {
    dispatch({ type: 'HIDE_TAB_BAR' });
  };

  const showTabBar = () => {
    dispatch({ type: 'SHOW_TAB_BAR' });
  };

  const fetchUsers = async () => {
    try {
      await getUser({ username: text }).unwrap();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [text]);

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
          <TextInput style={styles.search}
            value={text}
            onChangeText={(text) => { setText(text) }}
            placeholder="Tìm kiếm"
            onFocus={hideTabBar}
            onBlur={showTabBar}
          />
          <Pressable style={styles.btnSearch}>
            <Text style={{ color: colors.white }}>Tìm</Text>
          </Pressable>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
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
        data={data}
        renderItem={({ item, index }) => <User data={item} key={index} />}
        ListEmptyComponent={<View>
          {text !== '' &&
            <Text style={{ alignSelf: 'center', marginTop: 20 }}>Không tìm thấy tài khoản nào</Text>
          }
        </View>}
      />
    </View>
  );
};

export default Search;

type UserProps = {
  data: UserSearchResult
};

const User: React.FC<UserProps> = ({ data }) => {
  const [fetchFollow, { error }] = useFollowUserMutation();
  const [fetchUnFollow, { error: errorUnFl }] = useUnFollowUserMutation();

  const [isFollow, setIsFollow] = useState(data.isFollow);

  const handelFollow = async () => {
    try {
      await fetchFollow({ userTargetId: data.userId }).unwrap();
      setIsFollow(true);
    } catch (e) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
  }

  const handelUnFollow = async () => {
    try {
      await fetchUnFollow({ userTargetId: data.userId }).unwrap();
      setIsFollow(false);
    } catch (e) {
      if (errorUnFl.originalStatus) {
        setIsFollow(false)
      }
      console.log('====================================');
      console.log(errorUnFl);
      console.log('====================================');
    }
  }

  return <TouchableOpacity style={styles.itemUser}>
    <View style={styles.leftInfo}>
      <AppImage
        uri={data.avatar || ''}
        width={60}
        height={60}
        style={{ marginRight: 10 }}
        imageStyle={styles.avatar}
      />
      <View>
        <Text style={styles.textName}>
          {data.firstname} {data.lastname}
        </Text>
        <Text>@{data.username}</Text>
      </View>
    </View>
    {isFollow ? (
      <TouchableOpacity style={styles.btnUnFl}
        onPress={handelUnFollow}>
        <Text style={[styles.text, { color: colors.black }]}>
          Following
        </Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity style={styles.btnFl}
        onPress={handelFollow}
      >
        <Text style={[styles.text, { color: colors.black }]}>
          Follow
        </Text>
      </TouchableOpacity>
    )}
  </TouchableOpacity>;
};
