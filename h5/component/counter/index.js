import React, {Component} from 'react';
import PropTypes from 'prop-types';
import utils from '../../common/util.d';
import error from '../../common/error';
import './index.scss';

const MAX_VALUE = 99;
const MIN_VALUE = 0;
const STEP_NUM = 1;

/**
 * defaultValue: 计数器默认值
 * value: 计数器的值
 * maxValue: 最大值
 * minValue: 最小值
 * stepNum: 跨度值
 * borderColor: 边框颜色
 * btnColor: 按钮颜色
 * onChange: value发生改变时的回调
 * disabled: 是否禁用
 */

export default class Counter extends Component{
    static defaultProps = {
        maxValue: MAX_VALUE,
        minValue: MIN_VALUE,
        stepNum: STEP_NUM,
        btnColor: '#eeeeee',
        borderColor: '#d5d3d3',
        onChange: () => {},
        disabled: false
    }
    static propTypes = {
        defaultValue: error.customValueTypes,
        value: error.customValueTypes,
        maxValue: error.customMaxValueTypes,
        minValue: error.customMinValueTypes,
        stepNum: PropTypes.number,
        btnColor: PropTypes.string,
        borderColor: PropTypes.string,
        onChange: PropTypes.func,
        disabled: PropTypes.bool
    }
    constructor(props) {
        super(props);
        this.defaultValue = !isNaN(this.props.defaultValue) ? this.props.defaultValue : 0;
        this.state = {
            value: !isNaN(this.props.value) ? this.props.value : this.defaultValue
        }
    }
    componentWillMount() {
        if(this.defaultValue < this.props.minValue) {
            this.setState({
                value: this.props.minValue
            })
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.value != this.props.value) {
            this.setState({
                value: nextProps.value
            })
        }
    }
    onChange(val) {
        let value = Number(val);
        //NaN处理
        if(isNaN(value)) value = this.state.value;
        //不能出现负数
        if(value < MIN_VALUE) value = MIN_VALUE;
        if(value < this.props.minValue) value = this.props.minValue;
        if(value > this.props.maxValue) value = this.props.maxValue;
        this.setState({
            value
        })
    }
    onBlur() {
        this.props.onChange && this.props.onChange(this.state.value);
    }
    valueChanged(type) {
        if(this.props.disabled) return;
        const {minValue, maxValue, stepNum, onChange} = this.props;
        let newValue = this.state.value;
        if(type == 'minus') {
            newValue = newValue - stepNum <= minValue ? minValue : newValue - stepNum;
        }
        else {
            newValue = newValue + stepNum >= maxValue ? maxValue : newValue + stepNum;
        }
        newValue = Number(newValue);
        //不能出现负数
        if(newValue < MIN_VALUE) newValue = MIN_VALUE;
        if(!isNaN(this.props.value)) {
            onChange && onChange(newValue);
        }
        else {
            this.setState({
                value: newValue
            }, () => {
                onChange && onChange(newValue);
            })
        }
    }
    getValue() {
        return this.state.value;
    }
    render() {
        const {
            minValue, 
            maxValue, 
            disabled, 
            btnColor,
            borderColor
        } = this.props;
        const reachedMin = this.state.value === minValue;
        const reachedMax = this.state.value === maxValue;
        const leftDisabledColor = reachedMin || disabled ? '#d5d3d3' : '#333333';
        const rightDisabledColor = reachedMax || disabled ? '#d5d3d3' : '#333333';
        const btnStyle = {
            borderColor,
            backgroundColor: btnColor
        }
        return (
            <div className = {'x-counter-container'} style = {{borderColor}} >
                <button className = {'x-counter-left'} onClick = {() => this.valueChanged('minus')} style = {{...{color: leftDisabledColor}, ...btnStyle}} >-</button>
                {
                    disabled ? (
                        <div className = {'x-counter-disabled-box'} >
                            <span>{this.state.value}</span>
                        </div>
                    ) : (
                        <input
                            className = {'x-counter-input-box'}
                            type = {'tel'}
                            value = {this.state.value }
                            onChange = {(e) => this.onChange(e.target.value)}
                            onBlur = {() => this.onBlur()}
                        />
                    )
                }
                <button className = {'x-counter-right'} onClick = {() => this.valueChanged('add')} style = {{...{color: rightDisabledColor}, ...btnStyle}} >+</button>
            </div>
        )
    }
}
