import React, {Component} from 'react';
import Auth from './src/screens/Auth';
import {View, StyleSheet} from 'react-native';
import LoggedIn from './src/screens/LoggedIn';
import {MainPage} from './src/screens/MainPage';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      token: 'ııu',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <MainPage />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#455a64',
    flex: 1,
  },
});
