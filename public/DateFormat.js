/**
 * Descrip:
 * Author: Administrator
 * Time: 2018/8/20
 * Version:
 */
export default class DateFormat{
    static currDateFormat(num,time=false){
        let date = time?new Date(time):new Date();
        let seperator1 = "-";
        let seperator2 = ":";
        let seperator3 = ".";
        let seperator4 = "/";
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        let strHours=date.getHours();
        let strMinutes=date.getMinutes();
        let miao=date.getSeconds();
        if (month <= 9) {
            month = "0" + month;
        }
        if (strDate <= 9) {
            strDate = "0" + strDate;
        }
        if (strHours <= 9) {
            strHours = "0" + strHours;
        }
        if (strMinutes <= 9) {
            strMinutes = "0" + strMinutes;
        }
        if(miao<=9){
            miao="0"+miao;
        }
        let currentdate1 = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + strHours + seperator2 + strMinutes
            + seperator2 + miao;
        let currentdate2 = date.getFullYear() + seperator1 + month + seperator1 + strDate;
        let currentdate3 = date.getFullYear() + seperator3 + month + seperator3 + strDate;
        let currentdate4 = date.getFullYear() + seperator3 + month + seperator3 + strDate+" "+ strHours + seperator2 + strMinutes+seperator2 + miao;
        let currentdate5 = month + seperator4 + strDate+" "+ strHours + seperator2 + strMinutes;
        let currentdate6 = strMinutes+seperator2 + miao;
        let currentdate7=miao;
        let currentdate8 = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + miao;
        if(num == 1){
            return currentdate1;
        }else if(num==2){
            return currentdate2;
        }else if(num==3){
            return currentdate3;
        }else if(num==4){
            return currentdate4;
        }else if(num==5){
            return currentdate5;
        }else if(num==6){
            return currentdate6;
        }else if(num==7){
            return currentdate7;
        }else if(num==8){
            return currentdate8;
        }
    }
}
