import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  RefreshControl,
  Modal,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  LogBox,
  Alert,
} from 'react-native';
import colors from '../../assets/color/colors';
import icons from '../../assets/iconApp/icons';
import styles from './HomeStyle';
import { useTabBar } from '../../Configs/TabBarContext';
import { authApi, endpoints } from '../../Configs/APIs';
import { BlurView } from '@react-native-community/blur';
import { useRoute } from '@react-navigation/native';
import { showToast, toastConfigExport } from '../../Configs/ToastConfig';
import Toast from 'react-native-toast-message';
import { UserContext } from '../../Configs/UserReducer';

LogBox.ignoreLogs(['Function components cannot be given refs']);

const Home = forwardRef(({ navigation }, ref) => {
  const { user, dispatch: userDispatch } = useContext(UserContext);
  const flatListRef = useRef(null);
  const [refreshing, setRefreshing] = useState(false);
  const { state, dispatch } = useTabBar();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [comment, setComment] = useState('');
  const [repname, setRepname] = useState('');
  const [idCommentParent, setIdCommentParent] = useState(0);
  const [postId, setPostId] = useState(0);
  const [commentList, setCommentList] = useState([]);
  const [post, setPost] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [textReport, setTextReport] = useState('');
  const [idReport, setIdReport] = useState(null);

  // xóa bài viết
  const confirmDeletePost = id => {
    Alert.alert(
      'Xác nhận xóa bài viết',
      'Bạn có chắc chắn muốn xóa bài viết này không?',
      [
        {
          text: 'Không',
          onPress: () => setPost(null),
          style: 'cancel',
        },
        {
          text: 'Có',
          onPress: () => deletePost(id),
        },
      ],
    );
  };

  // hàm cập nhật danh sách
  const updatePost = idPost => {
    setPosts(
      prevPosts => prevPosts.filter(post => post.idPost !== idPost), // Lọc bỏ bài viết có idPost tương ứng
    );
  };

  const deletePost = async id => {
    try {
      const api = await authApi();
      const response = await api.delete(endpoints['delete-post'](id));
      if (response.status === 200) {
        showToast('success', 'Thông báo!', 'Đã xóa bài viết thành công!');
        updatePost(id);
        setPost(null);
        // cập nhật danh sách
      } else {
        showToast('error', 'Thông báo!', 'Xóa bài viết không thành công!');
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
      showToast('error', 'Thông báo!', 'Xóa bài viết không thành công!');
    }
  };

  // Hàm sẽ được gọi khi người dùng cuộn
  const [lastOffsetY, setLastOffsetY] = useState(0); // Vị trí cuộn trước đó

  // Ngưỡng nhỏ để gọi hàm
  const scrollThreshold = 5; // Ngưỡng cuộn nhỏ (ví dụ: 10 điểm)

  const handleScroll = useCallback(
    event => {
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

  const renderItem = ({ item }) => (
    <Image source={{ uri: item.mediaUrl }} style={styles.image} />
  );

  const route = useRoute();

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', e => {
      if (route.name === 'Home') {
        onRefresh();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigation, route.name]);

  // hàm refresh lại cuộng từ trên xuống
  const onRefresh = () => {
    setPage(0);
    setPosts([]);
    loadPost();
    // Khi bắt đầu kéo để refresh, đặt trạng thái refreshing thành true
    setRefreshing(true);

    // Giả lập việc tải lại dữ liệu trong 1 giây
    setTimeout(() => {
      // Khi đã tải lại xong, đặt lại refreshing thành false
      setRefreshing(false);
    }, 1000);
  };

  const addPost = newPost => {
    if (newPost !== undefined) {
      setPosts(prevPosts => [...prevPosts, ...newPost]);
    }
  };

  // hàm format date
  function convertDateTime(dateTimeStr) {
    const dateTime = new Date(dateTimeStr);
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');
    const month = String(dateTime.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = dateTime.getFullYear();

    return `${hours}:${minutes} ${day}-${month}-${year}`;
  }

  // hàm cuộn từ dưới lên
  const loadMorePosts = () => {
    if (loading) return; // Nếu đang tải hoặc không còn dữ liệu thì không gọi nữa
    setLoading(true);
    loadPost();
    setLoading(true);
  };

  // hàm định dạng ngày
  const formatDate = dateString => {
    // Chuyển chuỗi ngày giờ thành đối tượng Date
    const date = new Date(dateString);

    // Lấy giờ và phút
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Lấy ngày, tháng, năm
    const day = date.getDate();
    const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần +1
    const year = date.getFullYear();

    // Định dạng thành chuỗi như mong muốn "phút:giờ yyyy-mm-dd"
    const formattedDate = `${hours}:${minutes} ${year}-${month < 10 ? '0' : ''
      }${month}-${day < 10 ? '0' : ''}${day}`;

    return formattedDate;
  };

  // gọi ham popup
  const popup = idPost => {
    setCommentList([]);
    setModalVisible(true);
    setPostId(idPost);
    // setComment("");
    fetchComment();
  };

  const unpop = () => {
    setCommentList([]);
    setComment('');
    setModalVisible(false);
    setPostId(0);
  };

  // gọi api lấy dữ liệu
  const loadPost = async () => {
    const api = await authApi();

    const response = await api.get(endpoints['loadPost'](user.id, page));
    if (response.status === 200) {
      addPost(response.data.content);
      setPage(page + 1);
      setLoading(false);
    } else if (response.status === 204) {
      setLoading(false);
      console.log('hết dữ liệu!');
    } else {
      console.log('error');
      setLoading(false);
    }
  };

  // khoi tạo hook chay dau tien
  useEffect(() => {
    loadPost();
  }, []);

  // hàm tạo comment
  const createCmt = async () => {
    if (comment.length === 0) return;
    const commentData = {
      idUser: user.id,
      idCmtParent: idCommentParent,
      idPost: postId,
      content: comment,
    };
    // console.log(commentData);

    const api = await authApi();

    try {
      const response = await api.post(
        endpoints['create-comment'],
        commentData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(response.data);
      setComment('');
      fetchComment();
      setIdCommentParent(0);
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  };
  // hàm theo dỏi
  const following = async item => {
    const form = {
      idUser: user.id,
      idTargetUser: item.idUser,
    };

    const api = await authApi();
    try {
      const response = await api.post(endpoints['following'], form);
      if (response.status === 200) {
        console.log(item.idPost);
        handleFollowPost(item.idUser, true);
      } else {
        console.log('Không thể theo dõi người dùng.');
      }
    } catch (error) {
      // Kiểm tra lỗi và thông báo
      if (error.response) {
        // console.error('Lỗi từ server:', error.response.data);
      } else {
        console.error('Lỗi mạng hoặc không thể kết nối:', error.message);
      }
      throw error; // Ném lỗi lên trên nếu cần
    }
  };

  // hàm hủy theo doi
  const unFollow = async item => {
    const api = await authApi();
    try {
      const response = await api.delete(
        endpoints['unfollowing'](user.id, item.idUser),
      );
      if (response.status === 200) {
        handleFollowPost(item.idUser, false);
      } else {
        console.log('Không thể thực hiện!');
      }
    } catch (error) {
      // Kiểm tra lỗi và thông báo
      if (error.response) {
        console.error('Lỗi từ server:', error.response.data);
      } else {
        console.error('Lỗi mạng hoặc không thể kết nối:', error.message);
      }
      throw error; // Ném lỗi lên trên nếu cần
    }
  };

  // cập nhật trạng thái follow
  const handleFollowPost = (idUser, followStatus) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.idUser === idUser ? { ...post, following: followStatus } : post,
      ),
    );
  };

  // hàm fetch bình luận
  const fetchComment = async () => {
    if (postId === 0) return;
    const api = await authApi();
    try {
      console.log('post:' + postId);
      const response = await api.get(endpoints['load-comments'](postId));
      // Kiểm tra nếu API trả về thành công
      if (response.status === 200) {
        setCommentList(response.data); // Cập nhật dữ liệu bình luận
      } else {
        setCommentList([]);
      }
    } catch (error) {
      console.error('Lỗi lấy bình luận:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchComment();
  }, [postId]); // Chỉ gọi lại API khi `postId` thay đổi

  // trả lời bình luận
  const reply = item => {
    setIdCommentParent(item.idComment);
    setRepname(item.firstname + item.lastname);
    // console.log(item.commentChild);
  };

  useEffect(() => { }, [idCommentParent]);

  // hàm thích bài viết
  const likePost = async postId => {
    const api = await authApi();
    try {
      const response = await api.post(endpoints['like-post'](user.id, postId));
      if (response.status === 200) {
        handleLikePost(response.data.postId, response.data.countLike, true);
      }
    } catch (error) {
      console.error('Error like post:', error);
      throw error;
    }
  };

  // hàm bỏ thích bài viết
  const disLikePost = async postId => {
    const api = await authApi();
    try {
      const response = await api.delete(
        endpoints['like-post'](user.id, postId),
      );
      if (response.status === 200) {
        handleLikePost(response.data.postId, response.data.countLike, false);
      }
    } catch (error) {
      console.error('Error like post:', error);
      throw error;
    }
  };

  // hàm cập nhật giá trị like
  const handleLikePost = (idPost, newLikes, likedStatus) => {
    setPosts(prevPosts =>
      prevPosts.map(
        post =>
          post.idPost === idPost
            ? { ...post, likes: newLikes, liked: likedStatus } // Cập nhật likes và liked cho post tương ứng
            : post, // Giữ nguyên các post khác
      ),
    );
  };

  // xuất comments
  const renderComment = ({ item }) => (
    <View style={{ width: '100%', minHeight: 70, flexDirection: 'row' }}>
      <Image
        style={{ width: 40, height: 40, borderRadius: 50, margin: 5 }}
        source={{
          uri:
            item.avatar === ''
              ? 'https://i.pinimg.com/564x/25/ee/de/25eedef494e9b4ce02b14990c9b5db2d.jpg'
              : item.avatar,
        }}
      />
      <View
        style={{
          minHeight: 40,
          paddingRight: 9,
          width: Dimensions.get('window').width * 0.95 - 50,
        }}>
        <View style={{ paddingRight: 9 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text
              style={{ fontSize: 15, fontWeight: '600', color: colors.black }}>
              {item.firstname} {item.lastname}
            </Text>
            <Text style={{ fontSize: 14, fontWeight: '400', marginLeft: 10 }}>
              {convertDateTime(item.commentDate)}
            </Text>
          </View>
        </View>
        <Text style={{ minHeight: 20, fontSize: 16 }}>{item.comment}</Text>
        <View
          style={{
            width: '100%',
            minHeight: 30,
            flexDirection: 'row',
            paddingTop: 2,
            justifyContent: 'flex-start',
          }}>
          <TouchableOpacity onPress={() => reply(item)}>
            <Text style={{ fontSize: 17, fontWeight: '500', color: colors.info }}>
              Trả lời
            </Text>
          </TouchableOpacity>
          {item.idUser === user.id && (
            <TouchableOpacity onPress={() => deleteComment(item.idComment)}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '500',
                  color: colors.gray,
                  marginLeft: 50,
                  color: colors.danger,
                }}>
                Xóa
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {/* // bình luận con */}
        <FlatList
          data={item.commentChild}
          keyExtractor={child => child.idComment.toString()}
          nestedScrollEnabled={true}
          scrollEnabled={false}
          renderItem={({ item: child }) => (
            <View style={{ width: 'auto', minHeight: 70, flexDirection: 'row' }}>
              <Image
                style={{ width: 40, height: 40, borderRadius: 50, margin: 5 }}
                source={{
                  uri:
                    child.avatar === ''
                      ? 'https://i.pinimg.com/564x/25/ee/de/25eedef494e9b4ce02b14990c9b5db2d.jpg'
                      : child.avatar,
                }}
              />
              <View
                style={{
                  minHeight: 40,
                  paddingRight: 9,
                  width: Dimensions.get('window').width * 0.8 - 50,
                }}>
                <View style={{ paddingRight: 9 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: '600',
                        color: colors.black,
                      }}>
                      {child.firstname} {child.lastname}
                    </Text>
                    <Text
                      style={{ fontSize: 14, fontWeight: '400', marginLeft: 10 }}>
                      {convertDateTime(child.commentDate)}
                    </Text>
                  </View>
                </View>
                <Text style={{ minHeight: 20, fontSize: 16 }}>
                  {child.comment}
                </Text>
                <View
                  style={{
                    width: 'auto',
                    minHeight: 30,
                    flexDirection: 'row',
                    paddingTop: 2,
                    justifyContent: 'space-between',
                  }}>
                  {child.idUser === user.id && (
                    <TouchableOpacity
                      onPress={() => deleteComment(child.idComment)}>
                      <Text
                        style={{
                          fontSize: 17,
                          fontWeight: '500',
                          color: colors.gray,
                          color: colors.danger,
                        }}>
                        Xóa
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );

  // xoas cmt
  const deleteComment = async idCmt => {
    try {
      const api = await authApi();
      const response = await api.delete(endpoints['delete-cmt'](idCmt));
      if (response.status === 200) {
        fetchComment();
        // console.log("ok");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // update nội dung bài viết
  const [showEditPost, setShowEditPost] = useState(false);
  const [postEdit, setPostEdit] = useState(null);
  const [contentPost, setContentPost] = useState('');
  const [idRemoveImg, setIdRemoveImg] = useState([]);

  const addIDImg = id => {
    setIdRemoveImg(prevIds => [...prevIds, id]);

    if (postEdit && postEdit.medias) {
      // Lọc ra các media không có mediaId cần xóa
      const updatedMedias = postEdit.medias.filter(
        media => media.mediaId !== id,
      );

      // Cập nhật lại postEdit với danh sách medias mới
      setPostEdit(prevPostEdit => ({
        ...prevPostEdit,
        medias: updatedMedias,
      }));
    }
  };

  const postUpdate = async () => {
    try {
      const api = await authApi(); // Tạo instance axios với token
      const response = await api.put('/api/post', {
        postId: postEdit.idPost,
        content: contentPost,
        idMedias: idRemoveImg,
      });
      if (response.status === 200) {
        showToast('success', 'Thông báo!', 'Gử báo cáo thành công!');
        closeEdit();
        setPost(null);
      }
    } catch (error) {
      console.error('Error updating post:', error);
      throw error; // Đảm bảo xử lý lỗi ở cấp trên
    }
  };

  const pickPostEdit = post => {
    setShowEditPost(true);
    setPostEdit(post);
    setContentPost(post.content);
    console.log(post);
  };

  const closeEdit = () => {
    setShowEditPost(false);
    setPostEdit(null);
  };

  // tạo báo cáo

  const hienThiBaoCao = postId => {
    setShowReport(true);
    setIdReport(postId);
  };

  const createReport = async () => {
    try {
      const api = await authApi();
      const response = await api.post(endpoints['report'], {
        userId: user.id,
        postId: idReport,
        content: textReport,
      });

      if (response.status === 201) {
        setShowReport(false);
        setTextReport('');
        setIdReport(null);
        showToast('success', 'Thông báo!', 'Gử báo cáo thành công!');
      }
    } catch (error) {
      setShowReport(false);
      setTextReport('');
      setIdReport(null);
      showToast('error', 'Thông báo!', 'Báo cáo không thành công!');
    }
  };

  const closeReport = () => {
    setShowReport(false);
    setIdReport(null);
    setTextReport('');
  };

  // một số nội dung báo cáo
  const reportContent = [
    'Bài viết chứa nội dung không phù hợp',
    'Bài viết đăng tải hình ảnh không phù hợp',
    'Tin giả',
    'Bài viết chứa nội dung nhảy cảm',
    'Bài viết mang tính bạo lực, thù ghét',
    'Tôi không muốn xem nội dung này',
    'Nội dung quấy rối hoặc lăng mạ',
  ];

  const dataTemp = {

  }

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide" // Kiểu animation khi Modal hiển thị
        transparent={true} // Làm nền phía sau Modal mờ đi
        visible={showReport} // hiển thị
        onRequestClose={() => {
          // Hành động khi Modal bị đóng
          setModalVisible(!showReport);
        }}>
        {/* Phần nền mờ */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, backgroundColor: colors.light }}>
            <KeyboardAvoidingView
              keyboardVerticalOffset={0}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <View style={{ alignItems: 'center' }}>
                <View
                  style={[styles.head_edit, { backgroundColor: colors.gold }]}>
                  <TouchableOpacity onPress={closeReport}>
                    <Text style={styles.text_head}>Hủy</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={createReport}>
                    <Text style={styles.text_head}>Gửi</Text>
                  </TouchableOpacity>
                </View>
                <TextInput
                  style={styles.input_report}
                  multiline={true}
                  numberOfLines={1} // Số dòng hiển thị mặc định (có thể tuỳ chỉnh)
                  value={textReport}
                  onChangeText={e => setTextReport(e)}
                  placeholder="Nhập nội dung báo cáo..."
                />

                <View style={styles.border_bot} />
                <Text
                  style={{
                    fontSize: 17,
                    backgroundColor: colors.light,
                    position: 'absolute',
                    top: 110,
                  }}>
                  Lựa chọn nội dung
                </Text>
                <View style={{ width: '100%', padding: 10 }}>
                  <FlatList
                    data={reportContent}
                    renderItem={(
                      { item }, // Render trực tiếp bên trong FlatList
                    ) => (
                      <TouchableOpacity onPress={() => setTextReport(item)}>
                        <Text style={styles.item_report}>{item}</Text>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()} // Khóa duy nhất cho mỗi item
                  />
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {/* hiển thị cập nhật bài viết */}
      <Modal
        animationType="slide" // Kiểu animation khi Modal hiển thị
        transparent={true} // Làm nền phía sau Modal mờ đi
        visible={showEditPost} // hiển thị
        onRequestClose={() => {
          // Hành động khi Modal bị đóng
          setModalVisible(!showEditPost);
        }}>
        {/* Phần nền mờ */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <BlurView
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
              }}
              blurType="dark" // Các kiểu blur: light, dark, extraDark, regular, prominent
              blurAmount={1} // Độ mạnh của hiệu ứng blur
              reducedTransparencyFallbackColor="white" // Màu nền khi blur không khả dụng
            />

            <KeyboardAvoidingView
              keyboardVerticalOffset={0}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <View style={styles.contain_edit_post}>
                <View style={styles.head_edit}>
                  <TouchableOpacity onPress={closeEdit}>
                    <Text style={styles.text_head}>Hủy</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={postUpdate}>
                    <Text style={styles.text_head}>Cập nhật</Text>
                  </TouchableOpacity>
                </View>

                <View style={{ marginBottom: 7, flexDirection: 'row' }}>
                  {/* <Image
                    style={{width: 50, height: 50, borderRadius: 50}}
                    source={{
                      uri:
                        user.avatar === ''
                          ? 'https://i.pinimg.com/564x/25/ee/de/25eedef494e9b4ce02b14990c9b5db2d.jpg'
                          : user.avatar,
                    }}
                  /> */}
                  <View>
                    {/* <Text style={styles.text_name}>
                      {user.firstName} {user.lastName}
                    </Text> */}
                    <Text style={{ marginLeft: 10, color: colors.gray }}>
                      Bài viết đang ở chế độ công khai
                    </Text>
                  </View>
                </View>

                <TextInput
                  style={styles.textInput}
                  multiline={true}
                  numberOfLines={3} // Số dòng hiển thị mặc định (có thể tuỳ chỉnh)
                  value={contentPost}
                  onChangeText={e => setContentPost(e)}
                  placeholder="Hãy nhập nội dung tại đây..."
                />

                {/* hiển thị ảnh */}
                {postEdit != null && (
                  <>
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      style={{ width: '100%', minHeight: 90 }}
                      data={postEdit.medias}
                      keyExtractor={(item, index) => index.toString()} // Đảm bảo mỗi ảnh có key duy nhất
                      renderItem={({ item, index }) => (
                        <View style={{ marginBottom: 10, position: 'relative' }}>
                          <TouchableOpacity
                            style={styles.remove}
                            onPress={() => addIDImg(item.mediaId)}>
                            <Image
                              style={{ width: 30, height: 30 }}
                              source={{ uri: icons.remove }}
                            />
                          </TouchableOpacity>
                          <Image
                            style={styles.media}
                            source={{ uri: item.mediaUrl }}
                          />
                        </View>
                      )}
                    />
                  </>
                )}
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* hiện thị binh luận */}
      <Modal
        animationType="slide"
        transparent={true} // Đặt transparent thành true để làm nền trong suốt
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        {/* Phần nền mờ */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <BlurView
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
              }}
              blurType="dark" // Các kiểu blur: light, dark, extraDark, regular, prominent
              blurAmount={1} // Độ mạnh của hiệu ứng blur
              reducedTransparencyFallbackColor="white" // Màu nền khi blur không khả dụng
            />

            <KeyboardAvoidingView
              keyboardVerticalOffset={0}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <View style={styles.contai_popup}>
                <TouchableOpacity onPress={unpop}>
                  <View style={{ width: '100%', height: '20%' }}></View>
                </TouchableOpacity>

                <View style={styles.contain_cmt_view}>
                  <Text style={{ fontSize: 19, fontWeight: '600' }}>Comment</Text>
                  <View
                    style={{
                      width: '95%',
                      borderWidth: 0.7,
                      borderColor: colors.gray,
                      marginBottom: 1,
                    }}
                  />

                  <View style={styles.contain_list_cmt}>
                    <FlatList
                      data={commentList}
                      keyExtractor={item => item.idComment.toString()}
                      renderItem={renderComment}
                      nestedScrollEnabled={true}
                      ListEmptyComponent={<Text>Chưa có bình luận!</Text>}
                      contentContainerStyle={styles.contentContainer}
                      style={{ flex: 1 }}
                    />
                  </View>

                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.input_cmt}>
                      <TextInput
                        value={comment}
                        onChangeText={setComment}
                        placeholder="Type comment here..."
                        style={styles.textInput}
                      />

                      <TouchableOpacity onPress={createCmt} style={styles.send}>
                        <Image
                          style={{
                            width: 30,
                            height: 30,
                            transform: [{ rotate: '270deg' }],
                            top: -1,
                          }}
                          source={{ uri: icons.send_cmt }}
                        />
                      </TouchableOpacity>

                      {idCommentParent !== 0 && (
                        <View style={styles.reply}>
                          <Text
                            style={{
                              fontSize: 17,
                              fontWeight: '700',
                              color: colors.dark,
                            }}>
                            Trả lời:
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: '400',
                              color: colors.dark,
                              paddingLeft: 5,
                            }}>
                            @{repname}
                          </Text>
                          <TouchableOpacity
                            onPress={() => setIdCommentParent(0)}>
                            <Image
                              style={{ width: 20, height: 20, marginLeft: 10 }}
                              source={{ uri: icons.remove }}
                            />
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <FlatList
        ref={flatListRef}
        data={[{}]}
        showsVerticalScrollIndicator={false} // Tắt thanh cuộn dọc
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
          />
        }
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.5} // Tỉ lệ danh sách còn lại trước khi gọi hàm (0.5 = 50%)
        ListFooterComponent={
          <View style={{ padding: 10 }}>
            {/* {loading ? (
                            <ActivityIndicator size="small" />
                        ) : (
                            !hasMoreData && <Text style={{ textAlign: 'center' }}>Đã tải hết dữ liệu</Text>
                        )} */}
          </View>
        }
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.contain}>
            {/* thông tin ng đăng */}
            <View style={styles.post_infor}>
              <Image
                style={{ width: 50, height: 50, borderRadius: 50 }}
                source={{
                  uri:
                    item.avatar === ''
                      ? 'https://i.pinimg.com/564x/25/ee/de/25eedef494e9b4ce02b14990c9b5db2d.jpg'
                      : item.avatar,
                }}
              />

              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: '500' }}>
                  {item.username}
                </Text>
                <Text style={{ fontSize: 17, color: colors.gray }}>
                  {formatDate(item.dateCreated)}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => setPost(item.idPost)}
              style={styles.menu}>
              <Image
                style={{
                  width: 20,
                  height: 20,
                  tintColor: colors.black,
                  paddingRight: 5,
                }}
                source={{ uri: icons.icon_menu }}
              />
            </TouchableOpacity>
            {/* Menu chọn */}
            {post === item.idPost && (
              <>
                <View style={styles.menu_box}>
                  {user.id === item.idUser ? (
                    <TouchableOpacity
                      onPress={() => confirmDeletePost(item.idPost)}
                      style={styles.item_menu}>
                      <Text>Xóa bài viết</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => hienThiBaoCao(item.idPost)}
                      style={styles.item_menu}>
                      <Text>Báo cáo bài viết</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={styles.item_menu}
                    onPress={() => setPost(null)}>
                    <Text>Hủy</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
            <View
              style={{
                width: 'auto',
                paddingLeft: 10,
                paddingRight: 10,
                marginTop: 5,
              }}>
              <Text style={{ fontSize: 18, color: colors.dark }}>
                {item.content}
              </Text>
            </View>

            <View style={styles.post_contain}>
              {/* // hiển thị ảnh */}

              <View style={styles.contai_image}>
                <FlatList
                  data={item.medias}
                  renderItem={renderItem}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={
                    {
                      // paddingLeft: '12%'
                    }
                  }
                />
              </View>
              {/* hien thi thoe doi */}
              <View style={styles.contain_action}>
                {item.idUser !== user.id ? (
                  item.following ? (
                    <TouchableOpacity
                      onPress={() => unFollow(item)}
                      style={styles.btn_follow}
                      activeOpacity={0.3}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: '600',
                          color: colors.info,
                        }}>
                        following
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => following(item)}
                      style={styles.btn_follow}
                      activeOpacity={0.3}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: '600',
                          color: colors.info,
                        }}>
                        follow
                      </Text>
                    </TouchableOpacity>
                  )
                ) : (
                  <TouchableOpacity
                    onPress={() => pickPostEdit(item)}
                    style={styles.btn_follow}
                    activeOpacity={0.3}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '600',
                        color: colors.info,
                      }}>
                      Cập nhật
                    </Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  onPress={() => popup(item.idPost)}
                  activeOpacity={0.3}
                  style={styles.btn_cmt}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '600',
                      color: colors.info,
                    }}>
                    Comment
                  </Text>
                </TouchableOpacity>

                <View style={styles.btn_like}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '600',
                      color: colors.danger,
                    }}>
                    {item.likes}
                  </Text>

                  {item.liked ? (
                    <TouchableOpacity
                      onPress={() => disLikePost(item.idPost)}
                      activeOpacity={0.3}>
                      <Image
                        style={{ width: 35, height: 35, tintColor: colors.gold }}
                        source={{ uri: icons.like }}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => likePost(item.idPost)}
                      activeOpacity={0.3}>
                      <Image
                        style={{ width: 35, height: 35, tintColor: colors.black }}
                        source={{ uri: icons.like }}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </View>
        )}
        ListHeaderComponent={
          <>
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
          </>
        }
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          width: '100%',
          paddingBottom: 90,
        }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      <Toast config={toastConfigExport} />
    </SafeAreaView>
  );
});

export default Home;
