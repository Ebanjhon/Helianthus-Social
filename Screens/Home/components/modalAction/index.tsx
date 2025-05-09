import { BlurView } from '@react-native-community/blur';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Modal, Text, View, Button, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TouchableOpacity, FlatList, TextInput, TouchableNativeFeedback, Image, Alert } from 'react-native';
import styles from './style';
import { useDeleteFeedMutation } from '../../../../RTKQuery/Slides/slide';

type ActionProps = {
  isAuthor: boolean,
  feedId: string,
  setDeleteFeed: () => void
};

export type ModalActionRef = {
  onShowModalAction: (data: ActionProps) => void;
};

const ModalAction = forwardRef<ModalActionRef>((_, ref) => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isShowDialog, setIsShowDialog] = useState(false);
  const [dataAction, setDataAction] = useState<ActionProps>();
  const [fetchDeleteFeed, { data, isLoading, error, isSuccess }] = useDeleteFeedMutation();

  useImperativeHandle(ref, () => ({
    onShowModalAction: (data) => {
      setIsVisibleModal(true)
      setDataAction(data);
    },
  }));

  const handleDelete = async () => {
    try {
      await fetchDeleteFeed({ feedId: dataAction?.feedId || '' }).unwrap();
      if (isSuccess) {
        dataAction?.setDeleteFeed();
        console.log(isSuccess);
      }
    } catch (error) {
      console.log('====================================');
      console.log("Lỗi");
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
        <TouchableOpacity
          onPress={handleDialog}>
          <Text style={styles.textAction}>Xóa bài viết</Text>
        </TouchableOpacity>

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

