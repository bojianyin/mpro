/**
 * Created by guangqiang on 2017/12/12.
 */
import React, {Component} from 'react'
import {View, StyleSheet, ActivityIndicator, Dimensions,Text,Platform,NativeModules} from 'react-native'
import RootSiblings from 'react-native-root-siblings'
import {Toast as tst,Overlay,Label} from "teaset"
import {gfont, gh} from "./screenUtil";
import M from "../conf/methodCommon";


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const MyToast=NativeModules.OpenSettings;


M.IsHieght();


let overlayView = (txt)=>{
    return (
        <Overlay.View
            style={{alignItems: 'center', justifyContent: 'center'}}
            modal={false}
            overlayOpacity={0}
        >
            <View style={{backgroundColor: 'rgba(0,0,0,.5)',width:80,height:80,borderRadius: 15, justifyContent:"center",alignItems: 'center'}}>
                <Label style={{color: '#fff'}} size='xl' text={txt} />
            </View>
        </Overlay.View>
    );
};

let sibling = undefined;
let _mask=undefined;

const Loading = {

    aaa:undefined,
    show: (msg) => {
        global.isload=true;
        sibling = new RootSiblings(
            <View style={[styles.maskStyle,{height:height}]} ref={(r)=>Loading.aaa=r}>
                <View style={styles.backViewStyle}>
                    <ActivityIndicator size="large" color="#ED4040" />
                    {
                        msg?
                        <Text style={{color:"#fff"}}>{msg}</Text>
                        :
                        null
                    }
                    <Text style={{fontSize:gfont(25),color:"#fff",marginTop:gh(25)}}
                        onPress={()=>Loading.hide()}
                    >取消加载</Text>

                </View>
            </View>
            ,()=>{
                Loading.aaa.setNativeProps({
                    style:{
                        height:M.hei
                    }
                });
            }
        );

    },

    hide: ()=> {
        global.isload=false;
        if (sibling instanceof RootSiblings) {
            sibling.destroy()
        }
    },

    mask:()=>{
        _mask = new RootSiblings(
            <View style={styles.maskStyle}>

            </View>
        )
    },

    hidemask:()=>{
        if (_mask instanceof RootSiblings) {
            _mask.destroy()
        }
    },





};

const Toast = {
    key:0,

    toast: null,

    show: (msg,pos='bottom') => {
        if(Platform.OS==='android'){
            MyToast.showToast(msg,false);
        }else{
            tst.message(msg,1500,pos);
        }

    },

    showLong: msg => {
        if(Platform.OS==='android'){
            MyToast.showToast(msg, true);
        }else {
            tst.message(msg, 3000, 'bottom');
        }

    },
    overlayViewshow:(t)=>{
        Overlay.hide(this.key);
        this.key = Overlay.show(overlayView(t));
    }
};


let styles = StyleSheet.create({
    maskStyle: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, .3)',
        width: width,
        // height: height,
        alignItems: 'center',
        justifyContent: 'center'
    },
    backViewStyle: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    }
});


export {Loading,Toast}
