// export type AuthStackPramasList = {
//     Login: undefined
// }
//
// export type MainStackPramasList = {
//     Home: undefined;
//     Products: { productId: string };
// }
//
// export type RootStackParamsList = AuthStackPramasList & MainStackPramasList;

import { Stack } from "@/router/RootStack";
import { StaticParamList } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = StaticParamList<typeof Stack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type HomeScreenProps = StackNavigationProp<
    RootStackParamList,
    "Home"
>

export type ProfileScreenProps = StackNavigationProp<
    RootStackParamList,
    "Profile"
>

export type ProductsScreenProps = StackNavigationProp<
    RootStackParamList,
    "Products"
>
export type LoginScreenProps = StackNavigationProp<
    RootStackParamList,
    "Login"
>
