import { View, Text } from "react-native";
import React from "react";

type ItemFeedProps = {
    title: string;
    description: string;
};

const ItemFeed: React.FC<ItemFeedProps> = ({ title, description }) => {
    return (
        <View style={{ padding: 10, borderBottomWidth: 1, borderColor: "#ddd" }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{title}</Text>
            <Text style={{ fontSize: 14, color: "#666" }}>{description}</Text>
        </View>
    );
};

export default ItemFeed;
