import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Button,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styles from './style';
import {BlurView} from '@react-native-community/blur';
import {TextInput} from 'react-native-gesture-handler';
import colors from '../../../../assets/color/colors';

type ModalCommentProps = {
  isShowModal: boolean;
};

const ModalComment: React.FC<ModalCommentProps> = ({isShowModal}) => {
  const refRBSheet = useRef();

  return (
    <View style={{flex: 1, position: 'absolute'}}>
      <Modal
        animationType="slide"
        transparent={true} // Đặt transparent thành true để làm nền trong suốt
        visible={isShowModal}
        // onRequestClose={() => setModalVisible(false)}
      >
        {/* Phần nền mờ */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{flex: 1}}>
            <BlurView
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
              }}
              blurType="dark" // Các kiểu blur: light, dark, extraDark, regular, prominent
              blurAmount={1} // Độ mạnh của hiệu ứng blur
              reducedTransparencyFallbackColor="white" // Màu nền khi blur không khả dụng
            />

            <KeyboardAvoidingView
              keyboardVerticalOffset={0}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <View style={styles.contai_popup}>
                {/* <TouchableOpacity onPress={unpop}>
                  <View style={{width: '100%', height: '20%'}}></View>
                </TouchableOpacity> */}

                <View style={styles.contain_cmt_view}>
                  <Text style={{fontSize: 19, fontWeight: '600'}}>Comment</Text>
                  <View
                    style={{
                      width: '95%',
                      borderWidth: 0.7,
                      borderColor: colors.gray,
                      marginBottom: 1,
                    }}
                  />

                  <View style={styles.contain_list_cmt}>
                    {/* <FlatList
                      data={commentList}
                      keyExtractor={item => item.idComment.toString()}
                      renderItem={renderComment}
                      nestedScrollEnabled={true}
                      ListEmptyComponent={<Text>Chưa có bình luận!</Text>}
                      contentContainerStyle={styles.contentContainer}
                      style={{flex: 1}}
                    /> */}
                  </View>

                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.input_cmt}>
                      {/* <TextInput
                        value={comment}
                        onChangeText={setComment}
                        placeholder="Type comment here..."
                        style={styles.textInput}
                      /> */}

                      {/* <TouchableOpacity onPress={createCmt} style={styles.send}>
                        <Image
                          style={{
                            width: 30,
                            height: 30,
                            transform: [{rotate: '270deg'}],
                            top: -1,
                          }}
                          source={{uri: icons.send_cmt}}
                        />
                      </TouchableOpacity> */}
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
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default ModalComment;
