import React, {Component} from 'react';
import {View,AsyncStorage} from 'react-native';
import {Registration} from './Registration';
import Login from './Login';
import {Logo} from '../components/common/Logo';
import {MainPage} from './MainPage';



export default class Auth extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showLogin: true,
      token: null,
    };

    this.whichForm = this.whichForm.bind(this);
    this.authSwitch = this.authSwitch.bind(this);
  }

  authSwitch() {
    this.setState({
      showLogin: !this.state.showLogin,
    });
  }

  componentDidMount() {
    this.getToken().then();
  }

  async getToken() {
    await AsyncStorage.getItem('farmerToken').then(token => {
      this.setState({token: token});
    });
  }

  whichForm() {
    this.getToken().then();
    const { navigation } = this.props;
    if(this.state.token != null) {
      return <MainPage navigation={navigation}/>
    } else {
      if (!this.state.showLogin) {
        return <Registration navigation={navigation} authSwitch={this.authSwitch} />;
      } else {
        return <Login navigation={navigation} authSwitch={this.authSwitch} />;
      }
    }
  }

  render() {
    return(
        <View style={styles.form}>
          {this.whichForm()}
        </View>
    );
  }
}

const styles = {
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#455a64',
  },
};
