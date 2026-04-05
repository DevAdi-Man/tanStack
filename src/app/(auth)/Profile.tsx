import { AppButton } from '@/components';
import { ProfileScreenProps } from '@/types/router.type';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const ProfileScreen = () => {
    const { goBack } = useNavigation<ProfileScreenProps>()
    return (
        <View style={styles.container}>
            <Text>Profile</Text>
            <AppButton
                label='Home'
                onPress={() => goBack()}
                container={{
                    margin: 16,
                    marginHorizontal: 10
                }}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ccc"
    }
})

