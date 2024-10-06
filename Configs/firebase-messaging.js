import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

// Đăng ký lấy FCM token
export const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
        getFcmToken();
    }
};

// Lấy FCM token cho thiết bị
const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
        console.log('FCM Token:', fcmToken);
    } else {
        console.log('Failed to get FCM token');
    }
};

// Xử lý nhận thông báo
export const notificationListener = async () => {
    // Lắng nghe khi nhận thông báo khi ứng dụng đang chạy
    messaging().onMessage(async (remoteMessage) => {
        Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    // Xử lý khi người dùng nhấn vào thông báo trong background
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log('Notification caused app to open from background state:', remoteMessage.notification);
    });

    // Xử lý khi ứng dụng bị đóng và mở bởi thông báo
    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log('Notification caused app to open from quit state:', remoteMessage.notification);
            }
        });
};
