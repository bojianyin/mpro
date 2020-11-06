import {Keyboard} from "react-native";
import Picker from "react-native-picker";
//Picker.isPickerShow
export function startSelect(data,title,arrgen,cancle){
    return new Promise((resolve, reject)=>{
        Keyboard.dismiss();
        Picker.init({
            pickerData:data,
            pickerConfirmBtnText: '确认',
            pickerCancelBtnText: '取消',
            pickerTitleText: title,
            pickerConfirmBtnColor: [255, 183, 36, 1],
            pickerCancelBtnColor: [144,144,144,1],
            pickerTitleColor: [51,51,51,1],
            pickerFontColor:[0,0,0,1],
            onPickerConfirm: arrgen,
            onPickerCancel: cancle,
        });
        Picker.show();
    })

}
