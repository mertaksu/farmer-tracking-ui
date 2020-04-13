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
      productName: '',
    };
    this.getProducts = this.getProducts.bind(this);
    this.getLand = this.getLand.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.deleteLand = this.deleteLand.bind(this);
    this.addLand = this.addLand.bind(this);
  }

  componentDidMount() {
    this.getProducts();
    this.getLand();
  }

  async deleteProduct(id) {
    console.log('Delete Product Called');
    await service('/crop/' + id, 'DELETE').then(response =>
      console.log('Delete Product Response:' + response),
    );
    await this.getProducts();
  }

  async addProduct(productName) {
    console.log('Add Product Called ProductName:' + productName);
    let request = {
      cropName: productName,
      userId: '727',
    };
    await service('/crop', 'POST', request).then(response =>
      console.log('Add Product Response:' + JSON.stringify(response)),
    );
    this.setState({productName: ''});
    await this.getProducts();
  }

  async deleteLand(id) {
    console.log('Delete Land Called');
    await service('/land/' + id, 'DELETE').then(response =>
      console.log('Delete Land Response:' + response),
    );
    await this.getLand();
  }

  async addLand(landName) {
    console.log('Add Land Called');
    let request = {
      landName: landName,
      userId: '727',
    };
    await service('/land', 'POST', request).then(response =>
      console.log('Add Land Response:' + JSON.stringify(response)),
    );
    this.setState({landName: ''});
    await this.getLand();
  }

  getProducts() {
    console.log('Get Product Called');
    service('/crop/727', 'GET')
      .then(response => this.setState({products: response}))
      .catch(error => console.log(error));
  }

  getLand() {
    console.log('Get Land Called');
    service('/land/727', 'GET')
      .then(response => this.setState({lands: response}))
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
              <Jobs products={this.state.products} lands={this.state.lands} />
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
