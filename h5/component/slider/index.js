import React, {Component} from 'react';
import PropTypes from 'prop-types';
import utils from '../../common/util.d';
import error from '../../common/error';
import './index.scss';

const CIRCLE_WIDTH = 44;
const MIN_VALUE = 0;
const MAX_VALUE = 100;

/**
 * width: 滑块宽度(px，slider会自动转化成rem)
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
        width: 300,
        progress: MIN_VALUE,
        minValue: MIN_VALUE,
        maxValue: MAX_VALUE,
        barColor: '#d5d3d3',
        ballColor: '#108EE9',
        crossColor: '#108EE9',
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
        this.startX = 0;
        this.endX = 0;
        this.currentProgress = initialProgress;
    }
    touchValueTransform(touchValue) {
        return  touchValue * 2 / utils.getDpr();
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
    touchStart(e) {
        if(!this.props.disabled) {
            const touch = e.targetTouches[0];
            this.startX = this.touchValueTransform(touch.pageX);
        }
    }
    touchMove(e) {
        if(!this.props.disabled) {
            const touch = e.targetTouches[0];
            this.endX = this.touchValueTransform(touch.pageX);
            const moveX = this.endX - this.startX;
            const {width, minValue, maxValue, onChange} = this.props;
            const endLength = width - CIRCLE_WIDTH;
            let progress = moveX + this.currentProgress;
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
    }
    touchEnd(e) {
        if(!this.props.disabled) {
            this.currentProgress = this.state.progress;
            this.startX = this.endX;
        }
    }
    render() {
        const disabledBallColor = this.props.disabled ? '#b4b4b4' : this.props.ballColor;
        const disabledCrossColor = this.props.disabled ? '#b4b4b4' : this.props.crossColor;
        const circleStyle = {
            transform: `translateX(${utils.px2rem(this.state.progress)})`,
            WebkitTransform: `translateX(${utils.px2rem(this.state.progress)})`,
            backgroundColor: disabledBallColor
        }
        return (
           <div className = {'x-slider-container'} style = {{width: utils.px2rem(this.props.width)}} >
                <div 
                    className = {'x-slider-bar'} 
                    style = {{width: utils.px2rem(this.props.width - CIRCLE_WIDTH), backgroundColor: this.props.barColor}} 
                ></div>
                <div 
                    onTouchStart = {e => this.touchStart(e)}
                    onTouchMove = {e => this.touchMove(e)} 
                    onTouchEnd = {e => this.touchEnd(e)}
                    className = {'x-slider-circle'} 
                    style = {circleStyle}
                ></div>
                <div className = {'x-slider-crossOverView'} style = {{width: utils.px2rem(this.state.progress), backgroundColor: disabledCrossColor}} ></div>
           </div>
        )
    }
}