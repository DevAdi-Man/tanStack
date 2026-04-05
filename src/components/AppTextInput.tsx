import { ReactNode } from 'react'
import { View, Text, StyleSheet, TextInput, ViewStyle, TextStyle } from 'react-native'

type AppTextInputProp = {
    label?: string,
    sublabel?: string,
    labelContainer?: ViewStyle
    labelStyle?: TextStyle,
    labelfontSize?: TextStyle["fontSize"],
    labelFontFamily?: TextStyle["fontFamily"]
    labelFontColor?: TextStyle["color"],
    sublabelStyle?: TextStyle,
    sublabelfontSize?: TextStyle["fontSize"],
    sublabelFontFamily?: TextStyle["fontFamily"]
    sublabelFontColor?: TextStyle["color"],
    placeHolder?: string,
    value?: string,
    onChangeText?: (text: string) => void,
    multiline?: boolean,
    numberOfLines?: number,
    inputStyle?: ViewStyle | TextStyle,
    inputContainerStyle?: ViewStyle,
    error?: string,
    errorfontSize?: TextStyle["fontSize"],
    errorFontFamily?: TextStyle["fontFamily"],
    renderPrefix?: ReactNode,
    renderSuffixIcon?: ReactNode,
    renderPrefixIcon?: ReactNode,
    container?:ViewStyle,
    editabel?:boolean
}

export const AppTextInput = ({
    error,
    editabel,
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
    multiline = false,
    numberOfLines = 1
}: AppTextInputProp) => {
    return (
        <View style={[styles.container,container]}>
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
                    value={value}
                    onChangeText={onChangeText}
                    multiline={multiline}
                    editable={editabel}
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
        width: '100%'
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
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 16,
        padding: 2,
        paddingHorizontal: 12
    },
    input: {
        color: 'white',
        fontSize: 16,
        paddingVertical: 10,
    },
    error: {
        color: '#ff4444',
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4
    },
})

