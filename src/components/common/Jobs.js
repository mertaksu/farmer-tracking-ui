import React, {Component, Fragment} from 'react';
import {
  Content,
  Icon,
  Picker,
  Form,
  Text,
  List,
  ListItem,
  Button,
  Right,
  Body,
  Separator,
  Left,
} from 'native-base';
import {View, StyleSheet, YellowBox} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import moment from 'moment';
import RadioForm from 'react-native-simple-radio-button';
import {SafeAreaView} from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';

YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);

const format = 'YYYY-MM-DD';
const today = moment().format(format);
const maxDate = moment()
  .add(365, 'days')
  .format(format);

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    arazi: 'Cakırca',
    ilac: 'İlaçlama',
    urun: 'Erik',
    tarih: '26.09.2020',
  },
  {
    id: 'bd7acbeb-c1b1-46c2-aed5-3ad53abb28ba',
    arazi: 'Boyalıca',
    ilac: 'Sulama',
    urun: 'Şeftali',
    tarih: '31.12.2020',
  },
];

LocaleConfig.locales.tr = {
  monthNames: [
    'Ocak',
    'Şubat',
    'Mart',
    'Nisan',
    'Mayıs',
    'Haziran',
    'Temmuz',
    'Ağustos',
    'Eylül',
    'Ekim',
    'Kasım',
    'Aralık',
  ],
  dayNames: [
    'Pazar',
    'Pazartesi',
    'Salı',
    'Çarşamba',
    'Perşembe',
    'Cuma',
    'Cumartesi',
  ],
  dayNamesShort: ['Paz', 'Pzt', 'Salı', 'Çarş', 'Perş', 'Cum', 'Ctesi'],
};
LocaleConfig.defaultLocale = 'tr';

const radioItems = [
  {label: 'Gübreleme  ', value: 0},
  {label: 'İlaçlama  ', value: 1},
  {label: 'Sulama  ', value: 2},
];

class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLand: undefined,
      selectedProduct: undefined,
      chosenDate: new Date(),
      markedDates: {},
      gubreRadio: false,
      ilacRadio: false,
      sulamaRadio: false,
      selectedRadio: 0,
      collapsed: false,
    };
    this.addPlan = this.addPlan.bind(this);
  }

  onDaySelect = day => {
    const selectedDay = moment(day.dateString).format(format);
    let selected = true;
    if (this.state.markedDates[selectedDay]) {
      selected = !this.state.markedDates[selectedDay].selected;
    }

    const updatedMarkedDates = {
      ...this.state.markedDates,
      ...{[selectedDay]: {selected}},
    };

    this.setState({markedDates: updatedMarkedDates});
  };

  addPlan() {
    const selectedDates = [];
    Object.entries(this.state.markedDates).map(([key, value]) => {
      if (value.selected) {
        selectedDates.push(key);
      }
    });
    const requestBody = {
      selectedProduct: this.state.selectedProduct,
      selectedLand: this.state.selectedLand,
      markedDates: selectedDates,
      selectedRadio: this.state.selectedRadio,
    };
    console.log('Add Plan:' + JSON.stringify(requestBody));
  }

  render() {
    return (
      <Fragment>
        <Content
          padder
          style={{backgroundColor: '#455a64'}}
          scrollEnabled={false}>
          <Collapse
            style={{backgroundColor: '#455a64'}}
            onToggle={isCollapsed => this.setState({collapsed: isCollapsed})}>
            <CollapseHeader>
              <View
                style={{
                  padding: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <Text style={{color: '#fff', fontWeight: 'bold'}}>
                  Yeni İş Ekle{' '}
                </Text>
                {this.state.collapsed ? (
                  <Icon name="md-arrow-dropup" color="white" />
                ) : (
                  <Icon name="md-arrow-dropdown" color="white" />
                )}
              </View>
            </CollapseHeader>
            <CollapseBody>
              <Content padder>
                <Form>
                  <View
                    style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <RadioForm
                      formHorizontal={true}
                      radio_props={radioItems}
                      initial={0}
                      onPress={value => {
                        this.setState({selectedRadio: value});
                      }}
                    />
                  </View>
                  <Picker
                    mode="dropdown"
                    iosHeader={'Arazi Seç'}
                    headerBackButtonText={'Geri'}
                    iosIcon={<Icon name="arrow-down" />}
                    placeholder="Arazi Seç"
                    placeholderStyle={{color: '#bfc6ea'}}
                    placeholderIconColor="#007aff"
                    style={{width: undefined}}
                    selectedValue={this.state.selectedLand}
                    onValueChange={item => this.setState({selectedLand: item})}>
                    {this.props.lands.map(v => {
                      return (
                        <Picker.Item
                          key={v.id}
                          label={v.landName}
                          value={v.id}
                        />
                      );
                    })}
                  </Picker>
                  <Picker
                    mode="dropdown"
                    iosHeader={'Ürün Seç'}
                    headerBackButtonText={'Geri'}
                    iosIcon={<Icon name="arrow-down" />}
                    placeholder="Ürün Seç"
                    placeholderStyle={{color: '#bfc6ea'}}
                    placeholderIconColor="#007aff"
                    style={{width: undefined}}
                    selectedValue={this.state.selectedProduct}
                    onValueChange={item =>
                      this.setState({selectedProduct: item})
                    }>
                    {this.props.products.map(v => {
                      return (
                        <Picker.Item
                          key={v.id}
                          label={v.cropName}
                          value={v.id}
                        />
                      );
                    })}
                  </Picker>
                  <View>
                    <View style={{alignItems: 'center'}}>
                      <Text
                        style={{
                          color: '#bfc6ea',
                          backgroundColor: 'transparent',
                        }}>
                        Tarih Seç
                      </Text>
                    </View>
                    <Calendar
                      minDate={today}
                      maxDate={maxDate}
                      style={styles.calendar}
                      onDayPress={this.onDaySelect}
                      markedDates={this.state.markedDates}
                      firstDay={1}
                      theme={{
                        calendarBackground: '#455a64',
                        textSectionTitleColor: 'white',
                        dayTextColor: 'white',
                        todayTextColor: 'white',
                        monthTextColor: 'white',
                      }}
                    />
                  </View>
                  <Button block onPress={() => this.addPlan()}>
                    <Text>Ekle</Text>
                  </Button>
                </Form>
              </Content>
            </CollapseBody>
          </Collapse>
          <SafeAreaView style={{backgroundColor: '#455a64', flex: 1}}>
            <List
              dataArray={DATA}
              renderRow={item => (
                <View style={{backgroundColor: '#455a64'}}>
                  <Separator
                    style={{
                      backgroundColor: '#4c6264',
                      flex: 1,
                      flexDirection: 'row',
                    }}>
                    <Left>
                      <Text style={{color: '#fff', fontWeight: 'bold'}}>
                        Planlanan İş
                      </Text>
                    </Left>
                    <Right>
                      <Button transparent>
                        <Text style={{color: '#007aff', fontWeight: 'bold'}}>
                          Sil
                        </Text>
                      </Button>
                    </Right>
                  </Separator>
                  <ListItem
                    noIndent
                    style={{borderWidth: 0, backgroundColor: '#455a64'}}>
                    <Body>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                        }}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                          }}>
                          <Text
                            style={{
                              width: '25%',
                              fontWeight: 'bold',
                              color: '#fff',
                            }}>
                            Arazi:
                          </Text>
                          <Text style={{color: '#fff'}}>{item.arazi}</Text>
                          <Text
                            style={{
                              width: '25%',
                              fontWeight: 'bold',
                              color: '#fff',
                            }}>
                            Ekin:
                          </Text>
                          <Text style={{color: '#fff'}}>{item.urun}</Text>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                          }}>
                          <Text
                            style={{
                              width: '33%',
                              fontWeight: 'bold',
                              color: '#fff',
                            }}>
                            İş:
                          </Text>
                          <Text style={{color: '#fff'}}>{item.ilac}</Text>
                          <Text
                            style={{
                              width: '32%',
                              fontWeight: 'bold',
                              color: '#fff',
                            }}>
                            Tarih:
                          </Text>
                          <Text style={{color: '#fff'}}>{item.tarih}</Text>
                        </View>
                      </View>
                    </Body>
                  </ListItem>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </SafeAreaView>
        </Content>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  calendar: {
    marginBottom: 10,
  },
  text: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'lightgrey',
    fontSize: 16,
  },
});

export {Jobs};
