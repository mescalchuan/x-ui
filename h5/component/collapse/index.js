import React, { Component } from 'react';
import List from '../list';
import PropTypes from 'prop-types';
import utils from '../../common/util.d';
import './index.scss';

/**
 * activityKey: 当前激活项
 * onChange: 任意一个折叠面板的折叠状态发生改变时的回调，返回当前激活项（string or JSON.stringify(stringArray)）
 * accordion: 是否开启手风琴模式
 * style: 自定义样式
 */

class Collapse extends Component {
    static defaultProps = {
        activityKey: '',
        onChange: () => {},
        accordion: false,
        style: {}
    }
    static propTypes = {
        activeKey: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
        onChange: PropTypes.func,
        accordion: PropTypes.bool,
        style: PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {
            activeKey: this.props.activeKey
        }
        this.panelKeyList = [];
        this.activeKeyList = [];
    }
    changeOpenState(index, notAccordion, isOpen) {
        if(!notAccordion){
            let activeKey = null;
            if(this.state.activeKey != this.panelKeyList[index]){
                activeKey = this.panelKeyList[index]
            }
            this.setState({
                activeKey
            }, () => {
                this.props.onChange && this.props.onChange(this.state.activeKey);
            })
        }
        else{
            const point = this.activeKeyList.indexOf(this.panelKeyList[index]);
            if(isOpen){
                if(point < 0){
                    this.activeKeyList.push(this.panelKeyList[index])
                }
            }
            else{
                if(point >= 0){
                    this.activeKeyList.splice(point, 1);
                }
            }
            this.props.onChange && this.props.onChange(JSON.stringify(this.activeKeyList))
        }
    }
    renderPanel() {
        let panelList = [];
        React.Children.map(this.props.children, (item, index) => {
            let isOpen = false;
            if(this.state.activeKey == item.props.panelKey){
                isOpen = true;
            }
            const panel = React.cloneElement(item, {
                key: index,
                index,
                isOpen,
                accordion: this.props.accordion,
                showLine: index != this.props.children.length - 1 || isOpen == true || !this.props.accordion,
                changeOpenState: this.changeOpenState.bind(this)
            });
            panelList.push(panel);
            this.panelKeyList[index] = item.props.panelKey;
        });
        return panelList;
    }
    render() {
        return (
            <div className = {'x-collapse-container'} style = {this.props.style} >
                {this.renderPanel()}
            </div>
        )
    }
}

/**
 * key: id
 * title: 标题
 */

class Panel extends Component {
    static defaultProps = {
        key: '',
        title: ''
    }
    static propTypes = {
        key: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
        title: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ])
    }
    constructor(props) {
        super(props);
        this.state = {
            isOpen: this.props.isOpen
        }
    }
    changeOpenState(isOpen){
        this.setState({
            isOpen
        }, () => {
            this.props.changeOpenState(this.props.index, true, isOpen)
        })
    }
    render() {
        const isOpen = this.props.accordion ? this.props.isOpen : this.state.isOpen;
        const changeOpenState = this.props.accordion ? this.props.changeOpenState : this.changeOpenState.bind(this);
        const changeOpenStateParams = this.props.accordion ? this.props.index : !this.state.isOpen;
        const extendStyle = isOpen ? {minHeight: utils.px2rem(91)} : {height: utils.px2rem(91)};
        const source = isOpen ? utils.icon64.arrowUp : utils.icon64.arrowDown;
        return (
            <div className = {'x-collapse-panel'} style = {extendStyle} >
                <hr/>
                <List
                    title = {this.props.title}
                    rightIcon = {<img className = {'x-collapse-icon'} src = {source}/>}
                    onPress = {() => changeOpenState(changeOpenStateParams)}
                    showLine = {this.props.showLine}
                />
                {this.props.children}
            </div>
        )
    }
}

Collapse.Panel = Panel;

export default Collapse
