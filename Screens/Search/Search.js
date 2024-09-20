import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import styles from "./SearchStyle";
import colors from "../../assets/color/colors";
import TabHeader from "../../Components/TabHeader";
import { useTabBar } from "../../Configs/TabBarContext";
const Search = () => {
    const { state, dispatch } = useTabBar();
    const title = "Tìm kiếm";
    const [text, setText] = useState('');

    const hideTabBar = () => {
        dispatch({ type: 'HIDE_TAB_BAR' });
    };

    const showTabBar = () => {
        dispatch({ type: 'SHOW_TAB_BAR' });
    };

    return (
        <View style={styles.container}>
            <TabHeader title={title} />
            <ScrollView style={{ width: '100%' }}>
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <View style={styles.contai_search}>
                        <TextInput
                            style={{ fontSize: 16 }}
                            placeholder="Tìm kiếm..."
                            multiline={true} // Cho phép nhập nhiều dòng
                        />
                    </View>
                </View>

                <View style={styles.item_notifi}>
                    <Image
                        style={styles.image_avatar}
                        source={{ uri: 'https://i.pinimg.com/564x/7d/2d/c5/7d2dc513fc506bd9ad6cf3847b7326c2.jpg' }} />
                    <View>
                        <Text style={styles.fullname}>YJhone EBan</Text>
                        <Text>@jhonEban - Có 100 người theo giỏi</Text>
                    </View>
                </View>

            </ScrollView>
        </View>
    )
};


export default Search
