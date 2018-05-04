import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import TabBarItem from './tabBarItem';
import utils from '../../common/util';
import {cloneObj} from '../../common/function';

/**
 * tabBarStyle: 自定义tabBar容器样式
 * tabBarShadowStyle: 自定义tabBar最上方的分割线的样式
 * hidesTabTouch: 指定为true时，touchableOpacity将变为1
 */

class TabBar extends Component{
    static defaultProps = {
        tabBarStyle: {},
        tabBarShadowStyle: {},
        hidesTabTouch: false
    }
    static propTypes = {
        tabBarStyle: PropTypes.object,
        tabBarShadowStyle: PropTypes.object,
        hidesTabTouch: PropTypes.bool
    }
    constructor(props){
        super(props);
        this.sceneKeys = [];
        this.sceneList = [];
    }
    renderItems(){
        React.Children.map(this.props.children, (item, index) => {
            React.Children.map(item.props.children, (_item, _index) => {
                let _sceneKeys = cloneObj(this.sceneKeys);
                if(item.props.selected){
                    //已选中，且已经加载过了
                    if(_sceneKeys.indexOf(item.props.name) >= 0){
                        const _scene = React.cloneElement(this.sceneList[index], {
                            key: index,
                            style: [{flex: 1}]
                        });
                        this.sceneList[index] = _scene;

                    }
                    else{
                        _sceneKeys.push(item.props.name);
                        this.sceneKeys = _sceneKeys;
                        this.sceneList[index] = <View key = {index} style = {[{flex: 1}]} >{_item}</View>;
                    }
                }
                else{
                    //未选中，但加载了
                    if(_sceneKeys.indexOf(item.props.name) >= 0){
                        if(!this.sceneList[index].props.style || this.sceneList[index].props.style.length == 1){
                            const _scene = React.cloneElement(this.sceneList[index], {
                                key: index,
                                style: [_item.props.style, styles.hiddenSceneContainer]
                            });
                            this.sceneList[index] = _scene;
                        }
                    }
                }
            });
        });
        return this.sceneList;
    }
    renderTabbar(){
        let tabbarList = [];
        React.Children.map(this.props.children, (item, index) => {
            let tabbar = React.cloneElement(item, {
                key: index,
                hidesTabTouch: this.props.hidesTabTouch
            });
            tabbarList.push(tabbar);
        })
        return tabbarList;
    }
    render(){
        return(
            <View style = {{flex: 1}} >
                <View style = {{flex: 1}} >
                    {this.renderItems()}
                </View>
                <View style = {[styles.lineView, this.props.tabBarShadowStyle]} ></View>
                <View style = {[styles.tabbarContainer, this.props.tabBarStyle]} >
                    {this.renderTabbar()}
                </View>
            </View>
        )
    }
}

TabBar.Item = TabBarItem;

export default TabBar;

const styles = StyleSheet.create({
    tabbarContainer: {
        flexDirection: 'row',
        height: 49,
        backgroundColor: '#f8f8f8'
    },
    lineView: {
        height: 0.5,
        backgroundColor: '#cacaca',
    },
    hiddenSceneContainer: {
        overflow: 'hidden',
        opacity: 0,
        flex: 0,
        height: 0
    }
})
