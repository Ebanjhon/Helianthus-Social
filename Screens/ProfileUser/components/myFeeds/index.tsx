import React, { forwardRef, useEffect, useRef } from "react"
import { FlatList, Text, TouchableOpacity, View } from "react-native"
import styles from "./styles"
import { dataFeedItem } from "../../data"
import FeedItem from "../FeedItem"

interface myFeedProps {
    isEnabledScroll: boolean
}


const MyFeedMasonry = forwardRef((props: myFeedProps, ref) => {
    const flatListRef = useRef<FlatList>(null);
    useEffect(() => {
        if (!props.isEnabledScroll) {
            flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
        }
    }, [props.isEnabledScroll])
    return (
        <FlatList
            ref={flatListRef}
            nestedScrollEnabled
            style={styles.container}
            contentContainerStyle={styles.contentItem}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={props.isEnabledScroll}
            data={dataFeedItem}
            renderItem={({ item, index }) => (
                <FeedItem data={item} key={index} />
            )}
        />
    )
});

export default MyFeedMasonry;