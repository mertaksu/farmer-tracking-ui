import React, {Component} from 'react';
import {Image, View} from 'react-native';

export class Logo extends Component {
  render() {
    return (
      <View>
        <Image
          style={this.props.styles}
          source={this.props.logoSrc}
        />
      </View>
    );
  }
}
