import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import PropTypes from 'prop-types';
import utils from '../../common/util';

export const BUTTON_SIZE = {
    BIG: 'big',
    MIDDLE: 'middle',
    SMALL: 'small'
}

export const BUTTON_TYPE = {
    FILL: 'fill',
    GHOST: 'ghost'
}
/**
 * activeOpacity: 按钮透明度
 * inline: 是否是行内按钮
 * buttonColor: 按钮背景色
 * buttonStyle: 自定义按钮样式
 * size: 按钮大小
 * type: 按钮类型
 * textStyle: 文本样式
 * disabled: 是否禁用
 * loading: 是否显示loading圈
 * loadingColor: loading圈的颜色
 * icon: 按钮小图标, 如果loading为true，则icon无效
 * onPress: 触摸函数
 */
export default class Button extends Component{
    static defaultProps = {
        activeOpacity: 0.6,
        inline: false,
        buttonColor: utils.theme.mainColor,
        buttonStyle: {},
        size: BUTTON_SIZE.MIDDLE,
        type: BUTTON_TYPE.FILL,
        textStyle: {},
        disabled: false,
        loading: false,
        loadingColor: 'white',
        icon: null,
        onPress: () => {}
    }
    static propTypes = {
        activeOpacity: PropTypes.number,
        inline: PropTypes.bool,
        buttonColor: PropTypes.string,
        buttonStyle: PropTypes.object,
        size: PropTypes.string,
        type: PropTypes.string,
        textStyle: PropTypes.object,
        disabled: PropTypes.bool,
        loading: PropTypes.bool,
        loadingColor: PropTypes.string,
        icon: PropTypes.element,
        onPress: PropTypes.func
    }
    constructor(props){
        super(props);
    }
    render(){
        let inlineHorizontal = 0;
        let inlineVertical = 0;
        let minWidth = 0;
        let fontSize = 0;
        if(this.props.size && this.props.inline){
            switch(this.props.size){
                case BUTTON_SIZE.SMALL:
                    inlineHorizontal = 4;
                    inlineVertical = 4;
                    minWidth = 40;
                    fontSize = 14;
                    break;
                case BUTTON_SIZE.MIDDLE:
                    inlineHorizontal = 8;
                    inlineVertical = 8;
                    minWidth = 70;
                    fontSize = 16;
                    break;
                case BUTTON_SIZE.BIG:
                    inlineHorizontal = 12;
                    inlineVertical = 10;
                    minWidth = 100;
                    fontSize = 20;
                    break;
                default:
                    break;
            }
        }
        extendStyle = {
            paddingHorizontal: inlineHorizontal,
            paddingVertical: inlineVertical
        }
        const opacity = this.props.disabled ? 0.6 : 1;
        const isGhost = this.props.type == BUTTON_TYPE.GHOST;
        const buttonColor = isGhost ? 'transparent' : this.props.buttonColor;
        const color = isGhost ? this.props.buttonColor : 'white';
        const commonStyle ={borderWidth: 1, borderColor: this.props.buttonColor};
        return (
            <View style = {this.props.inline ? {flexDirection: 'row'} : {}} >
                <TouchableOpacity
                    activeOpacity = {this.props.activeOpacity}
                    onPress = {this.props.onPress}
                    disabled = {this.props.disabled}
                >
                    <View style = {[
                            styles.mainContainer,
                            this.props.loading ? extendStyle : {},
                            this.props.inline ? {minWidth, backgroundColor: buttonColor, opacity} : {backgroundColor: buttonColor, opacity},
                            this.props.inline ? styles.inlineContainer : styles.buttonContainer,
                            commonStyle,
                            this.props.buttonStyle

                        ]}
                    >
                        {
                            this.props.loading ? <ActivityIndicator color = {this.props.loadingColor} style = {{marginRight: inlineHorizontal / 2}} /> : null
                        }
                        {
                            this.props.icon && !this.props.loading ? <View style = {{marginLeft: inlineHorizontal / 2}} >{this.props.icon}</View> : null
                        }
                        <Text
                            style = {[
                                this.props.loading? {} : extendStyle,
                                styles.buttonText,
                                {color, fontSize: this.props.inline ? fontSize : 18},
                                this.props.textStyle
                            ]}
                        >{this.props.children}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: utils.window.width,
        paddingVertical: 12,
        borderRadius: 3
    },
    inlineContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3
    },
    buttonText: {
        justifyContent: 'center',
        includeFontPadding: false,
        textAlignVertical: 'center'
    },
    mainContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
})
