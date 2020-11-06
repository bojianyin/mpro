/**
 * igroup [Array]
 * eg:[{url:"..."}]
 * */
import React from "react";
import {Text, StatusBar, View, CameraRoll, TouchableOpacity, Platform, Image} from "react-native";
import ImageViewer from 'react-native-image-zoom-viewer';
import {Toast} from "./loading";
import {gfont,gh,gw} from "./screenUtil"
// import image from "../src/image";
import Imgres from "../image/";
import Common from "../public/common";

export default class ImageShow extends Common {
    constructor(props){
        super(props);
        const params=props.route.params;
        this.imagegroup=props.igroup?props.igroup:params.igroup;
        this.currindex=params.currindex?params.currindex:0;
        this.currentindex=this.currindex;
        StatusBar.setHidden(true);
    }

    static navigationOptions = {
        tabBarVisible: false,
        header: null,
    };

    render(){
        return <View style={{flex:1}}>
            <TouchableOpacity style={{zIndex:50,width:gw(60),height:gh(60),
                justifyContent:"center",alignItems:"center",
                borderRadius:100,
                backgroundColor:"rgba(0,0,0,.5)",
                position:"absolute",left:gw(30),top:gh(30)}} onPress={()=>{
                this.props.navigation.goBack();
            }}>
                <View>
                    <Image source={Imgres.Home.back} style={{tintColor:"#fff"}}/>
                </View>
            </TouchableOpacity>
            <ImageViewer imageUrls={this.imagegroup}
                         saveToLocalByLongPress={false}
                         onChange={(index)=>{
                             this.currentindex=index;
                         }}
                         index={Number(this.currindex)}

            />
            {/*<TouchableOpacity style={{*/}
                {/*width:gh(250),*/}
                {/*height:gh(80),*/}
                {/*backgroundColor:"rgba(0,0,0,.5)",*/}
                {/*justifyContent:"center",*/}
                {/*alignItems:"center",*/}
                {/*position:'absolute',*/}
                {/*bottom:gh(20),*/}
                {/*right:gw(30),*/}
                {/*zIndex:999*/}
            {/*}} onPress={()=>{*/}
                {/*const Promisefn=CameraRoll.saveToCameraRoll(this.imagegroup[this.currentindex]['url']);*/}
                {/*Promisefn*/}
                    {/*.then((res)=>{*/}
                        {/*Toast.show("已保存到相册");*/}
                    {/*})*/}
                    {/*.catch((r)=>{*/}
                        {/*Toast.show("保存失败");*/}
                    {/*});*/}
            {/*}}>*/}
                {/*<View>*/}
                    {/*<Text style={{fontSize:gfont(40),color:"#fff"}}>保存到相册</Text>*/}
                {/*</View>*/}
            {/*</TouchableOpacity>*/}
        </View>;
    }

    componentWillUnmount(): void {
        super.componentWillUnmount();
        StatusBar.setHidden(false);
    }

}
