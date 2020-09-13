//This is an example code for NavigationDrawer//
import React, { Component } from 'react';
//import react in our code.
import {StyleSheet, View, Text, AsyncStorage, Image} from 'react-native';
import {Body, Button, Container, Content, Header, Icon, Left, List, ListItem, Right, Separator} from "native-base";
import Loader from "../components/common/Loader";
import Auth from "./Auth";
import MainPage from "./MainPage";
import {Logo} from "../components/common/Logo";
import {service} from "../services/service";
// import all basic components

const img = {
        '01d':require('../images/icons/01d.png'),
        '02d':require('../images/icons/02d.png'),
        '03d':require('../images/icons/03d.png'),
        '04d':require('../images/icons/04d.png'),
        '09d':require('../images/icons/09d.png'),
        '10d':require('../images/icons/10d.png'),
        '11d':require('../images/icons/11d.png'),
        '13d':require('../images/icons/13d.png'),
        '50d':require('../images/icons/50d.png'),
        '01n':require('../images/icons/01n.png'),
        '02n':require('../images/icons/02n.png'),
        '03n':require('../images/icons/03n.png'),
        '04n':require('../images/icons/04n.png'),
        '09n':require('../images/icons/09n.png'),
        '10n':require('../images/icons/10n.png'),
        '11n':require('../images/icons/11n.png'),
        '13n':require('../images/icons/13n.png'),
        '50n':require('../images/icons/50n.png'),
    };

export default class Weather extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dailyWeather: [],
            token: null,
            loading: false,
            img: []
        };
        this.signOut = this.signOut.bind(this);
        this.getWeather = this.getWeather.bind(this);
        this.getToken = this.getToken.bind(this);
    }

    componentDidMount() {
        this.getWeather().then();
        this.state.img = img;
    }

    async getToken() {
        await AsyncStorage.getItem('farmerToken').then(token => {
            this.setState({token: token});
        });
    }

    async getWeather() {
        await this.getToken();
        service(this.state.token,'/weather/40.47049/29.66282', 'GET')
            .then(response => this.setState({dailyWeather: response.dailyWeatherList}))
            .catch(error => console.log(error));
    }


    render() {
        return (
            <Container style={styles.container}>
                <Loader
                    loading={this.state.loading} />
                <Header hasSegment style={{backgroundColor: '#455a64'}}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.toggleDrawer()}>
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body>

                    </Body>
                    <Right>
                        <Button transparent onPress={this.signOut}>
                            <Icon name="md-exit" />
                        </Button>
                    </Right>
                </Header>
                <Content
                    padder
                    style={{backgroundColor: '#455a64'}}>
                    <List
                        dataArray={this.state.dailyWeather}
                        renderRow={item => (
                            <View style={{backgroundColor: '#455a64'}}>
                                <Separator
                                    style={{
                                        backgroundColor: '#4c6264',
                                        flex: 1,
                                        flexDirection: 'row',
                                    }}>
                                </Separator>
                                <ListItem
                                    noIndent
                                    style={{borderWidth: 0, backgroundColor: '#455a64'}}>
                                    <Body>
                                        <View
                                            style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}>
                                            <Text style={styles.valueText}>{item.day}</Text>
                                            <Image source={img[item.icon]}/>
                                            <Text style={styles.valueText}>{item.centigrade}</Text>
                                            <Text style={styles.valueText}>{item.desc}</Text>
                                        </View>
                                    </Body>
                                </ListItem>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </Content>
            </Container>
        );
    }

    async signOut() {
        this.setState({loading: true});
        AsyncStorage.removeItem('farmerToken').then();
        this.setState({token: ''});
        this.props.navigation.navigate('Auth');
        this.setState({loading: false});
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        paddingTop: 20,
        alignItems: 'center',
        marginTop: 50,
        justifyContent: 'center',
    },
    container: {
        backgroundColor: '#455a64',
        flex: 1,
    },
    valueText: {
        flex:1,
        color: '#fff',
        width: '25%'
    },
});
