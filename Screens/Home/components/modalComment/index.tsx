import { BlurView } from '@react-native-community/blur';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Modal, Text, View, Button, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TouchableOpacity, FlatList, TextInput } from 'react-native';
import styles from './style';
import colors from '../../../../assets/color/colors';
import { Pressable } from 'react-native-gesture-handler';

export type ModalCommentRef = {
  onShowModalComment: () => void;
  onHideModalComment: () => void;
};

const ModalComment = forwardRef<ModalCommentRef>((_, ref) => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [comment, setComment] = useState('');

  useImperativeHandle(ref, () => ({
    onShowModalComment: () => setIsVisibleModal(true),
    onHideModalComment: () => setIsVisibleModal(false),
  }));

  return (
    <Modal
      animationType='fade'
      visible={isVisibleModal}
      onRequestClose={() => setIsVisibleModal(false)}
      transparent={true}
    >
      <BlurView
        style={{ flex: 1 }}
        blurType="dark"
        blurAmount={1}
        reducedTransparencyFallbackColor="white"
      >
        <View style={styles.commentView}>
          <KeyboardAvoidingView
            keyboardVerticalOffset={0}
            behavior='padding'>
            <View style={styles.contai_popup}>
              <View style={styles.contain_cmt_view}>
                <Text style={{ fontSize: 19, fontWeight: '600' }}>Comment</Text>
                <View
                  style={styles.line}
                />
                <FlatList
                  data={[]}
                  renderItem={() => (
                    <>
                    </>
                  )}
                  nestedScrollEnabled={true}
                  ListEmptyComponent={<Text>Chưa có bình luận!</Text>}
                  contentContainerStyle={styles.contentContainer}
                  style={{ flex: 1, backgroundColor: 'red' }}
                />
                <View style={styles.input_cmt}>
                  <TextInput
                    value={comment}
                    onChangeText={setComment}
                    placeholder="Type comment here..."
                    style={styles.textInput}
                  />

                  <TouchableOpacity onPress={() => { }} style={styles.send}>
                    {/* avatar */}
                  </TouchableOpacity>
                  {/* 
                      {idCommentParent !== 0 && (
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
                            @{repname}
                          </Text>
                          <TouchableOpacity
                            onPress={() => setIdCommentParent(0)}>
                            <Image
                              style={{width: 20, height: 20, marginLeft: 10}}
                              source={{uri: icons.remove}}
                            />
                          </TouchableOpacity>
                        </View>
                      )} */}
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </BlurView>
    </Modal>
  );
});

export default ModalComment;
