import React, {Component} from 'react';
import {Text} from 'native-base';
import {service} from '../../services/service';
import {Body, Right, Content, Button, List, ListItem, Input} from 'native-base';

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
      <Content padder>
        <List
          dataArray={this.props.lands}
          renderRow={item => (
            <ListItem>
              <Body>
                <Text>{item.landName}</Text>
              </Body>
              <Right>
                <Button transparent onPress={() => this.deleteLand(item.id)}>
                  <Text>Delete</Text>
                </Button>
              </Right>
            </ListItem>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <Text>{'\n'}</Text>
        <Input
          placeholder="Arazi Adı"
          value={this.state.landName}
          onChangeText={value => this.setState({landName: value})}
        />
        <Button primary onPress={() => this.addLand(this.state.landName)}>
          <Text>Ekle</Text>
        </Button>
      </Content>
    );
  }
}

export {Land};
