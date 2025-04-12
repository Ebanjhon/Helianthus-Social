import { BlurView } from '@react-native-community/blur';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Modal, Text, View, Button, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TouchableOpacity, FlatList, TextInput, TouchableNativeFeedback, Image } from 'react-native';
import styles from './style';
import colors from '../../../../assets/color/colors';
import { Pressable } from 'react-native-gesture-handler';
import { dataComment } from './data';
import { AppImage } from '../../../../Components';
import { IconX } from '../../../../assets/SVG';
import { getTime } from '../../functions';
import icons from '../../../../assets/iconApp/icons';

export type ModalCommentRef = {
  onShowModalComment: () => void;
};

const ModalComment = forwardRef<ModalCommentRef>((_, ref) => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [comment, setComment] = useState('');
  const [commentParent, setCommentParent] = useState(null);

  useImperativeHandle(ref, () => ({
    onShowModalComment: () => setIsVisibleModal(true),
  }));



  const renderItem = (data: any, isChild: boolean) => {
    if (isChild) {
      console.log(data);
    }
    return (
      <>
        <View style={styles.contentItemList}>
          <AppImage uri={''} width={40} height={40} imageStyle={{ borderRadius: 100 }} />
          <View style={styles.detailComment}>
            <Text style={styles.nameText}>@{data.username}</Text>
            <Text style={styles.commentText}>{data.content}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>{getTime(data.timecreate)}</Text>
                <Text style={{ paddingHorizontal: 5 }}>•</Text>
                <TouchableOpacity
                  onPress={() => { setCommentParent(data) }}
                >
                  <Text style={styles.textReply}>Trả lời</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity>
                <Text style={styles.textDelete}>Xóa</Text>
              </TouchableOpacity>
            </View>
            {!isChild &&
              <FlatList
                data={data.childComment}
                renderItem={(item) => renderItem(item.item, true)}
              />
            }
          </View>
        </View >
      </>
    )
  }

  return (
    <Modal
      animationType='slide'
      visible={isVisibleModal}
      transparent={true}
    >
      <TouchableNativeFeedback
        onPress={() => {
          setIsVisibleModal(false)
        }}
        style={{ flex: 1 }}>
        <BlurView
          style={{ flex: 1 }}
          blurType="dark"
          blurAmount={1}
          reducedTransparencyFallbackColor="white"
        />
      </TouchableNativeFeedback>
      <View style={styles.commentView}>
        <View style={styles.contain_cmt_view}>
          <Text style={{ fontSize: 19, fontWeight: '600' }}>Comment</Text>
        </View>
        <FlatList
          contentContainerStyle={styles.containerComment}
          style={{ flex: 1 }}
          data={dataComment}
          renderItem={(item) => (renderItem(item.item, false))}
        />
        <View style={styles.input_cmt}>
          <TextInput
            value={comment}
            onChangeText={setComment}
            placeholder="Nhập nội dung bình luận..."
            style={styles.textInput}
          />
          <TouchableOpacity onPress={() => { }} style={styles.send}>
            {/* avatar */}
          </TouchableOpacity>

          {commentParent !== null && (
            <View style={styles.reply}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '700',
                  color: colors.dark,
                }}>
                Trả lời:
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '400',
                  color: colors.dark,
                  paddingLeft: 5,
                }}>
                @{commentParent.username}
              </Text>
              <TouchableOpacity
                onPress={() => setCommentParent(null)}>
                <Image
                  style={{ width: 20, height: 20, marginLeft: 10 }}
                  source={{ uri: icons.remove }}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View >
    </Modal >
  );
});

export default ModalComment;


