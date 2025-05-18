import { BlurView } from '@react-native-community/blur';
import React, { forwardRef, useContext, useImperativeHandle, useRef, useState } from 'react';
import { Modal, Text, View, TouchableOpacity, FlatList, TextInput, TouchableNativeFeedback, Image, ActivityIndicator, Alert } from 'react-native';
import styles from './style';
import colors from '../../../../assets/color/colors';
import { AppImage } from '../../../../Components';
import { getTime } from '../../functions';
import icons from '../../../../assets/iconApp/icons';
import { useCreateCommentMutation, useGetListCommentMutation } from '../../../../RTKQuery/Slides/slide';
import { CommentResponse } from '../../../../RTKQuery/Slides/types';
import { IconSend } from '../../../../assets/SVG';
import { UserContext } from '../../../../Configs/UserReducer';

export type ModalCommentRef = {
  onShowModalComment: (feedId: string) => void;
};

const ModalComment = forwardRef<ModalCommentRef>((_, ref) => {
  const { user, dispatch } = useContext(UserContext);
  const [geList, { isLoading }] = useGetListCommentMutation();
  const [createComment, { isLoading: isLoadingCreate }] = useCreateCommentMutation();
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isStopFetch, setIsStopFetch] = useState(false);
  const [feedId, setFeedId] = useState('');
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState<CommentResponse[]>([]);
  const [commentParent, setCommentParent] = useState<CommentResponse | null>(null);
  const pageRef = useRef<number>(0);

  const getListComment = async (feedId: string) => {
    if (isStopFetch) {
      return;
    }
    const result = await geList({ feedId: feedId, page: pageRef.current }).unwrap();
    setCommentList(pre => [...pre, ...result]);
    if (result.length !== 0) {
      pageRef.current += 1;
    } else {
      setIsStopFetch(true);
    }
  };

  useImperativeHandle(ref, () => ({
    onShowModalComment: (feedId) => {
      setIsVisibleModal(true);
      pageRef.current = 0;
      setCommentList([]);
      getListComment(feedId);
      setFeedId(feedId);
      setCommentParent(null);
    },
  }));

  const handleDialog = (commentId: string) => {
    Alert.alert(
      "Xác nhận",
      "Xóa bình luận này?",
      [
        {
          text: "Huỷ",
          onPress: () => {
          },
          style: "cancel"
        },
        {
          text: "Xoá",
          onPress: () => {
          }
        }
      ]
    );
  }

  const renderItem = (data: CommentResponse, isChild: boolean) => {
    if (isChild) {
    }
    return (
      <>
        <View style={styles.contentItemList}>
          <AppImage uri={data.user.avatar} width={40} height={40} imageStyle={{ borderRadius: 100 }} />
          <View style={styles.detailComment}>
            <Text style={styles.nameText}>@{data.user.username}</Text>
            <Text style={styles.commentText}>{data.data.content}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>{getTime(data.data.dateCreate)}</Text>
                <Text style={{ paddingHorizontal: 5 }}>•</Text>
                <TouchableOpacity
                  onPress={() => { setCommentParent(data) }}
                >
                  <Text style={styles.textReply}>Trả lời</Text>
                </TouchableOpacity>
                {data.hasChil && <>
                  <Text style={{ paddingHorizontal: 5 }}>•</Text>
                  <TouchableOpacity
                    onPress={() => { }}
                  >
                    <Text style={styles.textReply}>Xem thêm</Text>
                  </TouchableOpacity>
                </>}
              </View>
              <TouchableOpacity
                onPress={() => { handleDialog(data.commentId) }}
                style={{ display: data.user.userId === user?.userId ? 'flex' : 'none' }}>
                <Text style={styles.textDelete}>Xóa</Text>
              </TouchableOpacity>
            </View>
            {/* {!isChild &&
              <FlatList
                data={data.childComment}
                renderItem={(item) => renderItem(item.item, true)}
              />
            } */}
          </View>
        </View >
      </>
    )
  }

  const createCommentFeed = async () => {
    if (comment === '') {
      return;
    }
    const result = await createComment({
      feedId: feedId,
      parentCommentId: null,
      content: comment
    }).unwrap();
    let newComment: CommentResponse = {
      data: {
        feedId: feedId,
        content: result.content,
        commentId: result.commentId,
        userId: result.userId,
        dateCreate: result.dateCreate
      },
      user: {
        userId: user?.userId || '',
        username: user?.username || '',
        firstname: user?.firstname || '',
        lastname: user?.lastname || '',
        avatar: user?.avatar || ''
      },
      hasChil: false,
    };
    setCommentList(pre => [newComment, ...pre]);
    setComment('');
  };

  return (
    <Modal
      animationType='slide'
      visible={isVisibleModal}
      transparent={true}
    >
      <TouchableNativeFeedback
        onPress={() => {
          setIsStopFetch(false);
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
          data={commentList}
          renderItem={(item) => (renderItem(item.item, false))}
          ListEmptyComponent={() => (isLoading ? <ActivityIndicator size="large" color={colors.gold2} /> : <Text style={{ alignSelf: 'center' }}>Hiện chưa có bình luận nào</Text>)}
          ListFooterComponent={() => (
            isStopFetch ?
              <Text style={{ alignSelf: 'center', fontSize: 16 }}>Đã tải hết bình luận</Text> :
              <TouchableOpacity onPress={() => { getListComment(feedId) }}>
                <Text style={{ alignSelf: 'center', fontSize: 16 }}>Tải thêm bình luận</Text>
              </TouchableOpacity>
          )}
        />
        <View style={styles.input_cmt}>
          <TextInput
            value={comment}
            onChangeText={setComment}
            placeholder="Nhập nội dung bình luận..."
            style={styles.textInput}
          />
          <TouchableOpacity onPress={createCommentFeed} style={styles.send}>
            <IconSend width={32} height={32} />
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
                @{commentParent.user.username}
              </Text>
              <TouchableOpacity
                onPress={() => setCommentParent(null)}
              >
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


