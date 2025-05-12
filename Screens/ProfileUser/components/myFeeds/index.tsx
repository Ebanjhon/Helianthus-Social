import React, { forwardRef, useImperativeHandle, useRef } from "react"
import { Dimensions, FlatList, NativeScrollEvent, NativeSyntheticEvent, } from "react-native"
import styles from "./styles"
import { dataFeedItem } from "../../data"
import FeedItem from "../FeedItem"
import Animated, { useSharedValue } from "react-native-reanimated"
interface MyFeedProps {
    onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    onScrollEnd?: () => void;
}

export interface MyFeedRef {
    setOffsetY: (y: number) => void;
}

const { width } = Dimensions.get('window');
const MyFeedMasonry = forwardRef<MyFeedRef, MyFeedProps>((props, ref) => {
    const flatListRef = useRef<FlatList>(null);
    const scrollY = useSharedValue(0);
    const handleScroll = props.onScroll;
    useImperativeHandle(ref, () => ({
        setOffsetY: (y: number) => {
            if (!(scrollY.value > 400 && y === 400)) {
                flatListRef.current?.scrollToOffset({ offset: y, animated: false });
            }
        },
    }));

    return (
        <Animated.FlatList
            ref={flatListRef}
            nestedScrollEnabled
            style={[styles.container, { width: width, paddingTop: 400 + 100 }]}
            contentContainerStyle={styles.contentItem}
            showsHorizontalScrollIndicator={false}
            data={dataFeedItem}
            onScroll={(e) => {
                handleScroll;
                scrollY.value = e.nativeEvent.contentOffset.y;
            }}
            onMomentumScrollEnd={props.onScrollEnd}
            scrollEventThrottle={16}
            renderItem={({ item, index }) => (
                <FeedItem data={item} key={index} />
            )}
        />
    )
});

export default MyFeedMasonry;