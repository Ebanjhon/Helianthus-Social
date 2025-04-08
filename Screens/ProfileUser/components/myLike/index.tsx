import React, { forwardRef, useEffect, useRef } from "react"
import { FlatList, View } from "react-native"
import styles from "./styles"

interface myLikeProps {
    isEnabledScroll: boolean
}


const data = [1, 2, 3]
const MyLikeMasonry = forwardRef((props: myLikeProps, ref) => {
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
            data={data}
            renderItem={() => (
                <View style={styles.item}>

                </View>
            )}
        />
    )
});

export default MyLikeMasonry;