import React, {Component} from 'react';
import {Text} from 'native-base';
import {Body, Right, Content, Button, List, ListItem, Input} from 'native-base';

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: '',
    };
    this.deleteProduct = this.deleteProduct.bind(this);
    this.addProduct = this.addProduct.bind(this);
  }

  deleteProduct(id) {
    this.props.deleteProduct(id);
  }

  addProduct(productName) {
    this.props.addProduct(productName);
    this.setState({productName: ''});
  }

  render() {
    return (
      <Content padder>
        <List
          dataArray={this.props.products}
          renderRow={item => (
            <ListItem>
              <Body>
                <Text>{item.cropName}</Text>
              </Body>
              <Right>
                <Button transparent onPress={() => this.deleteProduct(item.id)}>
                  <Text>Delete</Text>
                </Button>
              </Right>
            </ListItem>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <Text>{'\n'}</Text>
        <Input
          placeholder="Ürün Adı"
          value={this.state.productName}
          onChangeText={value => this.setState({productName: value})}
        />
        <Button primary onPress={() => this.addProduct(this.state.productName)}>
          <Text>Ekle</Text>
        </Button>
      </Content>
    );
  }
}

export {Products};
