import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Animated,
    StyleSheet,
    Modal,
    TextInput,
    SafeAreaView
} from 'react-native';
import PropTypes from 'prop-types';
import utils from '../../common/util';

/**
 * defaultValue: 默认值
 * value: value（受控）
 * placeholder
 * cancelText: “取消”按钮的文本
 * touchableOpacity
 * onChange: 相当于TextInput的onChangeText
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
        value: '',
        placeholder: '搜索',
        cancelText: '取消',
        touchableOpacity: 0.8,
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
        touchableOpacity: PropTypes.number,
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
    constructor(props){
        super(props);
        this.state = {
            modalVisible: false,
            width: new Animated.Value(0)
        }
    }
    changeModalVisible(visible){
        this.setState({
            modalVisible: visible
        })
    }
    cancelModal(){
        this.props.onCancel();
        this.search.blur();
        this.props.showModal && this.changeModalVisible(false);
    }
    runAnimation(prop, endValue, duration){
        Animated.timing(prop, {
            toValue: endValue,
            duration
        }).start();
    }
    onFocus(){
        !this.props.showCancelButton && this.runAnimation(this.state.width, 40, 100);
        this.props.onFocus();
    }
    onBlur() {
        !this.props.showCancelButton && this.runAnimation(this.state.width, 0, 100);
        this.props.onBlur();
    }
    onCancel(){
        !this.props.showCancelButton && this.runAnimation(this.state.width, 0, 100);
        this.search.blur();
        this.props.onCancel();
    }
    focus(){
        this.search.focus();
        (!this.props.showCancelButton && !this.props.showModal) && this.runAnimation(this.state.width, 40, 100);
    }
    blur(){
        this.search.blur();
        (!this.props.showCancelButton && !this.props.showModal) && this.runAnimation(this.state.width, 0, 100);
    }
    render(){
        const cancelButton = (
            <TouchableOpacity style = {[styles.cancelButton, {backgroundColor: 'transparent'}]} onPress = {() => this.onCancel()}  >
                <Text style = {styles.cancelText} >{this.props.cancelText}</Text>
            </TouchableOpacity>)
        let props = {
            style: [styles.searchContainer, styles.textInput, {backgroundColor: 'white'}],
            underlineColorAndroid: 'transparent',
            placeholder: this.props.placeholder,
            ref: search => this.search = search,
            onChangeText: v => this.props.onChange(v),
            onSubmitEditing: () => this.props.onSubmit(),
            onFocus: () => this.onFocus(),
            onBlur: () => this.props.onBlur(),
            editable: !this.props.disabled
        }
        if(this.props.value) {
            props.value = this.props.value
        }
        if(this.props.defaultValue) {
            props.defaultValue = this.props.defaultValue
        }
        return (
            <View style = {styles.container} >
                {
                    this.props.showModal ?
                    (
                        <TouchableOpacity
                            style = {styles.searchContainer}
                            touchableOpacity = {this.props.touchableOpacity}
                            onPress = {() => this.changeModalVisible(true)}
                        >
                            <Text style = {styles.placeholder} >{this.props.placeholder}</Text>
                        </TouchableOpacity>
                    ) :
                    (
                        <View style = {[styles.containerInput, {backgroundColor: 'transparent'}]} >
                            {
                                React.cloneElement(<TextInput/>, props)
                                
                            }
                            {
                                this.props.showCancelButton ? cancelButton :
                                (
                                    <Animated.View style = {{justifyContent: 'center', width: this.state.width}} >
                                        {cancelButton}
                                    </Animated.View>
                                )
                            }
                        </View>
                    )
                }
                {
                    this.props.showModal ?
                    (
                        <Modal
                            visible = {this.state.modalVisible}
                            onRequestClose = {() => {}}
                            animationType = {'none'}
                        >
                            <SafeAreaView>
                                <View style = {[styles.container, styles.containerInput]} >
                                    <TextInput
                                        style = {[styles.searchContainer, styles.textInput]}
                                        underlineColorAndroid = {'transparent'}
                                        defaultValue = {this.props.defaultValue}
                                        value = {this.props.value}
                                        placeholder = {this.props.placeholder}
                                        ref = {search => this.search = search}
                                        onChangeText = {(v) => this.props.onChange(v)}
                                        onSubmitEditing = {() => this.props.onSubmit()}
                                        onFocus = {() => this.props.onFocus()}
                                        onBlur = {() => this.props.onBlur()}
                                        editable = {!this.props.disabled}
                                        autoFocus
                                    />
                                    <TouchableOpacity style = {styles.cancelButton} onPress = {() => this.cancelModal()}  >
                                        <Text style = {styles.cancelText} >{this.props.cancelText}</Text>
                                    </TouchableOpacity>
                                </View>
                                {this.props.modalComponent}
                            </SafeAreaView>
                        </Modal>
                    ) : null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        maxWidth: utils.window.width,
        height: 48,
        backgroundColor: '#EFEFF4',
        padding: 10
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        paddingLeft: 8
    },
    placeholder: {
        color: '#939393'
    },
    textInput: {
        paddingVertical: 2,
        backgroundColor: utils.theme.lineColor
    },
    containerInput: {
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: utils.theme.lineColor,
        flexDirection: 'row'
    },
    cancelButton: {
        width: 30,
        justifyContent: 'center',
        marginLeft: 10
    },
    cancelText: {
        fontSize: 15,
        color: utils.theme.minorColor
    }
})
