import React, {Component, Fragment} from 'react';
import {StyleSheet, View, Text, AsyncStorage} from 'react-native';
import {Body, Button, Container, Content, Header, Icon, Left, List, ListItem, Right, Separator} from "native-base";
import Loader from "./Loader";
import {service} from "../../services/service";

export default class PreviousJobs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            prevPlans: [],
            loading: false,
            token: '',
        };
        this.signOut = this.signOut.bind(this);
        this.getPrevPlan = this.getPrevPlan.bind(this);
        this.getToken = this.getToken.bind(this);
    }

    componentDidMount() {
        this.getPrevPlan().then();
    }

    async getToken() {
        await AsyncStorage.getItem('farmerToken').then(token => {
            this.setState({token: token});
        });
    }

    async getPrevPlan() {
        await this.getToken();
        service(this.state.token,'/prevPlan', 'GET')
            .then(response => this.setState({prevPlans: response}))
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
                            dataArray={this.state.prevPlans}
                            renderRow={item => (
                                <View style={{backgroundColor: '#455a64'}}>
                                    <Separator
                                        style={{
                                            backgroundColor: '#4c6264',
                                            flex: 1,
                                            flexDirection: 'row',
                                        }}>
                                        <Left>
                                            <Text style={{color: '#fff', fontWeight: 'bold'}}>
                                                Yapılan İş
                                            </Text>
                                        </Left>
                                    </Separator>
                                    <ListItem
                                        noIndent
                                        style={{borderWidth: 0, backgroundColor: '#455a64'}}>
                                        <Body>
                                            <View
                                                style={{
                                                    flex: 1,
                                                    flexDirection: 'row'
                                                }}>
                                                <View
                                                    style={{
                                                        width: '50%',
                                                        flexBasis: '50%',
                                                        flexDirection: 'column'
                                                    }}>
                                                    <View style={{flexDirection: 'row'}}>
                                                        <Text style={styles.titleText}>Arazi: </Text>
                                                        <Text style={styles.valueText}>{item.landName}</Text>
                                                    </View>
                                                    <View style={{flexDirection: 'row'}}>
                                                        <Text style={styles.titleText}>İş: </Text>
                                                        <Text style={styles.valueText}>{item.planType}</Text>
                                                    </View>
                                                </View>
                                                <View
                                                    style={{
                                                        width: '50%',
                                                        flexBasis: '50%',
                                                        flexDirection: 'column'
                                                    }}>
                                                    <View style={{flexDirection: 'row'}}>
                                                        <Text style={styles.titleText}>Ekin: </Text>
                                                        <Text style={styles.valueText}>{item.cropName}</Text>
                                                    </View>
                                                    <View style={{flexDirection: 'row'}}>
                                                        <Text style={styles.titleText}>Tarih: </Text>
                                                        <Text style={styles.valueText}>{item.planDate}</Text>
                                                    </View>
                                                </View>
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
        this.props.navigation.navigate('Login');
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
    calendar: {
        marginBottom: 10,
    },
    text: {
        textAlign: 'center',
        padding: 10,
        backgroundColor: 'lightgrey',
        fontSize: 16,
    },
    titleText: {
        fontWeight: 'bold',
        color: '#fff',
    },
    valueText: {
        color: '#fff',
        alignContent: 'flex-start'
    },
    errorTextStyle: {
        alignSelf: 'center',
        fontSize: 18,
        color: 'red'
    },
    button: {
        backgroundColor: '#5859f2'
    }
});
