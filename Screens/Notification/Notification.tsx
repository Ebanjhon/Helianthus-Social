import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import styles from './NotifiStyle';
import HeaderApp from '../../Components/HeaderApp/HeaderApp';
import { BASE_MinIO, useGetListNotiMutation } from '../../RTKQuery/Slides/slide';
import { NotificationItem } from '../../RTKQuery/Slides/types';
import { UserContext } from '../../Configs/UserReducer';
import colors from '../../assets/color/colors';

const Notification = () => {
  const [fetchAPI, { isLoading }] = useGetListNotiMutation();
  const pageRef = useRef<number>(0);
  const { user, dispatch } = useContext(UserContext);

  const [listNoti, setListNoti] = useState<NotificationItem[]>([]);


  const fetchData = async () => {
    if (pageRef.current === -1) return;
    const result = await fetchAPI({ userId: user?.userId || '', page: 0 }).unwrap();
    if (!result.empty) {
      setListNoti(pre => [...pre, ...result.content]);
      pageRef.current += 1;
    } else {
      pageRef.current = -1;
    }
  };

  useEffect(() => {
    fetchData();
  }, [user])

  const renderItem = (item: NotificationItem, index: number) => {
    const avatar = `${BASE_MinIO}${item.user.avatar}` || 'https://i.pinimg.com/564x/25/ee/de/25eedef494e9b4ce02b14990c9b5db2d.jpg';
    return (
      <TouchableOpacity style={styles.contain_notifi}>
        <Image
          style={{ width: 45, height: 45, borderRadius: 50, margin: 5 }}
          source={{
            uri: avatar
          }}
        />
        <View style={styles.notifi}>
          <Text style={styles.title}>
            {item.user.username} {' '}
            <Text style={styles.content}>{typeContent(item.noti.typeNotification)}</Text>
          </Text>
        </View>
      </TouchableOpacity>
    )
  };

  const typeContent = (typeNotification: string) => {
    switch (typeNotification) {
      case 'LIKE':
        return "đã thích bài viết của bạn";

      case 'COMMENT':
        return "đã bình luận về bài viết của bạn";

      case 'FOLLOW':
        return "đã theo dõi bạn";

      default:
        return "đã thực hiện một hành động";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderApp title='Thông báo' bgColor={colors.white} />
      <FlatList
        contentContainerStyle={{ marginHorizontal: 16 }}
        data={listNoti}
        renderItem={({ item, index }) => renderItem(item, index)}
        ListEmptyComponent={
          <Text style={{ alignSelf: 'center', fontSize: 16, marginTop: 100 }}>Không có thông báo nào</Text>
        }
        refreshControl={
          <RefreshControl refreshing={isLoading}
            onRefresh={() => {
              pageRef.current = 0;
              setListNoti([]);
              fetchData();
            }}
          />
        }
        onEndReachedThreshold={0.3}
        onEndReached={() => {
          if (!isLoading) {
            fetchData();
          }
        }}
        ListFooterComponent={
          isLoading ? <Text style={{ textAlign: 'center', padding: 10 }}>Đang tải thêm...</Text> : null
        }
      />
    </SafeAreaView>
  );
};

export default Notification;
