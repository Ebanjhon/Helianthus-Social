import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  SectionList,
  TouchableOpacity,
} from 'react-native';
import TabHeader from '../../Components/TabHeader';
import styles from './NotifiStyle';
import colors from '../../assets/color/colors';
import {authApi, endpoints} from '../../Configs/APIs';

const Notification = () => {
  const title = 'Thông báo';
  // const [user, dispatchUser] = useContext(UserContext);

  const groupMessagesByDate = data => {
    const today = new Date();
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const todayMessages = [];
    const yesterdayMessages = [];
    const otherMessages = [];

    data.forEach(message => {
      // Chuyển đổi chuỗi thời gian thành đối tượng Date
      const messageDate = new Date(message.dateTime);

      // Kiểm tra nếu messageDate hợp lệ
      if (isNaN(messageDate.getTime())) {
        console.error('Invalid date format for message:', message.time);
        return; // Bỏ qua nếu không thể tạo đối tượng Date hợp lệ
      }

      // So sánh ngày với hôm nay
      if (messageDate.toDateString() === today.toDateString()) {
        todayMessages.push(message);
      }
      // So sánh ngày với hôm qua
      else if (messageDate.toDateString() === yesterday.toDateString()) {
        yesterdayMessages.push(message);
      }
      // Nếu không phải hôm nay hay hôm qua, đưa vào mục "Khác"
      else {
        otherMessages.push(message);
      }
    });

    return [
      {title: 'Hôm nay', data: todayMessages},
      {title: 'Hôm qua', data: yesterdayMessages},
      {title: 'Khác', data: otherMessages},
    ].filter(section => section.data.length > 0);
  };

  const [notifi, setNotifi] = useState([]);
  const groupedData = groupMessagesByDate(notifi);
  useEffect(() => {
    const fetdata = async () => {
      try {
        const api = await authApi();
        const response = await api.get(endpoints['notification'](user.id));
        if (response.status === 200) {
          setNotifi(response.data);
          console.log(response.data);
        } else {
          console.log('lỗi');
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetdata();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TabHeader title={title} />
      {notifi.length === 0 && (
        <>
          <Text style={{marginTop: '70%'}}>Bạn chưa có thông báo nào!</Text>
        </>
      )}
      <SectionList
        style={{width: '100%', padding: 10, backgroundColor: colors.xamtrang}}
        sections={groupedData}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity>
            <View style={styles.contain_notifi}>
              <Image
                style={{width: 45, height: 45, borderRadius: 50, margin: 5}}
                source={{
                  uri:
                    item.avatar === ''
                      ? 'https://i.pinimg.com/564x/25/ee/de/25eedef494e9b4ce02b14990c9b5db2d.jpg'
                      : item.avatar,
                }}
              />
              <View style={styles.notifi}>
                <Text style={styles.title}>
                  {item.username}
                  <Text style={styles.content}> {item.message}</Text>
                </Text>
                <Text>hôm qua</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: colors.black,
              alignItems: 'flex-start',
              width: '100%',
            }}>
            {title}
          </Text>
        )}
        contentContainerStyle={{paddingBottom: 90}}
      />
    </SafeAreaView>
  );
};

export default Notification;
