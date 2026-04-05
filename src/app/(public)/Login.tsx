import { AppButton, AppText, AppTextInput } from '@/components';
import { useLoginMutation } from '@/hook/mutate/auth';
import { useFormData } from '@/hook/useformHook';
import { refreshToken } from '@/lib/api';
import useUserStore from '@/storage/useUserStore';
import { LoginRequest, LoginResponse } from '@/types/auth.type';
import { isRequired, validateFormSchema } from '@/util/validator';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';


export const LoginScreen = () => {
    const { mutate, isPending } = useLoginMutation();
    const { setToken, setRefreshToken } = useUserStore()

    const initialValues: LoginRequest = {
        username: "",
        password: ""
    }
    const buildSchema = (v: LoginRequest) => [
        {
            field: 'username',
            value: v.username,
            validators: [(x: string) => isRequired(x, 'username required', true)],
        },
        {
            field: 'password',
            value: v.password,
            validators: [(x: string) => isRequired(x, "password", true)]
        }
    ]

    const { errors, value, handleSubmit, handlechanges, setValues } = useFormData({
        initialValues,
        validate: (value: LoginRequest) => validateFormSchema(buildSchema(value))
    })

    useEffect(() => {
        console.log("🟢 Login Screen is MOUNTED in memory");

        // The return function ONLY runs when the component is destroyed
        return () => {
            console.log("🔴 Login Screen is COMPLETELY CLEARED from the stack!");
        };
    }, [])
    const onLogin = async (data: LoginRequest) => {
        console.log("--->", data)
        mutate(data)
    }
    return (
        <View style={styles.container}>
            <AppText
                title='Login'
                textFontSize={32}
                textColor={"white"}
            />
            <AppTextInput
                label='Email'
                labelFontColor={"white"}
                placeHolder='Enter your email'
                value={value.username}
                onChangeText={(text: string) => handlechanges('username', text)}
                error={errors.username}
                editabel={!isPending}
                container={{
                    marginBottom: 4,
                    marginTop: 10
                }}
            />
            <AppTextInput
                label='Password'
                labelFontColor={"white"}
                placeHolder='Enter your password'
                value={value.password}
                onChangeText={(text: string) => handlechanges('password', text)}
                error={errors.password}
                editabel={!isPending}
                container={{
                    marginBottom: 4,
                    marginTop: 10
                }}
            />

            <AppButton
                label='Submit'
                disabled={isPending}
                labelFontColor={"white"}
                container={[styles.buttonContainer, isPending && { backgroundColor: '#666' }]}
                onPress={() => handleSubmit(onLogin)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
        paddingHorizontal: 16
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 16,
        right: 16
    }
})
