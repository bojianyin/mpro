const phonenum=/^1[3456789]\d{9}$/;//手机号正则
const idcard=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;//身份证正则
const yyzz=/^\d{15}$|^[0-9ABCDEFGHJKLMNPQRTUWXY]{2}[0-9]{6}[0-9ABCDEFGHJKLMNOPQRTUWXY]{10}$/;//营业执照正则
const banknum=/^([1-9]{1})(\d{11,19})$/;//银行卡正则
export function tonumber(obj,arund=false){
    let str = "";

    // const
    str = obj.replace(/[^\d.]/g, "");
    //必须保证第一位为数字而不是.
    str = str.replace(/^\./g, "");
    //保证只有出现一个.而没有多个.
    str = str.replace(/\.{2,}/g, ".");
    //保证.只出现一次，而不能出现两次以上
    str = str.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    if(/^[0]+\d+$/.test(str)) {
        str=str.replace(/[0]+/g,"");
    }
    if(str.indexOf(".")!=-1){
        if(str.split(".")[1].length>2){
            if(arund){
                str=String(Number(str).toFixed(2));
            }else{
                let res=str.split(".");
                str=res[0]+'.'+res[1].substr(0,2);
            }
        }
    }
    return str;

    /*let str="";
    if(/^[0]+[\.]{1}\d+$/.test(_string)){
        str = "0."+_string.split('.')[1];
    }else if(/^[0]+\d+$/.test(_string)) {
        str=_string.replace(/[0]+/g,"");
    }else if(/(^\d+[\.]*\d+$)|(^\d+[\/]*\d+$)/.test(_string)) {
    return _string.replace(/[\/]*!/g,"");
}else{
    str = _string.replace(/(0)|([^\d]+[\.]*[^\d]+)/g,"");
}
return str;*/
}

//纯数字
export function toint(str){
    const reg=/^[^0-9]{1,}\d*/g;
    return reg.test(str)?str.replace(reg,""):tonumber(str.trim()).replace(/\./g,"");
}
/*手机号验证*/
export function phoneyz(str) {
    return phonenum.test(str)
}
/*身份证号验证*/
export function idcardyz(str) {
    return idcard.test(str)
}
/*营业执照验证*/
export function yyzzyz(str) {
    return yyzz.test(str)
}
/*银行卡验证*/
export function banmyz(str) {
    return banknum.test(str)
}


/**
 * @params
 * @description 重写加法运算
 * @author
 * @time
 */
export function floatAdd(arg1=0,arg2=0){
    var r1, r2, m, c;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
        var cm = Math.pow(10, c);
        if (r1 > r2) {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", "")) * cm;
        } else {
            arg1 = Number(arg1.toString().replace(".", "")) * cm;
            arg2 = Number(arg2.toString().replace(".", ""));
        }
    } else {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", ""));
    }
    return (arg1 + arg2) / m;
}

/**
 * @params
 * @description 重写减法运算
 * @author
 * @time
 */
export function floatSub(arg1=0,arg2=0){
    var r1,r2,m,n;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2));
    //动态控制精度长度
    n=(r1>=r2)?r1:r2;
    return ((arg1*m-arg2*m)/m).toFixed(n);
}

/**
 * @params
 * @description 重写乘法运算
 * @author
 * @time
 */
export function floatMul(arg1=0,arg2=0) {
    var m=0,s1=arg1.toString(),s2=arg2.toString();
    try{m+=s1.split(".")[1].length}catch(e){}
    try{m+=s2.split(".")[1].length}catch(e){}
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
}


/**
 * @params
 * @description 重写除法运算
 * @author
 * @time
 */
export function floatDiv(arg1=0,arg2=0){
    var t1=0,t2=0,r1,r2;
    try{t1=arg1.toString().split(".")[1].length}catch(e){}
    try{t2=arg2.toString().split(".")[1].length}catch(e){}

    r1=Number(arg1.toString().replace(".",""));

    r2=Number(arg2.toString().replace(".",""));
    return (r1/r2)*Math.pow(10,t2-t1);
}












