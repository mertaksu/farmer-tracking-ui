import React, {Component, Fragment} from 'react';
import {Text, View, AsyncStorage} from 'react-native';
import {service} from '../services/service';
import {Input} from '../components/common/Input';
import {TextLink} from '../components/common/TextLink';
import {Loading} from '../components/common/Loading';
import {Button} from '../components/common/Button';
import {Logo} from "../components/common/Logo";
import Loader from "../components/common/Loader";

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
      loading: false,
    };
    this.login = this.login.bind(this);
  }

  render() {

    const {username, password, error, loading} = this.state;
    const {form, section, errorTextStyle} = styles;

    return (
        <>
            <View style={form}>
              <Loader
                  loading={this.state.loading} />
              <Logo logoSrc={require('../images/new_logo.png')}/>
              <View style={section}>
              <Input
                  placeholder="Kullanıcı Adı"
                  label="Kullanıcı Adı"
                  value={username}
                  onChangeText={username => this.setState({ username })}
              />
            </View>

            <View style={section}>
              <Input
                  secureTextEntry
                  placeholder="Şifre"
                  label="Şifre"
                  value={password}
                  onChangeText={password => this.setState({ password })}
              />
            </View>

            <Text style={errorTextStyle}>
              {error}
            </Text>

            {!loading ?
                <Button onPress={this.login}>
                  Giriş Yap
                </Button>
                :
                <Loading size={'large'} />
            }
            <TextLink onPress={this.props.authSwitch}>
              Bir hesabınız yok mu? Kayıt ol!
            </TextLink>
            </View>
        </>
    );
  }

  async login() {
    this.setState({loading: true});
    const loginReq = {
      username: this.state.username,
      password: this.state.password
    };
    await service(null,'/login','POST',loginReq)
        .then(response => {
          if(response && response.ok) {
            const token = response.headers.get('authorization');
            AsyncStorage.setItem('farmerToken',token);
            this.props.navigation.navigate('MainPage');
            this.setState({loading: false});
          }
        });
  }

}

const styles = {
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#455a64',
  },
  section: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    backgroundColor: '#455a64',
    borderColor: '#ddd',
  },
  errorTextStyle: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red'
  }
};
