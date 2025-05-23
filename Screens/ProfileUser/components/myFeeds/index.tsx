import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import { ActivityIndicator, Dimensions, FlatList, NativeScrollEvent, NativeSyntheticEvent, RefreshControl, Text, View, } from "react-native"
import styles from "./styles"
import Animated, { useSharedValue } from "react-native-reanimated"
import { useLazyGetListFeedProfileQuery } from "../../../../RTKQuery/Slides/slide"
import { TypeFeedItem } from "../../../../RTKQuery/Slides/types"
import FeedItem from "../FeedItem"
import colors from "../../../../assets/color/colors"
interface MyFeedProps {
    authorId: string
    onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    onScrollEnd?: () => void;
}

export interface MyFeedRef {
    setOffsetY: (y: number) => void;
}

const { width, height } = Dimensions.get('window');
const MyFeedMasonry = forwardRef<MyFeedRef, MyFeedProps>((props, ref) => {
    const { authorId } = props;
    const [trigger, { isLoading }] = useLazyGetListFeedProfileQuery();
    const flatListRef = useRef<FlatList>(null);
    const scrollY = useSharedValue(0);
    const pageRef = useRef<number>(0);
    const [listFeed, setListFeed] = useState<TypeFeedItem[]>([]);
    useImperativeHandle(ref, () => ({
        setOffsetY: (y: number) => {
            if (!(scrollY.value == 400 && y === 400)) {
                flatListRef.current?.scrollToOffset({ offset: y, animated: false });
                scrollY.value = y;
            }
        },
    }));

    const fetchData = async () => {
        if (pageRef.current !== -1) {
            try {
                const response = await trigger({ authorId: authorId, page: pageRef.current }).unwrap();
                if (response.length !== 0) {
                    setListFeed(items => [...items, ...response]);
                    pageRef.current += 1;
                } else {
                    pageRef.current = -1;
                }
            } catch (err) {
                console.error('❌ Error:', err);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, [authorId]);

    return (
        <Animated.FlatList
            ref={flatListRef}
            nestedScrollEnabled
            style={[styles.container, { width: width }]}
            contentContainerStyle={[styles.contentItem, listFeed.length === 0 && { height: height + 500 }]}
            showsHorizontalScrollIndicator={false}
            data={listFeed}
            onEndReached={fetchData}
            onEndReachedThreshold={0.9}
            refreshControl={
                <RefreshControl
                    refreshing={isLoading}
                    onRefresh={() => {
                        setListFeed([]);
                        pageRef.current = 0;
                        fetchData();
                    }}
                    tintColor="#fcb900"
                    colors={['#fcb900']}
                    progressViewOffset={500}
                />
            }
            onScroll={props.onScroll}
            onMomentumScrollEnd={props.onScrollEnd}
            scrollEventThrottle={16}
            renderItem={({ item, index }) => (
                <FeedItem data={item} key={index} />
            )}
            ListEmptyComponent={(
                <View style={{ paddingTop: 90 }}>
                    {isLoading ?
                        <ActivityIndicator size={'large'} color={colors.gold2} />
                        :
                        <Text style={{ alignSelf: 'center', fontSize: 18 }}>Không có dữ liệu</Text>}
                </View>
            )}
        />
    )
});

export default MyFeedMasonry;