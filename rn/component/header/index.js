import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import utils from '../../common/util';

/**
 * containerStyle: 自定义容器样式
 * title: 标题
 * titleStyle: 标题样式
 * leftBtn: 自定义左侧按钮
 * rightBtn: 自定义右侧按钮
 */

export default class Header extends Component {
    static defaultProps = {
        containerStyle: {},
        title: '',
        titleStyle: {},
        leftBtn: null,
        rightBtn: null
    }
    static propTypes = {
        containerStyle: PropTypes.object,
        title: PropTypes.string,
        titleStyle: PropTypes.object,
        leftBtn: PropTypes.element,
        rightBtn: PropTypes.element
    }
    constructor(props) {
        super(props);
    }
    render() {
        const leftContain = this.props.leftBtn ? this.props.leftBtn : null;
        const rightContain = this.props.rightBtn ? this.props.rightBtn : null;
        const leftBtn = <View style = {styles.leftBtn}>{leftContain}</View>;
        const rightBtn = <View style = {[styles.leftBtn, {alignItems: 'flex-end'}]}>{rightContain}</View>;
        return (
            <View style = {[styles.container, this.props.containerStyle]} >
                {leftBtn}
                <Text style = {[styles.titleText, this.props.titleStyle]} >{this.props.title}</Text>
                {rightBtn}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: utils.theme.mainColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 3,
        paddingHorizontal: 15,
        shadowColor: 'black',
        shadowOffset: {height: 1, width: 0},
        shadowRadius: 3,
        shadowOpacity: 0.5,
        zIndex: 1
    },
    titleText: {
        color: 'white',
        fontSize: 18
    },
    leftBtn: {
        justifyContent: 'center',
		width: 40,
        height: 40
    }
})
