import React, { forwardRef, useCallback, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Dimensions, FlatList, NativeScrollEvent, NativeSyntheticEvent, Pressable, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import HeaderApp from "../../Components/HeaderApp/HeaderApp";
import colors from "../../assets/color/colors";
import { AppImage } from "../../Components";
import styles from "./styles";
import { MyFeedMasonry, MyLikeMasonry, MyMediaMasonry, ViewHeader } from "./components";
import { IconFavorite, IconFeed, IconMedia } from "../../assets/SVG";
import { useFocusEffect } from "@react-navigation/native";
import { useGetUserInfoMutation } from "../../RTKQuery/Slides/slide";
import { UserContext } from "../../Configs/UserReducer";
import { ScreenProps } from "../../Components/NavigationApp/type";
import { MyFeedRef } from "./components/myFeeds";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    useSharedValue,
    withSpring,
    runOnJS,
    withDecay,
    clamp,
    useDerivedValue,
    useAnimatedStyle,
    useAnimatedScrollHandler,
    useAnimatedReaction,
} from 'react-native-reanimated';
const { width, height } = Dimensions.get('window');
const ProfileUser: React.FC<ScreenProps<'Profile'>> = ({ navigation }) => {
    const { user, dispatch: userDispatch } = useContext(UserContext);
    const [fetchData, { data, isLoading, error }] = useGetUserInfoMutation();
    const tabIndexView = useRef<number>(0);
    const tabbarRef = useRef<TabbarRef | null>(null);
    const feedRef = useRef<MyFeedRef>(null);
    const mediaRef = useRef<MyFeedRef>(null);
    const likeRef = useRef<MyFeedRef>(null);
    const translateY = useSharedValue(0);
    const previousTranslationY = useSharedValue(0);

    const handeldFetchData = async () => {
        await fetchData({ username: user?.username || '' }).unwrap();
    };

    useFocusEffect(
        useCallback(() => {
            // console.log('Screen is focused');
            handeldFetchData();
            return () => {
                // console.log('Screen is unfocused');
            };
        }, [])
    );

    const handleHorizontalScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / width);
        tabIndexView.current = index
    };

    const handleScrollToIndex = (index: number) => {
    }

    const syncScroll = (y: number) => {
        switch (tabIndexView.current) {
            case 0:
                feedRef.current?.setOffsetY(y);
                break;
            case 1:
                mediaRef.current?.setOffsetY(y);
                break;
            case 2:
                likeRef.current?.setOffsetY(y);
                break;
            default:
        }
    };

    const syncScrollOther = (y: number) => {
        switch (tabIndexView.current) {
            case 0:
                mediaRef.current?.setOffsetY(y);
                likeRef.current?.setOffsetY(y);
                break;
            case 1:
                feedRef.current?.setOffsetY(y);
                likeRef.current?.setOffsetY(y);
                break;
            case 2:
                feedRef.current?.setOffsetY(y);
                mediaRef.current?.setOffsetY(y);
                break;
            default:
        }
    };

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: -translateY.value }],
    }));

    const panGesture = Gesture.Pan()
        .onStart(() => {
            previousTranslationY.value = -translateY.value;
        })
        .onUpdate((e) => {
            const newTranslateY = previousTranslationY.value + e.translationY;
            translateY.value = clamp(-newTranslateY, 0, 400);
            runOnJS(syncScroll)(translateY.value);
        }).onEnd(() => {
            runOnJS(syncScrollOther)(translateY.value);
        })

    const handleScroll = useAnimatedScrollHandler({
        onScroll: (event) => {
            translateY.value = clamp(event.contentOffset.y, 0, 400);
        },
    });

    const onScrollEndFlatlist = () => {
        runOnJS(syncScrollOther)(translateY.value);
    }

    return (
        <SafeAreaView style={styles.container}>
            <HeaderApp
                style={{ zIndex: 2 }}
                title={data?.username}
                bgColor={colors.trang}
                isShowleftAction
                isShowrightAction={!data?.curentUser}
                isButtonHead
                onPrees={() => { navigation.navigate('Setting') }}
            />
            {/* new */}
            <GestureDetector gesture={panGesture}>
                <Animated.View style={[{ zIndex: 1 }, animatedStyle]}>
                    <ViewHeader data={data} />
                    <TabbarView ref={tabbarRef} onScrollTab={handleScrollToIndex} />
                </Animated.View>
            </GestureDetector>
            <ScrollView
                style={styles.scrollViewTab}
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                onScroll={handleHorizontalScroll}
                scrollEventThrottle={16}
            >
                <MyFeedMasonry
                    ref={feedRef}
                    onScroll={handleScroll}
                    onScrollEnd={onScrollEndFlatlist}
                />
                <MyFeedMasonry
                    ref={mediaRef}
                    onScroll={handleScroll}
                    onScrollEnd={onScrollEndFlatlist}
                />
                <MyFeedMasonry
                    ref={likeRef}
                    onScroll={handleScroll}
                    onScrollEnd={onScrollEndFlatlist}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

export default ProfileUser;
interface tabViewProps {
    isAllowScroll: boolean;
}

const data = [
    {
        id: 1,
        title: "Tab 1",
        icon: <IconFeed width={25} fill={colors.danger} />
    },
    {
        id: 2,
        title: "Tab 2",
        icon: <IconMedia width={25} fill="#fff" />
    },
    {
        id: 3,
        title: "Tab 3",
        icon: <IconFavorite width={25} fill="#fff" />
    }
]

const TabView: React.FC<tabViewProps> = ({ isAllowScroll }) => {
    const flatListRef = useRef<FlatList>(null);
    const tabbarRef = useRef<TabbarRef | null>(null);
    const handleScroll = (event: { nativeEvent: { contentOffset: { x: number; }; }; }) => {
        const tabIndex = Math.round(event.nativeEvent.contentOffset.x / width);
        if (tabbarRef.current?.setTabIndex) {
            tabbarRef.current.setTabIndex(tabIndex);
        }
    }

    const handleScrollToIndex = (index: number) => {
        flatListRef.current?.scrollToIndex({ index, animated: true });
    }
    return (
        <>
            <TabbarView ref={tabbarRef} onScrollTab={handleScrollToIndex} />
            <FlatList
                ref={flatListRef}
                style={[{ width: width, height: height - 60 }]}
                horizontal
                keyboardShouldPersistTaps="handled"
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                data={data}
                onScroll={handleScroll}
                renderItem={({ item, index }) => {
                    const mansonry = () => {
                        switch (item.id) {
                            case 1:
                                return (
                                    <View
                                        key={index}
                                        style={[{ width: width }, styles.tabItem]}>
                                        {/* <MyFeedMasonry isEnabledScroll={isAllowScroll} /> */}
                                    </View>
                                );
                            case 2:
                                return (
                                    <View
                                        key={index}
                                        style={[{ width: width }, styles.tabItem]}>
                                        <MyMediaMasonry isEnabledScroll={isAllowScroll} />
                                    </View>
                                );
                            case 3:
                                return (
                                    <View
                                        key={index}
                                        style={[{ width: width }, styles.tabItem]}>
                                        <MyLikeMasonry isEnabledScroll={isAllowScroll} />
                                    </View>
                                );
                            default:
                                return <></>;
                        }
                    };
                    return mansonry();
                }}

            />
        </>
    )
}

interface TabbarRef {
    setTabIndex?: (index: number) => void;
    getTabIndex?: () => number;
    onScrollTab: (index: number) => void;
}

const TabbarView = forwardRef((props: TabbarRef, ref) => {
    const [tabIndex, setTabIndex] = useState(0);
    useImperativeHandle(ref, () => ({
        setTabIndex: (index: number) => {
            setTabIndex(index);
        },
        getTabIndex: tabIndex,
    }));
    return (
        <View
            style={[styles.tabbar]}>
            {data.map((item, index) => (
                <TouchableOpacity
                    onPress={() => {
                        props.onScrollTab(index);
                    }}
                    style={[styles.btnTabbar]}>
                    {React.cloneElement(item.icon, {
                        fill: tabIndex === index ? colors.gold2 : colors.gray,
                    })}
                </TouchableOpacity>
            ))}
        </View>
    )
});

