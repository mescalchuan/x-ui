import React, { Component } from 'react';
import PropTypes from 'prop-types';
import utils from '../../common/util.d';
import './index.scss';
/**
 * containerStyle: 自定义容器样式
 * title: 标题
 * titleStyle: 标题样式
 * leftBtn: 自定义左侧按钮
 * rightBtn: 自定义右侧按钮
 */

export default class Header extends Component {
    static defaultProps = {
        containerStyle: {},
        title: '',
        titleStyle: {},
        leftBtn: null,
        rightBtn: null
    }
    static propTypes = {
        containerStyle: PropTypes.object,
        title: PropTypes.string,
        titleStyle: PropTypes.object,
        leftBtn: PropTypes.element,
        rightBtn: PropTypes.element
    }
    constructor(props) {
        super(props);
    }
    render() {
        const leftContain = this.props.leftBtn ? this.props.leftBtn : null;
        const rightContain = this.props.rightBtn ? this.props.rightBtn : null;
        const leftBtn = <div className = 'x-header-button'>{leftContain}</div>;
        const rightBtn = <div className = 'x-header-button x-header-button-right'>{rightContain}</div>;
        return (
            <div className = 'x-header-container' style = {this.props.containerStyle} >
                {leftBtn}
                <span className = 'x-header-title-text' style = {this.props.titleStyle} >{this.props.title}</span>
                {rightBtn}
            </div>
        )
    }
}
