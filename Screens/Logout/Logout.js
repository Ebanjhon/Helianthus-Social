import { useContext, useEffect } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';


const Logout = ({ navigation }) => {
    const [userCurrent, dispatch] = useContext();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                await AsyncStorage.removeItem('token');
                await AsyncStorage.removeItem('user');
                dispatch({ type: 'logout' });
                navigation.navigate('Intro');
                // Thực hiện điều hướng hoặc thông báo đăng xuất thành công nếu cần
            } catch (error) {
                console.error('Error logging out:', error);
            }
        };

        handleLogout();
    }, []);

    return null; // Bạn có thể trả về một thông báo hoặc chuyển hướng ở đây nếu cần
};

export default Logout