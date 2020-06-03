//This is an example code for NavigationDrawer//
import React, { Component } from 'react';
//import react in our code.
import {StyleSheet, View, Text, AsyncStorage} from 'react-native';
import {Body, Button, Container, Header, Icon, Left, Right} from "native-base";
import Loader from "./Loader";
import Auth from "../../screens/Auth";
import MainPage from "../../screens/MainPage";
// import all basic components

export default class Screen2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: null,
            loading: false,
        };
        this.signOut = this.signOut.bind(this);
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
                <Text>Arazilerdeki Hava Durumu</Text>
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
});
