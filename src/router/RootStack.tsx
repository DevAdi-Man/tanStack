import {HomeScreen, ProductsScreen} from '@/app/(auth)';
import {LoginScreen} from '@/app/(public)';
import {RootStackParamsList} from '@/types/router.type';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator<RootStackParamsList>();
export const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Products" component={ProductsScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};
