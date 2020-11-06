import React, {Component} from "react";
import {StyleSheet, View, Text,TouchableOpacity,Image} from "react-native";
import {gfont, gh, gw} from "../public/screenUtil";
import NavigationService from "../public/NavigationService";
import {NavigationActions} from "@react-navigation/compat";



export default class Setting extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex:1}}>
                <TouchableOpacity
                    style={{flexDirection: 'row', paddingLeft: gw(28), height: gh(116), alignItems: 'center',backgroundColor:"#fff"}}
                    onPress={() => this.props.navigation.navigate('Newstack')}
                >
                    <Image source={require("../resource/setting.png")} resizeMode={'contain'} style={{marginRight: gw(28)}}/>
                    <Text>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{flexDirection: 'row', paddingLeft: gw(28), height: gh(116), alignItems: 'center',backgroundColor:"#fff"}}
                    onPress={() => this.props.navigation.navigate('Newstack')}
                >
                    <Image source={require("../resource/setting.png")} resizeMode={'contain'} style={{marginRight: gw(28)}}/>
                    <Text>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{flexDirection: 'row', paddingLeft: gw(28), height: gh(116), alignItems: 'center',backgroundColor:"#fff"}}
                    onPress={() => this.props.navigation.navigate('Newstack')}
                >
                    <Image source={require("../resource/setting.png")} resizeMode={'contain'} style={{marginRight: gw(28)}}/>
                    <Text>Forgot Password</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{flexDirection: 'row', paddingLeft: gw(28), height: gh(116), alignItems: 'center',backgroundColor:"#fff"}}
                    onPress={() => this.props.navigation.navigate('Newstack')}
                >
                    <Image source={require("../resource/setting.png")} resizeMode={'contain'} style={{marginRight: gw(28)}}/>
                    <Text>404 page</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{flexDirection: 'row', paddingLeft: gw(28), height: gh(116), alignItems: 'center',backgroundColor:"#fff"}}
                    onPress={() => {

                        NavigationService.navigate("Newstack")
                    }}
                >
                    <Image source={require("../resource/setting.png")} resizeMode={'contain'} style={{marginRight: gw(28)}}/>
                    <Text>Blank page</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
