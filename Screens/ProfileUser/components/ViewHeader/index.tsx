import React from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import styles from './style';
import { AppImage } from '../../../../Components';
import colors from '../../../../assets/color/colors';
import { UserProfileInfo } from '../../../../RTKQuery/Slides/types';

type ViewHeaderProps = {
  data: UserProfileInfo;
};

const ViewHeader: React.FC<ViewHeaderProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <AppImage uri={data?.avatar || "https://i.pinimg.com/736x/43/61/09/4361091dd491bacbbcdbaa0be7a2d2be.jpg"} width={"100%"} height={230} imageStyle={styles.cover} />
      <AppImage uri={data?.avatar || "https://i.pinimg.com/736x/a4/1d/5b/a41d5bcc7240df30b9d69219bd8cb021.jpg"} width={100} height={100} imageStyle={styles.avatar} style={styles.avtView} />
      <Text style={styles.nameText}>{data?.firstname} {data?.lastname}</Text>
      <TouchableOpacity style={[styles.btnFollow, { display: data?.curentUser ? 'flex' : 'none' }]}>
        <Text style={{ color: colors.white }}>FOLLOW</Text>
      </TouchableOpacity>
      <View style={styles.thumnable}>
        <Text style={styles.bioText}>{data?.bio || ''}</Text>
        <View style={styles.inforPrifile}>
          <Pressable style={styles.itemInfor}>
            <Text style={styles.textNum}>20</Text>
            <Text style={styles.textTitleNum}>Followers</Text>
          </Pressable>
          <Pressable style={styles.itemInfor}>
            <Text style={styles.textNum}>20</Text>
            <Text style={styles.textTitleNum}>posts</Text>
          </Pressable>
          <Pressable style={styles.itemInfor}>
            <Text style={styles.textNum}>120</Text>
            <Text style={styles.textTitleNum}>Following</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
export default ViewHeader;
