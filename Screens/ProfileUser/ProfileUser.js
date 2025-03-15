import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, View, Dimensions, FlatList, ScrollView, StyleSheet, Alert, LogBox, TouchableOpacity, Modal, ImageBackground } from 'react-native';
import styles from './ProfileStyle';
import colors from '../../assets/color/colors';
import icons from '../../assets/iconApp/icons';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { authApi, endpoints } from '../../Configs/APIs';
import ImageViewer from 'react-native-image-zoom-viewer';
import { BlurView } from '@react-native-community/blur';
import Swiper from 'react-native-swiper';
import { UserContext } from '../../Configs/UserReducer';
LogBox.ignoreLogs([
    'VirtualizedLists should never be nested inside plain ScrollViews', // Thông báo cảnh báo bạn muốn bỏ qua
]);
LogBox.ignoreLogs([
    'Warning: A props object containing a "key" prop is being spread into JSX'
]);

const ProfileUser = ({ navigation }) => {
    const { user, dispatch } = useContext(UserContext);
    const [profile, setProfile] = useState(null);
    const [index, setIndex] = useState(0);
    const [indextab, setIndextab] = React.useState(0);
    const [hasReachedEnd, setHasReachedEnd] = useState(false);
    const [scroll, setScroll] = useState(true);
    const [routes] = useState([
        { key: 'post', title: 'Posts' },
        { key: 'media', title: 'Media' },
        { key: 'like', title: 'Likes' },
    ]);

    // Lấy chiều cao màn hình
    const screenHeight = Dimensions.get('window').height;
    // Tính chiều cao mới sau khi trừ cho 120
    const adjustedHeight = screenHeight - 120;

    // hàm kiểm tra cuộn
    const handleScroll = ({ nativeEvent }) => {
        const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;

        // Kiểm tra nếu vị trí cuộn hiện tại đã đạt đến cuối cùng
        if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 20 && hasScroll) {
            // Nếu tiếp tục kéo thêm (contentOffset.y vượt qua contentSize.height)

            setScroll(false);


            // if (indextab === 0 && hasScroll)
            //     setScroll(false);// cho cuộn scrollView
            // if (indextab === 1 && hasScroll) {
            //     setScroll(false);// cho cuộn scrollView
            // } else {
            //     setScroll(false);// cho cuộn scrollView
            // }

        } else {
            setScroll(true);
        }
    };

    //chuyển tab
    const handleIndexChange = (newIndex) => {
        setIndextab(newIndex); // Cập nhật state indextab
        setScroll(true);
    };

    // Hàm xử lý khi cuộn
    const handleScrollFlat = ({ nativeEvent }) => {
        const { contentOffset } = nativeEvent;
        // Kiểm tra nếu vị trí cuộn là 0 hoặc nhỏ hơn
        if (contentOffset.y <= 0) {
            setScroll(true);
        } else {
            setScroll(false);
        }
    };
    // kiểm tra có thanh cuộn hay không?
    const [contentHeight, setContentHeight] = useState(0);
    const [layoutHeight, setLayoutHeight] = useState(0);
    const [hasScroll, setHasScroll] = useState(false); // Trạng thái để kiểm tra thanh cuộn

    // Lấy chiều cao vùng hiển thị (FlatList)
    const handleLayout = (event) => {
        const { height } = event.nativeEvent.layout;
        setLayoutHeight(height);

        // Kiểm tra xem có thanh cuộn không
        if (contentHeight > height) {
            setHasScroll(true); // Có thanh cuộn
        } else {
            setHasScroll(false); // Không có thanh cuộn
        }
    };

    const checkForScroll = () => {
        if (contentHeight > layoutHeight) {
            setHasScroll(true); // Có thanh cuộn
        } else {
            setHasScroll(false); // Không có thanh cuộn
        }
    };

    // Khi kích thước nội dung thay đổi
    const handleContentSizeChange = (width, height) => {
        setContentHeight(height); // Cập nhật chiều cao nội dung
        checkForScroll();          // Kiểm tra khi nội dung thay đổi
    };

    const handleContentSizeChangeMedia = (width, height) => {
        setContentHeight(height); // Cập nhật chiều cao nội dung
        checkForScroll();          // Kiểm tra khi nội dung thay đổi
    };

    // Fetch dữ liệu profile
    const fetchDetailProfile = async () => {
        const api = await authApi();
        try {
            const response = await api.get(endpoints['profile-detail'](user.id));
            if (response.status === 200) {
                setProfile(response.data);
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    // lấy các bài viết
    const [myPosts, setMyPosts] = useState([]);
    const fetchMyPost = async () => {
        const api = await authApi();
        try {
            const response = await api.get(endpoints['get-my-post'](user.id));
            if (response.status === 200) {
                setMyPosts(response.data);
                // console.log(response.data);
            }
        } catch (error) {
            console.log("Lỗi lấy dữ liệu!", error);
        }
    };
    // hàm chuyển đổi
    const transformImages = (listImage) => {
        return listImage.map(image => ({
            url: image.mediaUrl,  // Chuyển đổi mediaUrl thành url
            mediaId: image.mediaId,
            mediaType: image.mediaType
        }));
    };

    // lấy list hình ảnh
    const [listImage, setListImage] = useState([]);
    const [pageMedia, setPageMedia] = useState(0);
    const fetchMyMedia = async () => {
        const api = await authApi();
        try {
            const response = await api.get(endpoints['my-medias'](user.id, pageMedia));
            if (response.status === 200) {
                setListImage(prevListImage => [...prevListImage, ...response.data.content]);
                if (response.data.content.length !== 0) {
                    setPageMedia(pageMedia + 1);
                }
            }
        } catch (error) {
            console.log("Lỗi lấy dữ liệu!", error);
        }
    };

    // Sử dụng useEffect để cập nhật images khi listImage thay đổi
    useEffect(() => {
        setImages(transformImages(listImage));
    }, [listImage]); // Lắng nghe thay đổi của listImage

    useEffect(() => {
        fetchDetailProfile();
        fetchMyPost();
        fetchMyMedia();
    }, []);

    // Định nghĩa các tab trong TabView
    // các bài viết đã đăng
    const [showPostMoal, setShowPostModal] = useState(false);
    const [imagepost, setImagepost] = useState([]);
    const [content, setContent] = useState('');

    const showModalPost = (data) => {
        setShowPostModal(true);
        setModalVisible(true);
        setImagepost(data.medias);
        setContent(data.content);
    };

    const renderPost = ({ item }) => (

        <TouchableOpacity
            style={styling.imageContainer}
            onPress={() => showModalPost(item)}>
            <View >
                {item.medias.length === 0 ? (
                    <Text style={{ fontSize: 17, fontWeight: '500' }}>{item.content}</Text>
                ) : (
                    <Image source={{ uri: item.medias[0].mediaUrl }} style={styling.imageThumbnail} />
                )}
            </View>
        </TouchableOpacity>
    );

    const PostRoute = () => (
        <View style={{ flex: 1 }} onLayout={handleLayout}>
            <FlatList
                data={myPosts}
                keyExtractor={(item) => item.idPost}
                renderItem={renderPost}
                numColumns={3} // Hiển thị 3 cột
                columnWrapperStyle={styling.column}
                scrollEnabled={!scroll}
                onScroll={handleScrollFlat} // Bắt sự kiện khi cuộn
                scrollEventThrottle={20} // Đảm bảo sự kiện cuộn xảy ra thường xuyên
                onContentSizeChange={handleContentSizeChange}
            />

            {showPostMoal && (
                <Modal
                    visible={true}
                    transparent={true}
                >
                    <BlurView
                        style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
                        blurType="dark" // Các kiểu blur: light, dark, extraDark, regular, prominent
                        blurAmount={5}  // Độ mạnh của hiệu ứng blur
                        reducedTransparencyFallbackColor="white" // Màu nền khi blur không khả dụng
                    />
                    <TouchableOpacity
                        style={{ width: '100%', height: '100%', position: 'absolute' }}
                        onPress={() => setShowPostModal(false)}>
                    </TouchableOpacity>
                    <View style={styles.postContain}>
                        <View style={styles.post}>
                            <View style={{ flexDirection: 'row', width: '100%', marginBottom: 10 }}>
                                <Image
                                    style={{ width: 50, height: 50, borderRadius: 50, marginRight: 5 }}
                                    source={{
                                        uri: user.avatar === ''
                                            ? 'https://i.pinimg.com/564x/25/ee/de/25eedef494e9b4ce02b14990c9b5db2d.jpg'
                                            : user.avatar
                                    }} />
                                <View>
                                    <Text style={{ fontSize: 19, fontWeight: '700', color: colors.dark }}>@{user.username}</Text>
                                    <Text style={{ fontSize: 17, fontWeight: '500', color: colors.gray }}>time</Text>
                                </View>
                                <Image
                                    style={{ width: 20, height: 20, tintColor: colors.black, paddingRight: 5, position: 'absolute', right: 10, top: 20 }}
                                    source={{ uri: icons.icon_menu }}
                                />
                            </View>

                            <Text style={{ fontSize: 17, fontWeight: "500", color: colors.dark }}>{content}</Text>
                            {imagepost.length !== 0 && <>
                                <View style={{ width: '100%', aspectRatio: 3 / 4 }}>
                                    <Swiper
                                        style={styles.wrapper}
                                        showsButtons={false}
                                        autoplay={false}
                                        dotStyle={styles.dot}
                                        activeDotStyle={styles.activeDot}
                                    >
                                        {imagepost.map((img) => (
                                            <Image
                                                key={index}
                                                source={{ uri: img.mediaUrl }}
                                                style={{ width: '100%', aspectRatio: 3 / 4, resizeMode: 'cover', borderRadius: 0 }}
                                            />
                                        ))}
                                    </Swiper>
                                </View>
                            </>}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
                                <Text style={{ fontSize: 15, fontWeight: "600", color: colors.black }}>Like</Text>
                                <Text style={{ fontSize: 15, fontWeight: "600", color: colors.black }}>Comment</Text>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );

    // hiển thị các hình ảnh
    const [selectedImage, setSelectedImage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalImage, setModalImage] = useState(false);
    const [images, setImages] = useState([]);
    const [indexImages, setIndexImages] = useState(null);

    const handleItemPress = (index) => {
        console.log(index);
        console.log(images);
        setModalImage(true);
        setIndexImages(index);
        // Mở modal hiển thị hình ảnh phóng to
    };

    const renderItem = ({ item, index }) => (
        <View style={styling.imageContainer}>
            <TouchableOpacity onPress={() => handleItemPress(index)}>
                <Image source={{ uri: item.mediaUrl }} style={styling.imageThumbnail} />
            </TouchableOpacity>
        </View>
    );

    const CloseModalImages = () => {
        setModalImage(false);
    };

    // hiển thị ảnh
    const MediaRoute = () => (
        <View style={{ flex: 1 }} >
            <FlatList
                data={listImage}
                keyExtractor={(item) => item.mediaId.toString()} // Đảm bảo mediaId là chuỗi nếu không
                numColumns={3} // Hiển thị 3 cột
                columnWrapperStyle={styling.column}
                renderItem={renderItem} // Truyền trực tiếp hàm renderItem
                scrollEnabled={!scroll}
                onScroll={handleScrollFlat}
                scrollEventThrottle={16}
                onEndReached={fetchMyMedia} // Gọi khi cuộn đến cuối danh sách
                // onContentSizeChange={handleContentSizeChangeMedia}
                onEndReachedThreshold={0.5} // Gọi khi cuộn đến 50% trước khi hết danh sách
            />

            {modalImage && (
                <Modal
                    visible={true}
                    transparent={true}
                    onRequestClose={CloseModalImages}
                >
                    <ImageViewer
                        imageUrls={images}
                        index={indexImages}
                        onSwipeDown={CloseModalImages}
                        enableSwipeDown={true}
                    />
                </Modal>
            )}

        </View>
    );

    const LikeRoute = () => (
        <View style={[styles.scene, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
            <Text>Like Tab</Text>
        </View>
    );

    // Xử lý TabView với các route được định nghĩa
    const renderScene = SceneMap({
        post: PostRoute,
        media: MediaRoute,
        like: LikeRoute,
    });

    // Hiển thị thanh tab bar với các icon
    const renderTabBar = props => {
        // Tách key ra khỏi props
        const { key, ...otherProps } = props;

        return (
            <TabBar
                key={key} // Đặt key trực tiếp
                {...otherProps} // Truyền các props khác ngoài key
                indicatorStyle={{ backgroundColor: colors.gold }}
                style={{ backgroundColor: colors.white }}
                renderLabel={({ route, focused }) => {
                    let iconUri;
                    let iconColor = focused ? colors.gold : colors.black;

                    switch (route.key) {
                        case 'post':
                            iconUri = icons.slide_menu;
                            break;
                        case 'media':
                            iconUri = icons.media;
                            break;
                        case 'like':
                            iconUri = icons.liked;
                            break;
                        default:
                            iconUri = 'https://example.com/path/to/default-icon.png';
                    }

                    return (
                        <Image
                            source={{ uri: iconUri }}
                            style={{ width: 30, height: 30, tintColor: iconColor }} // Thay đổi màu của biểu tượng
                        />
                    );
                }}
                labelStyle={{ display: 'none' }} // Ẩn label, chỉ hiển thị icon
            />
        );
    };

    return (
        <ScrollView
            scrollEnabled={scroll}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false} // Tắt thanh cuộn dọc
            contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                {user.avatar && <>
                    <ImageBackground
                        source={{ uri: user.avatar }}
                        style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}>
                    </ImageBackground>
                </>}

                <BlurView
                    style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
                    blurType="light" // Các kiểu blur: light, dark, extraDark, regular, prominent
                    blurAmount={19}  // Độ mạnh của hiệu ứng blur
                    reducedTransparencyFallbackColor="white" // Màu nền khi blur không khả dụng
                />

                <View style={styles.contai_avatar}>
                    <Image
                        style={styles.avatar}
                        source={{
                            uri: user.avatar === ''
                                ? 'https://i.pinimg.com/564x/25/ee/de/25eedef494e9b4ce02b14990c9b5db2d.jpg'
                                : user.avatar
                        }} />
                </View>

                <View style={styles.contai_name}>
                    <Text style={styles.full_name}>{user.firstName} {user.lastName}</Text>
                    <Text style={styles.user_name}>@{user.username}</Text>
                </View>

                {/* <View style={styles.line_border} /> */}
                <View style={styles.contai_folow}>
                    <View style={styles.contai_item_flow}>
                        {profile !== null &&
                            <Text style={styles.title}>{profile.countPost}</Text>
                        }
                        <Text style={styles.content}>Posts</Text>
                    </View>

                    <View style={styles.contai_item_flow}>
                        {profile !== null &&
                            <Text style={styles.title}>{profile.countFollower}</Text>
                        }
                        <Text style={styles.content}>Follower</Text>
                    </View>

                    <View style={styles.contai_item_flow}>
                        {profile !== null &&
                            <Text style={styles.title}>{profile.countFollowing}</Text>
                        }
                        <Text style={styles.content}>Following</Text>
                    </View>
                </View>
            </View>

            <View style={[{ flex: 1 }, { height: adjustedHeight }]}>
                <TabView
                    navigationState={{ index: indextab, routes }}
                    renderScene={renderScene}
                    onIndexChange={handleIndexChange}
                    initialLayout={{ width: Dimensions.get('window').width }}
                    renderTabBar={renderTabBar}
                    style={{ flex: 1 }} // Đảm bảo TabView lấp đầy không gian
                />
            </View>
        </ScrollView>
    );
};

const styling = StyleSheet.create({
    itemContainer: {
        marginBottom: 10, // Khoảng cách giữa các ảnh
    },
    image: {
        width: Dimensions.get('window').width, // Chiều rộng của ảnh bằng chiều rộng màn hình
        height: 300, // Chiều cao cố định cho ảnh
    },
    column: {
        justifyContent: 'space-between',
    },
    imageContainer: {
        flex: 1, // Cho phép mỗi item có chiều rộng bằng nhau
        aspectRatio: 3 / 4, // Đảm bảo tỷ lệ 3:4 cho ảnh
        margin: 2,
        justifyContent: 'center',
        backgroundColor: colors.gray,
        textAlign: 'center',
    },
    imageThumbnail: {
        width: '100%',
        height: '100%',
        borderRadius: 5,

    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    modalContent: {
        width: '90%',
        height: '80%',
    },
    fullScreenImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
});

export default ProfileUser;