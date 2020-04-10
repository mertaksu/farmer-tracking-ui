import React, {Component} from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';

import {Login} from '../../screens/Login';
import {Registration} from '../../screens/Registration';

export default class Routes extends Component<{}> {
  render() {
    return (
      <Router>
        <Stack key="root" hideNavBar={true}>
          <Scene key="Login" component={Login} title="Login" initial={true} />
          <Scene
            key="Registration"
            component={Registration}
            title="Registration"
          />
        </Stack>
      </Router>
    );
  }
}
