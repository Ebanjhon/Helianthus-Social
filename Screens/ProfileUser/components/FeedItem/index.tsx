import React, { useState } from 'react';
import { Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { HeartEmpty, HeartFill, IconComment, IconOption, IconSave } from '../../../../assets/SVG';
import colors from '../../../../assets/color/colors';
import { AppImage } from '../../../../Components';
import { TypeFeedItem } from '../../../../RTKQuery/Slides/types';
import { useLikeFeedMutation, useUnLikeFeedMutation } from '../../../../RTKQuery/Slides/slide';
import { formatTimeAgo } from '../../../Home/components/itemFeed/functions';
interface FeedItemProps {
    data: TypeFeedItem;
};

const FeedItem: React.FC<FeedItemProps> = ({ data }) => {
    const [fetchLikeFeed, { error: errorLike }] = useLikeFeedMutation();
    const [fetchUnLikeFeed, { error: errorUnLike }] = useUnLikeFeedMutation();
    const { width } = Dimensions.get('window');
    const [like, setLike] = useState(data.action.isLike);
    const [countLike, setCountLike] = useState(data.action.countLike);
    const [currentIndex, setCurrentIndex] = useState(0);
    const countMedia = data.resource.length;

    const handleLike = async () => {
        setLike(pre => !pre)
        if (like) {
            try {
                setCountLike(pre => pre - 1)
                await fetchUnLikeFeed({ feedId: data.feedId }).unwrap();
            } catch (error) {
                console.log('====================================');
                console.log(errorUnLike);
                console.log('====================================');
                setLike(pre => !pre)
                setCountLike(pre => pre + 1)
            }
        } else {
            setCountLike(pre => pre + 1)
            try {
                await fetchLikeFeed({ feedId: data.feedId }).unwrap();
            } catch (error) {
                setLike(pre => !pre)
                setCountLike(pre => pre - 1)
                console.log('====================================');
                console.log(errorLike);
                console.log('====================================');
            }
        }
    }
    return <View style={styles.container}>
        <View style={styles.header}>
            <View style={styles.itemHeader}>
                <AppImage uri={data.author.avatar || ''} width={40} height={40} imageStyle={styles.avatar} style={{ marginRight: 5 }} />
                <View>
                    <Text style={styles.name}>{data.author.username}</Text>
                    <Text style={styles.time}> {formatTimeAgo(data.data.createDay)}</Text>
                </View>
            </View>
            <TouchableOpacity>
                <IconOption width={20} fill={colors.black} />
            </TouchableOpacity>
        </View>
        <Text numberOfLines={2} style={{ paddingHorizontal: 5 }}>{data.data.content}</Text>
        {
            countMedia !== 0 &&
            <View>
                <FlatList
                    data={data.resource}
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
                        <AppImage key={index} width={width - 10} height={width} uri={item.url} typeMode={'center'} style={{ backgroundColor: colors.dark }} />
                    )}
                />
                <View style={styles.countMedia}>
                    <Text style={{ color: colors.xamtrang, fontSize: 10, fontWeight: '500' }}> {currentIndex + 1}/{countMedia}</Text>
                </View>
            </View>
        }
        <View style={styles.actionBottom}>
            <TouchableOpacity onPress={handleLike} style={{ flexDirection: 'row' }}>
                {like ? <HeartFill height={28} /> : <HeartEmpty height={28} />}
                <Text style={{ alignSelf: 'center', fontSize: 20 }}>{countLike}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <IconComment height={35} />
            </TouchableOpacity>
            <TouchableOpacity>
                <IconOption height={24} />
            </TouchableOpacity>
        </View>
    </View>;
};
export default FeedItem;
