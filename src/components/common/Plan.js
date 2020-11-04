import React, {Component, Fragment} from 'react';
import {StyleSheet, View, YellowBox} from 'react-native';
import {Icon, Form, Picker, Text, Button, Content} from 'native-base';
import RadioForm from "react-native-simple-radio-button";
import {Calendar, LocaleConfig} from "react-native-calendars";
import moment from "moment";
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

export default class Plan extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedLand: this.props.route.params.lands.length>0 ? this.props.route.params.lands[0].id : '',
            selectedProduct: this.props.route.params.products.length>0 ? this.props.route.params.products[0].id : '',
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
        if (this.state.selectedProduct === '') {
            this.setState({error: 'Ürün Seçimi zorunludur'});
        } else if (this.state.selectedLand === '') {
            this.setState({error: 'Arazi Seçimiz zorunludur'});
        } else if (selectedDates.length === 0) {
            this.setState({error: 'Tarih Seçimiz zorunludur'});
        } else {
            this.setState({loading: true});
            await this.props.route.params.planAddCallback(requestBody);

            this.setState({selectedProduct: this.props.route.params.products ? this.props.route.params.products[0].id : ''});
            this.setState({selectedLand: this.props.route.params.lands ? this.props.route.params.lands[0].id : ''});
            this.setState({markedDates: {}});
            this.setState({collapsed: false});
            this.setState({error: ''});
            this.setState({loading: false});
            this.props.navigation.goBack();
        }
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
                <Form>
                    <View
                        style={{backgroundColor: '#455a64',flex: 1,flexDirection: 'row', justifyContent: 'center'}}>
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
                        {this.props.route.params.lands!==undefined && this.props.route.params.lands.map(v => {
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
                        {this.props.route.params.products!==undefined && this.props.route.params.products.map(v => {
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
            </Fragment>
        )
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
