import React from 'react';
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import styles from './style';
import colors from '../../../../assets/color/colors';
import { UserProfileInfo } from '../../../../RTKQuery/Slides/types';
import { BASE_MinIO } from '../../../../RTKQuery/Slides/slide';
import FastImage from 'react-native-fast-image';

type ViewHeaderProps = {
  data?: UserProfileInfo;
  isLoading: boolean
};
const cover = 'https://i.pinimg.com/736x/89/89/30/898930ef71b48350ab9c7f4878d20cc9.jpg';
const avatar = 'https://i.pinimg.com/736x/7d/d7/49/7dd749ba968cd0f2716d988a592f461e.jpg';
const ViewHeader: React.FC<ViewHeaderProps> = ({ data, isLoading }) => {
  console.log('====================================');
  console.log(data?.cover);
  console.log('====================================');
  return (
    <View style={styles.container}>
      <FastImage
        style={styles.cover}
        source={{
          uri: data?.cover === null ? cover : BASE_MinIO + data?.cover,
          priority: FastImage.priority.high,
        }}
      />
      <FastImage
        style={[styles.avatar, styles.avtView]}
        source={{
          uri: data?.avatar === null ? avatar : BASE_MinIO + data?.avatar,
          priority: FastImage.priority.high,
        }}
      />
      <Text style={styles.nameText}>{data?.firstname} {data?.lastname}</Text>
      {/* <TouchableOpacity style={[styles.btnFollow, { display: data?.curentUser ? 'flex' : 'none' }]}>
        <Text style={{ color: colors.white }}>FOLLOW</Text>
      </TouchableOpacity> */}
      <View style={styles.thumnable}>
        <Text style={styles.bioText}>{data?.bio}</Text>
        <View style={styles.inforPrifile}>
          <Pressable style={styles.itemInfor}>
            <Text style={styles.textNum}>{data?.countFollow}</Text>
            <Text style={styles.textTitleNum}>Followers</Text>
          </Pressable>
          <Pressable style={styles.itemInfor}>
            <Text style={styles.textNum}>{data?.countFeed}</Text>
            <Text style={styles.textTitleNum}>posts</Text>
          </Pressable>
          <Pressable style={styles.itemInfor}>
            <Text style={styles.textNum}>{data?.countFollowing}</Text>
            <Text style={styles.textTitleNum}>Following</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
export default ViewHeader;
