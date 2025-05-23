import { Text, StyleSheet, View, Image, TouchableOpacity, FlatList, TextInput } from 'react-native'
import colors from '../../assets/color/colors';
import icons from '../../assets/iconApp/icons';
import { useContext, useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

const Chat = ({ route, navigation }) => {
    const [user, dispatchUser] = useContext();
    const { userId, avatar, username, roomId } = route.params;
    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]);

    // Hàm gửi dữ liệu lên Firestore
    const sendMessage = async () => {
        if (!text || text.trim() === "") {
            return;
        }
        try {
            // Chuyển roomId thành chuỗi nếu nó là số
            const roomIdString = String(roomId);
            // Lưu tin nhắn trong sub-collection "Messages" của phòng tương ứng
            await firestore()
                .collection('Rooms')           // Collection chính 'Rooms'
                .doc(roomIdString)             // Document đại diện cho từng phòng (roomId)
                .collection('Messages')        // Sub-collection "Messages" chứa tin nhắn
                .add({
                    userId: user.id,              // ID người dùng
                    message: text.trim(),     // Nội dung tin nhắn
                    timestamp: firestore.FieldValue.serverTimestamp(), // Thời gian gửi tin nhắn
                });
            updateChatRoom(text);
            setText('');
        } catch (error) {
            console.error('Error creating message: ', error);
        }
    };

    // gọi lấy dữ liệu
    const fetchMessages = async () => {
        try {
            // Lắng nghe thay đổi theo thời gian thực với onSnapshot
            const unsubscribe = firestore()
                .collection('Rooms')           // Collection 'Rooms'
                .doc(String(roomId))           // Document với roomId
                .collection('Messages')        // Sub-collection "Messages"
                .orderBy('timestamp', 'asc')   // Sắp xếp tin nhắn theo thời gian
                .limit(30)
                .onSnapshot(snapshot => {
                    const newMessages = snapshot.docs.map(doc => {
                        const data = doc.data();
                        return {
                            id: doc.id,
                            userId: data.userId,
                            message: data.message,
                            timestamp: data.timestamp,  // Hoặc format lại thời gian nếu cần
                        };
                    });
                    setMessages(newMessages);
                });
            // Hàm trả về dùng để hủy lắng nghe khi component unmount
            return () => unsubscribe();
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    useEffect(() => {
        fetchMessages();
        createChatRoom();
    }, [roomId]);

    // hàm format giờ
    const formatTimestamp = (timestamp) => {
        if (!timestamp) return '';  // Nếu không có timestamp, trả về chuỗi rỗng

        const date = new Date(timestamp.seconds * 1000);  // Chuyển đổi timestamp từ Firestore
        const hours = date.getHours().toString().padStart(2, '0');  // Lấy giờ và thêm 0 nếu cần
        const minutes = date.getMinutes().toString().padStart(2, '0');  // Lấy phút và thêm 0 nếu cần

        return `${minutes}:${hours}`;  // Định dạng phút:giờ
    };

    // lưu dữ liệu last text
    const createChatRoom = async () => {
        try {
            // Chuyển roomId thành chuỗi 
            const roomIdString = String(roomId);

            // Truy cập vào Collection 'Chats' và Document với id là roomIdString
            const roomDocRef = firestore()
                .collection('Chats')
                .doc(roomIdString);

            // Kiểm tra sự tồn tại của document với ID này
            const roomDocSnapshot = await roomDocRef.get();
            if (roomDocSnapshot.exists) {
                // Nếu document đã tồn tại, không tạo mới và thông báo
                console.log(`Room with ID: ${roomIdString} already exists.`);
            } else {
                // Nếu document chưa tồn tại, tạo mới document
                await roomDocRef.set({
                    idRoom: roomIdString,            // ID của phòng chat
                    time: firestore.FieldValue.serverTimestamp(), // Thời gian hiện tại
                    lastText: '',                    // Nội dung tin nhắn cuối cùng
                    // Mảng các thành viên trong phòng chat, gồm hai đối tượng user
                    members: [
                        {
                            idUser: user.id,          // ID của người dùng đầu tiên
                            username: user.username,       // Tên của người dùng đầu tiên
                            avatar: user.avatar            // Ảnh đại diện của người dùng đầu tiên
                        },
                        {
                            idUser: userId,   // ID của người dùng thứ hai (thay `anotherUser` bằng thông tin người dùng thứ hai của bạn)
                            username: username, // Tên của người dùng thứ hai
                            avatar: avatar // Ảnh đại diện của người dùng thứ hai
                        }
                    ]
                });
                console.log('Chat room created successfully!');
            }
        } catch (error) {
            console.error('Error creating chat room: ', error);
        }
    };


    // cập nhật chat
    const updateChatRoom = async (newLastText) => {
        try {
            const roomIdString = String(roomId);
            // Tham chiếu đến Document của phòng chat trong Collection 'Chats'
            const roomDocRef = firestore()
                .collection('Chats')
                .doc(roomIdString);

            // Cập nhật trường lastText và time của Document với roomId tương ứng
            await roomDocRef.update({
                lastText: newLastText,                             // Cập nhật nội dung tin nhắn cuối cùng
                time: firestore.FieldValue.serverTimestamp()       // Cập nhật thời gian hiện tại
            });

            console.log(`Chat room with ID: ${roomIdString} updated successfully!`);
        } catch (error) {
            console.error('Error updating chat room:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ width: '100%', flexDirection: 'row', height: 50, alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.light, elevation: 8 }}>
                <View style={{ flexDirection: 'row', height: 40, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.navigate("Message")}>
                        <Image
                            style={{ width: 30, height: 30, tintColor: colors.black }}
                            source={{ uri: icons.back_head }}
                        />
                    </TouchableOpacity>
                    <Image
                        style={styles.avatar}
                        source={{
                            uri: avatar === ''
                                ? 'https://i.pinimg.com/564x/25/ee/de/25eedef494e9b4ce02b14990c9b5db2d.jpg'
                                : avatar
                        }} />
                    <Text style={{ fontSize: 17, fontWeight: '500', color: colors.black, marginLeft: 10 }}>{username}</Text>
                </View>
                <TouchableOpacity>
                    <Image
                        style={{ width: 20, height: 20, tintColor: colors.black, paddingRight: 5 }}
                        source={{ uri: icons.icon_menu }}
                    />
                </TouchableOpacity>
            </View>

            <FlatList
                data={messages}
                keyExtractor={(c) => c.id}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <View style={[
                        styles.contai_chat,
                        item.userId === user.id ? styles.userleft : styles.userright
                    ]}>
                        {(item.userId !== user.id && (index === messages.length - 1 || messages[index + 1].userId !== item.userId)) && (
                            <Image
                                style={[styles.avatar, { marginRight: 5, marginLeft: 5 }]}
                                source={{
                                    uri: avatar === ''
                                        ? 'https://i.pinimg.com/564x/25/ee/de/25eedef494e9b4ce02b14990c9b5db2d.jpg'
                                        : avatar
                                }}
                            />
                        )}

                        <View style={[
                            styles.text_chat,
                            item.userId !== user.id ? styles.item_left : styles.item_right,
                            (index !== messages.length - 1 && messages[index + 1].userId == item.userId) ? { marginLeft: 40 } : {}
                        ]}>
                            <Text style={{ color: colors.black }}>{item.message}</Text>
                        </View>


                        {index === messages.length - 1 || messages[index + 1].userId !== item.userId ? (
                            <Text style={{ marginLeft: 7, marginRight: 7 }}>{formatTimestamp(item.timestamp)}</Text>
                        ) : null}
                    </View>
                )}
                style={{ width: '100%', paddingLeft: 0, paddingRight: 10, marginTop: 10 }}
            />

            <View style={styles.input_contai}>
                <TextInput
                    style={{ fontSize: 17, width: '90%' }}
                    value={text}
                    onChangeText={(text) => setText(text)}
                    placeholder='Nhập nội dung tin nhắn'
                />
                <TouchableOpacity
                    onPress={sendMessage}>
                    <Image
                        style={{ width: 30, height: 30, tintColor: colors.gold }}
                        source={{ uri: icons.sendMess }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        width: 35,
        height: 35,
        borderRadius: 50,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: colors.black
    },
    contai_chat: {
        width: '100%',
    },
    text_chat: {
        height: 35,
        maxWidth: '80%',
        marginBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
        borderRadius: 90,
    },
    userleft: {
        alignItems: 'flex-end',
        flexDirection: 'row-reverse',
        alignItems: 'center'

    },
    userright: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center'
    },
    item_left: {
        backgroundColor: colors.gold,
        elevation: 7,
    },
    item_right: {
        backgroundColor: colors.xamnhe,
        elevation: 7
    },
    input_contai: {
        width: '95%',
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        backgroundColor: colors.light,
        elevation: 9,
        borderRadius: 90,
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,

    }

})

export default Chat