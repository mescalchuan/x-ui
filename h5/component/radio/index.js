import React, {Component} from 'react';
import PropTypes from 'prop-types';
import utils from '../../common/util.d';
import './index.scss';

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
            <div style = {this.props.groupStyle} >
                {this.renderRadioGroup()}
            </div>
        )
    }
}
/**
 * id: radio id
 * value: radio value
 * checked: 勾选状态（受控）
 * radioStyle: 自定义radio样式
 * textStyle: 自定义文本样式
 * disabled: 是否禁用
*/
class Radio extends Component {
    static defaultProps = {
        disabled: false,
        radioStyle: {},
        textStyle: {}
    }
    static propTypes = {
        id: PropTypes.string.isRequired,
        checked: PropTypes.bool,
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
        const radioClass = this.state.checked ? 'x-radio-checked' : '';
        const disabledClass = this.props.disabled ? ' x-radio-disabled' : '';
        return (
            <div className = {'x-radio-container' + disabledClass} style = {this.props.radioStyle} >
                <input 
                    type = {'radio'} 
                    id = {this.props.id} 
                    value = {this.props.value} 
                    checked = {this.state.checked} 
                    disabled = {this.props.disabled}
                    onChange = {() => this.changeRadio()} 
                />
                <label 
                    htmlFor = {this.props.id} 
                    className = {radioClass}
                >{
                    this.props.children && this.props.children.length ?
                        <span style = {{...this.props.textStyle, ...disabledStyle}} >{this.props.children}</span> : null
                }</label>
            </div>
        )
    }
}

Radio.Group = Group;
export default Radio;