/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Navigation from './Components/NavigationApp/Navigation';
import {name as appName} from './app.json';

const App = () => {
  return <Navigation />;
};

AppRegistry.registerComponent(appName, () => App);
