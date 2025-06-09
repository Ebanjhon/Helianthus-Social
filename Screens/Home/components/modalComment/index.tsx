import { BlurView } from '@react-native-community/blur';
import React, { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Modal, Text, View, TouchableOpacity, FlatList, TextInput, TouchableNativeFeedback, Image, ActivityIndicator, Alert } from 'react-native';
import styles from './style';
import colors from '../../../../assets/color/colors';
import { AppImage } from '../../../../Components';
import { getTime } from '../../functions';
import icons from '../../../../assets/iconApp/icons';
import { useCreateCommentMutation, useDeleteCommentMutation, useGetListCommentMutation, useLazyGetListCommentChildQuery } from '../../../../RTKQuery/Slides/slide';
import { CommentResponse, TypeFeedItem } from '../../../../RTKQuery/Slides/types';
import { IconSend } from '../../../../assets/SVG';
import { UserContext } from '../../../../Configs/UserReducer';

export type ModalCommentRef = {
  onShowModalComment: (item: TypeFeedItem) => void;
};

const ModalComment = forwardRef<ModalCommentRef>((_, ref) => {
  const { user, dispatch } = useContext(UserContext);
  const [geList, { isLoading }] = useGetListCommentMutation();
  const [createComment, { isLoading: isLoadingCreate }] = useCreateCommentMutation();
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isStopFetch, setIsStopFetch] = useState(false);
  const [feed, setFeed] = useState<TypeFeedItem>();
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
    onShowModalComment: (feed) => {
      setIsVisibleModal(true);
      pageRef.current = 0;
      setCommentList([]);
      getListComment(feed.feedId);
      setFeed(feed);
      setCommentParent(null);
    },
  }));

  const createCommentFeed = async () => {
    if (comment === '') {
      return;
    }
    const result = await createComment({
      feedId: commentParent !== null ? '' : feed?.feedId || '',
      parentCommentId: commentParent?.data.commentId,
      content: comment,
      authorId: feed?.author.userId || '',
    }).unwrap();

    let newComment: any = {
      data: {
        feedId: commentParent ? '' : feed?.feedId,
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
      commentId: '',
      feedId: null,
      parentCommentId: null,
    };
    setComment('');
    if (commentParent) {
      setCommentParent(null);
      return;
    }
    setCommentList(pre => [newComment, ...pre]);
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
          renderItem={({ item }) => <CommentItem data={item} onSetCommentParent={setCommentParent} isAuthorUser={user?.userId === item.data.userId} />}
          ListEmptyComponent={() => (isLoading ? <ActivityIndicator size="large" color={colors.gold2} /> : <Text style={{ alignSelf: 'center' }}>Hiện chưa có bình luận nào</Text>)}
          ListFooterComponent={() => {
            if (commentList.length === 0) return null;
            if (isStopFetch) {
              return <Text style={{ alignSelf: 'center', fontSize: 16 }}>Đã tải hết bình luận</Text>;
            }
            return (
              <TouchableOpacity onPress={() => getListComment(feed?.feedId || '')}>
                <Text style={{ alignSelf: 'center', fontSize: 16 }}>Tải thêm bình luận</Text>
              </TouchableOpacity>
            );
          }}
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
                  color: colors.white,
                }}>
                Trả lời:
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '400',
                  color: colors.white,
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

type CommentItemProps = {
  data: CommentResponse;
  onSetCommentParent: (item: CommentResponse) => void;
  isAuthorUser: boolean
};

const CommentItem: React.FC<CommentItemProps> = ({ data, onSetCommentParent, isAuthorUser }) => {
  const [fetchDelete] = useDeleteCommentMutation();
  const [isShowChild, setIsShowChild] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);

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
          onPress: async () => {
            try {
              const result = await fetchDelete({ commentId: commentId }).unwrap();
              if (result) {
                setIsDelete(true);
              }
            } catch (error) {
              console.log('====================================');
              console.log(error);
              console.log('====================================');
            }
          }
        }
      ]
    );
  }

  return (
    <View style={[styles.contentItemList, isDelete && { display: 'none' }]}>
      <AppImage uri={data.user.avatar} width={40} height={40} imageStyle={{ borderRadius: 100 }} />
      <View style={styles.detailComment}>
        <Text style={styles.nameText}>@{data.user.username}</Text>
        <Text style={styles.commentText}>{data.data.content}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>{getTime(data.data.dateCreate)}</Text>
            <Text style={{ paddingHorizontal: 5 }}>•</Text>
            <TouchableOpacity onPress={() => { onSetCommentParent(data) }}>
              <Text style={styles.textReply}>Trả lời</Text>
            </TouchableOpacity>
            {data.hasChil && <>
              <Text style={{ paddingHorizontal: 5 }}>•</Text>
              <TouchableOpacity
                onPress={() => { setIsShowChild(pre => !pre) }}
              >
                <Text style={styles.textReply}>{isShowChild ? 'Ẩn bớt' : "Xem thêm"}</Text>
              </TouchableOpacity>
            </>}
          </View>
          <TouchableOpacity
            onPress={() => { handleDialog(data.data.commentId) }}
            style={{ display: isAuthorUser ? 'flex' : 'none' }}>
            <Text style={styles.textDelete}>Xóa</Text>
          </TouchableOpacity>
        </View>
        {(data.hasChil && isShowChild) && <>
          <CommentChild isShowCommentChild={isShowChild} commentId={data.data.commentId} />
        </>}
      </View>
    </View >
  )
}

type CommentChildProps = {
  isShowCommentChild: boolean;
  commentId: string;
};

const CommentChild: React.FC<CommentChildProps> = ({ isShowCommentChild, commentId }) => {
  const [trigger] = useLazyGetListCommentChildQuery();
  const [data, setData] = useState<CommentResponse[]>([]);
  const pageRef = useRef<number>(0);

  const handleCallAPI = async () => {
    if (pageRef.current === -1) return;
    try {
      const result = await trigger({ parentId: commentId, page: pageRef.current }).unwrap();
      if (result.length !== 0) {
        setData(pre => [...pre, ...result]);
        pageRef.current += 1;
      } else {
        pageRef.current = -1;
      }
    } catch (err) {
      console.error('Lỗi khi gọi API comment con:', err);
    }
  };

  useEffect(() => {
    if (data.length === 0) {
      handleCallAPI();
    }
  }, [])

  return (
    <View style={{ display: isShowCommentChild ? 'flex' : 'none' }}>
      <FlatList
        scrollEnabled={true}
        data={data}
        renderItem={({ item, index }) => (
          <View style={styles.contentItemList}>
            <AppImage uri={item.user.avatar} width={40} height={40} imageStyle={{ borderRadius: 100 }} />
            <View style={styles.detailComment}>
              <Text style={styles.nameText}>@{item.user.username}</Text>
              <Text style={styles.commentText}>{item.data.content}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text>{getTime(item.data.dateCreate)}</Text>
                  <Text style={{ paddingHorizontal: 5 }}>•</Text>
                </View>
                <TouchableOpacity
                  onPress={() => { }}
                  style={{ display: true ? 'flex' : 'none' }}>
                  <Text style={styles.textDelete}>Xóa</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View >
        )}
      />
    </View>
  )
}


