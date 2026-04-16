import { ReactNode } from 'react'
import { View, Text, StyleSheet, TextInput, ViewStyle, TextStyle, StyleProp } from 'react-native'

type AppTextInputProp = {
    label?: string,
    sublabel?: string,
    labelContainer?: StyleProp<ViewStyle>,
    labelStyle?: StyleProp<TextStyle>,
    labelfontSize?: TextStyle["fontSize"],
    labelFontFamily?: TextStyle["fontFamily"]
    labelFontColor?: TextStyle["color"],
    sublabelStyle?: StyleProp<TextStyle>,
    sublabelfontSize?: TextStyle["fontSize"],
    sublabelFontFamily?: TextStyle["fontFamily"]
    sublabelFontColor?: TextStyle["color"],
    placeHolder?: string,
    placeholderTextColor?: string,
    value?: string,
    onChangeText?: (text: string) => void,
    multiline?: boolean,
    numberOfLines?: number,
    inputStyle?: StyleProp<ViewStyle> | StyleProp<TextStyle>,
    inputContainerStyle?: StyleProp<ViewStyle>,
    error?: string,
    errorfontSize?: TextStyle["fontSize"],
    errorFontFamily?: TextStyle["fontFamily"],
    renderPrefix?: ReactNode,
    renderSuffixIcon?: ReactNode,
    renderPrefixIcon?: ReactNode,
    container?: StyleProp<ViewStyle>,
    editable?: boolean
}

export const AppTextInput = ({
    error,
    editable,
    errorFontFamily,
    errorfontSize,
    value,
    onChangeText,
    label,
    labelfontSize,
    labelFontColor,
    labelFontFamily,
    sublabel,
    sublabelfontSize,
    sublabelFontColor,
    sublabelFontFamily,
    labelContainer,
    labelStyle,
    sublabelStyle,
    inputStyle,
    inputContainerStyle,
    renderPrefix,
    renderPrefixIcon,
    renderSuffixIcon,
    container,
    placeHolder = "",
    placeholderTextColor = "#ccc",
    multiline = false,
    numberOfLines = 1
}: AppTextInputProp) => {
    return (
        <View style={[styles.container, container]}>
            {/* title lable and sub label  */}
            {
                (label || sublabel) && (
                    <View style={[styles.labelContainer, labelContainer]}>
                        {
                            label && (
                                <Text style={[styles.label, labelStyle,
                                {
                                    fontFamily: labelFontFamily,
                                    fontSize: labelfontSize,
                                    color: labelFontColor
                                }]}>{label}</Text>
                            )
                        }
                        {
                            sublabel && (
                                <Text style={[
                                    styles.sublabel,
                                    sublabelStyle,
                                    {
                                        fontSize: sublabelfontSize,
                                        fontFamily: sublabelFontFamily,
                                        color: sublabelFontColor
                                    }
                                ]}>{sublabel}</Text>
                            )
                        }
                    </View>
                )
            }

            {/* TextInput here  */}
            <View style={[
                styles.inputContainer,
                inputContainerStyle,
                error ? { borderColor: "red" } : {}
            ]}>
                {renderPrefix}
                {renderPrefixIcon}
                <TextInput
                    placeholder={placeHolder}
                    placeholderTextColor={placeholderTextColor}
                    value={value}
                    onChangeText={onChangeText}
                    multiline={multiline}
                    editable={editable}
                    numberOfLines={numberOfLines}
                    style={[
                        styles.input,
                        inputStyle,
                        multiline && { textAlignVertical: 'top', minHeight: 80 }
                    ]}
                />
                {renderSuffixIcon}
            </View>

            {/* Error here  */}
            {
                error && (
                    <Text style={[styles.error, {
                        fontFamily: errorFontFamily,
                        fontSize: errorfontSize
                    }]}>{error}</Text>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    labelContainer: {
        flexDirection: "column",
        alignItems: "flex-start",
        marginBottom: 2
    },
    label: {
        fontSize: 14,
        color: "white",
        marginBottom: 2,
    },
    sublabel: {
        color: "white",
        fontSize: 12,
        marginBottom: 2,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 16,
        paddingHorizontal: 12,
        width: "100%"
    },
    input: {
        flex: 1,
        minWidth: 0,
        color: "black",
        fontSize: 16,
        paddingVertical: 10,
        // borderWidth: 1
    },
    error: {
        color: '#ff4444',
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4
    },
})

