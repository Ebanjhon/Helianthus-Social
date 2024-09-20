import axios from "axios";
import cookie from "react-cookies";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const HOST = 'http://192.168.1.17:8080'; //  IPv4 Address ios lỗi thì cú chạy lại 

export const endpoints = {
    'login': '/api/login',
    'current-user': '/api/users/curent',
    'register': '/api/register',
    'create-post': '/api/post/create',
    'loadPost': (currentUserId, page) => `/api/post?currentUserId=${currentUserId}&page=${page}`,
    'create-comment': '/api/comment',
    'load-comments': (postId) => `/api/comment/post/${postId}`,

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