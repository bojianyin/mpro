import React, {Component} from "react";
import {StyleSheet, View, Text,Button} from "react-native";
import {HeaderBackButton} from "@react-navigation/stack";
import {NavigationContext} from "@react-navigation/native";

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    static contextType = NavigationContext;

    render() {
        return (
            <View style={{flex:1}}>
                <Button title={"hello world!"} onPress={()=>this.props.navigation.navigate("Newstack")}/>
                <Button title={"hello world!"} onPress={()=>this.props.navigation.navigate("Newstack")}/>
                <Button title={"hello world!"} onPress={()=>this.props.navigation.navigate("Newstack")} />
            </View>
        );
    }

}
