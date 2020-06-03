import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../../screens/Login';
import {Registration} from '../../screens/Registration';
import Auth from '../../screens/Auth';
import Plan from "./Plan";
import MainPage from "../../screens/MainPage";
import {Jobs} from "./Jobs";

const Stack = createStackNavigator();

export default class Routes extends Component<{}> {

  render() {
    return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Auth">
            <Stack.Screen options={{headerShown: false}} name="Auth" component={Auth} />
            <Stack.Screen options={{headerShown: false}} name="Login" component={Login} />
            <Stack.Screen options={{headerShown: false}} name="Registration" component={Registration} />
            <Stack.Screen options={{headerShown: false}} name="MainPage" component={MainPage}/>
            <Stack.Screen name="Plan" component={Plan} options={{headerStyle: {
                    backgroundColor: '#455a64',
                }}}/>
          </Stack.Navigator>
        </NavigationContainer>
    );
  }
}
