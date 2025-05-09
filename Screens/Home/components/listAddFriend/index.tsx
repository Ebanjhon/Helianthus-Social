import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { AppImage } from '../../../../Components';
import colors from '../../../../assets/color/colors';
import { accountNew } from '../../data';

type itemData = {
  avatar: string;
  username: string;
  isFollow: boolean;
};

interface ListItemAddFriendProps { }

const ListItemAddFriend: React.FC<ListItemAddFriendProps> = ({ }) => {
  return (
    <FlatList
      data={accountNew}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 10, gap: 5, height: 130 }}
      style={styles.container}
      renderItem={(item: any) => (
        <View style={styles.itemUser}>
          <Text style={styles.newUser}>New account</Text>
          <AppImage
            imageStyle={{ borderRadius: 90, marginRight: 5 }}
            uri={item.avatar}
            width={80}
            height={80}
          />
          <Text style={{ color: colors.black, fontWeight: '600' }}>
            {item.username}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: colors.info,
              paddingHorizontal: 8,
              borderRadius: 10,
            }}>
            <Text style={{ color: colors.white }}>Follow</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

export default ListItemAddFriend;