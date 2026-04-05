import { ReactNode } from 'react'
import { View, Text, StyleSheet, TextStyle, ViewStyle } from 'react-native'

type AppTextProps = {
    title: string,
    textContainerStyle?: ViewStyle,
    textStyle?: TextStyle,
    textFontSize?: TextStyle['fontSize'],
    textFontFamily?: TextStyle['fontFamily'],
    textColor?: TextStyle['color'],
    numberOfLine?: number,
    renderLeftImage?: ReactNode | (() => ReactNode),
    renderRightImage?: ReactNode | (() => ReactNode),
}

export const AppText = ({
    title,
    textContainerStyle,
    textStyle,
    textFontSize,
    textFontFamily,
    textColor,
    renderRightImage,
    renderLeftImage,
    numberOfLine = 1
}: AppTextProps) => {
    return (
        <View style={[styles.container, textContainerStyle]}>
            {renderLeftImage && <View style={styles.sideComponent}>
                {
                    typeof renderLeftImage === "function" ? renderLeftImage() : renderLeftImage
                }
            </View>}
            <Text
                numberOfLines={numberOfLine}
                style={[
                    styles.title,
                    {
                        fontFamily: textFontFamily,
                        fontSize: textFontSize,
                        color: textColor
                    },
                    textStyle,
                ]}>{title}</Text>
            {renderRightImage && <View style={styles.sideComponent}>
                {
                    typeof renderRightImage === "function" ? renderRightImage() : renderRightImage
                }
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center"
    },
    sideComponent: {
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        color: "#ccc",
        fontSize: 12,
        // flex: 1,
        flexShrink: 1,
        paddingHorizontal: 4
    }

})
