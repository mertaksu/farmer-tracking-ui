import React, {Component} from 'react';
import {Item, Text} from 'native-base';
import {externalService} from '../../services/service';
import {Body, Right, Content, Button, List, ListItem, Input, Container} from 'native-base';
import {SafeAreaView, YellowBox, TouchableOpacity, StyleSheet} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';

YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);

const TOMTOM_API_KEY = 'Qodx75nrtD8C5T6nV89ZnaQt8eDgzzaG';

class Land extends Component {
  constructor(props) {
    super(props);
    this.state = {
      landName: '',
        places: [],
        placeQuery: '',
        selectedPlaceLat: '',
        selectedPlaceLon: '',
    };
    this.deleteLand = this.deleteLand.bind(this);
    this.addLand = this.addLand.bind(this);
  }

    onPressFn(name, lat, lon) {
        this.setState({placeQuery : name, selectedPlaceLat : lat, selectedPlaceLon: lon, places: []});
        console.log(name+" "+lat+" "+lon);
    }

    async findPlace(query) {
      if(query) {
        let apiUrl = "https://api.tomtom.com/search/2/search/"+query+".json?typeahead=false&countrySet=TR&key="+TOMTOM_API_KEY;
        await externalService(apiUrl, 'GET')
            .then(resp => {
                try {
                    let results = resp.results;
                    let places = [];
                    for (let val of results) {
                        if (val.type==="Geography") {
                            places.push({
                                name: val.address.freeformAddress,
                                address: val.address.freeformAddress,
                                lat: val.position.lat,
                                lon: val.position.lon,
                            });
                        }
                    }
                    this.setState({ places: places });
                } catch (error) {
                    return [];
                }
            }).catch(() => {});
      }
    }

  async deleteLand(id) {
    this.props.deleteLand(id);
  }

  async addLand(landName,lat,lon) {
    this.props.addLand(landName,lat,lon);
    this.setState({landName: '',places: [],placeQuery: '',selectedPlaceLat: '',selectedPlaceLon:''});
  }

  render() {
    return (
        <Container>
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
        <Item rounded style={{margin: 10}}>
          <Autocomplete
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.container}
              inputContainerStyle={{borderWidth: 0}}
              containerStyle={styles.autocompleteContainer}
              data={this.state.places}
              defaultValue={this.state.placeQuery}
              onChangeText={text => this.findPlace(text)}
              placeholder="Arazi Lokasyonu"
              placeholderTextColor={'gray'}
              renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => this.onPressFn(item.name, item.lat, item.lon)}>
                      <Text style={styles.itemText}>
                          <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                          {item.name !== item.address && '\n' + item.address}
                      </Text>
                  </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
          />
          </Item>
          <Button block
                  style={{margin: 10}}
                  onPress={() => this.addLand(this.state.landName,this.state.selectedPlaceLat,this.state.selectedPlaceLon)}>
              <Text>Ekle</Text>
          </Button>
        </Content>
        </Container>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 8,
        height: 50,
        color: '#000',
        paddingRight: 5,
        fontSize: 17,
        top: 1.5,
    },
    autocompleteContainer: {
        borderWidth: 0,
        height:50,
        borderRadius: 30,
        flex: 1,
        left: 0,
        right: 0,
        top: 0,
        zIndex: 1,
        position: 'relative',
    },
    itemText: {
        fontSize: 25,
        margin: 2,
    },
});

export {Land};
