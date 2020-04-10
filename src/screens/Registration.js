import React, {Component, Fragment} from 'react';
import {View, Text, TextInput} from 'react-native';
import {Input} from '../components/common/Input';
import {Button} from '../components/common/Button';
import {Loading} from '../components/common/Loading';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      password_confirmation: '',
      error: '',
      loading: false,
    };
  }

  render() {
    const {form, section, errorTextStyle} = styles;

    return (
      <Fragment>
        <View style={form}>
          <View style={section}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="black"
              value={this.state.email}
              onChangeText={email => this.setState({email})}
            />
          </View>

          <View style={section}>
            <TextInput
              secureTextEntry
              placeholder="Password"
              placeholderTextColor="black"
              value={this.state.password}
              onChangeText={password => this.setState({password})}
            />
          </View>

          <View style={section}>
            <TextInput
              secureTextEntry
              placeholder="Confirm Password"
              placeholderTextColor="black"
              value={this.state.password_confirmation}
              onChangeText={password_confirmation =>
                this.setState({password_confirmation})
              }
            />
          </View>

          <Text style={errorTextStyle}>{this.state.error}</Text>

          {!this.state.loading ? (
            <Button onPress={this.props.authSwitch}>Register</Button>
          ) : (
            <Loading size={'large'} />
          )}
        </View>
        <Text />
      </Fragment>
    );
  }
}

const styles = {
  form: {
    width: '90%',
    borderTopWidth: 1,
    borderColor: '#455a64',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  section: {
    border: 5,
    borderRadius: 25,
    flexDirection: 'row',
    placeholderTextColor: 'black',
    borderBottomWidth: 2,
    borderColor: 'black',
    marginVertical: 10,
  },
  errorTextStyle: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red',
  },
};

export {Registration};
