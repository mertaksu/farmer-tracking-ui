/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import Main from './Main';
import {name as appName} from './app.json';
import Routes from "./src/components/common/Routes";

AppRegistry.registerComponent(appName, () => Routes);
