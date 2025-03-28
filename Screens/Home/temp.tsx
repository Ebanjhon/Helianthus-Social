{
  /* /old/ */
}
<Modal
  animationType="slide"
  transparent={true}
  visible={showReport}
  onRequestClose={() => {
    setModalVisible(!showReport);
  }}>
  {/* Phần nền mờ */}
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={{flex: 1, backgroundColor: colors.light}}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={0}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={{alignItems: 'center'}}>
          <View style={[styles.head_edit, {backgroundColor: colors.gold}]}>
            <TouchableOpacity onPress={closeReport}>
              <Text style={styles.text_head}>Hủy</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={createReport}>
              <Text style={styles.text_head}>Gửi</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input_report}
            multiline={true}
            numberOfLines={1} // Số dòng hiển thị mặc định (có thể tuỳ chỉnh)
            value={textReport}
            onChangeText={e => setTextReport(e)}
            placeholder="Nhập nội dung báo cáo..."
          />

          <View style={styles.border_bot} />
          <Text
            style={{
              fontSize: 17,
              backgroundColor: colors.light,
              position: 'absolute',
              top: 110,
            }}>
            Lựa chọn nội dung
          </Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  </TouchableWithoutFeedback>
</Modal>;
{
  /* hiển thị cập nhật bài viết */
}
<Modal
  animationType="slide" // Kiểu animation khi Modal hiển thị
  transparent={true} // Làm nền phía sau Modal mờ đi
  visible={showEditPost} // hiển thị
  onRequestClose={() => {
    // Hành động khi Modal bị đóng
    setModalVisible(!showEditPost);
  }}>
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
        <View style={styles.contain_edit_post}>
          <View style={styles.head_edit}>
            <TouchableOpacity onPress={closeEdit}>
              <Text style={styles.text_head}>Hủy</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={postUpdate}>
              <Text style={styles.text_head}>Cập nhật</Text>
            </TouchableOpacity>
          </View>

          <View style={{marginBottom: 7, flexDirection: 'row'}}>
            {/* <Image
               style={{width: 50, height: 50, borderRadius: 50}}
               source={{
                 uri:
                   user.avatar === ''
                     ? 'https://i.pinimg.com/564x/25/ee/de/25eedef494e9b4ce02b14990c9b5db2d.jpg'
                     : user.avatar,
               }}
             /> */}
            <View>
              {/* <Text style={styles.text_name}>
                 {user.firstName} {user.lastName}
               </Text> */}
              <Text style={{marginLeft: 10, color: colors.gray}}>
                Bài viết đang ở chế độ công khai
              </Text>
            </View>
          </View>

          <TextInput
            style={styles.textInput}
            multiline={true}
            numberOfLines={3} // Số dòng hiển thị mặc định (có thể tuỳ chỉnh)
            value={contentPost}
            onChangeText={e => setContentPost(e)}
            placeholder="Hãy nhập nội dung tại đây..."
          />

          {/* hiển thị ảnh */}
          {postEdit != null && (
            <>
              <FlatList
                showsVerticalScrollIndicator={false}
                style={{width: '100%', minHeight: 90}}
                data={postEdit.medias}
                keyExtractor={(item, index) => index.toString()} // Đảm bảo mỗi ảnh có key duy nhất
                renderItem={({item, index}) => (
                  <View style={{marginBottom: 10, position: 'relative'}}>
                    <TouchableOpacity
                      style={styles.remove}
                      onPress={() => addIDImg(item.mediaId)}>
                      <Image
                        style={{width: 30, height: 30}}
                        source={{uri: icons.remove}}
                      />
                    </TouchableOpacity>
                    <Image style={styles.media} source={{uri: item.mediaUrl}} />
                  </View>
                )}
              />
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  </TouchableWithoutFeedback>
</Modal>;

{
  /* hiện thị binh luận */
}
<Modal
  animationType="slide"
  transparent={true} // Đặt transparent thành true để làm nền trong suốt
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}>
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
          <TouchableOpacity onPress={unpop}>
            <View style={{width: '100%', height: '20%'}}></View>
          </TouchableOpacity>

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
              <FlatList
                data={commentList}
                keyExtractor={item => item.idComment.toString()}
                renderItem={renderComment}
                nestedScrollEnabled={true}
                ListEmptyComponent={<Text>Chưa có bình luận!</Text>}
                contentContainerStyle={styles.contentContainer}
                style={{flex: 1}}
              />
            </View>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.input_cmt}>
                <TextInput
                  value={comment}
                  onChangeText={setComment}
                  placeholder="Type comment here..."
                  style={styles.textInput}
                />

                <TouchableOpacity onPress={createCmt} style={styles.send}>
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      transform: [{rotate: '270deg'}],
                      top: -1,
                    }}
                    source={{uri: icons.send_cmt}}
                  />
                </TouchableOpacity>

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
                    <TouchableOpacity onPress={() => setIdCommentParent(0)}>
                      <Image
                        style={{width: 20, height: 20, marginLeft: 10}}
                        source={{uri: icons.remove}}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  </TouchableWithoutFeedback>
</Modal>;
