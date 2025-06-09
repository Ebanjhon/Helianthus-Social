import React, { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import { ActivityIndicator, Dimensions, NativeScrollEvent, NativeSyntheticEvent, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import HeaderApp from "../../Components/HeaderApp/HeaderApp";
import colors from "../../assets/color/colors";
import styles from "./styles";
import { MyFeedMasonry, MyMediaList, ViewHeader } from "./components";
import { IconFavorite, IconFeed, IconMedia } from "../../assets/SVG";
import { useGetUserInfoMutation } from "../../RTKQuery/Slides/slide";
import { ScreenProps } from "../../Components/NavigationApp/type";
import { MyFeedRef } from "./components/myFeeds";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    useSharedValue,
    runOnJS,
    clamp,
    useAnimatedStyle,
    useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { MyMediaRef } from "./components/myMediaList";
import { UserContext } from "../../Configs/UserReducer";
const { width } = Dimensions.get('window');
const dataTab = [
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
];
const ProfileUser: React.FC<ScreenProps<'Profile'>> = ({ navigation, route }) => {
    const { usernameProps } = route.params;
    const { user, dispatch } = useContext(UserContext);
    const [fetchData, { data, isLoading }] = useGetUserInfoMutation();
    const tabIndexView = useRef<number>(0);
    const scrollViewRef = useRef<ScrollView>(null);
    const tabbarRef = useRef<TabbarRef | null>(null);
    const feedRef = useRef<MyFeedRef>(null);
    const mediaRef = useRef<MyMediaRef>(null);
    const likeRef = useRef<MyFeedRef>(null);
    const translateY = useSharedValue(0);
    const previousTranslationY = useSharedValue(0);

    const handeldFetchData = async () => {
        await fetchData({ username: usernameProps || '' }).unwrap();
    };

    useEffect(() => {
        handeldFetchData();
    }, [usernameProps])

    const handleHorizontalScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / width);
        tabIndexView.current = index;
        if (tabbarRef.current?.setTabIndex) {
            tabbarRef.current.setTabIndex(index);
        }
    };

    const handleScrollToIndex = (index: number) => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo(index * width)
        }
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
            {
                isLoading ?
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <ActivityIndicator size={'large'} color={colors.gold2} />
                    </View> : <>
                        <HeaderApp
                            style={{ zIndex: 2 }}
                            title={usernameProps}
                            bgColor={colors.trang}
                            isShowleftAction
                            isShowrightAction={data?.userId === user?.userId}
                            // isShowrightAction={true}
                            isButtonHead
                            onPrees={() => { navigation.navigate('Setting') }}
                        />
                        {/* new */}
                        <GestureDetector gesture={panGesture}>
                            <Animated.View style={[{ zIndex: 1 }, animatedStyle]}>
                                <ViewHeader data={data} isLoading={isLoading} />
                                <TabbarView ref={tabbarRef} onScrollTab={handleScrollToIndex} />
                            </Animated.View>
                        </GestureDetector>
                        <ScrollView
                            ref={scrollViewRef}
                            style={styles.scrollViewTab}
                            pagingEnabled
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            onScroll={handleHorizontalScroll}
                            scrollEventThrottle={16}
                        >
                            <MyFeedMasonry
                                authorId={data?.userId || ''}
                                ref={feedRef}
                                onScroll={handleScroll}
                                onScrollEnd={onScrollEndFlatlist}
                            />
                            <MyMediaList
                                authorId={data?.userId || ''}
                                ref={mediaRef}
                                onScroll={handleScroll}
                                onScrollEnd={onScrollEndFlatlist}
                            />
                            <MyFeedMasonry
                                authorId={''}
                                ref={likeRef}
                                onScroll={handleScroll}
                                onScrollEnd={onScrollEndFlatlist}
                            />
                        </ScrollView>
                    </>
            }

        </SafeAreaView>
    )
}

export default ProfileUser;

interface tabViewProps {
    isAllowScroll: boolean;
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
            {dataTab.map((item, index) => (
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

