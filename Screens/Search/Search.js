import { FlatList, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import styles from "./SearchStyle";
import colors from "../../assets/color/colors";
import TabHeader from "../../Components/TabHeader";
import { useTabBar } from "../../Configs/TabBarContext";
import { authApi, endpoints } from "../../Configs/APIs";
import { UserContext } from "../../Configs/Context";
const Search = () => {
    const { state, dispatch } = useTabBar();
    const title = "Tìm kiếm";
    const [text, setText] = useState('');
    const [user, dispatchUser] = useContext(UserContext);
    const [result, setResult] = useState([]);

    const hideTabBar = () => {
        dispatch({ type: 'HIDE_TAB_BAR' });
    };

    const showTabBar = () => {
        dispatch({ type: 'SHOW_TAB_BAR' });
    };

    const [isFocused, setIsFocused] = useState(false);

    const searchUser = async () => {
        if (!text) {
            setResult([]);
            return;
        }

        const api = await authApi();

        try {
            const response = await api.get(endpoints['search-user'](text, user.id));
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

    // Khởi tạo hook chạy đầu tiên
    useEffect(() => {
        searchUser();
    }, [text]);


    // hàm theo dỏi
    const following = async (userTarget) => {
        const form = {
            idUser: user.id,
            idTargetUser: userTarget
        };

        console.log(form); // In ra form để kiểm tra

        const api = await authApi();

        try {
            const response = await api.post(endpoints['following'], form);
            if (response.status === 200) {
                console.log("Đã theo dõi thành công!");
                searchUser();
            } else {
                console.log("Không thể theo dõi người dùng.");
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


    return (
        <View style={styles.container}>
            {/* <TabHeader title={title} /> */}
            <ScrollView style={{ width: '100%' }}>
                <View style={{ width: '100%', alignItems: 'center', backgroundColor: colors.light }}>
                    <View style={styles.contai_search}>
                        <TextInput
                            style={{ fontSize: 16 }}
                            placeholder="Tìm kiếm..."
                            onChange={(e) => setText(e.nativeEvent.text)}
                            multiline={true} // Cho phép nhập nhiều dòng
                            onFocus={hideTabBar}
                            onBlur={showTabBar}
                        />
                    </View>
                </View>

                <FlatList
                    data={result}
                    keyExtractor={(item) => item.user_id}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.item_notifi}>
                            <Image
                                style={styles.image_avatar}
                                source={{ uri: 'https://i.pinimg.com/564x/7d/2d/c5/7d2dc513fc506bd9ad6cf3847b7326c2.jpg' }} />
                            <View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.fullname}>{item.firstname} {item.lastname}</Text>
                                    {item.folow ? (
                                        <TouchableOpacity
                                            style={{ marginLeft: 10 }}
                                        >
                                            <Text style={{ fontSize: 16, color: colors.info }}>Following</Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity
                                            onPress={() => following(item.user_id)}
                                            style={{ marginLeft: 10 }}
                                        >
                                            <Text style={{ fontSize: 16, color: colors.info }}>Follow</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                                <Text>@{item.user_name} - Có {item.countFollow} người theo giỏi</Text>
                            </View>
                        </TouchableOpacity>
                    )} />
            </ScrollView>
        </View>
    )
};


export default Search
