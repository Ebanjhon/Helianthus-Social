import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Image, ImageBackground, Text, TouchableOpacity, View, FlatList, StyleSheet, RefreshControl, Alert, ActivityIndicator, Modal, Button, SafeAreaView, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native'
import colors from '../../assets/color/colors';
import icons from '../../assets/iconApp/icons';
import styles from './HomeStyle';
import { StatusBar } from 'react-native';
import { useTabBar } from '../../Configs/TabBarContext';
import { authApi, endpoints } from '../../Configs/APIs';
import { UserContext } from '../../Configs/Context';
import { BlurView } from '@react-native-community/blur';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';

const Home = ({ navigation }) => {
    const flatListRef = useRef(null);
    const [refreshing, setRefreshing] = useState(false);
    const { state, dispatch } = useTabBar();
    const [posts, setPosts] = useState([]);
    const [user, dispatchUser] = useContext(UserContext);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu
    const [modalVisible, setModalVisible] = useState(false);
    const [comment, setComment] = useState('');
    const [repname, setRepname] = useState('');
    const [idCommentParent, setIdCommentParent] = useState(0);
    const [postId, setPostId] = useState(0);
    const [commentList, setCommentList] = useState([]);

    // Hàm sẽ được gọi khi người dùng cuộn
    const [lastOffsetY, setLastOffsetY] = useState(0); // Vị trí cuộn trước đó

    // Ngưỡng nhỏ để gọi hàm
    const scrollThreshold = 5; // Ngưỡng cuộn nhỏ (ví dụ: 10 điểm)

    const handleScroll = useCallback((event) => {
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
    }, [lastOffsetY]);

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
        const unsubscribe = navigation.addListener('tabPress', (e) => {
            if (route.name === 'Home') {
                onRefresh();
                console.log('Nhấn vào tab Home khi đang ở màn hình Home');
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

        // Giả lập việc tải lại dữ liệu trong 2 giây
        setTimeout(() => {
            // Khi đã tải lại xong, đặt lại refreshing thành false
            setRefreshing(false);
        }, 1000);
    };

    const addPost = (newPost) => {
        if (newPost !== undefined) {
            setPosts((prevPosts) => [...prevPosts, ...newPost]);
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
        if (loading) return;  // Nếu đang tải hoặc không còn dữ liệu thì không gọi nữa
        setLoading(true);
        loadPost();
        setLoading(true);
    };

    // hàm định dạng ngày
    const formatDate = (dateString) => {
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
        const formattedDate = `${minutes}:${hours} ${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

        return formattedDate;
    };

    // gọi ham popup
    const popup = (idPost) => {
        setCommentList([]);
        setModalVisible(true);
        setPostId(idPost);
        // setComment("");
        fetchComment();
    };

    const unpop = () => {
        setCommentList([]);
        setComment("");
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
            console.log("hết dữ liệu!");
        }
        else {
            console.log("error");
            setLoading(false);
        }
    };
    // khoi tạo hook chay dau tien
    useEffect(() => {
        loadPost();
    }, [])

    // hàm tạo comment
    const createCmt = async () => {
        if (comment.length === 0)
            return;
        const commentData = {
            idUser: user.id,
            idCmtParent: idCommentParent,
            idPost: postId,
            content: comment,
        };
        console.log(commentData);

        const api = await authApi();

        try {
            const response = await api.post(endpoints['create-comment'], commentData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data);
            setComment("");
            fetchComment();
            setIdCommentParent(0);
        } catch (error) {
            console.error('Error creating post:', error);
            throw error;
        }
    };

    // hàm fetch bình luận
    const fetchComment = async () => {
        if (postId === 0)
            return;
        const api = await authApi();
        try {
            console.log("post:" + postId)
            const response = await api.get(endpoints['load-comments'](postId));
            // Kiểm tra nếu API trả về thành công
            if (response.status === 200) {
                setCommentList(response.data); // Cập nhật dữ liệu bình luận
                // console.log('Comments:', response.data);
            }
        } catch (error) {
            console.error('Lỗi lấy bình luận:', error);
            throw error;
        }
    };

    useEffect(() => {
        fetchComment();
    }, [postId]);  // Chỉ gọi lại API khi `postId` thay đổi

    // trả lời bình luận
    const reply = (item) => {
        setIdCommentParent(item.idComment);
        setRepname(item.firstname + item.lastname);
        console.log(item.commentChild);
    };

    useEffect(() => {
    }, [idCommentParent]);

    const renderComment = ({ item }) => (
        <View style={{ width: '100%', minHeight: 70, flexDirection: 'row' }}>
            <Image
                style={{ width: 50, height: 50, borderRadius: 50, margin: 5 }}
                // source={{ uri: 'https://i.pinimg.com/564x/83/4a/d9/834ad9f6c5f2fca8ffa63acfbd274f38.jpg' }}
                source={{
                    uri: item.avatar === ""
                        ? 'https://i.pinimg.com/564x/25/ee/de/25eedef494e9b4ce02b14990c9b5db2d.jpg'
                        : item.avatar
                }}
            />
            <View style={{ minHeight: 40, paddingRight: 9, width: Dimensions.get('window').width * 0.95 - 50 }}>
                <View style={{ paddingRight: 9 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 15, fontWeight: '600' }}>{item.firstname} {item.lastname}</Text>
                        <Text style={{ fontSize: 14, fontWeight: '400', marginLeft: 10 }}>{convertDateTime(item.commentDate)}</Text></View>
                </View>
                <Text style={{ minHeight: 20 }}>{item.comment}</Text>
                <View style={{ width: '100%', minHeight: 30, flexDirection: 'row', paddingTop: 2, justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        onPress={() => reply(item)}>
                        <Text style={{ fontSize: 17, fontWeight: '500', color: colors.gray }}>Trả lời</Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 17, fontWeight: '500', color: colors.gray, marginRight: 5, color: colors.danger }}>Xóa</Text>
                    {/* <Image /> */}
                </View>
                {/* // bình luận con */}
                <FlatList
                    data={item.commentChild}
                    keyExtractor={(child) => child.idComment.toString()}
                    nestedScrollEnabled={true}
                    renderItem={({ item: child }) => (
                        <View style={{ width: 'auto', minHeight: 70, flexDirection: 'row' }}>
                            <Image
                                style={{ width: 50, height: 50, borderRadius: 50, margin: 5 }}
                                source={{
                                    uri: item.avatar === ""
                                        ? 'https://i.pinimg.com/564x/25/ee/de/25eedef494e9b4ce02b14990c9b5db2d.jpg'
                                        : item.avatar
                                }}
                            />
                            <View style={{ minHeight: 40, paddingRight: 9, width: Dimensions.get('window').width * 0.8 - 50 }}>
                                <View style={{ paddingRight: 9 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 15, fontWeight: '600' }}>{child.firstname} {child.lastname}</Text>
                                        <Text style={{ fontSize: 14, fontWeight: '400', marginLeft: 10 }}>{convertDateTime(child.commentDate)}</Text></View>
                                </View>
                                <Text style={{ minHeight: 20 }}>{child.comment}</Text>
                                <View style={{ width: 'auto', minHeight: 30, flexDirection: 'row', paddingTop: 2, justifyContent: 'space-between' }}>
                                    <Text></Text>
                                    <Text style={{ fontSize: 17, fontWeight: '500', color: colors.gray, marginRight: 15, color: colors.danger }}>Xóa</Text>
                                    {/* <Image /> */}
                                </View>
                            </View>
                        </View>
                    )}
                    style={{ paddingLeft: 0 }}
                />

            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true} // Đặt transparent thành true để làm nền trong suốt
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>

                {/* Phần nền mờ */}
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flex: 1 }}>
                        <BlurView
                            style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
                            blurType="dark" // Các kiểu blur: light, dark, extraDark, regular, prominent
                            blurAmount={1}  // Độ mạnh của hiệu ứng blur
                            reducedTransparencyFallbackColor="white" // Màu nền khi blur không khả dụng
                        />

                        <KeyboardAvoidingView
                            keyboardVerticalOffset={0}
                            behavior={Platform.OS === "ios" ? "padding" : "height"}>

                            <View style={styles.contai_popup}>
                                <TouchableOpacity onPress={unpop}>
                                    <View style={{ width: '100%', height: '25%' }}></View>
                                </TouchableOpacity>

                                <View style={styles.contain_cmt_view}>
                                    <Text style={{ fontSize: 19, fontWeight: '600' }}>Comment</Text>
                                    <View style={{ width: '95%', borderWidth: 0.7, borderColor: colors.gray, marginBottom: 1 }} />

                                    <View style={styles.contain_list_cmt}>
                                        <FlatList
                                            data={commentList}
                                            keyExtractor={(item) => item.idComment.toString()}
                                            renderItem={renderComment}
                                            nestedScrollEnabled={true}
                                            ListEmptyComponent={<Text>Chưa có bình luận!</Text>}
                                            style={{ flex: 1 }}
                                        />
                                    </View>

                                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                        <View style={styles.input_cmt}>
                                            <TextInput
                                                value={comment}
                                                onChangeText={setComment}
                                                placeholder="Type comment here..."
                                                style={styles.textInput} />

                                            <TouchableOpacity
                                                onPress={createCmt}
                                                style={{ backgroundColor: colors.xamtrang, width: 40, height: 40, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
                                                <Image
                                                    style={{ width: 30, height: 30, transform: [{ rotate: '270deg' }], top: -1 }}
                                                    source={{ uri: icons.send_cmt }} />
                                            </TouchableOpacity>

                                            {idCommentParent !== 0 && (
                                                <View style={styles.reply}>
                                                    <Text style={{ fontSize: 17, fontWeight: '700', color: colors.dark }}>Trả lời:</Text>
                                                    <Text style={{ fontSize: 16, fontWeight: '400', color: colors.dark, paddingLeft: 5 }}>@{repname}</Text>
                                                    <TouchableOpacity onPress={() => setIdCommentParent(0)}>
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
                data={posts}
                showsVerticalScrollIndicator={false}  // Tắt thanh cuộn dọc
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh} // Gọi hàm refresh khi kéo xuống
                        colors={[colors.primary]} // Màu của biểu tượng khi refresh
                    />
                }
                onEndReached={loadMorePosts}
                onEndReachedThreshold={0.7} // Tỉ lệ danh sách còn lại trước khi gọi hàm (0.5 = 50%)
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
                        <View style={styles.post_infor}>
                            <Image
                                style={{ width: 50, height: 50, borderRadius: 50 }}
                                source={{
                                    uri: item.avatar === ""
                                        ? 'https://i.pinimg.com/564x/25/ee/de/25eedef494e9b4ce02b14990c9b5db2d.jpg'
                                        : item.avatar
                                }} />

                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ fontSize: 18, fontWeight: '500' }}>{item.username}</Text>
                                <Text style={{ fontSize: 17, color: colors.gray }}>{formatDate(item.dateCreated)}</Text>
                            </View>
                        </View>

                        <View style={{ width: 'auto', paddingLeft: 10, paddingRight: 10, marginTop: 5 }}>
                            <Text style={{ fontSize: 18, color: colors.dark }}>{item.content}</Text>
                        </View>

                        <View style={styles.post_contain}>
                            {/* // hiển thị ảnh */}

                            <View style={styles.contai_image}>
                                <FlatList
                                    data={item.medias}
                                    renderItem={renderItem}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}

                                    contentContainerStyle={{
                                        paddingLeft: '12%'
                                    }}
                                />
                            </View>

                            <View style={styles.contain_action}>
                                <TouchableOpacity
                                    style={styles.btn_follow}
                                    activeOpacity={0.3}>

                                    <Text style={{ fontSize: 18, fontWeight: '600', color: colors.info }}>
                                        {item.following ? 'Following' : 'Follow'}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => popup(item.idPost)}
                                    activeOpacity={0.3}
                                    style={styles.btn_cmt}>
                                    <Text style={{ fontSize: 18, fontWeight: '600', color: colors.info }}>Comment</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    activeOpacity={0.3}
                                    style={styles.btn_like}>
                                    <Text style={{ fontSize: 18, fontWeight: '600', color: colors.danger }}>100</Text>
                                    <Image
                                        style={{ width: 35, height: 35, tintColor: colors.gold }}
                                        source={{ uri: icons.like }} />
                                </TouchableOpacity>
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
                                <TouchableOpacity onPress={() => navigation.navigate('Message')}>
                                    <Image style={{ width: 30, height: 30, tintColor: colors.dark }}
                                        source={{ uri: icons.mess_icon }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* <View style={styles.line_border} /> */}
                    </>
                }
                contentContainerStyle={{
                    flexGrow: 1,
                    alignItems: 'center',
                    width: '100%',
                    paddingBottom: 90
                }}
                onScroll={handleScroll}
                scrollEventThrottle={16} // Điều chỉnh tốc độ gửi sự kiện scroll
            />
        </SafeAreaView>
    );
};

export default Home;