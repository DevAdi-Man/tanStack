import { Icon } from '@/components/Icon';
import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';

export const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text>HomeScreen</Text>
            <Icon name='HouseIcon' size={28} color={"#2596be"}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"#ccc"
    }
})
