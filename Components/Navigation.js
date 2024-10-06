import React, { forwardRef, useEffect, useReducer, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image, PermissionsAndroid, TouchableOpacity, View } from 'react-native';
import IntroApp from '../Screens/Intro/IntroApp';
import { StyleSheet } from 'react-native';
import colors from '../assets/color/colors';
import UserReducer from '../Configs/UserReducer';
import { UserContext } from '../Configs/Context';
import { TabBarProvider, useTabBar } from '../Configs/TabBarContext';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Screens/Login/Login';
import Register from '../Screens/Register/Register';
import Home from '../Screens/Home/Home';
import Search from '../Screens/Search/Search';
import Notification from '../Screens/Notification/Notification';
import UserSeting from '../Screens/ProfileUser/UserSetting';
import Logout from '../Screens/Logout/Logout';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import icons from '../assets/iconApp/icons';
import ProfileUser from '../Screens/ProfileUser/ProfileUser';
import Post from '../Screens/Post/Post';
import UpdateProfile from '../Screens/ProfileUser/UpdateProfile';
import Message from '../Screens/Message/Message';
import Chat from '../Screens/Message/Chat';
import Toast from 'react-native-toast-message';
import notifee, { AndroidImportance } from '@notifee/react-native';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const HomeTabs = forwardRef((props, ref) => {

    const { state } = useTabBar();
    const navigation = useNavigation();
    const route = useRoute();

    useEffect(() => {
        const unsubscribe = navigation.addListener('tabPress', (e) => {
            // Xác định tab hiện tại
            const currentTab = route.name;

            // Thực hiện hành động khi nhấn vào tab hiện tại
            if (currentTab === 'Home') {
                console.log('Nhấn vào tab Home');
                // Gọi hàm hoặc thực hiện hành động khác
            }

            // Nếu cần thực hiện hành động khác cho các tab khác
            // ...
        });

        // Cleanup function
        return () => {
            unsubscribe();
        };
    }, [navigation, route.name]);
    return (
        <View style={{ flex: 1 }}>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        ...styles.tabBarStyle,
                        display: state.visible ? 'flex' : 'none',
                    },
                }}
            >
                <Tab.Screen name="Home" component={Home} options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabBarIconText}>
                            <Image
                                source={icons.home_full}
                                resizeMode='contain'
                                style={[{ tintColor: focused ? colors.gold : colors.secondary }, styles.icon]}
                            />
                        </View>
                    ),
                }} />

                <Tab.Screen name="Search" component={Search} options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabBarIconText}>
                            <Image
                                source={icons.search}
                                resizeMode='contain'
                                style={[{ tintColor: focused ? colors.gold : colors.secondary }, styles.icon]}
                            />
                        </View>
                    ),
                }} />

                <Tab.Screen name="Post" component={Post} options={{
                    tabBarStyle: { display: 'none' },
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabBarIconText}>
                            <Image
                                source={icons.add}
                                resizeMode='contain'
                                style={{
                                    tintColor: focused ? colors.gold : colors.black,
                                    width: 45, height: 45,
                                }}
                            />
                        </View>
                    ),
                }} />

                <Tab.Screen name="Notification" component={Notification} options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabBarIconText}>
                            <Image
                                source={icons.notifi}
                                resizeMode='contain'
                                style={[{ tintColor: focused ? colors.gold : colors.secondary }, styles.icon]}
                            />
                        </View>
                    ),
                }} />

                <Tab.Screen name="Profile" component={UserProfile} options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabBarIconText}>
                            <Image
                                source={icons.profile}
                                resizeMode='contain'
                                style={[{ tintColor: focused ? colors.gold : colors.secondary }, styles.icon]}
                            />
                        </View>
                    ),
                }} />
            </Tab.Navigator>

        </View>
    );
});

function UserProfile() {
    const navigation = useNavigation();
    return (
        <Stack.Navigator initialRouteName="ProfileDetail">
            <Stack.Screen name="ProfileDetail" component={ProfileUser}
                options={{
                    headerStyle: {
                        height: 50,
                    },
                    title: 'Trang cá nhân',
                    headerTitleAlign: 'center',
                    headerTitleStyle: styles.title_top_screen,
                    headerRight: () => (
                        <View style={{ height: '100%', width: 50, alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
                                <Image
                                    style={{ width: 40, height: 40, tintColor: colors.black }}
                                    source={{ uri: icons.menu }}
                                />
                            </TouchableOpacity>
                        </View>
                    ),
                }} />
        </Stack.Navigator>
    );
};

const Navigation = () => {
    const [user, dispatch] = useReducer(UserReducer, null);
    // Hàm để lấy dữ liệu từ AsyncStorage và thiết lập state
    const loadUserData = async () => {
        try {
            const userData = await AsyncStorage.getItem('user');
            if (userData !== null) {
                dispatch({
                    type: 'login',
                    payload: JSON.parse(userData),
                });
            }
        } catch (error) {
        }

    };

    useEffect(() => {
        loadUserData();
    }, []);

    useEffect(() => {
        if (user) {
            // Thiết lập WebSocket khi user đã đăng nhập
            ws.current = new WebSocket(`ws://192.168.1.24:8080/ws?userId=${user.id}`);

            ws.current.onopen = () => {
                console.log('WebSocket connected');
            };

            ws.current.onmessage = async (e) => {
                const message = e.data;
                console.log('Message from server:', message);

                // Hiển thị thông báo khi nhận tin nhắn
                await notifee.displayNotification({
                    title: 'Helianthus',
                    body: message,
                    android: {
                        channelId: 'default',
                        importance: AndroidImportance.HIGH,
                    },
                });
            };

            ws.current.onerror = (e) => {
                console.error('WebSocket error:', e.message);
            };

            ws.current.onclose = (e) => {
                console.log('WebSocket closed:', e.code, e.reason);
            };

            return () => {
                // Đóng WebSocket khi component unmount hoặc khi user logout
                if (ws.current) {
                    ws.current.close();
                }
            };
        }
    }, [user]);

    const ws = useRef(null); // Tạo tham chiếu WebSocket
    // Tạo channel cho thông báo Android và yêu cầu quyền thông báo
    useEffect(() => {
        async function setup() {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
                {
                    title: 'Thông báo quyền truy cập.',
                    message: 'Ứng dụng cần quyền truy cập thông báo để hoạt động.',
                    buttonPositive: 'Đồng ý',
                },
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                // console.log('Đã được cấp quyền thông báo');
                await notifee.createChannel({
                    id: 'default',
                    name: 'Default Channel',
                    importance: AndroidImportance.HIGH,
                });
            } else {
                console.log('Không được cấp quyền thông báo');
            }
        }

        setup();
    }, []);

    // Hàm hiển thị thông báo thủ công
    async function onDisplayNotification() {
        await notifee.displayNotification({
            title: 'Thông báo từ ứng dụng',
            body: 'Đây là thông báo khi nhấn nút!',
            android: {
                channelId: 'default',
                importance: AndroidImportance.HIGH,
            },
        });
    }

    return (
        <>
            <NavigationContainer independent={true}>
                <UserContext.Provider value={[user, dispatch]}>
                    <TabBarProvider>
                        <Stack.Navigator
                            initialRouteName="HomeTabs"
                            screenOptions={{ headerShown: false }}>
                            {user == null ? (<>
                                <Stack.Screen name="Intro" component={IntroApp} />
                                <Stack.Screen name="Login" component={Login} />
                                <Stack.Screen name="Register" component={Register} />
                            </>) : (<>
                                <Stack.Screen name="HomeTabs" component={HomeTabs} />
                                <Stack.Screen name="Logout" component={Logout} />
                                <Stack.Screen name="Message" component={Message} />
                                <Stack.Screen name="Chat" component={Chat} />
                                <Stack.Screen name="Setting" component={UserSeting} />
                                <Stack.Screen name="UpdatePrifile" component={UpdateProfile} />
                            </>)}
                        </Stack.Navigator>
                    </TabBarProvider>
                </UserContext.Provider>
            </NavigationContainer>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </>
    );
}

const styles = StyleSheet.create({
    tabBarStyle: {
        position: 'absolute',
        bottom: 10,
        left: 15,
        right: 15,
        backgroundColor: colors.light,
        borderRadius: 50,
        height: 50,
        zIndex: 2,

    }, tabBarIconText: {
        alignItems: 'center',
        justifyContent: 'center',
        top: '10',
    },
    icon: {
        width: 40,
        height: 40,
    },
    title_top_screen: {
        marginBottom: 0,
        fontSize: 20,
        lineHeight: 23,
    },
    fullname: {
        fontSize: 18,
        color: colors.black
    },
});

export default Navigation