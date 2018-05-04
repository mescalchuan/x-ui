import React, { Component } from 'react';
import PropTypes from 'prop-types';
import utils from '../../common/util.d';

/**
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
    //selected from TabBar
    static defaultProps = {
        //selected: false,
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
        //selected: PropTypes.bool,
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
        const {
            selected, 
            selectedTitleStyle,
            titleStyle,
            tabStyle,
            name,
            selectedIcon,
            icon,
            title,
            changeTab
        } = this.props;
        const textStyle = selected ? selectedTitleStyle : titleStyle;
        return (
            <a
                className = {`x-tabbar-item${selected ? ' x-tabbar-item-active' : ''}`}
                href = {'javascript:;'}
                style = {[textStyle, tabStyle]}
                onClick = {() => changeTab(name)}
            >
                {selected ? selectedIcon : icon}
                {/*in order to use flex-column*/}
                <span>{title}</span>
            </a>
        )
    }
}
