import React, { forwardRef, useContext, useEffect, useReducer, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image, View } from 'react-native';
import { Provider } from 'react-redux';
import colors from '../../assets/color/colors';
import UserReducer, { UserContext } from '../../Configs/UserReducer';
import { TabBarProvider, useTabBar } from '../../Configs/TabBarContext';
import {
  NavigationContainer,
} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import Login from '../../Screens/Login/Login';
import Register from '../../Screens/Register/Register';
import Home from '../../Screens/Home/Home';
import Search from '../../Screens/Search/Search';
import Notification from '../../Screens/Notification/Notification';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import icons from '../../assets/iconApp/icons';
import Message from '../../Screens/Message/Message';
import Chat from '../../Screens/Message/Chat';
import ActiveAccount from '../../Screens/OTP/ActiveAccount';
import { store } from '../../RTKQuery/Stores/store';
import { styles } from './style';
import ProfileUser from '../../Screens/ProfileUser';
import Setting from '../../Screens/ProfileUser/components/SettingScreen';
import CreateFeed from '../../Screens/Post';
import UpdateProfile from '../../Screens/ProfileUser/components/UpdateProfileScreen';
import SplashScreen from '../../Screens/SplashScreen';
import { RootStackParamList } from './type';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { createNotificationChannel } from '../../Configs/functionNoti';
import { HOST } from '../../RTKQuery/Slides/slide';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const HomeTabs = forwardRef(() => {
  const { user, dispatch } = useContext(UserContext);
  const { state } = useTabBar();
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
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabBarIconText}>
                <Image
                  source={icons.home_full}
                  resizeMode="contain"
                  style={[
                    { tintColor: focused ? colors.gold : colors.secondary },
                    styles.icon,
                  ]}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabBarIconText}>
                <Image
                  source={icons.search}
                  resizeMode="contain"
                  style={[
                    { tintColor: focused ? colors.gold : colors.secondary },
                    styles.icon,
                  ]}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Post"
          component={CreateFeed}
          options={{
            tabBarStyle: { display: 'none' },
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabBarIconText}>
                <Image
                  source={icons.add}
                  resizeMode="contain"
                  style={{
                    tintColor: focused ? colors.gold : colors.black,
                    width: 45,
                    height: 45,
                  }}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Notification"
          component={Notification}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabBarIconText}>
                <Image
                  source={icons.notifi}
                  resizeMode="contain"
                  style={[
                    { tintColor: focused ? colors.gold : colors.secondary },
                    styles.icon,
                  ]}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileUser}
          options={{
            headerShown: false,
            tabBarStyle: { display: 'none' },
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabBarIconText}>
                <Image
                  source={icons.profile}
                  resizeMode="contain"
                  style={[
                    { tintColor: focused ? colors.gold : colors.secondary },
                    styles.icon,
                  ]}
                />
              </View>
            ),
          }}
          listeners={({ navigation }) => ({
            tabPress: () => {
              navigation.navigate("Profile", { usernameProps: user?.username });
            },
          })}
        />
      </Tab.Navigator>
    </View>
  );
});

const Navigation = () => {
  const [user, dispatch] = useReducer(UserReducer, null);
  const ws = useRef<WebSocket | null>(null);
  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData !== null) {
        dispatch({
          type: 'login',
          payload: JSON.parse(userData),
        });
      }
    } catch (error) { }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    createNotificationChannel();
  }, []);

  useEffect(() => {
    let userId = user?.userId;
    ws.current = new WebSocket(`ws://${HOST}:8086/ws?userId=${userId}`);

    ws.current.onopen = () => {
      console.log('✅ Connected to WebSocket');
    };

    ws.current.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      await notifee.displayNotification({
        title: `${data.firstname} ${data.lastname}`,
        body: data.contentNoti,
        android: {
          channelId: 'default',
          importance: AndroidImportance.HIGH,
          smallIcon: 'ic_launcher',
          vibrationPattern: [300, 500],
          autoCancel: true,
        },
      });
    };

    ws.current.onerror = (e) => {
      console.error('❌ WebSocket Error:', e.message);
    };

    ws.current.onclose = (e) => {
      console.log('⚠️ WebSocket Closed:', e.code, e.reason);
    };

    return () => {
      ws.current?.close();
    };
  }, [user?.userId]);

  return (
    <>
      <Provider store={store}>
        <NavigationContainer independent={true}>
          <UserContext.Provider value={{ user, dispatch }}>
            <TabBarProvider>
              <Stack.Navigator
                initialRouteName="HomeTabs"
                screenOptions={{
                  headerShown: false,
                  gestureEnabled: true,
                  gestureDirection: 'horizontal',
                }}>
                {user === null ? (
                  <>
                    <Stack.Screen name="Splash" component={SplashScreen} />
                    <Stack.Screen
                      name="Login"
                      component={Login}
                      options={{
                        cardStyleInterpolator:
                          CardStyleInterpolators.forHorizontalIOS,
                      }}
                    />
                    <Stack.Screen
                      name="Register"
                      component={Register}
                      options={{
                        cardStyleInterpolator:
                          CardStyleInterpolators.forFadeFromCenter,
                      }}
                    />
                    <Stack.Screen name="Active" component={ActiveAccount} />
                  </>
                ) : (
                  <>
                    <Stack.Screen name="HomeTabs" component={HomeTabs} />
                    <Stack.Screen name="Message" component={Message} />
                    <Stack.Screen name="Chat" component={Chat} />
                    <Stack.Screen name="Setting" component={Setting} />
                    <Stack.Screen
                      name="UpdateProfile"
                      component={UpdateProfile}
                    />
                  </>
                )}
              </Stack.Navigator>
            </TabBarProvider>
          </UserContext.Provider>
        </NavigationContainer>
      </Provider>
      {/* <Toast ref={ref => Toast.setRef(ref)} /> */}
    </>
  );
};

export default Navigation;