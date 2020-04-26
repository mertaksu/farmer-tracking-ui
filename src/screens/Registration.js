import React, {Component, Fragment} from 'react';
import {View, Text, AsyncStorage} from 'react-native';
import {Input} from '../components/common/Input';
import {Button} from '../components/common/Button';
import {Loading} from '../components/common/Loading';
import {TextLink} from "../components/common/TextLink";
import {service} from "../services/service";
import {Logo} from "../components/common/Logo";

class Registration extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
      telephone: '',
      error: '',
      loading: false
    };

    this.registerUser = this.registerUser.bind(this);
  }

  render() {
    const { email, password, username, telephone, error, loading } = this.state;
    const { form, section, errorTextStyle } = styles;

    return (
        <Fragment>
          <Logo logoSrc={require('../images/new_logo.png')}/>
          <View style={form}>
            <View style={section}>
              <Input
                  placeholder="user@email.com"
                  label="Email"
                  value={email}
                  onChangeText={email => this.setState({ email })}
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

            <View style={section}>
              <Input
                  placeholder="Username"
                  label="Kullanıcı Adı"
                  value={username}
                  onChangeText={username => this.setState({ username })}
              />
            </View>

            <View style={section}>
              <Input
                  placeholder="05XX XXX XX XX"
                  label="Telefon"
                  value={telephone}
                  onChangeText={telephone => this.setState({ telephone })}
              />
            </View>

            <Text style={errorTextStyle}>
              {error}
            </Text>

            {!loading ?
                <Button onPress={this.registerUser}>
                  Kayıt Ol
                </Button>
                :
                <Loading size={'large'} />
            }
            <TextLink onPress={this.props.authSwitch}>
              Zaten bir üyeliğin var mı? Giriş Yap!
            </TextLink>
          </View>
        </Fragment>
    );
  }

  async registerUser() {
    if(this.state.username==='')
      this.setState({error:'Kullanıcı Adı boş olamaz'});
    else if(this.state.email==='')
      this.setState({error:'Email boş olamaz'});
    else if(this.state.password==='')
      this.setState({error:'Şifre boş olamaz'});
    else if(this.state.telephone==='')
      this.setState({error:'Telefon boş olamaz'});
    else {
      const registerReq = {
        userName: this.state.username,
        userEmail: this.state.email,
        userPass: this.state.password,
        userGsm: this.state.telephone
      };
      await service(null,'/user','POST',registerReq).then( response => {
        if(response && response.ok) {
          this.props.navigation.navigate('Login');
        }
      });
    }
  }
}

const styles = {
  form: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#ddd',
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

export {Registration};
