import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import { ActivityIndicator, Dimensions, FlatList, NativeScrollEvent, NativeSyntheticEvent, RefreshControl, Text, TouchableOpacity, View, } from "react-native"
import styles from "./styles"
import Animated, { useSharedValue } from "react-native-reanimated"
import { useGetListMediaProfileMutation } from "../../../../RTKQuery/Slides/slide"
import { AppImage } from "../../../../Components"
import { MediaItem } from "../../../../RTKQuery/Slides/types"
import colors from "../../../../assets/color/colors"
interface MyMediaProps {
    authorId: string
    onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    onScrollEnd?: () => void;
}

export interface MyMediaRef {
    setOffsetY: (y: number) => void;
}

const { width, height } = Dimensions.get('window');
const MyMediaList = forwardRef<MyMediaRef, MyMediaProps>((props, ref) => {
    const { authorId } = props;
    const [fetchData, { isLoading }] = useGetListMediaProfileMutation();
    const flatListRef = useRef<FlatList>(null);
    const pageRef = useRef<number>(0);
    const scrollY = useSharedValue(0);
    const [listMedia, setListMedia] = useState<MediaItem[]>([]);

    useImperativeHandle(ref, () => ({
        setOffsetY: (y: number) => {
            if (!(scrollY.value == 400 && y === 400)) {
                flatListRef.current?.scrollToOffset({ offset: y, animated: false });
                scrollY.value = y;
            }
        },
    }));

    const getDataMedia = async () => {
        if (pageRef.current !== -1) {
            const result = await fetchData({ authorId: authorId, page: pageRef.current }).unwrap();
            if (result.length !== 0) {
                setListMedia(pre => [...pre, ...result]);
                pageRef.current += 1;
            } else {
                pageRef.current = -1;
            }
        }
    };

    useEffect(() => {
        getDataMedia();
    }, [])

    return (
        <Animated.FlatList
            ref={flatListRef}
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
            style={[styles.container, { width: width }]}
            contentContainerStyle={[styles.contentItem, { minHeight: height + 500 }]}
            showsHorizontalScrollIndicator={false}
            data={listMedia}
            numColumns={3}
            onEndReached={getDataMedia}
            onEndReachedThreshold={0.9}
            refreshing={isLoading}
            refreshControl={
                <RefreshControl
                    refreshing={isLoading}
                    onRefresh={() => {
                        setListMedia([]);
                        pageRef.current = 0;
                        getDataMedia();
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
                <TouchableOpacity key={index} style={[styles.itemMedia, { width: width / 3, height: (width / 9) * 4 }]}>
                    <AppImage uri={item.url} width={'100%'} height={'100%'} />
                </TouchableOpacity >
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

export default MyMediaList;