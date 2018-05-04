import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    Animated,
    StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import utils from '../../common/util';
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
        const initValue = this.props.value ? 20 : 0;
        this.state = {
            translateX: new Animated.Value(initValue)
        };
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.value != this.props.value) {
            const toValue = this.state.translateX._value === 0 ? 20 : 0;
            Animated.timing(this.state.translateX, {
                duration: 200,
                toValue
            }).start()
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
        const backgroundColor = this.state.translateX.interpolate({
            inputRange: [0, 20],
            outputRange: [tintColor, onTintColor]
        });
        const _tintBorderColor = this.state.translateX.interpolate({
            inputRange: [0, 20],
            outputRange: [tintBorderColor, onTintBorderColor]
        })
        return (
            <View>
                <TouchableOpacity activeOpacity = {1} onPress = {() => this.changeValue()} >
                    <Animated.View style = {[styles.container, {backgroundColor, borderColor: _tintBorderColor}]} >
                        <Animated.View
                            style = {[
                                styles.circle,
                                {
                                    transform: [{translateX: this.state.translateX}],
                                    backgroundColor: thumbTintColor,
                                    borderColor: thumbBorderColor
                                },
                            ]}
                        ></Animated.View>
                    </Animated.View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: 50,
        height: 30,
        borderRadius: 30,
        borderWidth: 1,
        justifyContent: 'center'
    },
    circle: {
        width: 27,
        height: 27,
        borderRadius: 27,
        borderWidth: 1
    }
})
