import React, {Component} from 'react';
import {
  Body,
  Button,
  Container,
  Content, Fab,
  Header,
  Icon,
  Left,
  Right,
  Tab,
  Tabs,
} from 'native-base';
import {Land} from '../components/common/Land';
import {Products} from '../components/common/Products';
import {Jobs} from '../components/common/Jobs';
import {service} from '../services/service';
import {StyleSheet,AsyncStorage,Text} from 'react-native';
import {Logo} from "../components/common/Logo";
import Loader from "../components/common/Loader";
import Auth from "./Auth";
import Plan from "../components/common/Plan";

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lands: [],
      products: [],
      plans: [],
      token: null,
      loading: false,
    };
    this.getProducts = this.getProducts.bind(this);
    this.getLand = this.getLand.bind(this);
    this.getPlan = this.getPlan.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.deleteLand = this.deleteLand.bind(this);
    this.addLand = this.addLand.bind(this);
    this.deletePlan = this.deletePlan.bind(this);
    this.addPlan = this.addPlan.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  async getToken() {
    await AsyncStorage.getItem('farmerToken').then(token => {
      this.setState({token: token});
    });
  }

  async signOut() {
    this.setState({loading: true});
    AsyncStorage.removeItem('farmerToken').then();
    this.setState({token: ''});
    this.props.navigation.navigate('Auth');
    this.setState({loading: false});
  }

  componentDidMount() {
    this.setState({loading: true});
    this.loadPage().then();
    this.setState({loading: false});
  }

  async loadPage(){
    await this.getToken();
    this.getProducts();
    this.getLand();
    this.getPlan();
  }

  async deleteProduct(id) {
    this.setState({loading: true});
    await service(this.state.token,'/crop/' + id, 'DELETE');
    await this.getProducts();
    await this.getPlan();
    this.setState({loading: false});
  }

  async addProduct(productName) {
    this.setState({loading: true});
    let request = {
      cropName: productName,
    };
    await service(this.state.token,'/crop', 'POST', request);
    await this.getProducts();
    this.setState({loading: false});
  }

  async deleteLand(id) {
    this.setState({loading: true});
    await service(this.state.token,'/land/' + id, 'DELETE');
    await this.getLand();
    await this.getPlan();
    this.setState({loading: false});
  }

  async addLand(landName,lat,lon,placeName) {
    this.setState({loading: true});
    let request = {
      landName: landName,
      latitude: lat,
      longitude: lon,
      placeName: placeName
    };
    await service(this.state.token,'/land', 'POST', request);
    await this.getLand();
    this.setState({loading: false});
  }

  async deletePlan(planId) {
    this.setState({loading: true});
    await service(this.state.token,'/plan/'+planId,'DELETE');
    await this.getPlan();
    this.setState({loading: false});
  }

  async addPlan(planRequest) {
    this.setState({loading: true});
    await service(this.state.token,'/plan', 'POST',planRequest);
    await this.getPlan();
    this.setState({loading: false});
  }

  getProducts() {
    service(this.state.token,'/crop', 'GET')
      .then(response => this.setState({products: response}))
      .catch(error => console.log(error));
  }

  getLand() {
    service(this.state.token,'/land', 'GET')
      .then(response => this.setState({lands: response}))
      .catch(error => console.log(error));
  }

  getPlan() {
    service(this.state.token,'/plan', 'GET')
        .then(response => this.setState({plans: response}))
        .catch(error => console.log(error));
  }

  render() {
    return (
    <Container style={styles.container}>
      <Loader
          loading={this.state.loading} />
      <Content>
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
        <Tabs>
          <Tab
              heading="Ürünler"
              tabStyle={{backgroundColor: '#455a64'}}
              textStyle={{color: 'black'}}
              activeTabStyle={{backgroundColor: '#455a64'}}
              activeTextStyle={{color: 'black', fontWeight: 'bold'}}>
            <Products
                products={this.state.products}
                addProduct={this.addProduct}
                deleteProduct={this.deleteProduct}
            />
          </Tab>
          <Tab
              heading="Araziler"
              tabStyle={{backgroundColor: '#455a64'}}
              textStyle={{color: 'black'}}
              activeTabStyle={{backgroundColor: '#455a64'}}
              activeTextStyle={{color: 'black', fontWeight: 'bold'}}>
            <Land
                lands={this.state.lands}
                addLand={this.addLand}
                deleteLand={this.deleteLand}
            />
          </Tab>
          <Tab
              heading="Planlı İşler"
              tabStyle={{backgroundColor: '#455a64'}}
              textStyle={{color: 'black'}}
              activeTabStyle={{backgroundColor: '#455a64'}}
              activeTextStyle={{color: 'black', fontWeight: 'bold'}}>
            <Jobs products={this.state.products} lands={this.state.lands} plans={this.state.plans} addPlan={this.addPlan} deletePlan={this.deletePlan} navigation={this.props.navigation}/>
          </Tab>
        </Tabs>
      </Content>
    </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#455a64',
    flex: 1,
  },
});
