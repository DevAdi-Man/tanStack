// import { NavigationContainer } from '@react-navigation/native';
import { RootStack } from './RootStack';

// this is dynamic way of doing naviagtion but now in 0.80+
// it does they suggest to use static way
// export const AppRouter = () => {
//   return (
//     <NavigationContainer>
//       <RootStack />
//     </NavigationContainer>
//   );
// };

export const AppRouter = () => {
    return (
        <RootStack />
    );
};

