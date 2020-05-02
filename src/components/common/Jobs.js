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
  Left, Container,
} from 'native-base';
import {View, StyleSheet, YellowBox} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import moment from 'moment';
import RadioForm from 'react-native-simple-radio-button';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import Loader from "./Loader";

YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);

const format = 'YYYY-MM-DD';
const today = moment().format(format);
const maxDate = moment()
  .add(365, 'days')
  .format(format);

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
  {label: 'Gübreleme  ', value: "Gübreleme"},
  {label: 'İlaçlama  ', value: "İlaçlama"},
  {label: 'Sulama  ', value: "Sulama"},
];

class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLand: props.lands.length>0 ? props.lands[0].id : '',
      selectedProduct: props.products.length>0 ? props.products[0].id : '',
      chosenDate: new Date(),
      markedDates: {},
      gubreRadio: false,
      ilacRadio: false,
      sulamaRadio: false,
      selectedRadio: 'Gübreleme',
      collapsed: false,
      error: '',
      loading: false,
    };
    this.addPlan = this.addPlan.bind(this);
    this.deletePlan = this.deletePlan.bind(this);
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

  async addPlan() {
    const selectedDates = [];
    Object.entries(this.state.markedDates).map(([key, value]) => {
      if (value.selected) {
        selectedDates.push(key);
      }
    });
    const requestBody = {
      cropId: this.state.selectedProduct,
      landId: this.state.selectedLand,
      planDate: selectedDates,
      planType: this.state.selectedRadio,
    };
    if(this.state.selectedProduct==='') {
      this.setState({error:'Ürün Seçimi zorunludur'});
    }
    else if(this.state.selectedLand==='') {
      this.setState({error:'Arazi Seçimiz zorunludur'});
    }
    else if(selectedDates.length===0) {
      this.setState({error:'Tarih Seçimiz zorunludur'});
    }
    else {
      this.setState({loading: true});
      this.props.addPlan(requestBody);

      this.setState({selectedProduct: this.props.products ? this.props.products[0].id : ''});
      this.setState({selectedLand: this.props.lands ? this.props.lands[0].id : ''});
      this.setState({markedDates: {}});
      this.setState({collapsed: false});
      this.setState({error:''});
      this.setState({loading: false});
    }
  }

  async deletePlan(id) {
    this.props.deletePlan(id);
  }

  render() {
    return (
      <Fragment>
        <Loader
            loading={this.state.loading} />
        <Content
          padder
          style={{backgroundColor: '#455a64'}}
          scrollEnabled={false}>
          <Collapse
            style={{backgroundColor: '#455a64'}}
            isCollapsed={this.state.collapsed}
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
                      labelColor={'#bfc6ea'}
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
                    textStyle={{color: '#bfc6ea'}}
                    placeholderStyle={{color: '#bfc6ea'}}
                    placeholderIconColor="#007aff"
                    style={{width: undefined}}
                    selectedValue={this.state.selectedLand}
                    onValueChange={item => this.setState({selectedLand: item})}>
                    {this.props.lands!=null && this.props.lands.map(v => {
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
                    textStyle={{color: '#bfc6ea'}}
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
                  <Text style={styles.errorTextStyle}>
                    {this.state.error}
                  </Text>
                </Form>
              </Content>
            </CollapseBody>
          </Collapse>
            <List
              dataArray={this.props.plans}
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
                      <Button transparent onPress={() => this.deletePlan(item.farmerPlanId)}>
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
                              width: '20%',
                              fontWeight: 'bold',
                              color: '#fff',
                            }}>
                            Arazi:
                          </Text>
                          <Text style={{color: '#fff',width: '40%'}}>{item.landName}</Text>
                          <Text
                            style={{
                              width: '20%',
                              fontWeight: 'bold',
                              color: '#fff',
                            }}>
                            Ekin:
                          </Text>
                          <Text style={{color: '#fff',width: '40%'}}>{item.cropName}</Text>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                          }}>
                          <Text
                            style={{
                              width: '20%',
                              fontWeight: 'bold',
                              color: '#fff',
                            }}>
                            İş:
                          </Text>
                          <Text style={{color: '#fff',width: '40%'}}>{item.planType}</Text>
                          <Text
                            style={{
                              width: '20%',
                              fontWeight: 'bold',
                              color: '#fff',
                            }}>
                            Tarih:
                          </Text>
                          <Text style={{color: '#fff',width: '40%'}}>{item.planDate}</Text>
                        </View>
                      </View>
                    </Body>
                  </ListItem>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
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
  errorTextStyle: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red'
  }
});

export {Jobs};
