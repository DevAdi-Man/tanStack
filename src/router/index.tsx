import {NavigationContainer} from '@react-navigation/native';
import {RootStack} from './RootStack';

export const AppRouter = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};
