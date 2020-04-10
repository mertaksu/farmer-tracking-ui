import React, {Component} from 'react';
import {View} from 'react-native';
import {Registration} from './Registration';
import {Login} from './Login';
import {Logo} from '../components/common/Logo';
import Routes from '../components/common/Routes';
import {Land} from '../components/common/Land';
import {MainPage} from './MainPage';

export default class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: true,
    };
    this.whichForm = this.whichForm.bind(this);
    this.authSwitch = this.authSwitch.bind(this);
  }

  authSwitch() {
    this.setState({
      showLogin: !this.state.showLogin,
    });
  }

  whichForm() {
    if (!this.state.showLogin) {
      return <Registration authSwitch={this.authSwitch} />;
    } else {
      return <Login authSwitch={this.authSwitch} />;
    }
  }

  render() {
    return <MainPage />;
  }
}

const styles = {
  form: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
};
