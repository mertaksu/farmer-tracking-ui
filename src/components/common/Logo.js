import React, {Component} from 'react';
import {Image, View} from 'react-native';

export class Logo extends Component {
  render() {
    return (
      <View>
        <Image
          style={{width: 150, height: 90}}
          source={require('../../images/logo.png')}
        />
      </View>
    );
  }
}
