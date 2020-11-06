import React,{Component} from "react"
import {
    Text, View, StyleSheet, Image, StatusBar,TouchableOpacity,Platform
} from "react-native"
import image from "../image/"
import {gw,gh,gfont} from "./screenUtil"
import PropTypes from 'prop-types'
import {isIPhoneXFooter,isIphoneX} from './Phonex';

export default class Header extends Component{
    constructor(prop){
        super(prop);
    }

    static propTypes={
        barStyle:PropTypes.string,
        name:PropTypes.string,
        push:PropTypes.func,
        isback:PropTypes.bool,
        headerback:PropTypes.string,
        url:PropTypes.any,
        txtcolor:PropTypes.string,
        txtpress:PropTypes.func,
        txtname:PropTypes.string,
        righttype:PropTypes.bool,
        them:PropTypes.string
    };

    static defaultProps={
        isback:true,
        barStyle:"dark-content",
        headerback:"#ED4040",
        headertype:"pic",
        txtcolor:"#fff",
        txtname:"添加优惠券",
        righttype:false,
        them:"#000"
    }

    render(){
        return (
            <View style={{zIndex:1}}>
                <StatusBar
                    translucent={true}
                    animated={true}
                    backgroundColor={"transparent"}
                    barStyle={this.props.barStyle}
                />
                <View style={{height:StatusBar.currentHeight||(isIphoneX()?44:20),backgroundColor:this.props.headerback }} />
                <View style={[style.con,{
                    backgroundColor:this.props.headerback,
                }]}>
                    {this.props.isback?
                        <TouchableOpacity style={style.left} onPress={()=>{
                            if(this.props.gobackcall){
                                this.props.gobackcall();
                                return ;
                            }
                            this.props.nav.goBack();
                        }}>

                            <View>
                                <Image source={image.Home.back} style={{marginLeft:gw(24),tintColor: this.props.them}}/>
                            </View>
                        </TouchableOpacity>
                        :
                        null
                    }

                    <View style={style.center}>
                        <Text style={{fontSize:gfont(35),color:this.props.them}}>{this.props.name}</Text>
                    </View>

                    {this.props.righttype==true?
                        <TouchableOpacity style={style.shouhoubtn} onPress={this.props.push}>
                            <View>
                                <Image source={this.props.url} resizeMode={"contain"}/>
                            </View>
                        </TouchableOpacity>
                        :
                        null
                    }

                    {this.props.headertype=="pic"?
                    <TouchableOpacity style={style.right} onPress={this.props.push}>
                        <View>
                            <Image source={this.props.url} resizeMode={"contain"}/>
                        </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={style.right2} onPress={this.props.txtpress}>
                        <Text style={[style.righttext,{color:this.props.txtcolor}]}>{this.props.txtname}</Text>
                    </TouchableOpacity>}
                </View>
            </View>
        );
    }
}

const style=StyleSheet.create({
con:{height:gh(100), justifyContent:"center"},
center:{alignItems:"center"},
left:{position:"absolute", left:0, zIndex:2, height:"100%", justifyContent:"center", width:gw(104),},
right:{position:"absolute",right:0,alignItems:"center",zIndex:2, height:gh(100), justifyContent:"center", width:gw(100),},
right2:{position:"absolute", right:gw(20), zIndex:2, height:gh(100), justifyContent:"center", alignItems:"center",minWidth:gw(100)},
righttext:{ fontSize: gfont(28)},
shouhoubtn:{position:"absolute",right:gh(130),height:gh(100),width:gw(100),alignItems:"flex-end",justifyContent:"center"},
})
