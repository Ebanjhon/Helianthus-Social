import React, { Component, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image, Text, Touchable, TouchableOpacity, View } from 'react-native';
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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function HomeTabs() {
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
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    ...styles.tabBarStyle, // Giữ các style hiện tại
                    display: state.visible ? 'flex' : 'none', // Hiển thị hoặc ẩn TabBar dựa trên trạng thái
                },
            }}
        >

            <Tab.Screen name="Home" component={Home} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={styles.tabBarIconText}>
                        <Image
                            source={icons.home_full}
                            resizeMode='contain'
                            style={[
                                { tintColor: focused ? colors.gold : colors.secondary },
                                styles.icon
                            ]}
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
                            style={[
                                { tintColor: focused ? colors.gold : colors.secondary },
                                styles.icon
                            ]}
                        />

                    </View>
                ),
            }} />

            {/* Ẩn Tab Bar khi vào màn hình Post */}
            <Tab.Screen name="Post" component={Post} options={{
                tabBarStyle: { display: 'none' },// ẩn navigation
                tabBarIcon: ({ focused }) => (
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Image
                            source={icons.add}
                            resizeMode='contain'
                            style={{
                                tintColor: focused ? colors.gold : colors.black,
                                width: 65, height: 65,
                            }}
                        />
                    </View>
                ),
            }} />

            <Tab.Screen name="Notification" component={Notification}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabBarIconText}>
                            <Image
                                source={icons.notifi}
                                resizeMode='contain'
                                style={[
                                    { tintColor: focused ? colors.gold : colors.secondary },
                                    styles.icon
                                ]}
                            />
                        </View>
                    ),
                }}
            />

            <Tab.Screen name="Profile" component={UserProfile} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={styles.tabBarIconText}>
                        <Image
                            source={icons.profile}
                            resizeMode='contain'
                            style={[
                                { tintColor: focused ? colors.gold : colors.secondary },
                                styles.icon
                            ]}
                        />
                    </View>
                ),
            }} />
        </Tab.Navigator>
    );
}

function UserProfile() {
    const navigation = useNavigation();
    return (
        <Stack.Navigator initialRouteName="ProfileDetail">
            <Stack.Screen name="Setting" component={UserSeting}
                options={{
                    headerStyle: {
                        height: 50,
                    },
                    title: 'Cài đặt',
                    headerTitleAlign: 'center',
                    headerTitleStyle: styles.title_top_screen,
                    headerLeft: () => (
                        <View style={{ height: '100%', width: 'auto', alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.navigate('ProfileDetail')}>
                                <Image
                                    style={{ width: 35, height: 35, tintColor: colors.black }}
                                    source={{ uri: icons.back_head }}
                                />
                                <Text style={{ fontSize: 19, fontWeight: '500', color: colors.black }}>Quay lại</Text>
                            </TouchableOpacity>
                        </View>
                    ),
                }} />

            <Stack.Screen name="UpdatePrifile" component={UpdateProfile}
                options={{
                    headerStyle: {
                        height: 50,
                    },
                    title: 'Chỉnh sửa',
                    headerTitleAlign: 'center',
                    headerTitleStyle: styles.title_top_screen,
                    headerLeft: () => (
                        <View style={{ height: '100%', width: 'auto', alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.navigate('Setting')}>
                                <Image
                                    style={{ width: 35, height: 35, tintColor: colors.black }}
                                    source={{ uri: icons.back_head }}
                                />
                                <Text style={{ fontSize: 19, fontWeight: '500', color: colors.black }}>Quay lại</Text>
                            </TouchableOpacity>
                        </View>
                    ),
                }} />



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
            if (userData) {
                dispatch({
                    type: 'login',
                    payload: JSON.parse(userData),
                });
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        }
    };

    useEffect(() => {
        loadUserData();
    }, []);

    return (
        <NavigationContainer independent={true}>
            <UserContext.Provider value={[user, dispatch]}>
                <TabBarProvider>
                    <Stack.Navigator
                        initialRouteName="Intro"
                        screenOptions={{ headerShown: false }}>
                        {user == null ? (<>
                            <Stack.Screen name="Intro" component={IntroApp} />
                            <Stack.Screen name="Login" component={Login} />
                            <Stack.Screen name="Register" component={Register} />
                        </>) : (<>
                            <Stack.Screen name="HomeTabs" component={HomeTabs} />
                            <Stack.Screen name="Logout" component={Logout} />
                            <Stack.Screen name="Message" component={Message} />
                        </>)}
                    </Stack.Navigator>
                </TabBarProvider>
            </UserContext.Provider>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    tabBarStyle: {
        position: 'absolute',
        bottom: 10,
        left: 15,
        right: 15,
        backgroundColor: colors.white,
        borderRadius: 50,
        height: 60,
        elevation: 0,

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
    }

});

export default Navigation