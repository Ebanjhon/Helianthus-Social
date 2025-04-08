import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Dimensions, FlatList, Pressable, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import HeaderApp from "../../Components/HeaderApp/HeaderApp";
import colors from "../../assets/color/colors";
import { AppImage } from "../../Components";
import styles from "./styles";
import { MyFeedMasonry, MyLikeMasonry, MyMediaMasonry } from "./components";
import { IconFavorite, IconFeed, IconMedia } from "../../assets/SVG";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get('window');
interface profileProps {
}
const ProfileUser: React.FC<profileProps> = ({ }) => {
    const navigation = useNavigation();
    const flatListRef = useRef<FlatList>(null);
    const [isAllowScroll, setIsAllowScroll] = useState(false);
    const handleScroll = (event: { nativeEvent: { contentOffset: { y: number; }; }; }) => {
        const contentOffsetY = event.nativeEvent.contentOffset.y;
        if (contentOffsetY >= 450 && !isAllowScroll) {
            setIsAllowScroll(pre => !pre)
        } else if (contentOffsetY <= 455 && isAllowScroll) {
            setIsAllowScroll(pre => !pre)
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <HeaderApp
                title={"Eban Jhon Y"}
                bgColor={colors.trang}
                isShowleftAction isShowrightAction
                isButtonHead
                onPrees={() => { navigation.navigate('Setting') }}
            />
            <FlatList
                ref={flatListRef}
                scrollEnabled={true}
                data={[1]}
                stickyHeaderIndices={[1]}
                onScroll={handleScroll}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <>
                        <AppImage uri={"https://i.pinimg.com/736x/43/61/09/4361091dd491bacbbcdbaa0be7a2d2be.jpg"} width={"100%"} height={230} imageStyle={styles.cover} />
                        <AppImage uri="https://i.pinimg.com/736x/a4/1d/5b/a41d5bcc7240df30b9d69219bd8cb021.jpg" width={100} height={100} imageStyle={styles.avatar} style={styles.avtView} />
                        <Text style={styles.nameText}>Y JHON EBAN</Text>
                        <TouchableOpacity style={styles.btnFollow}>
                            <Text style={{ color: colors.white }}>FOLLOW</Text>
                        </TouchableOpacity>
                        <View style={styles.thumnable}>
                            <Text style={styles.bioText}>I'm frontend mobile dev </Text>
                            <View style={styles.inforPrifile}>
                                <Pressable style={styles.itemInfor}>
                                    <Text style={styles.textNum}>20</Text>
                                    <Text style={styles.textTitleNum}>Followers</Text>
                                </Pressable>
                                <Pressable style={styles.itemInfor}>
                                    <Text style={styles.textNum}>20</Text>
                                    <Text style={styles.textTitleNum}>posts</Text>
                                </Pressable>
                                <Pressable style={styles.itemInfor}>
                                    <Text style={styles.textNum}>120</Text>
                                    <Text style={styles.textTitleNum}>Following</Text>
                                </Pressable>
                            </View>
                        </View>
                    </>
                }
                renderItem={() => (
                    <TabView isAllowScroll={isAllowScroll} />
                )}
            />
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
                                        <MyFeedMasonry isEnabledScroll={isAllowScroll} />
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