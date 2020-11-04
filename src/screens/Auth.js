import React, {Component} from 'react';
import {View,AsyncStorage} from 'react-native';
import {Registration} from './Registration';
import Login from './Login';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainPage from './MainPage';
import PreviousJobs from "../components/common/PreviousJobs";
import Weathers from "./Weathers";

const Drawer = createDrawerNavigator();

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
      return (
       <Drawer.Navigator initialRouteName="MainPage">
        <Drawer.Screen name="Ana Sayfa" component={MainPage}/>
        <Drawer.Screen name="Geçmiş Planlı İşler" component={PreviousJobs} />
        <Drawer.Screen name="Arazilerde Hava Durumu" component={Weathers} />
       </Drawer.Navigator>
         /* <MainPage navigation={navigation}/> */
          )
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
        this.whichForm()
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
