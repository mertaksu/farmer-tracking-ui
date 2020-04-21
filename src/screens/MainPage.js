import React, {Component} from 'react';
import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Left,
  Right,
  Tab,
  Tabs,
  Title,
} from 'native-base';

import {Land} from '../components/common/Land';
import {Products} from '../components/common/Products';
import {Jobs} from '../components/common/Jobs';
import {service} from '../services/service';
import {StyleSheet} from 'react-native';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lands: [],
      products: [],
      plans: [],
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
  }

  componentDidMount() {
    this.getProducts();
    this.getLand();
    this.getPlan();
  }

  async deleteProduct(id) {
    console.log('Delete Product Called');
    await service('/crop/' + id, 'DELETE').then(response =>
      console.log('Delete Product Response:' + response),
    );
    await this.getProducts();
    await this.getPlan();
  }

  async addProduct(productName) {
    console.log('Add Product Called ProductName:' + productName);
    let request = {
      cropName: productName,
    };
    await service('/crop', 'POST', request).then(response =>
      console.log('Add Product Response:' + JSON.stringify(response)),
    ).catch(error => console.log(error));
    await this.getProducts();
  }

  async deleteLand(id) {
    console.log('Delete Land Called');
    await service('/land/' + id, 'DELETE').then(response =>
      console.log('Delete Land Response:' + response),
    );
    await this.getLand();
    await this.getPlan();
  }

  async addLand(landName,lat,lon) {
    console.log('Add Land Called LandName: '+landName+' Latitude: '+lat+' Longitude: '+lon);
    let request = {
      landName: landName,
      latitude: lat,
      longitude: lon
    };
    await service('/land', 'POST', request).then(response =>
      console.log('Add Land Response:' + JSON.stringify(response)),
    ).catch(error => console.log(error));
    await this.getLand();
  }

  async deletePlan(planId) {
    console.log("Delete Plan Called");
    await service('/plan/'+planId,'DELETE')
        .then(response => console.log("Delete Plan Response"+response))
        .catch(error => console.log(error));
    await this.getPlan();
  }

  async addPlan(planRequest) {
    console.log('Add Plan Called');
    await service('/plan', 'POST',planRequest)
        .then(response => console.log("Add Plan Response "+response))
        .catch(error => console.log(error));
    await this.getPlan();
  }

  getProducts() {
    console.log('Get Product Called');
    service('/crop', 'GET')
      .then(response => this.setState({products: response}))
      .catch(error => console.log(error));
  }

  getLand() {
    console.log('Get Land Called');
    service('/land', 'GET')
      .then(response => this.setState({lands: response}))
      .catch(error => console.log(error));
  }

  getPlan() {
    console.log('Get Plans Called');
    service('/plan', 'GET')
        .then(response => this.setState({plans: response}))
        .catch(error => console.log(error));
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Header hasSegment style={{backgroundColor: '#455a64'}}>
            <Left>
              <Button transparent>
                <Icon name="menu" />
              </Button>
            </Left>
            <Body>
              <Title>Ciftçi Portal</Title>
            </Body>
            <Right>
              <Button transparent>
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
              <Jobs products={this.state.products} lands={this.state.lands} plans={this.state.plans} addPlan={this.addPlan} deletePlan={this.deletePlan}/>
            </Tab>
          </Tabs>
        </Content>
      </Container>
    );
  }
}
export {MainPage};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#455a64',
    flex: 1,
  },
});
