//封装Badge组件（角标数字）
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import utils from '../../common/util';

const MAX_COUNT = 99;

/**
 * num: 角标数字
 * defaultBackColor: 角标背景色
 * fontColor: 角标数字颜色
 * text: 自定义角标内容
 * style: 自定义徽标样式
 */

export default class Badge extends Component{
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
		this.width = 0;
		this.height = 0;
	}
	componentWillMount() {
		if(this.props.children){
			const {style} = this.props.children.props;
			if(style && style.width && style.height){
				this.width = style.width;
				this.height = style.height;
			}
		}
	}
	calculateWidth(width, actualNum){
		const _actualNum = actualNum.toString();
		let tempWidth = 0;
		switch(_actualNum.length){
			case 1:
				tempWidth = 0;
				break;
			case 2:
				tempWidth = 5;
				break;
			case 3:
				tempWidth = 7;
				break;
			default:
				break;
		}
		return this.width + tempWidth;
	}
	render(){
		//一旦数字超过最大数字，超出部分用加号代替
		const actualNum = this.props.num > MAX_COUNT ? MAX_COUNT + '+' : this.props.num.toString();
		let numLength = this.props.num > MAX_COUNT ? MAX_COUNT.toString().length : this.props.num.toString().length;
		const rightPosition = -7;
		const width = this.calculateWidth(this.width, actualNum);

		//如果指定了显示角标的组件，则将角标上浮在该组件的右上方，角标显示的位置由角标内容的长度自动调节
		if(this.props.children){
			let offset = rightPosition - (numLength - 1) * 4;
			return(
				<View style = {[{width, height: this.height, overflow: 'visible'}, this.props.style]} >
					{this.props.children}
					<View style = {{
							paddingVertical: 1,
							paddingHorizontal: 5,
							borderRadius: 15,
							backgroundColor: this.props.defaultBackColor,
							position: 'absolute',
							right: offset,
							top: -8
						}}
					>
						<Text style = {{fontSize: 10, color: this.props.fontColor}} >{actualNum}</Text>
					</View>
				</View>
			);
		}
		//如果没有指定显示角标的组件，则只显示角标
		else{
			return(
				<View style = {[{
						paddingVertical: 1,
						paddingHorizontal: 5,
						borderRadius: 15,
						backgroundColor: this.props.defaultBackColor
					}, this.props.style]}
				>
					<Text style = {{fontSize: 10, color: this.props.fontColor}} >{this.props.text || actualNum}</Text>
				</View>
			);
		}
	}
}
