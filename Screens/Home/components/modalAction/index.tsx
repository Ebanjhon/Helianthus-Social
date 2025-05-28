import { BlurView } from '@react-native-community/blur';
import React, { forwardRef, useContext, useImperativeHandle, useRef, useState } from 'react';
import { Modal, Text, View, TouchableOpacity, TouchableNativeFeedback, Alert } from 'react-native';
import styles from './style';
import { useDeleteFeedMutation } from '../../../../RTKQuery/Slides/slide';
import { showToast } from '../../../../Configs/ToastConfig';
import { UserContext } from '../../../../Configs/UserReducer';

type ActionProps = {
  feedId: string,
  authorId: string,
  setDeleteFeed: () => void
};

export type ModalActionRef = {
  onShowModalAction: (data: ActionProps) => void;
};

const ModalAction = forwardRef<ModalActionRef>((_, ref) => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const { user, dispatch } = useContext(UserContext);
  const [isShowDialog, setIsShowDialog] = useState(false);
  const [fetchDeleteFeed] = useDeleteFeedMutation();
  const deleteFeedCallbackRef = useRef<(ActionProps | any)>(null);
  useImperativeHandle(ref, () => ({
    onShowModalAction: (data) => {
      setIsVisibleModal(true)
      deleteFeedCallbackRef.current = data;
    },
  }));

  const handleDelete = async () => {
    try {
      const result = await fetchDeleteFeed({ feedId: deleteFeedCallbackRef.current.feedId }).unwrap();
      console.log('====================================');
      console.log(result.success);
      console.log('====================================');
      deleteFeedCallbackRef.current.setDeleteFeed();
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
  }

  const handleDialog = () => {
    setIsShowDialog(true);
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc muốn xoá bài viết?",
      [
        {
          text: "Huỷ",
          onPress: () => {
            setIsVisibleModal(false)
            setIsShowDialog(false)
          },
          style: "cancel"
        },
        {
          text: "Xoá", onPress: () => {
            setIsVisibleModal(false)
            setIsShowDialog(false)
            handleDelete()
          }
        }
      ]
    );
  }

  const isAuthor = user?.userId === deleteFeedCallbackRef.current?.authorId;

  return (
    <Modal
      animationType='fade'
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
      <View style={[styles.actionList, { display: !isShowDialog ? 'flex' : 'none' }]}>
        {isAuthor &&
          <TouchableOpacity
            onPress={handleDialog}>
            <Text style={styles.textAction}>Xóa bài viết</Text>
          </TouchableOpacity>
        }
        <TouchableOpacity
        >
          <Text style={styles.textAction}>Báo cáo bài viết</Text>
        </TouchableOpacity>
      </View >
    </Modal >
  );
});

export default ModalAction;


function setIsDelete(arg0: boolean) {
  throw new Error('Function not implemented.');
}

