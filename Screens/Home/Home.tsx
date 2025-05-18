import React, {
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  RefreshControl,
  Image,
  ActivityIndicator,
} from 'react-native';
import colors from '../../assets/color/colors';
import icons from '../../assets/iconApp/icons';
import styles from './HomeStyle';
import { ItemFeed, ListItemAddFriend, ModalAction, ModalComment } from './components';
import { ModalCommentRef } from './components/modalComment';
import { useGetFeedHomeMutation } from '../../RTKQuery/Slides/slide';
import { FeedItem } from '../../RTKQuery/Slides/types';
import { NavigationProp, NavigationState, useNavigation } from '@react-navigation/native';
import { ModalActionRef } from './components/modalAction';
import Toast from 'react-native-toast-message';
import { toastConfigExport } from '../../Configs/ToastConfig';

const Home = forwardRef((ref) => {
  const navigation = useNavigation();
  const lastOffsetYFlatlist = useRef(0);
  const [isShowTabar, setIsShowTabar] = useState(false);
  const flatListRef = useRef(null);
  const [feedHome, setFeedHome] = useState<FeedItem[]>([]);
  const [isStop, setIsStop] = useState(false);
  const [fetchData, { data, isLoading, error }] = useGetFeedHomeMutation();
  const modalRef = useRef<ModalCommentRef>(null);
  const modalActionRef = useRef<ModalActionRef>(null);
  const numPageRef = useRef<number>(0);

  const handleScroll = (event: any) => {
    const sideY = event.nativeEvent.contentOffset.y - lastOffsetYFlatlist.current;

    if (sideY > 10 && isShowTabar) {
      setIsShowTabar(false);
      navigation.setOptions({ tabBarStyle: { ...styles.tabBarStyle, display: 'none' } });
    }
    else if (sideY < -10 && !isShowTabar) {
      setIsShowTabar(true);
      navigation.setOptions({ tabBarStyle: { ...styles.tabBarStyle, display: 'flex' } });
    }

    lastOffsetYFlatlist.current = event.nativeEvent.contentOffset.y;
  };

  const handleFetchData = async () => {
    try {
      if (!isStop && !isLoading) {
        await fetchData({ page: numPageRef.current }).unwrap();
        if (data?.length !== 0) {
          setFeedHome(prev => [...prev || [], ...data || []]);
          numPageRef.current += 1;
        } else {
          setIsStop(pre => !pre)
        }
      }
    } catch (e) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleFetchData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={flatListRef}
        data={feedHome}
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={{ textAlign: 'center', color: colors.black }}>
          Không có dữ liệu
        </Text>}
        ListHeaderComponent={
          <>
            <View style={styles.contai_head}>
              <View>
                <Text style={styles.logo}>Helianthus</Text>
              </View>
              <View style={styles.message}>
                <TouchableOpacity
                // onPress={() => navigation.navigate('Message')}
                >
                  <Image
                    style={{ width: 30, height: 30, tintColor: colors.dark }}
                    source={{ uri: icons.mess_icon }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {/* <ListItemAddFriend /> */}
          </>
        }
        renderItem={({ item, index }) => (
          <ItemFeed
            key={index}
            data={item}
            onShowModalComment={() => {
              modalRef.current?.onShowModalComment(item.feedId);
            }}
            modalActionRef={modalActionRef}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => {
              setFeedHome([]);
              numPageRef.current = 0;
              setIsStop(false);
              handleFetchData();
            }}
            colors={[colors.gold2]}
          />
        }
        onEndReached={() => {
          handleFetchData();
        }}
        onEndReachedThreshold={0.7}
        ListFooterComponent={
          <>
            {isLoading ? (
              <ActivityIndicator size="small" />
            ) : (
              isStop && (
                <Text style={{ textAlign: 'center', color: colors.black }}>
                  Đã tải hết dữ liệu
                </Text>
              )
            )}
          </>
        }
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      <ModalComment ref={modalRef} />
      <ModalAction ref={modalActionRef} />
      <Toast config={toastConfigExport} />
    </View>
  );
});

export default Home;
function actionTabbar(currentOffsetY: any, current: any, navigation: Omit<NavigationProp<ReactNavigation.RootParamList>, "getState"> & { getState(): NavigationState | undefined; }) {
  throw new Error('Function not implemented.');
}

