import React, { forwardRef, useEffect, useRef } from "react"
import { FlatList, View } from "react-native"
import styles from "./styles"

interface myMediaProps {
    isEnabledScroll: boolean
}


const data = [1, 2, 3]
const MyMediaMasonry = forwardRef((props: myMediaProps, ref) => {
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
            scrollEnabled={props.isEnabledScroll}
            data={data}
            renderItem={() => (
                <View style={styles.item}>

                </View>
            )}
        />
    )
});

export default MyMediaMasonry;