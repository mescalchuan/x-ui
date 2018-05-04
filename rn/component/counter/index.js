import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    TextInput
} from 'react-native';
import PropTypes from 'prop-types';
import utils from '../../common/util';
import error from '../../common/error';

const MAX_VALUE = 99;
const MIN_VALUE = 0;
const STEP_NUM = 1;

/**
 * defaultValue: 计数器默认值
 * value: 计数器的值
 * maxValue: 最大值
 * minValue: 最小值
 * stepNum: 跨度值
 * btnWidth: 按钮宽度
 * containerHeight: 总高度
 * inputWidth: 输入框宽度
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
        btnWidth: 35,
        btnColor: '#eeeeee',
        containerHeight: 30,
        inputWidth: 40,
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
        btnWidth: PropTypes.number,
        btnColor: PropTypes.string,
        containerHeight: PropTypes.number,
        inputWidth: PropTypes.number,
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
            btnWidth, 
            btnColor,
            containerHeight, 
            inputWidth, 
            borderColor
        } = this.props;
        const reachedMin = this.state.value === minValue;
        const reachedMax = this.state.value === maxValue;
        const leftDisabledColor = reachedMin || disabled ? '#d5d3d3' : '#333333';
        const rightDisabledColor = reachedMax || disabled ? '#d5d3d3' : '#333333';
        const btnStyle = {
            width: btnWidth,
            height: containerHeight,
            borderColor,
            backgroundColor: btnColor
        }
        const inputStyle = {
            width: inputWidth,
            borderColor,
        }
        return (
            <View style = {{flexDirection: 'row'}} >
                <TouchableOpacity
                    disabled = {disabled}
                    activeOpacity = {1}
                    onPress = {() => this.valueChanged('minus')}
                    style = {[styles.operationBtn, btnStyle, {borderTopLeftRadius: 5, borderBottomLeftRadius: 5}]}
                >
                    <Text style = {{fontSize: 16, color: leftDisabledColor}} >-</Text>
                </TouchableOpacity>
                {
                    disabled ? (
                        <View style = {[styles.disabledContainer, inputStyle]} >
                            <Text>{this.state.value}</Text>
                        </View>
                    ) : (
                        <TextInput
                            style = {[styles.inputContainer, inputStyle]}
                            underlineColorAndroid = {'transparent'}
                            keyboardType = {'numeric'}
                            value = {this.state.value + ''}
                            onChangeText = {(v) => this.onChange(v)}
                            onBlur = {() => this.onBlur()}
                        />
                    )
                }
                <TouchableOpacity
                    disabled = {disabled}
                    activeOpacity = {1}
                    onPress = {() => this.valueChanged('add')}
                    style = {[styles.operationBtn, btnStyle, {borderTopRightRadius: 5, borderBottomRightRadius: 5}]}
                >
                    <Text style = {{fontSize: 16, color: rightDisabledColor}} >+</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    operationBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1
    },
    inputContainer: {
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        padding: 0,
        textAlign: 'center'
    },
    disabledContainer: {
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
