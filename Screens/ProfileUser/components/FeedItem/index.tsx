import React, { useState } from 'react';
import { Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { FeedItemDetail } from '../../type';
import { CommentIcon, HeartEmpty, HeartFill, IconComment, IconOption, IconSave } from '../../../../assets/SVG';
import colors from '../../../../assets/color/colors';
import { AppImage } from '../../../../Components';

interface FeedItemProps {
    data: FeedItemDetail;
};

const FeedItem: React.FC<FeedItemProps> = ({ data }) => {
    const { width } = Dimensions.get('window');
    const [like, setLike] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const countMedia = data.resourceList?.length;
    return <View style={styles.container}>
        <View style={styles.header}>
            <View style={styles.itemHeader}>
                <AppImage uri={data.avatar || ''} width={40} height={40} imageStyle={styles.avatar} style={{ marginRight: 5 }} />
                <View>
                    <Text style={styles.name}>{data.username}</Text>
                    <Text style={styles.time}>{data.time}</Text>
                </View>
            </View>
            <TouchableOpacity>
                <IconOption width={20} fill={colors.black} />
            </TouchableOpacity>
        </View>
        <Text numberOfLines={2} style={{ paddingHorizontal: 5 }}>{data.content}</Text>
        {
            countMedia !== 0 &&
            <View>
                <FlatList
                    data={data.resourceList}
                    style={[styles.viewMedia]}
                    nestedScrollEnabled={countMedia !== 0}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ height: width }}
                    horizontal
                    pagingEnabled
                    scrollEnabled={countMedia !== 0}
                    onScroll={(event) => {
                        const offsetX = event.nativeEvent.contentOffset.x;
                        const index = Math.round(offsetX / (width - 10));
                        setCurrentIndex(index);
                    }}
                    renderItem={({ item, index }) => (
                        <AppImage key={index} width={width - 10} height={width} uri={item} typeMode={'center'} style={{ backgroundColor: colors.dark }} />
                    )}
                />
                <View style={styles.countMedia}>
                    <Text style={{ color: colors.xamtrang, fontSize: 10, fontWeight: '500' }}> {currentIndex + 1}/{countMedia}</Text>
                </View>
            </View>
        }
        <View style={styles.actionBottom}>
            <TouchableOpacity
                onPress={() => { setLike(pre => !pre) }}
            >
                {
                    like ? <HeartFill height={28} /> : <HeartEmpty height={28} />
                }
            </TouchableOpacity>
            <TouchableOpacity>
                <IconComment height={35} />
            </TouchableOpacity>
            <TouchableOpacity>
                <IconSave height={28} />
            </TouchableOpacity>
        </View>
    </View>;
};
export default FeedItem;
