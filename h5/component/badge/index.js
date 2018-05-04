import React, { Component } from 'react';
import PropTypes from 'prop-types';
import utils from '../../common/util.d';
import './index.scss';

const MAX_COUNT = 99;

/**
 * num: 角标数字
 * defaultBackColor: 角标背景色
 * fontColor: 角标数字颜色
 * text: 自定义角标内容
 * style: 自定义徽标样式
 */

export default class Badge extends Component {
    static defaultProps = {
		num: 0,
		defaultBackColor: '#ff4f4f',
		fontColor: 'white',
		text: '',
        style: {}
	}
	//规定每个属性的变量类型
	static propTypes = {
		num: PropTypes.number,
		defaultBackColor: PropTypes.string,
		fontColor: PropTypes.string,
		text: PropTypes.string,
        style: PropTypes.object
	}
    constructor(props) {
        super(props);

        this.state = {};
    }
    render() {
        //一旦数字超过最大数字，超出部分用加号代替
        const actualNum = this.props.num > MAX_COUNT ? MAX_COUNT + '+' : this.props.num.toString();
        const numLength = this.props.num > MAX_COUNT ? (MAX_COUNT + '').length + 1 : this.props.num.toString().length;
        const rightPosition = -7;
        let offset = rightPosition - (numLength - 1) * 4;
        if(numLength === 3) offset -= 4; // add after
        const badgeNumStyle = {
            backgroundColor: this.props.defaultBackColor,
            right: utils.px2rem(offset * 2)
        }
        //如果指定了显示角标的组件，则将角标上浮在该组件的右上方，角标显示的位置由角标内容的长度自动调节
        if(this.props.children) {
            return (
                <div className = {'x-badge-container'} style = {this.props.style} >
                    {this.props.children}
                    <div className = {'x-badge-basic x-badge-num'} style = {badgeNumStyle} >
                        <span style = {{color: this.props.fontColor}} >{actualNum}</span>
                    </div>
                </div>
            )
        }
        //如果没有指定显示角标的组件，则只显示角标
        else {
            return (
                <div className = {'x-badge-basic'} style = {{backgroundColor: this.props.defaultBackColor, ...this.props.style}} >
                    <span style = {{color: this.props.fontColor}} >{this.props.text || actualNum}</span>
                </div>
            )
        }
    }
}
