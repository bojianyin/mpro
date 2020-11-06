/**
 * Descrip:
 * Author: Administrator
 * Time: 2018/7/30
 * Version:
 */

import React from "react";
import {
    FlatList,
    Text,
    View,
    RefreshControl,
    ActivityIndicator,
    StyleSheet
} from "react-native";
import PropTypes from "prop-types"
import {gh,gw,gfont} from "./screenUtil";
export default class FlatMode extends React.Component{
    constructor(){
        super();
    }

    static propTypes={
        refsh: PropTypes.func,
        status: PropTypes.number,
        isshuaxin: PropTypes.boolean,
        refreshing: PropTypes.boolean,
        data: PropTypes.array,
        renderItem:PropTypes.element,
        loadMore: PropTypes.any,
        isload:PropTypes.boolean
    };

    static defaultProps={
        isload:true
    }

    //下拉刷新
    _onRefresh = () => {
        this.props.refsh();
    };

    //底部组件
    _footerRender = () => {
        //未加载
        if(this.props.status==0){
            return (
                <View style={styles.moreTips}>
                    <Text style={styles.Tips}>上拉加载更多</Text>
                </View>
            );
            //正在加载
        }else if(this.props.status==1){
            return (
                <View style={styles.moreTips}>
                    <ActivityIndicator color="#ED4040"/>
                    <Text style={styles.Tips}>正在加载中...</Text>
                </View>
            );
        }else if(this.props.status==2){
            return (
                <View style={styles.moreTips}>
                    <Text style={styles.Tips}>没有更多数据了</Text>
                </View>
            );
        }else{
            return null;
        }
    };
    render(){
        return (
            <View style = {{flex:1}}>
                <FlatList
                    {...this.props}
                    refreshControl={
                        this.props.isshuaxin?
                            null:
                            <RefreshControl
                                refreshing={this.props.refreshing}
                                onRefresh={this._onRefresh}
                                colors = {["#ED4040"]}
                            />
                    }
                    data = {this.props.data}
                    renderItem = {this.props.renderItem}
                    keyExtractor={(item, index) => index.toString()} //不重复id的作用，消除警告框
                    extraData={this.state} //保证组件刷新
                    onEndReachedThreshold = {0.03}
                    onEndReached = {this.props.isload?this.props.loadMore:null}
                    ListFooterComponent = {this.props.isempty?null:this._footerRender}
                    showsVerticalScrollIndicator = {false}
                />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    moreTips:{
        height:gh(100),
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },
    Tips:{
        fontSize:gfont(26),
        marginLeft:gw(10),
        color:"#999"
    }
});
