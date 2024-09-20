import { Text, StyleSheet, View, Image, TouchableOpacity, FlatList, TextInput } from 'react-native'
import colors from '../../assets/color/colors';
import icons from '../../assets/iconApp/icons';
import { UserContext } from '../../Configs/Context';
import { useContext, useState } from 'react';

const chat = [
    { id: 1, userid: 7, text: 'Hello', time: '20:11' },
    { id: 2, userid: 2, text: 'hi', time: '20:11' },
    { id: 3, userid: 7, text: 'How are you?', time: '20:11' },
    { id: 4, userid: 7, text: 'everything is good', time: '20:11' },
    { id: 5, userid: 2, text: 'yeah, im well, and you', time: '20:11' },
    { id: 6, userid: 7, text: 'still great, wanna hangout', time: '20:11' },
    { id: 7, userid: 2, text: 'sure!', time: '20:11' },
    { id: 8, userid: 2, text: 'OK lest go', time: '20:11' },
]


const Chat = ({ route, navigation }) => {
    const [user, dispatchUser] = useContext(UserContext);
    const { userTarget } = route.params;
    const [typeText, setTypeText] = useState('');
    return (
        <View style={styles.container}>
            <View style={{ width: '100%', flexDirection: 'row', height: 40, alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.light, elevation: 8 }}>
                <View style={{ flexDirection: 'row', height: 40, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.navigate("Message")}>
                        <Image
                            style={{ width: 30, height: 30, tintColor: colors.black }}
                            source={{ uri: icons.back_head }}
                        />
                    </TouchableOpacity>
                    <Image
                        style={styles.avatar}
                        source={{ uri: userTarget.avatar }} />
                    <Text style={{ fontSize: 17, fontWeight: '500', color: colors.black, marginLeft: 10 }}>{userTarget.username}</Text>
                </View>
                <TouchableOpacity>
                    <Image
                        style={{ width: 20, height: 20, tintColor: colors.black, paddingRight: 5 }}
                        source={{ uri: icons.icon_menu }}
                    />
                </TouchableOpacity>
            </View>

            <FlatList
                data={chat}
                keyExtractor={(c) => c.id}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <View style={[
                        styles.contai_chat,
                        item.userid === user.id ? styles.userleft : styles.userright
                    ]}>
                        {(item.userid !== user.id && (index === chat.length - 1 || chat[index + 1].userid !== item.userid)) && (
                            <Image
                                style={[styles.avatar, { marginRight: 5, marginLeft: 5 }]}
                                source={{ uri: userTarget.avatar }}
                            />
                        )}

                        <View style={[
                            styles.text_chat,
                            item.userid !== user.id ? styles.item_left : styles.item_right,
                            (index !== chat.length - 1 && chat[index + 1].userid == item.userid) ? { marginLeft: 40 } : {}
                        ]}>
                            <Text style={{ color: colors.black }}>{item.text}</Text>
                        </View>


                        {index === chat.length - 1 || chat[index + 1].userid !== item.userid ? (
                            <Text style={{ marginLeft: 7, marginRight: 7 }}>{item.time}</Text>
                        ) : null}
                    </View>
                )}
                style={{ width: '100%', paddingLeft: 0, paddingRight: 10, marginTop: 10 }}
            />

            <View style={styles.input_contai}>
                <TextInput
                    style={{ fontSize: 17, width: '90%' }}
                    value={typeText}
                    onChange={(e) => setTypeText(e)}
                    placeholder='Nhập nội dung tin nhắn'
                />
                <TouchableOpacity>
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
        borderColor: colors.danger
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
        backgroundColor: colors.light,
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