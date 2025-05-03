import React, {
  forwardRef,
  useContext,
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
import { UserContext } from '../../Configs/UserReducer';
import { ItemFeed, ListItemAddFriend, ModalComment } from './components';
import { ModalCommentRef } from './components/modalComment';
import { useGetFeedHomeMutation } from '../../RTKQuery/Slides/slide';
import { FeedItem } from '../../RTKQuery/Slides/types';
import { NavigationProp, NavigationState, useNavigation } from '@react-navigation/native';

const Home = forwardRef((ref) => {
  const navigation = useNavigation();
  const lastOffsetYFlatlist = useRef(0);
  const [isShowTabar, setIsShowTabar] = useState(false);
  const { user, dispatch: userDispatch } = useContext(UserContext);
  const flatListRef = useRef(null);

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

  const [feedHome, setFeedHome] = useState<FeedItem[]>([]);
  const [isStop, setIsStop] = useState(false);
  const [pageFeed, setPageFeed] = useState(0);
  const [fetchData, { data, isLoading, error }] = useGetFeedHomeMutation();
  const modalRef = useRef<ModalCommentRef>(null);

  const handleFetchData = async () => {
    try {
      if (isStop) {
        return;
      }
      await fetchData({ page: pageFeed }).unwrap();
      // console.log(data);
      setFeedHome(prev => [...prev || [], ...data || []]);
      if (data?.length === 0) {
        setIsStop(true);
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
          <View>
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
            <ListItemAddFriend />
          </View>
        }
        renderItem={({ item, index }) => (
          <ItemFeed
            key={index}
            data={item}
            onShowModalComment={() => {
              modalRef.current?.onShowModalComment();
            }}
            onShowAction={() => { }}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => {
              setPageFeed(0);
              setIsStop(false);
              setFeedHome([]);
              handleFetchData();
            }}
            colors={[colors.gold2]}
          />
        }
        onEndReached={() => {
          if (!isLoading) {
            setPageFeed(pre => pre + 1)
            handleFetchData();
          }
        }}
        onEndReachedThreshold={0.9}
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
      {/* <Toast config={toastConfigExport} /> */}
    </View>
  );
});

export default Home;
function actionTabbar(currentOffsetY: any, current: any, navigation: Omit<NavigationProp<ReactNavigation.RootParamList>, "getState"> & { getState(): NavigationState | undefined; }) {
  throw new Error('Function not implemented.');
}

