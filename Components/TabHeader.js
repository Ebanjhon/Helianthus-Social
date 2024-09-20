import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import colors from '../assets/color/colors';

const TabHeader = ({ title }) => {
    return (
        <View style={styles.contai_header}>
            <Text style={{ width: 50 }}></Text>
            <Text style={styles.title}> {title} </Text>
            <Text style={{ width: 50 }}></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    contai_header: {
        width: '100%',
        height: 50,
        backgroundColor: colors.white,
        justifyContent: 'space-between',
        flexDirection: 'row',
        elevation: 5,
        alignItems: 'center'
    },
    iconStyle: {
        width: 22,
        height: 22,
        tintColor: colors.black,
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        color: colors.black
    }
});


export default TabHeader