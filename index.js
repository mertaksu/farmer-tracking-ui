/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import Auth from "./src/screens/Auth";
import Routes from "./src/components/common/Routes";

AppRegistry.registerComponent(appName, () => Routes);
