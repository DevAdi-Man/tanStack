import * as Icons from "@assets/icons";
import * as ColorIcons from "@assets/colorIcon";
import { SvgProps } from "react-native-svg";

export type IconName =
  | keyof typeof Icons
  | keyof typeof ColorIcons;

interface IconProps extends SvgProps {
  name: IconName;
  size?: number;
  color?: string;
}

export const Icon = ({
  name,
  size = 24,
  color = "#000",
  ...rest
}: IconProps) => {

  let SvgIcon;

  if (name in Icons) {
    SvgIcon = Icons[name as keyof typeof Icons];

    return (
      <SvgIcon
        width={size}
        height={size}
        color={color}
        {...rest}
      />
    );
  }

  if (name in ColorIcons) {
    SvgIcon = ColorIcons[name as keyof typeof ColorIcons];

    return (
      <SvgIcon
        width={size}
        height={size}
        {...rest}
      />
    );
  }

  return null;
};

