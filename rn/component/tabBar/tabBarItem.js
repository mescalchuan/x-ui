import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import utils from '../../common/util';

/**
 * selected: 是否被选中
 * selectedTitleStyle: 自定义选中时的文本样式
 * title: 标题
 * titleStyle: 自定义默认（未选中）时的文本样式
 * name: 指定一个key
 * tabStyle: 自定义每个tabBar.Item的容器样式
 * icon: 未选中时的图标
 * selectedIcon: 选中时的图标
 * changeTab: 切换时触发，返回选中状态的item的name（key）
 */

export default class TabBarItem extends Component{
    //hidesTabTouch来自父组件TabBar
    static defaultProps = {
        selected: false,
        selectedTitleStyle: {},
        title: '',
        titleStyle: {},
        name: '',
        tabStyle: {},
        icon: null,
        selectedIcon: null,
        changeTab: () => {}
    }
    static propTypes = {
        selected: PropTypes.bool,
        selectedTitleStyle: PropTypes.object,
        title: PropTypes.string,
        titleStyle: PropTypes.object,
        name: PropTypes.string,
        tabStyle: PropTypes.object,
        icon: PropTypes.element,
        selectedIcon: PropTypes.element,
        changeTab: PropTypes.func
    }
    constructor(props){
        super(props);
    }
    render(){
        const textStyle = this.props.selected ?
            {fontSize: 15, color: utils.theme.mainColor, ...this.props.selectedTitleStyle} :
            {fontSize: 15, color: utils.theme.minorColor, ...this.props.titleStyle};
        const opacity = this.props.hidesTabTouch ? 1 : 0.6;
        return (
            <TouchableOpacity
                style = {[styles.container, this.props.tabStyle]}
                onPress = {() => this.props.changeTab(this.props.name)}
                activeOpacity = {opacity}
            >
                {this.props.selected ? this.props.selectedIcon : this.props.icon}
                <Text style = {textStyle} >{this.props.title}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
