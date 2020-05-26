//This is an example code for NavigationDrawer//
import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, Text } from 'react-native';
// import all basic components

export default class Screen2 extends Component {
    //Screen2 Component
    render() {
        return (
            <View style={styles.MainContainer}>
                <Text style={{ fontSize: 23 }}> Screen 2 </Text>
            </View>
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
});
