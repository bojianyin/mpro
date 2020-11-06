/**
 * fetch 网络请求的header，可自定义header 内容
 * @type {{Accept: string, Content-Type: string, accessToken: *}}
 */
import {Toast,Loading} from "./loading"
import NetInfo from "@react-native-community/netinfo"
import {Alert} from "react-native";
import CONF from "../conf/"
import User from "../conf/user";

const Ip=CONF['FETCH_IP'];
// const Ip="http://192.168.1.200:9000";
global.imgurl=CONF['IMAGE_IP'];
// const Ip="http://221.204.213.211:8083";

let header = {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
};


let header2 = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};
//
// let header1 = {
//     'Accept': 'application/json',
//     'Content-Type': 'multipart/form-data',
// };
/**支持上传的图片格式*/
const extgroup=["jpg","JPG","png","PNG","gif","GIF","jpeg"];


/**
 * GET 请求时，拼接请求URL
 * @param url 请求URL
 * @param params 请求参数
 * @returns {*}
 */
const handleUrl = url => params => {
    if (params) {
        let paramsArray = []
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + encodeURIComponent(params[key])))
        if (url.search(/\?/) === -1) {
            typeof (params) === 'object' ? url += '?' + paramsArray.join('&') : url
        } else {
            url += '&' + paramsArray.join('&')
        }
    }
    return url
}

const handleUrl2 = url => params => {
    if (params) {
        let paramsArray = []
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + encodeURIComponent(params[key])))
        return paramsArray.join('&')
    }

}

/**
 * fetch 网络请求超时处理
 * @param original_promise 原始的fetch
 * @param timeout 超时时间 30s
 * @returns {Promise.<*>}
 */
const timeoutFetch = (original_fetch, timeout = 20000) => {
    // global.timeoutBlock = () => {}
    let timeoutBlock;
    let timeout_promise = new Promise((resolve, reject) => {
        timeoutBlock = (type) => {
            // 请求超时处理
            // if(type=='notauto')
            //     reject('请求取消');
            // else
            reject('请求超时');
        }
    })

    // Promise.race(iterable)方法返回一个promise
    // 这个promise在iterable中的任意一个promise被解决或拒绝后，立刻以相同的解决值被解决或以相同的拒绝原因被拒绝。
    let abortable_promise = Promise.race([
        original_fetch,
        timeout_promise
    ])

    setTimeout(() => {
        timeoutBlock()
    }, timeout)

    return abortable_promise
}

/**
 * 网络请求工具类
 */
export default class HttpUtils {

    constructor(){
        this.current=0;
        this.picgroup=[];
    }

    static timer=null;

    /**
     * 基于fetch 封装的GET 网络请求
     * @param method
     * @param url 请求URL
     * @param params 请求参数
     * @param host
     * @param head
     * @returns {Promise}
     */

    static request = async (method,url, params = {},host=Ip,head=1) => {

        // console.log(host,"debugger --- into ....");

        let Interinfo=await NetInfo.fetch();
        if(!Interinfo.isConnected)
        {
            Toast.show("您当前没有网络,请检查网络连接后重试!");
            Loading.hide();
            throw "not found network";
        }

        let result;

        if(method=="get"||method=="GET"){
            result = timeoutFetch(
                fetch(handleUrl(host + '' + url)(params), {
                    method: 'GET',
                    headers: head===1?header:header2
                })
            )
        }else if(method=="post"||method=="POST"){
            result = timeoutFetch(
                fetch(host + '' + url, {
                    method: 'POST',
                    headers:head===1?header:header2,
                    body: head===1?handleUrl2(url)(params):JSON.stringify(params)
                })
            )
        }else{
            result = timeoutFetch(
                fetch(host + '' + url, {
                    method: method,
                    headers:head===1?header:header2,
                    body:head===1?handleUrl2(url)(params):JSON.stringify(params)
                })
            )
        }
        return new Promise((resolve, reject)=>{
            result
                .then(response => {
                    if (response.ok) {
                        // console.log(host,"debugger --- http ok 200 into ....");
                        return response.text()

                    } else {
                        // console.log(host,"debugger --- http ok ??error? into ....");
                        if(__DEV__) alert('服务器繁忙，请稍后再试；\r\nCode:' + response.status)
                    }
                })
                .then(response => {
                    // console.log("网络请求log"+host,response);
                    console.log(host,"debugger网络请求LOG"+response);
                    try{
                        response=JSON.parse(response);
                        if(host===CONF.msc){
                            if(response.result!==1){
                                if(response.result===9){
                                    Toast.show("登陆重联中...");
                                    //登陆过期
                                    HttpUtils.login(method,url,params)
                                        .then((res)=>{
                                            resolve(res);
                                        })
                                        .catch((e)=>{
                                            console.log(e);
                                            Toast.show("登陆重联失败!");
                                            reject("重联失败");
                                        })

                                }else{
                                    console.error(response.message);
                                    Toast.show(response.message||"网络开小差了,请刷新后重试");
                                    resolve(response);
                                }

                            }else{
                                resolve(response);
                            }
                        }else{
                            resolve(response);
                        }
                    }catch (e) {
                        console.error("json解析错误,请检查");
                        console.log(response);
                        Toast.show("服务器发生错误!");
                        reject("error");
                    }


                })
                .catch(error => {
                    Loading.hide();
                    if(error=="请求超时"||error=="请求取消"){
                        Toast.show(error);
                    }else{
                        Toast.show("服务器连接异常!");
                    }
                    if(__DEV__) console.error(error);
                    reject(error);
                })
                .done()
        })

    }


    /*上传步骤
    *
    * resKey<Array> eg:["result"<状态码key>,"callbackname"<返回图片list key>]
    * */
    CommonUpload(h,uploadurl,fileDetail,upload_files,resKey){
        return new Promise((resolve, reject)=>{
            //有文件
            if(fileDetail.length>0){
                //content 读取缓存token  2 .3 同下面方法
                this._fetch(h,uploadurl,fileDetail,this.current,resKey,upload_files,(R)=>{
                    this.current=0;//清空变量值
                    Loading.hide();
                    this.picgroup=[];
                    resolve(R);
                },()=>{
                    this.current=0;//清空变量值
                    Loading.hide();
                    this.picgroup=[];
                    Toast.showLong("不支持的文件类型");
                    reject("不支持的文件类型");
                    return ;
                })
            }else{
                //没有文件
                Loading.hide();
                this.picgroup=[];
                resolve("no file");
                return ;
            }

        });
    }

    /*上传过程*/
    _fetch(h,uploadurl,fileDetail,currentindex,resKey,upload_files,fn,rejectcallback){
        this.current=currentindex;
        let extary=fileDetail[this.current]["name"].split(".");
        if(extgroup.indexOf(extary[extary.length-1])===-1){
            rejectcallback();
            return ;
        }
        Loading.show((this.current+1)+"/"+upload_files.length);
        fetch(h+''+uploadurl,{
            method: 'POST',
            // headers: header1,
            body: upload_files[this.current],
        })
            .then((response)=>response.text())
            .then((responseText)=>{
                    // console.log('段继龙'+responseText);

                    let res=JSON.parse(responseText);
                    if(res[resKey[0]]===1){
                        //成功
                        this.current++;
                        if(this.current<upload_files.length){
                            //延时回调
                            HttpUtils.timer=setTimeout(()=>{

                                HttpUtils.timer&&clearTimeout(HttpUtils.timer);
                                Loading.hide();
                                this.picgroup.push(res[resKey[1]]);
                                this._fetch(h,uploadurl,fileDetail,this.current,resKey,upload_files,fn,rejectcallback)
                            },1000);


                        }else{
                            HttpUtils.timer=setTimeout(()=>{

                                HttpUtils.timer&&clearTimeout(HttpUtils.timer);
                                this.picgroup.push(res[resKey[1]]);
                                fn(this.picgroup);
                            },1000);

                        }
                    }else{
                        Loading.hide();
                        this.current=0;//清空变量值
                        Toast.show(res.message);
                        return ;
                    }


            })
            .catch((error)=>{
                if(__DEV__) console.error(error);
                this.current=0;
                Loading.hide();
            })
    }


    static login(m,u,p){
        return new Promise((resolve, reject)=>{
            let U=User.useraccount.split("#");
            let params={
                "username":U[0],
                "passwd":U[1],
                "password":U[1],
            };

            HttpUtils.request("post","/api/mobile/member/staticPwd-login.do",params,CONF.msc)
                .then((e)=>{
                    if(e.result===1){
                        //重复登陆ok
                        Toast.show("已连接");

                        //延迟处理服务器频繁请求
                        setTimeout(async ()=>{

                            let res=await HttpUtils.request(m,u,p,CONF.msc); //发起重新请求
                            resolve(res);

                        },500);

                        // Alert.alert(
                        //     '提示',
                        //     '已成功连接到服务,点击重试重新获取.',
                        //     [
                        //         {text: '重试', onPress: async () => {
                        //                 let res=await HttpUtils.request(m,u,p,CONF.msc); //发起重新请求
                        //                 resolve(res);
                        //         }},
                        //     ],
                        //     { cancelable: false }
                        // )

                    }else{
                        reject("err");
                    }
                })
                .catch((e)=>{
                    reject(e.toString());
                })

        });


    }
}
