import { ReactNode } from 'react'
import { Pressable, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'

type AppButtonProps = {
    label: string,
    renderLeftIcon?: ReactNode,
    renderRightIcon?: ReactNode,
    container?: StyleProp<ViewStyle>,
    labelFontSize?: TextStyle['fontSize'],
    labelFontFamily?: TextStyle['fontFamily'],
    labelFontColor?: TextStyle['color']
    labelStyle?: TextStyle,
    disabled?: boolean
    onPress?: () => void
}

export const AppButton = ({
    label,
    renderLeftIcon,
    renderRightIcon,
    container,
    labelFontColor,
    labelFontSize,
    labelFontFamily,
    labelStyle,
    disabled,
    onPress,
}: AppButtonProps) => {
    return (
        <Pressable
            disabled={disabled}
            onPress={onPress}
            style={[styles.container, container, disabled && { opacity: 0.2 }]}>
            {renderLeftIcon}
            <Text style={[
                styles.label,
                {
                    fontSize: labelFontSize,
                    color: labelFontColor,
                    fontFamily: labelFontFamily
                },
                labelStyle
            ]}>
                {label}
            </Text>
            {renderRightIcon}
        </Pressable>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 16,
        borderColor: "white",
        justifyContent: "center",
        backgroundColor: "#99AD7A",
        paddingVertical: 8,
        alignSelf:"stretch",
        paddingHorizontal:16
    },
    label: {
        fontSize: 12,
        color: "white",
        textAlign: "center"
    }
})
