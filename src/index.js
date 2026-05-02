import { AppRegistry } from 'react-native';
import App from './App'; // Make sure this points to your root App component
import appName from './app.json';

AppRegistry.registerComponent(appName.name, () => App);

AppRegistry.runApplication(appName.name, {
  initialProps: {},
  rootTag: document.getElementById('root'),
});
