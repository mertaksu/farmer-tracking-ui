import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const TextLink = ({onPress, children}) => {
  const {button, text} = styles;
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={button}>
        <Text style={text}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  text: {
    alignSelf: 'center',
    color: 'green',
    fontSize: 18,
    fontWeight: '700',
    textDecorationLine: 'underline',
    paddingTop: 10,
    paddingBottom: 10,
  },
  button: {
    marginTop: 5,
    marginBottom: 5,
  }
};

export {TextLink};
