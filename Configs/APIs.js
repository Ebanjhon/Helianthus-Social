import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const HOST = 'http://192.168.1.26:8080'; //  IPv4 Address ios lỗi thì cú chạy lại 

export const endpoints = {
    'login': '/api/login',
    'current-user': '/api/users/curent',
    'register': '/api/register',
    'create-post': '/api/post/create',
    'loadPost': (currentUserId, page) => `/api/post?currentUserId=${currentUserId}&page=${page}`,
    'create-comment': '/api/comment',
    'load-comments': (postId) => `/api/comment/post/${postId}`,
    'search-user': (text, userId) => `/api/users/search?text=${text}&idUser=${userId}`,
    'following': '/api/follow',
    'unfollowing': (userid, useridtarger) => `/api/follow?idUser=${userid}&idTargetUser=${useridtarger}`,
    'update-avatar': '/api/users/update-avatar',
    'like-post': (userId, postId) => `/api/post/like-post?userId=${userId}&postId=${postId}`,
    'delete-post': (postId) => `/api/post?postId=${postId}`,
    'profile-detail': (userId) => `/api/users/detail?idUser=${userId}`,
    'get-my-post': (userId) => `/api/post/myposts?idUser=${userId}`,
    'my-medias': (userId, page) => `/api/media?userId=${userId}&page=${page}&size=10`,
    'get-room-chat': (firstUser, lastUser) => `/api/chat/room?firstUserId=${firstUser}&lastUserId=${lastUser}`,
    'get-user-chat': (userId) => `/api/chat?userId=${userId}`,
    'update-profile':'/api/users',
    'delete-cmt':(cmtId)=> `/api/comment/${cmtId}`,
    'notification': (userId)=>`/api/notification?userId=${userId}`,
    'create_otp':(userId)=>`/api/OTP?userId=${userId}`,
    'checking-otp':(userId, otp) =>`/api/OTP/active?userId=${userId}&otp=${otp}`,

}

export const authApi = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        return axios.create({
            baseURL: HOST,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error('Error fetching token:', error);
        throw error; // Đảm bảo bạn xử lý lỗi trong mã gọi hàm này
    }
};

// Sử dụng axios bình thường cho các yêu cầu không cần token, như đăng nhập
export const apiWithoutAuth = axios.create({
    baseURL: HOST
});

export default apiWithoutAuth;


// try {
//     const api = await authApi();
//     const response = await api.post(endpoints['']());
//     if (response.status === 200) {
//     } else {
//     }
// } catch (error) {
   
// }