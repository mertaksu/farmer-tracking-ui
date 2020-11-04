import * as React from 'react';
import {
    Text,
    View,
    SafeAreaView, StyleSheet
} from 'react-native';

import Carousel from 'react-native-snap-carousel';
import {Image} from 'react-native';
import {Body, List, ListItem, Separator} from "native-base";

const img = {
    '01d':require('../../images/icons/01d.png'),
    '02d':require('../../images/icons/02d.png'),
    '03d':require('../../images/icons/03d.png'),
    '04d':require('../../images/icons/04d.png'),
    '09d':require('../../images/icons/09d.png'),
    '10d':require('../../images/icons/10d.png'),
    '11d':require('../../images/icons/11d.png'),
    '13d':require('../../images/icons/13d.png'),
    '50d':require('../../images/icons/50d.png'),
    '01n':require('../../images/icons/01n.png'),
    '02n':require('../../images/icons/02n.png'),
    '03n':require('../../images/icons/03n.png'),
    '04n':require('../../images/icons/04n.png'),
    '09n':require('../../images/icons/09n.png'),
    '10n':require('../../images/icons/10n.png'),
    '11n':require('../../images/icons/11n.png'),
    '13n':require('../../images/icons/13n.png'),
    '50n':require('../../images/icons/50n.png'),
};


export default class MyCarousel extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            img: [],
            activeIndex:0,
            weatherList: []
        };
    }

    componentDidMount() {
        this.state.img = img;
    }

    _renderItem({item,index}){
        return (
            <View style={{
                backgroundColor:'#455a64',
                height: 600,
                padding: 5,
                marginLeft: 5,
                marginRight: 10, }}>
                <Text style={{fontSize: 30}}>{item.title}</Text>
                <Text>{item.placeName}</Text>
                <List
                    dataArray={item.dailyWeatherList}
                    renderRow={it => (
                        <View style={{backgroundColor: '#455a64'}}>
                            <Separator
                                style={{
                                    backgroundColor: '#4c6264',
                                    flex: 1,
                                    flexDirection: 'row',
                                }}>
                            </Separator>
                            <ListItem
                                noIndent
                                style={{borderWidth: 0, backgroundColor: '#4c6264'}}>
                                <Body>
                                    <View
                                        style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                        <Text style={styles.valueText}>{it.day}</Text>
                                        <Image source={img[it.icon]}/>
                                        <Text style={styles.valueText}>{it.centigrade}</Text>
                                        <Text style={styles.valueText}>{it.desc}</Text>
                                    </View>
                                </Body>
                            </ListItem>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>

        )
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1, paddingTop: 50, }}>
                <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
                    <Carousel
                        layout={"default"}
                        ref={ref => this.carousel = ref}
                        data={this.props.data}
                        sliderWidth={400}
                        itemWidth={400}
                        renderItem={this._renderItem}
                        onSnapToItem = { index => this.setState({activeIndex:index}) } />
                </View>
            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        paddingTop: 20,
        alignItems: 'center',
        marginTop: 50,
        justifyContent: 'center',
    },
    container: {
        backgroundColor: '#455a64',
        flex: 1,
    },
    valueText: {
        flex:1,
        color: '#fff',
        width: '25%'
    },
});
