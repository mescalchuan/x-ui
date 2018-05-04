import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import index from '../collapse/index';
import utils from '../../common/util';

/**
 * defaultValue: 默认值
 * value: value --> 受控
 * onChange: group value更改时的回调，返回当前value
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
            currentValue: null
        }
    }
    changeValue(value) {
        if(this.props.value != null) {

        }
        else{
            this.setState({
                currentValue: value
            })
        }
        this.props.onChange(value);
    }
    renderRadioGroup() {
        const disabled = this.props.disabled == null ? false : this.props.disabled;
        return React.Children.map(this.props.children, (item, index) => {
            let extendProps = {
                disabled,
                groupLimit: true,
                onClick: (value) => this.changeValue(value)
            }
            //用户指定了value,radio变成了受控组件
            if(this.props.value != null){
                let checked = this.props.value == item.props.value;
                extendProps.checked = checked;
            }
            //其他任何条件下radio都是非受控的
            else if(this.props.defaultValue != null){
                let checked = this.state.currentValue == null ? this.props.defaultValue == item.props.value : this.state.currentValue == item.props.value;
                extendProps.checked = checked;
            }
            else{
                if(this.state.currentValue != null) {
                    let checked = this.state.currentValue == item.props.value;
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
                {this.renderRadioGroup()}
            </View>
        )
    }
}
/**
 * value: radio id
 * checked: 勾选状态（受控）
 * radioColor: radio颜色
 * radioStyle: 自定义radio样式
 * textStyle: 自定义文本样式
 * disabled: 是否禁用
*/
class Radio extends Component {
    static defaultProps = {
        radioColor: utils.theme.mainColor,
        disabled: false,
        radioStyle: {},
        textStyle: {}
    }
    static propTypes = {
        radioColor: PropTypes.string,
        disabled: PropTypes.bool,
        radioStyle: PropTypes.object,
        textStyle: PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {
            checked: false
        }
    }
    changeRadio() {
        if(this.props.groupLimit || this.props.groupLimit != null){
            this.props.onClick(this.props.value)
        }
        else{
            this.setState({
                checked: true
            })
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
    render() {
        const disabledStyle = this.props.disabled ? {color: '#CCCCCC'} : {};
        return (
            <View style = {styles.radioContainer} >
                <TouchableOpacity
                    activeOpacity = {1}
                    style = {[
                        styles.radioOuter,
                        {backgroundColor: this.props.disabled ? '#F5F5F5' : 'white'},
                        {borderColor: this.props.disabled ? '#CCCCCC' : this.state.checked ? this.props.radioColor : utils.theme.lineColor},
                        this.props.radioStyle
                    ]}
                    onPress = {() => this.changeRadio()}
                    disabled = {this.props.disabled}
                >
                {
                    this.state.checked ? <View style = {[styles.radioInner, {backgroundColor: this.props.disabled ? '#CCCCCC' : this.props.radioColor}]} ></View> : null
                }
                </TouchableOpacity>
                {
                    this.props.children && this.props.children.length ?
                        <Text style = {[this.props.textStyle, disabledStyle]} >{this.props.children}</Text> : null
                }
            </View>
        )
    }
}

Radio.Group = Group;
export default Radio;

const styles = StyleSheet.create({
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    radioOuter: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: utils.theme.lineColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginVertical: 2,
        marginRight: 5
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 10
    }
})
