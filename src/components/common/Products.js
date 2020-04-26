import React, {Component} from 'react';
import {Text} from 'native-base';
import {
  Body,
  Right,
  Content,
  Button,
  List,
  ListItem,
  Input,
  Item,
} from 'native-base';
import {SafeAreaView, StyleSheet, YellowBox} from 'react-native';

YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: '',
      error:'',
    };
    this.deleteProduct = this.deleteProduct.bind(this);
    this.addProduct = this.addProduct.bind(this);
  }

  deleteProduct(id) {
    this.props.deleteProduct(id);
  }

  addProduct(productName) {
      if(productName==='') {
          this.setState({error: 'Ürün adı zorunludur'})
      } else {
          this.props.addProduct(productName);
          this.setState({productName: '',error:''});
      }
  }

  render() {
    return (
      <Content
        padder
        style={{backgroundColor: '#455a64'}}
        scrollEnabled={false}>
        <SafeAreaView style={{margin: 10, flex: 1}}>
          <List
            dataArray={this.props.products}
            renderRow={item => (
              <ListItem
                noIndent
                style={{borderWidth: 0, backgroundColor: '#455a64'}}>
                <Body>
                  <Text style={{color: '#fff'}}>{item.cropName}</Text>
                </Body>
                <Right>
                  <Button
                    transparent
                    onPress={() => this.deleteProduct(item.id)}>
                    <Text style={{color: '#007aff', fontWeight: 'bold'}}>
                      Sil
                    </Text>
                  </Button>
                </Right>
              </ListItem>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </SafeAreaView>
        <Item rounded style={{margin: 10}}>
          <Input
            placeholderTextColor={'gray'}
            placeholder="Ürün Adı"
            value={this.state.productName}
            onChangeText={value => this.setState({productName: value})}
          />
        </Item>
        <Button
          block
          style={{margin: 10}}
          onPress={() => this.addProduct(this.state.productName)}>
          <Text>Ekle</Text>
        </Button>
          <Text style={styles.errorTextStyle}>
              {this.state.error}
          </Text>
      </Content>
    );
  }
}


const styles = StyleSheet.create({
    errorTextStyle: {
        alignSelf: 'center',
        fontSize: 18,
        color: 'red'
    }
});

export {Products};
