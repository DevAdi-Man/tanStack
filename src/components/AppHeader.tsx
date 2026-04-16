import { ReactNode } from 'react'
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import LinearGradient from "react-native-linear-gradient"
import { AppText } from './AppText'

type AppHeaderProps = {
    title?: string,
    titleFontSize?: TextStyle['fontSize'],
    titleFontFamily?: TextStyle['fontFamily'],
    titleFontColor?: TextStyle['color'],
    titleStyle?: TextStyle,
    subtitle?: string,
    subtitleFontSize?: TextStyle['fontSize'],
    subtitleFontFamily?: TextStyle['fontFamily'],
    subtitleFontColor?: TextStyle['color'],
    subtitleStyle?: TextStyle,
    subtitleLeftIcon?: ReactNode | (() => ReactNode),
    subtitleRightIcon?: ReactNode,
    renderLeftItem?: ReactNode | (() => ReactNode),
    renderRightItem?: ReactNode | (() => ReactNode),
    renderSearchItem?: ReactNode | (() => ReactNode),

    containerStyle?: StyleProp<ViewStyle>,
    start?: {
        x: number,
        y: number,
    },
    end?: {
        x: number,
        y: number,
    },
    gradientColor?: string[],
    gradientLocation?: number[],
    textContainer?: StyleProp<ViewStyle>,
    leftMainContainer?: StyleProp<ViewStyle>,
    topContainer?: StyleProp<ViewStyle>,
}

export const AppHeader = ({
    title,
    titleFontSize,
    titleFontColor,
    titleFontFamily,
    titleStyle,
    subtitle,
    subtitleFontSize,
    subtitleFontColor,
    subtitleFontFamily,
    subtitleStyle,
    subtitleLeftIcon,
    subtitleRightIcon,
    renderLeftItem,
    renderRightItem,
    renderSearchItem,
    containerStyle,
    start,
    end,
    gradientColor = ["#614B8B", "#9D95C6"],
    gradientLocation,
    leftMainContainer,
    topContainer,
    textContainer,
}: AppHeaderProps) => {
    const renderNode = (node?: ReactNode | (() => ReactNode)) => {
        if (!node) return null
        return typeof node === "function" ? node() : node
    }

    return (
        <LinearGradient locations={gradientLocation} start={start} end={end} colors={gradientColor} style={[styles.container, containerStyle]}>
            <View style={[styles.topContainer, topContainer]}>
                <View style={[styles.leftMainContainer, leftMainContainer]}>
                    {renderNode(renderLeftItem)}
                    <View style={[styles.textContainer, textContainer]}>

                        {
                            title ? <AppText
                                title={title}
                                textColor={titleFontColor}
                                textFontSize={titleFontSize}
                                textFontFamily={titleFontFamily}
                                numberOfLine={1}
                                textStyle={titleStyle}
                            /> : null
                        }

                        {
                            subtitle ? <AppText
                                title={subtitle}
                                textColor={subtitleFontColor}
                                textFontSize={subtitleFontSize}
                                textFontFamily={subtitleFontFamily}
                                numberOfLine={1}
                                textStyle={subtitleStyle}
                                renderLeftImage={subtitleLeftIcon}
                                renderRightImage={subtitleRightIcon}
                            /> : null
                        }
                    </View>
                </View>
                {renderNode(renderRightItem)}
            </View>
            {renderNode(renderSearchItem)}
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        paddingHorizontal: 16,
    },
    textContainer: {
        flexDirection: "column",
        alignItems: "center",
    },
    leftMainContainer: {
        flexDirection: "row"
    },
    topContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    }
})

