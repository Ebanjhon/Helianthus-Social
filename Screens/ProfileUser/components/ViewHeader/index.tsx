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
const temp =
  'https://i.pinimg.com/736x/c9/e3/eb/c9e3eb487b0deb3f50501c196e332b58.jpg';
const ViewHeader: React.FC<ViewHeaderProps> = ({ data, isLoading }) => {
  return (
    <View style={styles.container}>
      <FastImage
        style={styles.cover}
        source={{
          uri: data?.cover !== null ? BASE_MinIO + data?.cover : temp,
          priority: FastImage.priority.high,
        }}
      />
      <Image
        source={{ uri: data?.avatar !== null ? BASE_MinIO + data?.avatar : temp }}
        style={[styles.avatar, styles.avtView]}
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
