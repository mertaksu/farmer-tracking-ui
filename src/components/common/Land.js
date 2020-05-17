import React, {Component} from 'react';
import {Item, Text} from 'native-base';
import {externalService} from '../../services/service';
import {Body, Right, Content, Button, List, ListItem, Input, Container, Footer} from 'native-base';
import {SafeAreaView, YellowBox, StyleSheet,ScrollView,View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Autocomplete from 'react-native-autocomplete-input';
import PlacesInput from 'react-native-places-input';
import {textColor} from "react-native-calendars/src/style";


YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);

const GOOGLE_API_KEY = 'AIzaSyA5usjKDAhTUkdHFzsM8YawhYXJEY-0cig';

class Land extends Component {
  constructor(props) {
    super(props);
    this.state = {
        landName: '',
        places: [],
        placeQuery: '',
        selectedPlaceLat: '',
        selectedPlaceLon: '',
        error: ''
    };
    this.deleteLand = this.deleteLand.bind(this);
    this.addLand = this.addLand.bind(this);
    this.findPlace = this.findPlace.bind(this);
    this.selectPlace = this.selectPlace.bind(this);
  }

    selectPlace(name, lat, lon) {
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
                        if (val.type==="Geography" || val.type==="POI") {
                            places.push({
                                name: val.address.municipality+"("+val.address.municipalitySubdivision+")",
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
      if(landName==='')
          this.setState({error:'Arazi adı boş olamaz'});
      else if (lat==='' || lon==='')
          this.setState({error:'Arazi Lokasyonu boş olamaz'});
      else {
          this.props.addLand(landName,lat,lon);
          this.setState({landName: '',places: [],placeQuery: '',selectedPlaceLat: '',selectedPlaceLon:'',error:''});
      }
  }

  render() {
    return (
        <View style={{flex:1}}>
            <ScrollView
                keyboardShouldPersistTaps="always">
        <Container style={{flex:1}}>
        <Content
        padder
        style={{flex:1,backgroundColor: '#455a64',height:50}}
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
                <PlacesInput
                    stylesContainer={{
                        position: 'relative',
                        alignSelf: 'stretch',
                        margin: 0,
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        shadowOpacity: 0,
                        borderColor: '#455a64',
                        borderWidth: 2,
                        marginBottom: 0,
                        borderRadius: 30,
                        backgroundColor: '#455a64',
                        flex: 1,
                        zIndex: 1,
                        placeHolderTextColor: '#808080'
                    }}
                    stylesList={{
                        bottom:0,
                        position: 'relative',
                        borderColor: '#ffffff',
                        borderLeftWidth: 1,
                        borderRightWidth: 1,
                        borderBottomWidth: 1,
                        left: -1,
                        right: -1,
                    }}
                    googleApiKey={GOOGLE_API_KEY}
                    placeHolder="Arazi Lokasyonu"
                    language={'tr'}
                    queryCountries={['tr']}
                    onSelect={place => console.log("Lat:"+place.result.geometry.location.lat+" Lon:"+place.result.geometry.location.lat)}
                />
            </Item>
            <Text style={styles.errorTextStyle}>
                {this.state.error}
            </Text>
            <Button block
                    style={{margin: 10}}
                    onPress={() => this.addLand(this.state.landName,this.state.selectedPlaceLat,this.state.selectedPlaceLon)}>
                <Text>Ekle</Text>
            </Button>
        </Content>
        </Container>
            </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 8,
        color: '#000',
        paddingRight: 5,
        fontSize: 17,
        top: 1.5,
        margin:10
    },
    autocompleteContainer: {
        borderWidth: 0,
        borderRadius: 30,
        flex: 1,
        left: 0,
        right: 0,
        top: 0,
        zIndex: 1,
        position: 'relative',
    },
    itemText: {
        fontSize: 15,
        margin: 2,
    },
    errorTextStyle: {
        alignSelf: 'center',
        fontSize: 18,
        color: 'red'
    }
});

export {Land};
