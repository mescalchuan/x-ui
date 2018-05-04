import React, {Component} from 'react';
import PropTypes from 'prop-types';
import utils from '../../common/util.d';
import './index.scss';
/**
 * value: 开关值（true or false）
 * onValueChange: value发生改变时的回调
 * onTintColor: 开关打开时背景色
 * tintColor: 开关关闭时背景色
 * thumbTintColor: 圆形按钮背景色
 * onTintBorderColor: 开关打开时边框颜色
 * tintBorderColor: 开关关闭时边框颜色
 * thumbBorderColor: 圆形按钮边框颜色
 * disabled：是否禁用
 */
export default class Switch extends Component{
    static defaultProps = {
        value: false,
        onValueChange: () => {},
        onTintColor: '#00b247',
        tintColor: 'white',
        thumbTintColor: 'white',
        onTintBorderColor: '#eeeeee',
        tintBorderColor: '#eeeeee',
        thumbBorderColor: '#eeeeee',
        disabled: false
    }
    static propTypes = {
        value: PropTypes.bool,
        onValueChange: PropTypes.func,
        onTintColor: PropTypes.string,
        tintColor: PropTypes.string,
        thumbTintColor: PropTypes.string,
        onTintBorderColor: PropTypes.string,
        tintBorderColor: PropTypes.string,
        thumbBorderColor: PropTypes.string,
        disabled: PropTypes.bool
    }
    constructor(props) {
        super(props);
        //40
        const initValue = this.props.value ? 45 - window.devicePixelRatio : 0;
        this.state = {
            translateX: initValue
        };
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.value != this.props.value) {
            const toValue = nextProps.value ? 45 - window.devicePixelRatio : 0;
            this.setState({
                translateX: toValue
            })
        }
    }
    changeValue() {
        const {onValueChange, disabled, value} = this.props;
        (onValueChange && !disabled) && onValueChange(!value);
    }
    render() {
        const {
            onTintColor,
            tintColor,
            thumbTintColor,
            thumbBorderColor,
            tintBorderColor,
            onTintBorderColor
        } = this.props;
        const backgroundColor = this.state.translateX === 0 ? tintColor : onTintColor;
        const _tintBorderColor = this.state.translateX === 0 ? tintBorderColor : onTintBorderColor;
        const circleStyle = {
            transform: `translateX(${utils.px2rem(this.state.translateX)})`,
            WebkitTransform: `translateX(${utils.px2rem(this.state.translateX)})`,
            backgroundColor: thumbTintColor,
            borderColor: thumbBorderColor
        }
        return (
            <div className = {'x-switch-container'} onClick = {() => this.changeValue()} style = {{backgroundColor, borderColor: _tintBorderColor}} >
                <div className = {'x-switch-circle'} style = {circleStyle} ></div>
            </div>
        )
    }
}