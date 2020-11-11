import React, {Component} from "react";
import {StyleSheet, View, Text} from "react-native";
import Common from "../../public/common";
import { WebView } from 'react-native-webview';

export default class Webcom extends Common {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex:1}}>
                <View style={{flex:1}}>
                    <WebView source={{uri:"static.bundle/index.html"}}
                             originWhitelist={['*']}
                    />
                </View>
            </View>
        );
    }
}
