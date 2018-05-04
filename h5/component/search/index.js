import React, {Component} from 'react';
import PropTypes from 'prop-types';
import utils from '../../common/util.d';
import './index.scss'

/**
 * defaultValue: 默认值
 * value: value（受控）
 * placeholder
 * cancelText: “取消”按钮的文本
 * onChange: 相当于input的onChange
 * onSubmit
 * onFocus
 * onBlur
 * onCancel: 点击“取消”时的回调
 * showModal: 是否启动modal模式
 * showCancelButton: 是否显示“取消”按钮
 * disabled: 是否禁用
 * modalComponent: 如果开启了modal模式，使用该属性定义Modal组件内的子元素
 */

export default class Search extends Component{
    static defaultProps = {
        defaultValue: '',
        placeholder: '搜索',
        cancelText: '取消',
        onChange: () => {},
        onSubmit: () => {},
        onFocus: () => {},
        onBlur: () => {},
        onCancel: () => {},
        showModal: false,
        showCancelButton: false,
        disabled: false,
        modalComponent: null
    }
    static propTypes = {
        defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        placeholder: PropTypes.string,
        cancelText: PropTypes.string,
        onChange: PropTypes.func,
        onSubmit: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        onCancel: PropTypes.func,
        showModal: PropTypes.bool,
        showCancelButton: PropTypes.bool,
        disabled: PropTypes.bool,
        modalComponent: PropTypes.element
    }
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            width: 0
        }
        
        this.inputBoxText = this.props.value || this.props.defaultValue || this.props.placeholder;
    }
    componentDidMount() {
        
    }
    runAnimation(widthEnd, callback) {
        this.setState({
            width: widthEnd
        }, () => {
            callback && callback();
        })
    }
    onFocus() {
        !this.props.showCancelButton && this.runAnimation(utils.px2rem(60));
        this.props.onFocus();
    }
    onBlur() {
        !this.props.showCancelButton && this.runAnimation(0);
        this.props.onBlur();
    }
    onCancel(){
        !this.props.showCancelButton && this.runAnimation(0);
        this.props.onCancel();
    }
    focus(){
        this.search.focus();
        (!this.props.showCancelButton && !this.props.showModal) && this.runAnimation(utils.px2rem(60));
    }
    blur(){
        this.search.blur();
        (!this.props.showCancelButton && !this.props.showModal) && this.runAnimation(0);
    }
    onKeyDown(keyCode) {
        keyCode === 13 && this.props.onSubmit();
    }
    changeModalVisible(visible) {
        this.setState({
            modalVisible: visible
        }, () => {
            visible && this.search.focus();
        })
    }
    renderCancelBtn(needAnimate, isInModal) {
        const style = needAnimate ? {
            width: this.state.width
        } : null;
        const callback = !isInModal ? this.onCancel.bind(this) : this.cancelModal.bind(this);
        return (
            <a className = {'x-search-cancel x-search-input'} style = {style} href = {'javascript:;'} onClick = {callback} >{this.props.cancelText}</a>
        )
    }
    cancelModal(){
        this.inputBoxText = this.search.value || this.props.placeholder;
        this.props.onCancel();
        this.search.blur();
        this.props.showModal && this.changeModalVisible(false);
    }
    render() {
        return (
            !this.props.showModal ? (
                <div className = {'x-search-container'} style = {this.props.showCancelButton ? null : {paddingRight: utils.px2rem(parseFloat(utils.rem2px(this.state.width)) / 3)}} >
                    <input 
                        className = {'x-search-input'} 
                        placeholder = {this.props.placeholder}
                        defaultValue = {this.props.defaultValue}
                        value = {this.props.value}
                        ref = {input => this.search = input} 
                        onFocus = {() => this.onFocus()} 
                        onBlur = {() => this.onBlur()} 
                        onChange = {(e) => this.props.onChange(e.target.value)}
                        onKeyDown = {(e) => this.onKeyDown(e.keyCode)}
                        disabled = {this.props.disabled}
                    />
                    {this.props.showCancelButton ? this.renderCancelBtn(false, false) : this.renderCancelBtn(true, false)}
                </div>
            ) : (
                <div className = {'x-search-container x-search-table'} >
                    <a className = {'x-search-input x-search-box'} href = {'javascript:;'} onClick = {() => {
                        this.changeModalVisible(true)
                    }} >{this.inputBoxText}</a>
                    <div className = {`x-search-mask ${this.state.modalVisible ? 'x-show' : 'x-hide'}`} >
                        <div className = {'x-search-container'} style = {{backgroundColor: 'white'}} >
                            <input 
                                className = {'x-search-input'} 
                                style = {{backgroundColor: '#EFEFF4'}}
                                placeholder = {this.props.placeholder}
                                defaultValue = {this.props.defaultValue}
                                value = {this.props.value}
                                ref = {input => this.search = input} 
                                onFocus = {() => this.onFocus()} 
                                onBlur = {() => this.onBlur()} 
                                onChange = {(e) => this.props.onChange(e.target.value)}
                                onKeyDown = {(e) => this.onKeyDown(e.keyCode)}
                                disabled = {this.props.disabled}
                            />
                           {this.renderCancelBtn(false, true)}
                        </div>
                        <hr/>
                        {this.props.modalComponent}
                    </div>
                </div>
            )
        )
    }
}