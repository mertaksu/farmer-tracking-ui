import React, {Component, Fragment} from 'react';
import {Text, View, StatusBar} from 'react-native';
import LoggedIn from './LoggedIn';
import {Input} from '../components/common/Input';
import {TextLink} from '../components/common/TextLink';
import {Loading} from '../components/common/Loading';
import {Button} from '../components/common/Button';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false,
    };
  }

  render() {
    const {email, password, error, loading} = this.state;
    const {form, section, errorTextStyle} = styles;

    return (
      <Fragment>
        <View style={form}>
          <StatusBar backgroudColor="#1c313a" barStyle="light-content" />
          <View style={section}>
            <Input
              label="Email"
              placeholder="emal@email.com"
              placeholderTextColor="black"
              value={email}
              onChangeText={email => this.setState({email})}
            />
          </View>

          <View style={section}>
            <Input
              label="Password"
              secureTextEntry
              placeholder="Password"
              placeholderTextColor="black"
              value={password}
              onChangeText={password => this.setState({password})}
            />
          </View>

          <Text style={errorTextStyle}>{error}</Text>

          {!loading ? <Button>Login</Button> : <Loading size={'large'} />}
        </View>
        <TextLink onPress={this.props.authSwitch}>
          Don't have an account? Register!
        </TextLink>
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
    placeholderTextColor: 'red',
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

export {Login};
