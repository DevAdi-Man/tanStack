import { HomeScreen, ProductsScreen, ProfileScreen } from '@/app/(auth)';
import { LoginScreen } from '@/app/(public)';
import useUserStore from '@/storage/useUserStore';
// import { AuthStackPramasList, MainStackPramasList, RootStackParamsList } from '@/types/router.type';
import { createStaticNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// this is dynamic way of writing navigation

// const Stack = createStackNavigator<RootStackParamsList>();
// export const RootStack = () => {
//   return (
//     <Stack.Navigator screenOptions={{headerShown:false}}>
//       <Stack.Screen name="Home" component={HomeScreen} />
//       <Stack.Screen name="Products" component={ProductsScreen} />
//       <Stack.Screen name="Login" component={LoginScreen} />
//     </Stack.Navigator>
//   );
// };

const useIsLoggedIn = () => {
    const token = useUserStore((state) => state.token);
    return !!token;
};

export const Stack = createStackNavigator({
    screenOptions: {
        headerShown: false
    },
    groups: {
        LoggedIn: {
            if: useIsLoggedIn,
            screens: {
                Home:HomeScreen,
                Products:ProductsScreen,
                Profile:ProfileScreen
            }
        },
        LoggedOut: {
            if: () => !useIsLoggedIn(),
            screens: {
                Login:LoginScreen
            }
        }
    }
});

export const RootStack = createStaticNavigation(Stack);
