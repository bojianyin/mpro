import React, {Component} from "react";
import {StyleSheet, View, Text} from "react-native";

export default class Command extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex:1}}>
                <Text>this is Command page!</Text>
            </View>
        );
    }
}
