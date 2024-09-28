import React, { PureComponent, useContext, useEffect, useRef, useState } from 'react'
import { Alert, Button, FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import TabHeader from '../../Components/TabHeader';
import colors from '../../assets/color/colors';
import { BlurView } from '@react-native-community/blur';
import icons from '../../assets/iconApp/icons';
import { UserContext } from '../../Configs/Context';
import { authApi, endpoints } from '../../Configs/APIs';
import firestore from '@react-native-firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';

const Message = ({ navigation }) => {
    const inputRef = useRef(null);
    const [focus, setFocus] = useState(false);
    const [user, dispatchUser] = useContext(UserContext);
    useEffect(() => {
        if (focus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [focus]);

    const handleBlur = () => {
        setFocus(false);
    };

    const searchHandle = () => {
        setFocus(true);
    };
    // hàm lấy du liệu tìm kiếm
    const [search, setSearch] = useState('');
    const [result, setResult] = useState([]);
    const searchUser = async () => {
        if (!search) {
            setResult([]);
            return;
        }

        const api = await authApi();

        try {
            const response = await api.get(endpoints['search-user'](search, user.id));
            if (response.status === 200) {
                setResult(response.data);
                console.log(response.data);
            } else if (response.status === 404) {
                console.log("No users found.");
            } else {
                console.log("Error:", response.status);
            }
        } catch (error) {
            setResult([]);
        }
    };

    useEffect(() => {
        searchUser();
    }, [search]);

    // lay phong chat
    const getRoomChat = async (userOther, type) => {
        let uchat;
        switch (type) {
            case 0:
                uchat = { 'id': userOther.user_id, 'username': userOther.user_name, 'avatar': userOther.avatar };
                break;
            case 1:
                uchat = { 'id': userOther.userId, 'username': userOther.username, 'avatar': userOther.avatar };
                break;
        }
        const api = await authApi();
        try {
            const response = await api.get(endpoints['get-room-chat'](user.id, uchat.id));
            if (response.status === 200) {
                chat(uchat.id, uchat.avatar, uchat.username, response.data);
            } else if (response.status === 404) {
                console.log("No users found.");
            } else {
                console.log("Error:", response.status);
            }
        } catch (error) {
            console.log("ERROE" + error);
        }
    };
    // đen phon chat
    const chat = (id, avatar, username, roomId) => {
        navigation.navigate("Chat", { 'userId': id, 'avatar': avatar, 'username': username, 'roomId': roomId });
    };

    // format time
    const formatTime = (timestamp) => {
        if (!timestamp) return '';  // Nếu không có timestamp, trả về chuỗi rỗng

        const date = new Date(timestamp.seconds * 1000);  // Chuyển đổi timestamp từ Firestore
        const hours = date.getHours().toString().padStart(2, '0');  // Lấy giờ và thêm 0 nếu cần
        const minutes = date.getMinutes().toString().padStart(2, '0');  // Lấy phút và thêm 0 nếu cần

        return `${minutes}:${hours}`;  // Định dạng phút:giờ
    };

    // fetch user chat
    const [listChat, setListChat] = useState([]);
    const fetchListUserChat = async () => {
        const api = await authApi();
        try {
            const response = await api.get(endpoints['get-user-chat'](user.id));
            if (response.status === 200) {
                setListChat(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // lấy list chat
    const [dataChat, setDataChat] = useState([]);

    const getChatsByUserId = async () => {
        try {
            // Thực hiện truy vấn đến Collection 'Chats' với điều kiện lọc là idUser
            const querySnapshot = await firestore()
                .collection('Chats')                // Tên Collection là 'Chats'
                .where('idUser', '==', user.id)       // Lọc theo trường 'idUser'
                .get();                             // Lấy dữ liệu

            // Kiểm tra xem dữ liệu có tồn tại hay không
            if (querySnapshot.empty) {
                // console.log('No matching documents found.');
                setDataChat([]); // Đặt dataChat thành mảng rỗng nếu không có dữ liệu khớp
                return;
            }

            // Chuyển đổi dữ liệu từ querySnapshot thành mảng
            const chatRooms = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            // Sắp xếp chatRooms theo thời gian giảm dần
            const sortedChatRooms = chatRooms.sort((a, b) => {
                const timeA = a.time ? a.time.toMillis() : 0; // Chuyển đổi timestamp sang milliseconds
                const timeB = b.time ? b.time.toMillis() : 0;
                return timeB - timeA; // Sắp xếp theo thời gian giảm dần
            });

            setDataChat(sortedChatRooms); // Cập nhật state với dữ liệu đã sắp xếp
        } catch (error) {
            console.error('Error fetching chat rooms by userId: ', error);
        }
    };

    useEffect(() => {
        fetchListUserChat();
        getChatsByUserId();
    }, [user.id])

    useFocusEffect(
        React.useCallback(() => {
            getChatsByUserId();
        }, [])
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.head_search, { elevation: 9, marginBottom: 10 }]}>
                {!focus ? (<>
                    <Text style={styles.title}>@{user.username}</Text>
                    <TouchableOpacity
                        onPress={searchHandle}>
                        <Image
                            style={{ width: 30, height: 30, tintColor: colors.black }}
                            source={{ uri: icons.timkiem }}
                        />
                    </TouchableOpacity>
                </>) : (<>
                    <View style={styles.search}>
                        <TextInput
                            ref={inputRef}
                            style={{ fontSize: 17 }}
                            value={search}
                            onChangeText={(text) => setSearch(text)}
                            placeholder='Tìm người dùng'
                            onBlur={handleBlur}
                        />
                        <TouchableOpacity
                            onPress={handleBlur}
                            style={{ width: 50, height: 35, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', borderRadius: 60, marginRight: 5 }}
                        >
                            <Text style={{ fontSize: 18, fontWeight: "600", color: colors.light }}>Hủy</Text>
                        </TouchableOpacity>
                    </View>
                </>)}

            </View>


            {/* hiển thị danh sách tin nhắn */}
            {focus ? (
                <View style={styles.listContainer}>
                    <FlatList
                        data={result}
                        keyExtractor={(chat) => chat.id}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => getRoomChat(item, 0)}
                            >
                                <View style={styles.item_chat_list}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image
                                            style={styles.image_avatar}
                                            source={{
                                                uri: item.avatar === ''
                                                    ? 'https://i.pinimg.com/564x/25/ee/de/25eedef494e9b4ce02b14990c9b5db2d.jpg'
                                                    : item.avatar
                                            }}
                                        />
                                        <View style={{ marginLeft: 5 }}>
                                            <Text style={{ fontSize: 17, fontWeight: '500', color: colors.black }}>{item.firstname} {item.lastname}</Text>
                                            <Text style={styles.text_chat}>@{item.user_name}</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text>{item.time}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                        style={{ paddingLeft: 10, paddingRight: 10 }}
                    />
                </View>
            ) : (
                <View style={styles.listContainer}>
                    <FlatList
                        data={dataChat}
                        keyExtractor={(chat) => chat.id}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => chat(item.id, item.avatar, item.username, item.idRoom)}>
                                <View style={styles.item_chat_list}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image
                                            style={styles.image_avatar}
                                            source={{
                                                uri: item.avatar === ''
                                                    ? 'https://i.pinimg.com/564x/25/ee/de/25eedef494e9b4ce02b14990c9b5db2d.jpg'
                                                    : item.avatar
                                            }}
                                        />
                                        <View style={{ marginLeft: 5 }}>
                                            <Text style={{ fontSize: 17, fontWeight: '500', color: colors.black }}>{item.username}</Text>
                                            <Text style={styles.text_chat}>{item.lastText}</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text>{formatTime(item.time)}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                        ListHeaderComponent={
                            <>
                                {listChat.length !== 0 &&
                                    <View style={{ height: 70 }}>
                                        <FlatList
                                            data={listChat}
                                            keyExtractor={(item) => item.id}
                                            horizontal={true}
                                            showsHorizontalScrollIndicator={false}
                                            renderItem={({ item }) => (
                                                <TouchableOpacity
                                                    onPress={() => getRoomChat(item, 1)}
                                                >
                                                    <View style={{ marginLeft: 13, height: 100 }}>
                                                        <Image
                                                            style={styles.image_avatar}
                                                            source={{
                                                                uri: item.avatar === ''
                                                                    ? 'https://i.pinimg.com/564x/25/ee/de/25eedef494e9b4ce02b14990c9b5db2d.jpg'
                                                                    : item.avatar
                                                            }}
                                                        />
                                                        <Text style={styles.name_user_folowing}>@{item.username}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            )}
                                            style={styles.flatList}
                                        />
                                    </View>
                                }

                                <View style={styles.head_search}>
                                    <Text style={styles.title}>Chats</Text>
                                    <TouchableOpacity>
                                        <Image
                                            style={{ width: 23, height: 23, tintColor: colors.black }}
                                            source={{ uri: icons.icon_menu }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </>
                        }
                        style={styles.flatList}
                    />
                </View>
            )}
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: colors.white,

    },
    flatList: {
        flex: 1,
        width: '100%', // Đảm bảo FlatList chiếm toàn bộ chiều ngang
        height: 120, // Chiều cao của FlatList
    },
    iconStyle: {
        width: 22,
        height: 22,
        tintColor: colors.black,
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        color: colors.black
    },
    head_search: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: colors.light
    },
    image_avatar: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    name_user_folowing: {
        fontSize: 15,
        fontWeight: '500',
        color: colors.black,

    },
    listContainer: {
        flex: 1,
        height: '100%',
        width: '100%'
    },
    item_chat_list: {
        width: '100%',
        height: 60,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.xamtrang,
        marginBottom: 5,
        alignContent: 'center',
        alignItems: 'center'
    },
    text_chat: {
        fontSize: 15,
        fontWeight: '400',

    },
    search: {
        width: "100%",
        height: 45,
        backgroundColor: colors.gold,
        borderRadius: 50,
        paddingLeft: 10,
        elevation: 9,
        flexDirection: 'row',
        justifyContent: 'space-between',
        overflow: 'hidden',
        alignItems: 'center'
    }
});


export default Message