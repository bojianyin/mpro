import React,{Component} from "react";
import {FlatList, SectionList as List, View, Text, StyleSheet,ActivityIndicator} from 'react-native';
import PropTypes from "prop-types";
import {gfont, gh, gw} from './screenUtil';

class Sectionlist extends Component {
    constructor(props){
        super(props);

    }

    static propTypes = {
        numColumns: PropTypes.number,
        data:PropTypes.array,
        itempad:PropTypes.number,
        itemmar:PropTypes.number,
        sticky:PropTypes.boolean,
        renderItemc:PropTypes.element,
        isload:PropTypes.boolean,
        isempty:PropTypes.boolean,
    };

    static defaultProps = {
        numColumns: 1,
        sticky:true,
        itempad:0,
        itemmar:0,
        isload:true,
        isempty:false,
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
                    <ActivityIndicator color="#FFB624"/>
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


    _renderItem = ({ section,index,item }) => {
        const { numColumns } = this.props;

        if (index % numColumns !== 0) return null;

        const items = [];

        for (let i = index; i < index + numColumns; i++) {
            if (i >= section.data.length) {
                break;
            }

            items.push(this.props.renderItemc(section,index,i,item));
        }

        return <View
            style={{
                flexDirection: "row",justifyContent: "space-between",paddingLeft:this.props.itempad,paddingRight:this.props.itempad,marginBottom:this.props.itemmar
            }}
        >
            {items}
        </View>;
    };

    render() {
        return (
            <List
                {...this.props}
                sections={this.props.data}
                // style={styles.container}
                renderItem={this._renderItem}
                keyExtractor={(item, index) => item.toString()+index.toString()}
                showsVerticalScrollIndicator = {false}
                extraData={this.state} //保证组件刷新
                stickySectionHeadersEnabled={this.props.sticky}
                onEndReachedThreshold = {0.03}
                onEndReached = {this.props.isload?this.props.loadMore:null}
                ListFooterComponent = {this.props.isempty?null:this._footerRender}
            />
        );
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



export default Sectionlist;
