import React from 'react';
import {
    Image,
    ImageSourcePropType,
    ImageStyle,
    StyleProp,
} from 'react-native';
import FastImage, { FastImageProps, Source } from '@d11/react-native-fast-image';

type ResizeMode = 'contain' | 'cover' | 'stretch' | 'center';

type AppImageProps = FastImageProps & {
    uri?: string;
    source?: ImageSourcePropType;
    fallbackSource?: ImageSourcePropType;

    style?: StyleProp<ImageStyle>;

    resizeMode?: ResizeMode;
    blurRadius?: number;

    useFastImage?: boolean;
}

export const AppImage: React.FC<AppImageProps> = ({
    uri,
    source,
    fallbackSource,
    style,
    resizeMode = 'cover',
    blurRadius,
    useFastImage = true,
    ...rest
}) => {

    const imageSource = uri ? { uri } : source;

    if (useFastImage && uri) {
        return (
            <FastImage
                {...rest}
                style={style}
                source={imageSource}
                resizeMode={FastImage.resizeMode[resizeMode]}
            />
        );
    }

    return (
        <Image
            style={style}
            source={imageSource}
            resizeMode={resizeMode}
            blurRadius={blurRadius}
        />
    );
};


