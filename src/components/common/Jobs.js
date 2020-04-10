import React, {Component} from 'react';
import {Content, Icon, Picker, Form} from 'native-base';

class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLand: '',
      selectedProduct: '',
    };
    this.selectedLand = this.selectedLand.bind(this);
    this.selectedProduct = this.selectedProduct.bind(this);
  }

  selectedLand(value) {
    this.setState({
      selectedLand: value,
    });
    console.log('Selected:' + this.state.selectedLand);
  }

  selectedProduct(value) {
    this.setState({
      selectedProduct: value,
    });
    console.log('Selected:' + this.state.selectedProduct);
  }

  render() {
    return (
      <Content padder>
        <Form>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            placeholder="Arazi Seç"
            placeholderStyle={{color: '#bfc6ea'}}
            placeholderIconColor="#007aff"
            style={{width: undefined}}
            selectedValue={this.state.selectedLand}
            onValueChange={item => this.selectedLand(item)}>
            {this.props.lands.map(v => {
              return <Picker.Item label={v.landName} value={v.id} />;
            })}
          </Picker>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            placeholder="Ürün Seç"
            placeholderStyle={{color: '#bfc6ea'}}
            placeholderIconColor="#007aff"
            style={{width: undefined}}
            selectedValue={this.state.selectedProduct}
            onValueChange={item => this.selectedProduct(item)}>
            {this.props.products.map(v => {
              return <Picker.Item label={v.cropName} value={v.id} />;
            })}
          </Picker>
        </Form>
      </Content>
    );
  }
}
export {Jobs};
