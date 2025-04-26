import React, {
  forwardRef,
  useCallback,
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
import { useTabBar } from '../../Configs/TabBarContext';
import Toast from 'react-native-toast-message';
import { UserContext } from '../../Configs/UserReducer';
import { ItemFeed, ListItemAddFriend, ModalComment } from './components';
import { ModalCommentRef } from './components/modalComment';
import { useGetFeedHomeMutation } from '../../RTKQuery/Slides/slide';
import { FeedItem } from '../../RTKQuery/Slides/types';

const Home = forwardRef(({ navigation }, ref) => {
  const { user, dispatch: userDispatch } = useContext(UserContext);
  const flatListRef = useRef(null);
  const [refreshing, setRefreshing] = useState(false);
  const { state, dispatch } = useTabBar();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [comment, setComment] = useState('');
  const [repname, setRepname] = useState('');
  const [idCommentParent, setIdCommentParent] = useState(0);
  const [postId, setPostId] = useState(0);
  const [commentList, setCommentList] = useState([]);
  const [post, setPost] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [textReport, setTextReport] = useState('');
  const [idReport, setIdReport] = useState(null);

  // // xóa bài viết
  // const confirmDeletePost = id => {
  //   Alert.alert(
  //     'Xác nhận xóa bài viết',
  //     'Bạn có chắc chắn muốn xóa bài viết này không?',
  //     [
  //       {
  //         text: 'Không',
  //         onPress: () => setPost(null),
  //         style: 'cancel',
  //       },
  //       {
  //         text: 'Có',
  //         onPress: () => deletePost(id),
  //       },
  //     ],
  //   );
  // };

  // hàm cập nhật danh sách
  // const updatePost = idPost => {
  //   setPosts(
  //     prevPosts => prevPosts.filter(post => post.idPost !== idPost), // Lọc bỏ bài viết có idPost tương ứng
  //   );
  // };

  // const deletePost = async id => {
  //   try {
  //     const api = await authApi();
  //     const response = await api.delete(endpoints['delete-post'](id));
  //     if (response.status === 200) {
  //       showToast('success', 'Thông báo!', 'Đã xóa bài viết thành công!');
  //       updatePost(id);
  //       setPost(null);
  //       // cập nhật danh sách
  //     } else {
  //       showToast('error', 'Thông báo!', 'Xóa bài viết không thành công!');
  //       console.log(response.status);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     showToast('error', 'Thông báo!', 'Xóa bài viết không thành công!');
  //   }
  // };

  // Hàm sẽ được gọi khi người dùng cuộn
  const [lastOffsetY, setLastOffsetY] = useState(0); // Vị trí cuộn trước đó

  // Ngưỡng nhỏ để gọi hàm
  const scrollThreshold = 5; // Ngưỡng cuộn nhỏ (ví dụ: 10 điểm)

  const handleScroll = useCallback(
    (event: { nativeEvent: { contentOffset: { y: any; }; }; }) => {
      const offsetY = event.nativeEvent.contentOffset.y;

      if (Math.abs(offsetY - lastOffsetY) > scrollThreshold) {
        if (offsetY > lastOffsetY) {
          hideTabBar();
        } else {
          showTabBar();
        }

        // Cập nhật vị trí cuộn trước đó
        setLastOffsetY(offsetY);
      }
    },
    [lastOffsetY],
  );

  const hideTabBar = () => {
    dispatch({ type: 'HIDE_TAB_BAR' });
  };

  const showTabBar = () => {
    dispatch({ type: 'SHOW_TAB_BAR' });
  };

  // const renderItem = ({ item }) => (
  //   <Image source={{ uri: item.mediaUrl }} style={styles.image} />
  // );

  // const route = useRoute();

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('tabPress', e => {
  //     if (route.name === 'Home') {
  //       onRefresh();
  //     }
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, [navigation, route.name]);

  // hàm refresh lại cuộng từ trên xuống
  // const onRefresh = () => {
  //   setPage(0);
  //   setPosts([]);
  //   loadPost();
  //   // Khi bắt đầu kéo để refresh, đặt trạng thái refreshing thành true
  //   setRefreshing(true);

  //   // Giả lập việc tải lại dữ liệu trong 1 giây
  //   setTimeout(() => {
  //     // Khi đã tải lại xong, đặt lại refreshing thành false
  //     setRefreshing(false);
  //   }, 1000);
  // };

  // const addPost = newPost => {
  //   if (newPost !== undefined) {
  //     setPosts(prevPosts => [...prevPosts, ...newPost]);
  //   }
  // };

  // // hàm format date
  // function convertDateTime(dateTimeStr) {
  //   const dateTime = new Date(dateTimeStr);
  //   const hours = String(dateTime.getHours()).padStart(2, '0');
  //   const minutes = String(dateTime.getMinutes()).padStart(2, '0');
  //   const day = String(dateTime.getDate()).padStart(2, '0');
  //   const month = String(dateTime.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
  //   const year = dateTime.getFullYear();

  //   return `${hours}:${minutes} ${day}-${month}-${year}`;
  // }

  // hàm cuộn từ dưới lên
  // const loadMorePosts = () => {
  //   if (loading) return; // Nếu đang tải hoặc không còn dữ liệu thì không gọi nữa
  //   setLoading(true);
  //   setLoading(true);
  // };

  // hàm định dạng ngày
  // const formatDate = dateString => {
  //   // Chuyển chuỗi ngày giờ thành đối tượng Date
  //   const date = new Date(dateString);

  //   // Lấy giờ và phút
  //   const hours = date.getHours();
  //   const minutes = date.getMinutes();

  //   // Lấy ngày, tháng, năm
  //   const day = date.getDate();
  //   const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần +1
  //   const year = date.getFullYear();

  //   // Định dạng thành chuỗi như mong muốn "phút:giờ yyyy-mm-dd"
  //   const formattedDate = `${hours}:${minutes} ${year}-${month < 10 ? '0' : ''
  //     }${month}-${day < 10 ? '0' : ''}${day}`;

  //   return formattedDate;
  // };

  // gọi ham popup
  // const popup = idPost => {
  //   setCommentList([]);
  //   setModalVisible(true);
  //   setPostId(idPost);
  //   // setComment("");
  //   fetchComment();
  // };

  // const unpop = () => {
  //   setCommentList([]);
  //   setComment('');
  //   setModalVisible(false);
  //   setPostId(0);
  // };

  // gọi api lấy dữ liệu
  // const loadPost = async () => {
  //   const api = await authApi();

  //   const response = await api.get(endpoints['loadPost'](user.id, page));
  //   if (response.status === 200) {
  //     addPost(response.data.content);
  //     setPage(page + 1);
  //     setLoading(false);
  //   } else if (response.status === 204) {
  //     setLoading(false);
  //     console.log('hết dữ liệu!');
  //   } else {
  //     console.log('error');
  //     setLoading(false);
  //   }
  // };

  // // khoi tạo hook chay dau tien
  // useEffect(() => {
  //   loadPost();
  // }, []);

  // // hàm tạo comment
  // const createCmt = async () => {
  //   if (comment.length === 0) return;
  //   const commentData = {
  //     idUser: user.id,
  //     idCmtParent: idCommentParent,
  //     idPost: postId,
  //     content: comment,
  //   };
  //   // console.log(commentData);

  //   const api = await authApi();

  //   try {
  //     const response = await api.post(
  //       endpoints['create-comment'],
  //       commentData,
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       },
  //     );
  //     console.log(response.data);
  //     setComment('');
  //     fetchComment();
  //     setIdCommentParent(0);
  //   } catch (error) {
  //     console.error('Error creating post:', error);
  //     throw error;
  //   }
  // };
  // // hàm theo dỏi
  // const following = async item => {
  //   const form = {
  //     idUser: user.id,
  //     idTargetUser: item.idUser,
  //   };

  //   const api = await authApi();
  //   try {
  //     const response = await api.post(endpoints['following'], form);
  //     if (response.status === 200) {
  //       console.log(item.idPost);
  //       handleFollowPost(item.idUser, true);
  //     } else {
  //       console.log('Không thể theo dõi người dùng.');
  //     }
  //   } catch (error) {
  //     // Kiểm tra lỗi và thông báo
  //     if (error.response) {
  //       // console.error('Lỗi từ server:', error.response.data);
  //     } else {
  //       console.error('Lỗi mạng hoặc không thể kết nối:', error.message);
  //     }
  //     throw error; // Ném lỗi lên trên nếu cần
  //   }
  // };

  // hàm hủy theo doi
  // const unFollow = async item => {
  //   const api = await authApi();
  //   try {
  //     const response = await api.delete(
  //       endpoints['unfollowing'](user.id, item.idUser),
  //     );
  //     if (response.status === 200) {
  //       handleFollowPost(item.idUser, false);
  //     } else {
  //       console.log('Không thể thực hiện!');
  //     }
  //   } catch (error) {
  //     // Kiểm tra lỗi và thông báo
  //     if (error.response) {
  //       console.error('Lỗi từ server:', error.response.data);
  //     } else {
  //       console.error('Lỗi mạng hoặc không thể kết nối:', error.message);
  //     }
  //     throw error; // Ném lỗi lên trên nếu cần
  //   }
  // };

  // cập nhật trạng thái follow
  // const handleFollowPost = (idUser, followStatus) => {
  //   setPosts(prevPosts =>
  //     prevPosts.map(post =>
  //       post.idUser === idUser ? { ...post, following: followStatus } : post,
  //     ),
  //   );
  // };

  // // hàm fetch bình luận
  // const fetchComment = async () => {
  //   if (postId === 0) return;
  //   const api = await authApi();
  //   try {
  //     console.log('post:' + postId);
  //     const response = await api.get(endpoints['load-comments'](postId));
  //     // Kiểm tra nếu API trả về thành công
  //     if (response.status === 200) {
  //       setCommentList(response.data); // Cập nhật dữ liệu bình luận
  //     } else {
  //       setCommentList([]);
  //     }
  //   } catch (error) {
  //     console.error('Lỗi lấy bình luận:', error);
  //     throw error;
  //   }
  // };

  // useEffect(() => {
  //   fetchComment();
  // }, [postId]); // Chỉ gọi lại API khi `postId` thay đổi

  // // trả lời bình luận
  // const reply = item => {
  //   setIdCommentParent(item.idComment);
  //   setRepname(item.firstname + item.lastname);
  //   // console.log(item.commentChild);
  // };

  // useEffect(() => { }, [idCommentParent]);

  // hàm thích bài viết
  // const likePost = async postId => {
  //   const api = await authApi();
  //   try {
  //     const response = await api.post(endpoints['like-post'](user.id, postId));
  //     if (response.status === 200) {
  //       handleLikePost(response.data.postId, response.data.countLike, true);
  //     }
  //   } catch (error) {
  //     console.error('Error like post:', error);
  //     throw error;
  //   }
  // };

  // hàm bỏ thích bài viết
  // const disLikePost = async postId => {
  //   const api = await authApi();
  //   try {
  //     const response = await api.delete(
  //       endpoints['like-post'](user.id, postId),
  //     );
  //     if (response.status === 200) {
  //       handleLikePost(response.data.postId, response.data.countLike, false);
  //     }
  //   } catch (error) {
  //     console.error('Error like post:', error);
  //     throw error;
  //   }
  // };

  // hàm cập nhật giá trị like
  // const handleLikePost = (idPost, newLikes, likedStatus) => {
  //   setPosts(prevPosts =>
  //     prevPosts.map(
  //       post =>
  //         post.idPost === idPost
  //           ? { ...post, likes: newLikes, liked: likedStatus } // Cập nhật likes và liked cho post tương ứng
  //           : post, // Giữ nguyên các post khác
  //     ),
  //   );
  // };


  // xoas cmt
  // const deleteComment = async idCmt => {
  //   try {
  //     const api = await authApi();
  //     const response = await api.delete(endpoints['delete-cmt'](idCmt));
  //     if (response.status === 200) {
  //       fetchComment();
  //       // console.log("ok");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // update nội dung bài viết
  // const [showEditPost, setShowEditPost] = useState(false);
  // const [postEdit, setPostEdit] = useState(null);
  // const [contentPost, setContentPost] = useState('');
  // const [idRemoveImg, setIdRemoveImg] = useState([]);

  // const addIDImg = id => {
  //   setIdRemoveImg(prevIds => [...prevIds, id]);

  //   if (postEdit && postEdit.medias) {
  //     // Lọc ra các media không có mediaId cần xóa
  //     const updatedMedias = postEdit.medias.filter(
  //       media => media.mediaId !== id,
  //     );

  //     // Cập nhật lại postEdit với danh sách medias mới
  //     setPostEdit(prevPostEdit => ({
  //       ...prevPostEdit,
  //       medias: updatedMedias,
  //     }));
  //   }
  // };

  // const postUpdate = async () => {
  //   try {
  //     const api = await authApi(); // Tạo instance axios với token
  //     const response = await api.put('/api/post', {
  //       postId: postEdit.idPost,
  //       content: contentPost,
  //       idMedias: idRemoveImg,
  //     });
  //     if (response.status === 200) {
  //       showToast('success', 'Thông báo!', 'Gử báo cáo thành công!');
  //       closeEdit();
  //       setPost(null);
  //     }
  //   } catch (error) {
  //     console.error('Error updating post:', error);
  //     throw error; // Đảm bảo xử lý lỗi ở cấp trên
  //   }
  // };

  // const pickPostEdit = post => {
  //   setShowEditPost(true);
  //   setPostEdit(post);
  //   setContentPost(post.content);
  //   console.log(post);
  // };

  // const closeEdit = () => {
  //   setShowEditPost(false);
  //   setPostEdit(null);
  // };

  // tạo báo cáo

  // const hienThiBaoCao = postId => {
  //   setShowReport(true);
  //   setIdReport(postId);
  // };

  // const createReport = async () => {
  //   try {
  //     const api = await authApi();
  //     const response = await api.post(endpoints['report'], {
  //       userId: user.id,
  //       postId: idReport,
  //       content: textReport,
  //     });

  //     if (response.status === 201) {
  //       setShowReport(false);
  //       setTextReport('');
  //       setIdReport(null);
  //       showToast('success', 'Thông báo!', 'Gử báo cáo thành công!');
  //     }
  //   } catch (error) {
  //     setShowReport(false);
  //     setTextReport('');
  //     setIdReport(null);
  //     showToast('error', 'Thông báo!', 'Báo cáo không thành công!');
  //   }
  // };

  // const closeReport = () => {
  //   setShowReport(false);
  //   setIdReport(null);
  //   setTextReport('');
  // };
  // new
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
      console.log('====================================');
      console.log(data);
      console.log('====================================');
      setFeedHome(prev => [...prev || [], ...data || []]);
      if (data.length === 0) {
        setIsStop(true);
      }
    } catch (e) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
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
                  onPress={() => navigation.navigate('Message')}>
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
              setIsStop(false);
              handleFetchData();
            }}
            colors={[colors.gold2]}
          />
        }
        onEndReached={() => {
          setPageFeed(pre => pre + 1)
          handleFetchData();
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
