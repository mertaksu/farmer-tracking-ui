import React, {Component} from 'react';
import {Item, Text} from 'native-base';
import {service} from '../../services/service';
import {Body, Right, Content, Button, List, ListItem, Input} from 'native-base';
import {SafeAreaView, YellowBox} from 'react-native';

YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);

class Land extends Component {
  constructor(props) {
    super(props);
    this.state = {
      landName: '',
    };
    this.deleteLand = this.deleteLand.bind(this);
    this.addLand = this.addLand.bind(this);
    this.getLand = this.getLand.bind(this);
  }

  async deleteLand(id) {
    this.props.deleteLand(id);
  }

  async addLand(landName) {
    this.props.addLand(landName);
    this.setState({landName: ''});
  }

  getLand() {
    console.log('Get Land Called');
    service('/land/727', 'GET')
      .then(response => this.setState({lands: response}))
      .catch(error => console.log(error));
  }

  componentDidMount() {
    this.getLand();
  }

  render() {
    return (
      <Content
        padder
        style={{backgroundColor: '#455a64'}}
        scrollEnabled={false}>
        <SafeAreaView style={{margin: 10, flex: 1}}>
          <List
            dataArray={this.props.lands}
            renderRow={item => (
              <ListItem
                noIndent
                style={{borderWidth: 0, backgroundColor: '#455a64'}}>
                <Body>
                  <Text style={{color: '#fff'}}>{item.landName}</Text>
                </Body>
                <Right>
                  <Button transparent onPress={() => this.deleteLand(item.id)}>
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
            placeholder="Arazi Adı"
            value={this.state.landName}
            onChangeText={value => this.setState({landName: value})}
          />
        </Item>
        <Button
          block
          style={{margin: 10}}
          onPress={() => this.addLand(this.state.landName)}>
          <Text>Ekle</Text>
        </Button>
      </Content>
    );
  }
}

export {Land};
