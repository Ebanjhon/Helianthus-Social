import React, { PureComponent, useEffect, useRef, useState } from 'react'
import { Alert, FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import TabHeader from '../../Components/TabHeader';
import colors from '../../assets/color/colors';
import { BlurView } from '@react-native-community/blur';
import icons from '../../assets/iconApp/icons';

const data = [
    { id: '1', username: 'eban', image: 'https://i.pinimg.com/564x/4c/6a/15/4c6a15e4a6d60ba3ca008591c503758f.jpg' },
    { id: '2', username: 'hung', image: 'https://i.pinimg.com/736x/12/62/88/126288089aa47b7967de05723caf24c3.jpg' },
    { id: '3', username: 'hiếu', image: 'https://i.pinimg.com/564x/05/f8/e1/05f8e12f20723d1c9eac540a8e74c62d.jpg' },
    { id: '4', username: 'nhung', image: 'https://i.pinimg.com/564x/2b/dd/73/2bdd73c0489abd00c798e05b6471547b.jpg' },
    { id: '5', username: 'phương', image: 'https://i.pinimg.com/564x/3e/05/13/3e0513406926f6b658f967f8481c29c6.jpg' },
    { id: '6', username: 'hiếu', image: 'https://i.pinimg.com/564x/05/f8/e1/05f8e12f20723d1c9eac540a8e74c62d.jpg' },
    { id: '7', username: 'nhung', image: 'https://i.pinimg.com/564x/2b/dd/73/2bdd73c0489abd00c798e05b6471547b.jpg' },
    { id: '8', username: 'phương', image: 'https://i.pinimg.com/564x/3e/05/13/3e0513406926f6b658f967f8481c29c6.jpg' },
    // Thêm các item khác tại đây
];

const datachat = [
    { id: 1, username: 'Niê_suri', avatar: 'https://i.pinimg.com/736x/0a/d6/45/0ad64585c5fa622a2a57e78faa01bab1.jpg', text: 'anh khỏe không?', time: '10:2', count: 5 },
    { id: 2, username: 'Hơ_mnar', avatar: 'https://i.pinimg.com/564x/ba/ca/45/baca45133ca61d9a6f9f41a6374d2136.jpg', text: 'CÓ chuyện gì nói đi', time: '15:9', count: 5 },
    { id: 3, username: 'Mr_Bean', avatar: 'https://i.pinimg.com/564x/07/c6/24/07c62428499a13767813c6ef5f7875b0.jpg', text: 'Hê loo', time: '10:9', count: 5 },
    { id: 4, username: 'Mark', avatar: 'https://i.pinimg.com/736x/81/57/49/815749f7111a7c5bb91cb64758ae5f42.jpg', text: 'how was your day?', time: '10:11', count: 5 },
    { id: 5, username: 'Mike', avatar: 'https://i.pinimg.com/736x/09/3b/93/093b9352297ce3516b1c8005761f75a9.jpg', text: 'Mai đá banh nhé!', time: '5:28', count: 5 },
    { id: 6, username: 'Kevin', avatar: 'https://i.pinimg.com/736x/0a/d6/45/0ad64585c5fa622a2a57e78faa01bab1.jpg', text: 'Đi tập gym không anh bạn?', time: '23:9', count: 5 },
    { id: 7, username: 'Oggy', avatar: 'https://i.pinimg.com/564x/35/3d/27/353d27484c4a67efc4b677853677986d.jpg', text: 'Meow moew', time: '10:9', count: 5 },
    { id: 8, username: 'Duck_fil', avatar: 'https://i.pinimg.com/564x/7b/59/a9/7b59a905c118892b52bbf20868c763e0.jpg', text: 'kak kak kakk', time: '4:15', count: 5 },
    { id: 9, username: 'Dorian', avatar: 'https://i.pinimg.com/564x/7e/f1/27/7ef127d87951bd507bdfafae151d1c09.jpg', text: 'sjefbklsgubksdbfksdg', time: '16:9', count: 5 },
];

const Message = () => {
    const inputRef = useRef(null);
    const [focus, setFocus] = useState(false);
    const [search, setSearch] = useState('');

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

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.head_search}>
                {!focus ? (<>
                    <Text style={styles.title}>@Eban123</Text>
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
                    </View>
                </>)}

            </View>


            {/* hiển thị danh sách tin nhắn */}

            {focus ? (
                <View style={styles.listContainer}>
                    <FlatList
                        data={datachat}
                        keyExtractor={(chat) => chat.id}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity>
                                <View style={styles.item_chat_list}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image
                                            style={styles.image_avatar}
                                            source={{ uri: item.avatar }} />
                                        <View style={{ marginLeft: 5 }}>
                                            <Text style={{ fontSize: 17, fontWeight: '500', color: colors.black }}>{item.username}</Text>
                                            <Text style={styles.text_chat}>{item.text}</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text>{item.time}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )} />
                </View>
            ) : (
                <View style={styles.listContainer}>
                    <FlatList
                        data={datachat}
                        keyExtractor={(chat) => chat.id}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity>
                                <View style={styles.item_chat_list}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image
                                            style={styles.image_avatar}
                                            source={{ uri: item.avatar }} />
                                        <View style={{ marginLeft: 5 }}>
                                            <Text style={{ fontSize: 17, fontWeight: '500', color: colors.black }}>{item.username}</Text>
                                            <Text style={styles.text_chat}>{item.text}</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text>{item.time}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                        ListHeaderComponent={
                            <>
                                {/* danh sách nằm ngang */}
                                <View style={{ height: 80 }}>
                                    <FlatList
                                        data={data}
                                        keyExtractor={(item) => item.id}
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity>
                                                <View style={{ marginLeft: 13, height: 100 }}>
                                                    <Image
                                                        style={styles.image_avatar}
                                                        source={{ uri: item.image }} />
                                                    <Text style={styles.name_user_folowing}>{item.username}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        )}
                                        style={styles.flatList}
                                    />
                                </View>

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
        backgroundColor: colors.white,
        marginBottom: 10,
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
        elevation: 9
    }
});


export default Message