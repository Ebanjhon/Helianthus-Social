import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "./NotifiStyle";
import TabHeader from "../../Components/TabHeader";
import { BlurView } from "@react-native-community/blur";

const Notification = () => {
    const title = 'Thông báo';
    return (
        <SafeAreaView style={styles.container}>
            <TabHeader title={title} />
            <ScrollView>
                <View style={styles.item_contai}>
                    <TouchableOpacity style={styles.item_notifi}>

                    </TouchableOpacity>

                    <BlurView
                        style={styles.absolute}
                        blurType="light"
                        blurAmount={2}
                        reducedTransparencyFallbackColor="white"
                    >
                    </BlurView>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};


export default Notification
