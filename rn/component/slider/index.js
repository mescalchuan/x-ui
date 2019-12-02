import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    PanResponder
} from 'react-native';
import utils from '../../common/util';
import PropTypes from 'prop-types';
import error from '../../common/error';

const CIRCLE_WIDTH = 22;
const MIN_VALUE = 0;
const MAX_VALUE = 100;

/**
 * width: 滑块宽度
 * progress: 当前value值
 * minValue: 滑块最小值
 * maxValue: 滑块最大值
 * barColor: 轨道颜色
 * ballColor: 圆形按钮颜色
 * crossColor: 已经过的轨道的颜色
 * disabled: 是否禁用
 * onChange: value发生改变时的回调
 */

export default class Slider extends Component {
    static defaultProps = {
        width: 150,
        progress: MIN_VALUE,
        minValue: MIN_VALUE,
        maxValue: MAX_VALUE,
        barColor: '#d5d3d3',
        ballColor: utils.theme.mainColor,
        crossColor: utils.theme.mainColor,
        disabled: false,
        onChange: () => {}
    }
    static propTypes = {
        width: PropTypes.number,
        progress: error.customProgressTypes,
        minValue: error.customMinValueTypes,
        maxValue: error.customMaxValueTypes,
        barColor: PropTypes.string,
        ballColor: PropTypes.string,
        crossColor: PropTypes.string,
        disabled: PropTypes.bool,
        onChange: PropTypes.func
    }
    constructor(props) {
        super(props);
        const originalPercent = (this.props.progress - this.props.minValue) / this.props.maxValue;
        const initialProgress = originalPercent * (this.props.width - CIRCLE_WIDTH);
        this.state = {
            progress: initialProgress
        }
        this.watcher = null;
        this.currentProgress = initialProgress;
        this._onPanResponderMove = this._onPanResponderMove.bind(this);
        this._onPanResponderRelease = this._onPanResponderRelease.bind(this);
    }
    componentWillMount() {
        this.watcher = this.props.disabled ? {
            panHandlers: {}
        } : PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: this._onPanResponderMove,
            onPanResponderRelease: this._onPanResponderRelease
        });
    }
    _onPanResponderMove(e, gesture) {
        const {width, minValue, maxValue, onChange} = this.props;
        const endLength = width - CIRCLE_WIDTH;
        let progress = gesture.dx + this.currentProgress;
        if(progress < 0) {
            progress = 0;
        }
        if(progress > endLength) {
            progress = endLength
        }
        this.setState({
            progress
        }, () => {
            onChange && onChange(this.p2v(this.state.progress, minValue, maxValue, endLength));
        })
    }
    _onPanResponderRelease(e, gesture) {
        this.currentProgress = this.state.progress;
    }
    p2v(p, minv, maxv, w) {
        const percentValue = p / w;
        const returnValue = percentValue * (maxv - minv) + minv;
        return Number(returnValue.toFixed(0));
    }
    getValue() {
        const {width, minValue, maxValue, disabled} = this.props;
        return this.p2v(this.state.progress, minValue, maxValue, width - CIRCLE_WIDTH);
    }
    render() {
        const barStyle = {
            height: 2,
            backgroundColor: this.props.barColor,
            width: this.props.width - CIRCLE_WIDTH
        }
        const disabledBallColor = this.props.disabled ? '#b4b4b4' : this.props.ballColor;
        const disabledCrossColor = this.props.disabled ? '#b4b4b4' : this.props.crossColor;
        return (
           <View style = {[{width: this.props.width}, styles.container]} >
                <View style = {barStyle} ></View>
                <View
                    style = {[
                        styles.circleStyle,
                        {left: this.state.progress, backgroundColor: disabledBallColor}
                    ]}
                    {...this.watcher.panHandlers}
                ></View>
                <View style = {[styles.crossOverView, {width: this.state.progress, backgroundColor: disabledCrossColor}]} ></View>
           </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: CIRCLE_WIDTH,
        justifyContent: 'center',
        alignItems: 'center'
    },
    circleStyle: {
        width: CIRCLE_WIDTH,
        height: CIRCLE_WIDTH,
        position: 'absolute',
        top: 0,
        zIndex: 2,
        borderRadius: CIRCLE_WIDTH
    },
    crossOverView: {
        height: 2,
        width: 30,
        position: 'absolute',
        top: CIRCLE_WIDTH / 2 - 1,
        left: CIRCLE_WIDTH / 2,
        zIndex: 1
    }
})
