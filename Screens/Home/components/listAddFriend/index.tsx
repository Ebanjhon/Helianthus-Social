import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from './styles';
import { AppImage } from '../../../../Components';
import colors from '../../../../assets/color/colors';

type ListItemAddFriendProps = {
    data: any
};

const ListItemAddFriend: React.FC<ListItemAddFriendProps> = ({ data }) => {
    const user = [1, 2, 3, 4, 5, 6, 7, 8, 90, 9, 0];
    return (
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10, gap: 5 }}
            style={styles.container}>
            {user.map((p) => (
                <View
                    style={styles.itemUser}>
                    <Text style={styles.newUser}>New account</Text>
                    <AppImage
                        imageStyle={{ borderRadius: 90, marginRight: 5 }}
                        uri='https://i.pinimg.com/736x/6d/97/c8/6d97c8b8c472119808c7691caff600ed.jpg'
                        width={80}
                        height={80}
                    />
                    <Text style={{ color: colors.black, fontWeight: '600' }}>David</Text>
                    <TouchableOpacity style={{ backgroundColor: colors.gray, paddingHorizontal: 8, borderRadius: 10 }}>
                        <Text style={{ color: colors.white }}>Follow</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    )
}




export default ListItemAddFriend