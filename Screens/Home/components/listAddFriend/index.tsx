import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {AppImage} from '../../../../Components';
import colors from '../../../../assets/color/colors';
import {accountNew} from '../../data';

type itemData = {
  avatar: string;
  username: string;
  isFollow: boolean;
};
interface ListItemAddFriendProps {
  data?: itemData;
}
const ListItemAddFriend: React.FC<ListItemAddFriendProps> = ({data}) => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingHorizontal: 10, gap: 5}}
      style={styles.container}>
      {accountNew.map(item => (
        <View style={styles.itemUser}>
          <Text style={styles.newUser}>New account</Text>
          <AppImage
            imageStyle={{borderRadius: 90, marginRight: 5}}
            uri={item.avatar}
            width={80}
            height={80}
          />
          <Text style={{color: colors.black, fontWeight: '600'}}>
            {item.username}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: colors.info,
              paddingHorizontal: 8,
              borderRadius: 10,
            }}>
            <Text style={{color: colors.white}}>Follow</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default ListItemAddFriend;
