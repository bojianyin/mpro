import React, {Component} from "react";
import {StyleSheet, View, Text,TextInput,TouchableOpacity} from "react-native";
import {gh,gw,gfont} from "../public/screenUtil";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
            name:"",
            pass:"",
        }
    }

    render() {
        return (
            <View style={{flex:1,backgroundColor:"#fff",alignItems:"center"}}>
                <View style={{width:gw(680),marginTop:gh(500)}}>
                    <TextInput
                        placeholder={"请输入账户名"}
                        value={this.state.name}
                        onChangeText={name=>this.setState({name})}
                        style={style.inp}
                    />
                    <TextInput
                        placeholder={"请输入密码"}
                        value={this.state.pass}
                        onChangeText={pass=>this.setState({pass})}
                        style={style.inp}
                    />

                    <TouchableOpacity style={{borderRadius:5,width:gw(680),height: gh(80),justifyContent: "center",alignItems:"center",backgroundColor:"#0495ea",marginTop:gh(50)}} onPress={()=>{
                        this.props.navigation.navigate("Home");
                    }}>
                        <Text style={{fontSize:gfont(30),color:"#fff"}}>登录</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const style=StyleSheet.create({
    inp:{
        height:gh(80),
        justifyContent:"center",
        fontSize:gfont(28),
        borderBottomWidth:1,
        borderBottomColor:"#eee",
        paddingBottom:gh(10),
        marginTop:gh(20)
    }
})
