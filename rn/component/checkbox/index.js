//封装多选框组件
import React, {Component} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
    Image
} from 'react-native';
import PropTypes from 'prop-types';
import utils from '../../common/util';
import {cloneObj} from '../../common/function';

const checkedIcon = require('./checked.png');

/**
 * defaultValue: 默认value
 * value: value（受控）
 * onChange: 多选框勾选值发生改变时的回调，将会返回新的勾选值
 * disabled: 是否禁用
 * groupStyle: 自定义group容器样式
 */

class Group extends Component {
    static defaultProps = {
        groupStyle: {},
        disabled: false,
        onChange: () => {}
    }
    static propTypes = {
        groupStyle: PropTypes.object,
        disabled: PropTypes.bool,
        onChange: PropTypes.func
    }
    constructor(props) {
        super(props);
        this.state = {
            valueList: null
        }
    }
    componentWillMount() {
        let valueList = null;
        if(this.props.value){
            valueList = this.props.value;
        }
        else if(this.props.defaultValue){
            valueList = this.props.defaultValue;
        }
        this.setState({
            valueList
        })
    }
    changeValue(value, checked) {
        let _valueList = this.state.valueList == null ? [] : cloneObj(this.state.valueList);
        //已选并且已选列表中没有该项
        if(checked && _valueList.indexOf(value) < 0){
            _valueList.push(value);
        }
        else if(!checked && _valueList.indexOf(value) >= 0){
            _valueList.splice(_valueList.indexOf(value), 1);
        }
        this.setState({
            valueList: _valueList
        }, () => {
            this.props.onChange(this.state.valueList);
        })
    }
    renderCheckboxGroup() {
        const disabled = this.props.disabled == null ? false : this.props.disabled;
        return React.Children.map(this.props.children, (item, index) => {
            let extendProps = {
                disabled,
                groupLimit: true,
                onClick: (value, checked) => this.changeValue(value, checked)
            }
            //用户指定了value,checkbox变成了受控组件
            if(this.props.value != null){
                let checked = this.props.value.indexOf(item.props.value) >= 0;
                extendProps.checked = checked;
            }
            //其他任何条件下check都是非受控的
            else if(this.props.defaultValue != null){
                let checked = this.state.valueList == null ? this.props.defaultValue.indexOf(item.props.value) >= 0 : this.state.valueList.indexOf(item.props.value) >= 0;
                extendProps.checked = checked;
            }
            else{
                if(this.state.valueList != null) {
                    let checked = this.state.valueList.indexOf(item.props.value) >= 0;
                    extendProps.checked = checked;
                }
                else {
                    extendProps.checked = false;
                }
            }
            return React.cloneElement(item, extendProps);
        })
    }
    render() {
        return (
            <View style = {this.props.groupStyle} >
                {this.renderCheckboxGroup()}
            </View>
        )
    }
}

/**
 * value: checkbox value
 * checked: 是否勾选（受控）
 * checkboxColor: 颜色
 * checkboxStyle: 自定义样式
 * textStyle: 自定义文本样式
 * disabled: 是否禁用
 * onChange: 每次点击时的回调，返回勾选状态（bool）
*/

class Checkbox extends Component {
    static defaultProps = {
        checkboxColor: utils.theme.mainColor,
        checkboxStyle: {},
        textStyle: {},
        disabled: false,
        onChange: () => {}
    }
    static propTypes = {
        checked: PropTypes.bool,
        checkboxColor: PropTypes.string,
        checkboxStyle: PropTypes.object,
        textStyle: PropTypes.object,
        disabled: PropTypes.bool,
        onChange: PropTypes.func
    }
    constructor(props) {
        super(props);
        this.state = {
            checked: false
        }
    }
    componentWillMount() {
        if(this.props.groupLimit || this.props.checked != null){
            this.setState({
                checked: this.props.checked
            })
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.checked != this.props.checked){
            if(nextProps.groupLimit || nextProps.checked != null){
                this.setState({
                    checked: nextProps.checked
                })
            }
        }
    }
    changeCheckbox() {
        if(this.props.groupLimit || this.props.groupLimit != null){
            this.props.onClick(this.props.value, !this.state.checked)
        }
        else {
            if(this.props.checked == null) {
                this.setState({
                    checked: !this.state.checked
                }, () => {
                    this.props.onChange(this.state.checked);
                })
            }
            else this.props.onChange(!this.state.checked);
        }
    }
    render() {
        const disabledStyle = this.props.disabled ? {color: '#CCCCCC'} : {};
        const disabledColor = this.props.disabled ? '#CCCCCC' : this.props.checkboxColor;
        const checkboxInner = this.state.checked ?
            <View style = {[styles.checkboxInner, {borderColor: disabledColor}]} >
                <Image style = {{width: 22, height: 22, tintColor: disabledColor}} source = {checkedIcon} />
            </View> : null;
        return (
            <View style = {styles.checkboxContainer} >
                <TouchableOpacity
                    activeOpacity = {1}
                    style = {[
                        styles.checkboxOuter,
                        {backgroundColor: this.props.disabled ? '#F5F5F5' : 'white'},
                        {borderColor: this.props.disabled ? '#CCCCCC' : this.state.checked ? this.props.checkboxColor : '#aaa'},
                        this.props.checkboxStyle
                    ]}
                    onPress = {() => this.changeCheckbox()}
                    disabled = {this.props.disabled}
                >
                    {checkboxInner}
                </TouchableOpacity>
                {
                    this.props.children && this.props.children.length ?
                        <Text style = {[this.props.textStyle, disabledStyle]} >{this.props.children}</Text> : null
                }
            </View>
        )
    }
}

Checkbox.Group = Group;
export default Checkbox;

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkboxOuter: {
        width: 20,
        height: 20,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 2,
        marginRight: 5,
        borderWidth: 1,
        borderColor: utils.theme.lineColor,
        backgroundColor: 'white'
    },
    checkboxInner: {
        width: 20,
        height: 20,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1
    }
})
