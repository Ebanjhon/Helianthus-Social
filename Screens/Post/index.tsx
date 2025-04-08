import React, { useContext, useRef, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './PostStyle';
import SlideUp from './SlideUp';
import colors from '../../assets/color/colors';
import Navigation from '../../Components/NavigationApp/Navigation';
import { UserContext } from '../../Configs/UserReducer';

type CreateFeedProps = {};

const CreateFeed: React.FC<CreateFeedProps> = ({ }) => {
    const [content, setContent] = React.useState('');
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user, dispatch } = useContext(UserContext);
    const [showEditor, setShowEditor] = useState(false);
    const [loadUpdate, setLoadUpdate] = useState(true);
    const [imageUri, setImageUri] = useState(null);
    const viewShotRef = useRef();
    const [typeEdit, setTypeEdit] = useState(null);
    return <View>
        <SlideUp>
            <View style={styles.head_post}>
                <TouchableOpacity onPress={() => Navigation.goBack()}>
                    {loadUpdate && <>
                        <Text style={{ fontSize: 18, fontWeight: '500', color: colors.dark }}>Hủy</Text>
                    </>}
                </TouchableOpacity>
                {loadUpdate ? (
                    <Text style={{ fontSize: 20, fontWeight: '500' }}>Tạo bài viết</Text>
                ) : (
                    <Text style={{ fontSize: 20, fontWeight: '500' }}>Vui lòng không thoát khỏi màn hình này!</Text>
                )}
                <TouchableOpacity onPress={createPost}>
                    {loadUpdate && <>
                        <Text style={{ fontSize: 18, fontWeight: '500', color: colors.dark }}>Đăng</Text>
                    </>}
                </TouchableOpacity>
            </View>
            <View style={styles.border_head} />

            <FlatList
                showsVerticalScrollIndicator={false}
                style={{ width: '100%', minHeight: 90 }}
                data={images}
                keyExtractor={(item, index) => index.toString()}  // Đảm bảo mỗi ảnh có key duy nhất
                renderItem={({ item, index }) => (
                    <View style={styles.media_contai}>
                        {/* hiện thị hình đã chọn tại đây */}
                        <Image
                            style={styles.media}
                            source={{ uri: item }}
                        />
                        {loadUpdate && <>
                            <TouchableOpacity style={styles.remove} onPress={() => removeImage(index)}>
                                <Image style={{ width: 30, height: 30 }} source={{ uri: icons.remove }} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => cropImage(item)}
                                style={styles.edit_crop_media}>
                                <Text style={{ fontSize: 18, fontWeight: '700', color: colors.xamtrang }}>Cắt</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => pick_edit_filter(item, 1)}
                                style={styles.edit_filter_media}>
                                <Text style={{ fontSize: 18, fontWeight: '700', color: colors.xamtrang }}>Bộ lọc</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => pick_edit_filter(item, 0)}
                                style={styles.edit_media}>
                                <Text style={{ fontSize: 18, fontWeight: '700', color: colors.xamtrang }}>điều chỉnh</Text>
                            </TouchableOpacity>
                        </>}
                    </View>
                )}
                ListEmptyComponent={
                    loading && (
                        <View>
                            <Text>Loading...</Text>
                        </View>)
                }
                ListHeaderComponent={
                    <>
                        <View style={{ marginBottom: 7, flexDirection: 'row' }}>
                            <Image
                                style={{ width: 50, height: 50, borderRadius: 50 }}

                                source={{
                                    uri: user.avatar === ''
                                        ? 'https://i.pinimg.com/564x/25/ee/de/25eedef494e9b4ce02b14990c9b5db2d.jpg'
                                        : user.avatar
                                }} />
                            <View>
                                <Text style={styles.text_name}>{user.firstName} {user.lastName}</Text>
                                <Text style={{ marginLeft: 10, color: colors.gray }}>Bài viết đang ở chế độ công khai</Text>
                            </View>
                        </View>
                        <View style={styles.content_post}>
                            <TextInput
                                style={styles.textInput}
                                multiline={true}
                                numberOfLines={3} // Số dòng hiển thị mặc định (có thể tuỳ chỉnh)
                                value={content}
                                onChangeText={(text) => setContent(text)}
                                placeholder="Hãy nhập nội dung tại đây..."
                            />
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            {/* <View style={styles.border_content} /> */}
                            <View style={styles.get_media}>
                                <TouchableOpacity
                                    onPress={openImageLibrary}
                                    style={styles.get_media_contain}>
                                    <Text style={styles.textv1}>Ảnh/video</Text>
                                    <Image
                                        style={{ width: 35, height: 35, tintColor: colors.xam }}
                                        source={{ uri: icons.image }} />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={openCamera}
                                    style={styles.get_media_contain}>
                                    <Text style={styles.textv1}>Chụp ảnh</Text>
                                    <Image
                                        style={{ width: 40, height: 40, tintColor: colors.xam }}
                                        source={{ uri: icons.camera }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
                }
            />
        </SlideUp >
    </View>;
};
export default CreateFeed;
