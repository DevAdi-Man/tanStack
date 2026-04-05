import * as Icons from "@assets/icons";
import { SvgProps } from "react-native-svg";


// here we are defining name of the icons based on what we exported
export type IconName = keyof typeof Icons;

interface IconProps extends SvgProps {
    name: IconName,
    size?: number,
    color?: string
}

export const Icon = ({ name, size = 24, color = "#000000", ...rest }: IconProps) => {
    //dynamically grabing icons name
    const SvgIcon = Icons[name];

    if (!SvgIcon) return null;

    return (
        <SvgIcon
            width={size}
            height={size}
            fill={color}
            {...rest}
        />
    )
}
