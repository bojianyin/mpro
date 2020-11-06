import React from 'react';
import {Platform,BackHandler,NativeModules} from "react-native";
import { NavigationContext,useNavigation } from '@react-navigation/native';
import {Toast,Loading} from "./loading";

export default class Common extends React.Component {
  constructor(props) {
    super(props);
    Common.currentStackCount++;
    console.log("currentstackcount"+Common.currentStackCount);
  }


  static currentStackCount=0;

  static contextType = NavigationContext;

  componentWillMount(): void {
      BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillUnmount(): void {
      Common.currentStackCount--;
        // alert("unmount");
      console.log("currentstackcount"+Common.currentStackCount);
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
      // alert(Common.currentStackCount);
  }


  handleBackPress = () => {
      if(isload){
          Loading.hide();
          return true;
      }
      if((Common.currentStackCount)<=1){
          if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
              //最近2秒内按过back键，可以退出应用。
              // BackHandler.exitApp();
              NativeModules.BackHome.go();
              return;
          }
          this.lastBackPressed = Date.now();
          Toast.show('再按一次返回桌面');
          return true;
      }else{

         return false;


      }

  };


  /**
     * @params timeStr String
     * @params accuracy 精确度 ["date","time"]
     * @description
     * @author
     * @time
  */
  exportTime(timeStr,accuracy='time'){
       let res,reg;
       if(accuracy==="time"){
           reg=/\d{0,4}\-\d{0,2}\-\d{0,2}T\d{0,2}:\d{0,2}:\d{0,2}[\.\d{0,3}]*/;
           res=timeStr.match(reg)[0];
           res=res.replace(/T/g," ");
       }
       else if(accuracy==="date"){
           reg=/\d{0,4}\-\d{0,2}\-\d{0,2}/;
           res=timeStr.match(reg);
           if(!res){
                res='';
           }else{
               res=timeStr.match(reg)[0];
           }

       }

       return res;
  }


}
