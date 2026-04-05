import {HomeScreen, ProductsScreen} from '@/app/(auth)';
import {LoginScreen} from '@/app/(public)';
import {RootStackParamsList} from '@/types/router.type';
import { createStaticNavigation } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

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

const Stack = createStackNavigator<RootStackParamsList>({
    screens:{
        Home: HomeScreen,
        Products:ProductsScreen,
        Login:LoginScreen,
    },
    screenOptions:{
        headerShown:false,
    },
});

export const RootStack = createStaticNavigation(Stack);
