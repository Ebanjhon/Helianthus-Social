import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, View, Dimensions, ScrollView, TouchableHighlight, TouchableHighlightComponent, TouchableHighlightBase, TouchableOpacity } from 'react-native';
import styles from './ProfileStyle';
import colors from '../../assets/color/colors';
import icons from '../../assets/iconApp/icons';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { UserContext } from '../../Configs/Context';

const ProfileUser = ({ navigation }) => {
    const [user, dispatchUser] = useContext(UserContext);
    const [image, setImage] = useState(null);

    const PostRoute = () => (
        <View style={styles.scene}>
            <Text>Image Tab</Text>
        </View>
    );

    const MediaRoute = () => (
        <View style={styles.scene}>
            <Text>Video Tab</Text>
        </View>
    );

    const LikeRoute = () => (
        <View style={styles.scene}>
            <Text>Like Tab</Text>
        </View>
    );

    const renderScene = SceneMap({
        post: PostRoute,
        media: MediaRoute,
        like: LikeRoute,
    });

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'post' },
        { key: 'media' },
        { key: 'like' },
    ]);

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: colors.gold }}
            style={{ backgroundColor: colors.white }}
            renderLabel={({ route, focused }) => {
                let iconUri;
                let iconColor = focused ? colors.gold : colors.black;

                switch (route.key) {
                    case 'post':
                        iconUri = icons.slide_menu;
                        break;
                    case 'media':
                        iconUri = icons.media;
                        break;
                    case 'like':
                        iconUri = icons.liked;
                        break;
                    default:
                        iconUri = 'https://example.com/path/to/default-icon.png';
                }

                return (
                    <Image
                        source={{ uri: iconUri }}
                        style={{ width: 30, height: 30, tintColor: iconColor }} // Thay đổi màu của biểu tượng
                    />
                );
            }}
            labelStyle={{ display: 'none' }}
        />
    );

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={styles.contai_avatar}>
                    <Image
                        style={styles.avatar}
                        source={{
                            uri: user.avatar === ""
                                ? 'https://i.pinimg.com/564x/25/ee/de/25eedef494e9b4ce02b14990c9b5db2d.jpg'
                                : user.avatar
                        }} />
                </View>

                <View style={styles.contai_name}>
                    <Text style={styles.full_name}>{user.firstName} {user.lastName}</Text>
                    <Text style={styles.user_name}>@{user.username}</Text>
                </View>

                <View style={styles.line_border} />
                <View style={styles.contai_folow}>
                    <View style={styles.contai_item_flow}>
                        <Text style={styles.title}>365</Text>
                        <Text style={styles.content}>Post</Text>
                    </View>

                    <View style={styles.contai_item_flow}>
                        <Text style={styles.title}>7M</Text>
                        <Text style={styles.content}>Follower</Text>
                    </View>

                    <View style={styles.contai_item_flow}>
                        <Text style={styles.title}>14</Text>
                        <Text style={styles.content}>Following</Text>
                    </View>
                </View>
                <TabView
                    style={{ width: '100%', minHeight: 600 }}
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: Dimensions.get('window').width }}
                    renderTabBar={renderTabBar}
                />
            </View>
        </ScrollView>
    );
}

export default ProfileUser;
