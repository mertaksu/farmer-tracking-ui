import React, {Component} from 'react';
import {Item, Text} from 'native-base';
import {Body, Right, Content, Button, List, ListItem, Input, Container} from 'native-base';
import {SafeAreaView, YellowBox, StyleSheet,ScrollView,View} from 'react-native';
import PlacesInput from 'react-native-places-input';


YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);

const API_KEY = 'AIzaSyA5usjKDAhTUkdHFzsM8YawhYXJEY-0cig';
//Example api call for places
//https://maps.googleapis.com/maps/api/place/autocomplete/json?input=elbeyli&key=AIzaSyA5usjKDAhTUkdHFzsM8YawhYXJEY-0cig&inputtype=textquery&language=tr
class Land extends Component {
  constructor(props) {
    super(props);
    this.state = {
        landName: '',
        placeQuery: '',
        selectedPlaceLat: '',
        selectedPlaceLon: '',
        selectedPlaceName:'',
        error: '',
    };
    this.deleteLand = this.deleteLand.bind(this);
    this.addLand = this.addLand.bind(this);
  }

  async deleteLand(id) {
    this.props.deleteLand(id);
  }

  async addLand(landName,lat,lon, placeName) {
      if(landName==='')
          this.setState({error:'Arazi adı boş olamaz'});
      else if (lat==='' || lon==='')
          this.setState({error:'Arazi Lokasyonu boş olamaz'});
      else {
          this.props.addLand(landName,lat,lon, placeName);
          this.setState({landName: '',placeQuery: '',selectedPlaceLat: '',selectedPlaceLon:'',error:'',placeName:''});
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
                  <Text style={{color: '#fff'}}>{item.title}</Text>
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
                    onChangeText={value => this.setState({placeQuery: value})}
                    query={this.state.placeQuery}
                    stylesContainer={styles.placeInputContainerStyle}
                    stylesList={styles.placeInputListStyle}
                    googleApiKey={API_KEY}
                    placeHolder="Arazi Lokasyonu"
                    language={'tr'}
                    queryCountries={['tr']}
                    onSelect={place =>  {
                        this.setState({selectedPlaceLat : place.result.geometry.location.lat, selectedPlaceLon: place.result.geometry.location.lng, selectedPlaceName:place.result.formatted_address});
                    }}
                />
            </Item>
            <Button block
                    style={{margin: 10}}
                    onPress={() => this.addLand(this.state.landName,this.state.selectedPlaceLat,this.state.selectedPlaceLon, this.state.selectedPlaceName)}>
                <Text>Ekle</Text>
            </Button>
            <Text style={styles.errorTextStyle}>
                {this.state.error}
            </Text>
        </Content>
        </Container>
            </ScrollView>
        </View>
    );
  }

}

const styles = StyleSheet.create({
    placeInputContainerStyle: {
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
    },
    placeInputListStyle: {
        bottom:0,
        position: 'relative',
        borderColor: '#ffffff',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        left: -1,
        right: -1,
    },
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
