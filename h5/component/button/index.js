import React, { Component } from 'react';
import PropTypes from 'prop-types';
import utils from '../../common/util.d';
import './index.scss';

export const BUTTON_SIZE = {
    BIG: 'big',
    MIDDLE: 'middle',
    SMALL: 'small'
}

export const BUTTON_TYPE = {
    FILL: 'fill',
    GHOST: 'ghost'
}
/**
 * inline: 是否是行内按钮
 * buttonColor: 按钮背景色
 * buttonStyle: 自定义按钮样式
 * size: 按钮大小
 * type: 按钮类型
 * textStyle: 文本样式
 * disabled: 是否禁用
 * icon: 按钮小图标
 * onPress: 触摸函数
 */
export default class Button extends Component{
    static defaultProps = {
        inline: false,
        buttonColor: '#ff4f4f',
        buttonStyle: {},
        size: BUTTON_SIZE.MIDDLE,
        type: BUTTON_TYPE.FILL,
        textStyle: {},
        disabled: false,
        icon: null,
        onPress: () => {}
    }
    static propTypes = {
        inline: PropTypes.bool,
        buttonColor: PropTypes.string,
        buttonStyle: PropTypes.object,
        size: PropTypes.string,
        type: PropTypes.string,
        textStyle: PropTypes.object,
        disabled: PropTypes.bool,
        icon: PropTypes.element,
        onPress: PropTypes.func
    }
    constructor(props){
        super(props);
    }
    render() {
        let marginLeft = 0;
        const isGhost = this.props.type == BUTTON_TYPE.GHOST;
        const color = isGhost ? this.props.buttonColor : 'white';
        const buttonColor = isGhost ? 'transparent' : this.props.buttonColor;
        const buttonClass = this.props.inline ? `x-button-inline x-button-${this.props.size.toLowerCase()}` : 'x-button-block';
        if(this.props.inline && this.props.icon) {
            switch(this.props.size){
                case BUTTON_SIZE.SMALL:
                    marginLeft = 5;
                    break;
                case BUTTON_SIZE.MIDDLE:
                    marginLeft = 10;
                    break;
                case BUTTON_SIZE.BIG:
                    marginLeft = 15;
                    break;
                default:
                    break;
            }
        }
        return (
            <div
                className = {`x-button-container ${buttonClass}${this.props.disabled ? ' x-button-disabled' : ''}`}
                style = {{
                    backgroundColor: buttonColor,
                    borderColor: this.props.buttonColor,
                    ...this.props.buttonStyle
                }}
                onClick = {() => !this.props.disabled ? this.props.onPress() : {}}
            >
                <div className = {'x-button-content'} >
                    {this.props.icon ? this.props.icon : null}
                    <span style = {{color, ...this.props.textStyle, marginLeft: utils.px2rem(marginLeft)}} >{this.props.children}</span>
                </div>
            </div>
        )
    }
}
