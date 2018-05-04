import React, { Component } from 'react';
import PropTypes from 'prop-types';
import utils from '../../common/util.d';
import './index.scss';
import TabBarItem from './tabBarItem';
import TabBarComponent from './tabBarComponent';

/**
 * tabBarStyle: 自定义tabBar容器样式
 * tabBarShadowStyle: 自定义tabBar最上方的分割线的样式
 * items: tabbarItems
 * components: tabbarComponents
 * selectedTab: name
 */

class TabBar extends Component{
    static defaultProps = {
        tabBarStyle: {},
        tabBarShadowStyle: {},
        items: [],
        components: [],
        selectedTab: ''
    }
    static propTypes = {
        tabBarStyle: PropTypes.object,
        tabBarShadowStyle: PropTypes.object,
        items: PropTypes.array,
        components: PropTypes.array,
        selectedTab: ''
    }
    
    constructor(props){
        super(props);
        this.sceneKeys = [];
        this.sceneList = [];
    }

    renderScenes() {
        this.props.components.map((item, index) => {
            if(item.props.name === this.props.selectedTab) {
                //已选中，且已经加载过了
                if(this.sceneKeys.indexOf(item.props.name) >= 0) {
                    this.sceneList[index] = React.cloneElement(this.sceneList[index], {
                        key: index,
                        externalClass: 'x-tabbar-component x-tabbar-component-active',
                    });
                }
                else{
                    this.sceneKeys.push(item.props.name);
                    this.sceneList[index] = React.cloneElement(item, {
                        key: index,
                        externalClass: 'x-tabbar-component x-tabbar-component-active',
                    })
                }
            }
            else{
                //未选中，但加载了
                if(this.sceneKeys.indexOf(item.props.name) >= 0) {
                    this.sceneList[index] = React.cloneElement(this.sceneList[index], {
                        key: index,
                        externalClass: 'x-tabbar-component',
                    });
                }
                
            }
        })
        //当默认激活项不是第一个时，index0位置为empty（[empty, Comonent1]），导致reactdom无法正确渲染
        //过滤掉空项
        return this.sceneList.filter(item => item);
    }

    renderTabs() {
        return this.props.items.map(item => {
            return React.cloneElement(item, {
                selected: this.props.selectedTab === item.props.name
            })
        })
    }

    render(){
        return(
            <div className = {'x-tabbar-container'} >
                {this.renderScenes()}
                <div className = {'x-tabbar-panel-ctn'} >
                    <hr style = {this.props.tabBarShadowStyle} ></hr>
                    <div className = {'x-tabbar-panel'} style = {this.props.tabBarStyle} >
                        {this.renderTabs()}
                    </div>
                </div>
            </div>
        )
    }
}

TabBar.Item = TabBarItem;
TabBar.Component = TabBarComponent;

export default TabBar;