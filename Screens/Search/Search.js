import { FlatList, Image, Keyboard, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import styles from "./SearchStyle";
import colors from "../../assets/color/colors";
import { useTabBar } from "../../Configs/TabBarContext";
import { authApi, endpoints } from "../../Configs/APIs";
import { UserContext } from "../../Configs/Context";
import AsyncStorage from '@react-native-async-storage/async-storage';
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

    // lấy dữ liệu
    // Lấy mảng đối tượng
    // const getArrayData = async (key) => {
    //     try {
    //         const jsonValue = await AsyncStorage.getItem(key); // Lấy chuỗi JSON từ AsyncStorage
    //         return jsonValue != null ? JSON.parse(jsonValue) : null; // Chuyển chuỗi JSON trở lại thành mảng đối tượng
    //     } catch (error) {
    //         console.error('Error retrieving data:', error);
    //     }
    // };

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

    useEffect(() => {
        // Hàm sẽ được gọi khi bàn phím ảo xuất hiện
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                console.log('Bàn phím đã xuất hiện');
                // Gọi hàm của bạn tại đây
                hideTabBar();
            }
        );

        // Hàm sẽ được gọi khi bàn phím ảo ẩn đi
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                console.log('Bàn phím đã ẩn đi');
                // Gọi hàm của bạn tại đây
                showTabBar();
            }
        );

        // Hủy lắng nghe khi component bị hủy
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    // truy cập thông tin user

    const viewUser = async () => {
        try {
            const jsonValue = JSON.stringify(result);
            await AsyncStorage.setItem(key, userlist);
            console.log('Data stored successfully');
        } catch (error) {
            console.error('Error storing data:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ width: '100%' }}>
                <FlatList
                    data={result}
                    keyExtractor={(item) => item.user_id}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={viewUser}
                            style={styles.item_notifi}>

                            <Image
                                style={styles.image_avatar}
                                source={{
                                    uri: item.avatar === ''
                                        ? 'https://i.pinimg.com/564x/25/ee/de/25eedef494e9b4ce02b14990c9b5db2d.jpg'
                                        : item.avatar
                                }} />
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
                    )}
                    ListHeaderComponent={
                        <View style={{ width: '100%', alignItems: 'center', backgroundColor: colors.light, elevation: 9, }}>
                            <View style={styles.contai_search}>
                                <TextInput
                                    style={{ fontSize: 16 }}
                                    placeholder="Tìm kiếm..."
                                    onChange={(e) => setText(e.nativeEvent.text)}
                                    multiline={true}
                                />
                            </View>
                        </View>
                    }
                />
            </View>
        </View>
    )
};


export default Search
