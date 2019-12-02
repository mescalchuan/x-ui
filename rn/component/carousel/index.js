import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View, 
    StyleSheet, 
    Animated,
    Easing,
    PanResponder
} from 'react-native';
import utils from '../../common/util';
/**
 * index: 当前索引值
 * width：轮播图宽度（required）
 * height：轮播图高度（required）
 * autoPlay：是否自动播放
 * autoPlayTimeout：自动播放时每张图片的切换时间
 * showDot：是否展示圆点
 * dotColor：圆点的颜色
 * activeDotColor：激活圆点的颜色
 * dotWidth：圆点的宽度
 * dotBottomOffset：原点距离轮播图底部的距离，默认为圆点的宽度
 * onIndexChanged：索引值发生改变时的回调
 */
const VX_MAX = 0.1;
export default class Carousel extends Component {
    static defaultProps = {
        index: 0,
        autoPlay: true,
        autoPlayTimeout: 3000,
        showDot: true,
        dotColor: "#666666",
        activeDotColor: utils.theme.mainColor,
        dotWidth: 10,
        onIndexChanged: () => {},
        carouselStyle: {}
    }

    static propTypes = {
        index: PropTypes.number,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        autoPlay: PropTypes.bool,
        autoPlayTimeout: PropTypes.number,
        showDot: PropTypes.bool,
        dotColor: PropTypes.string,
        activeDotColor: PropTypes.string,
        dotWidth: PropTypes.number,
        dotBottomOffset: PropTypes.number,
        onIndexChanged: PropTypes.func,
        carouselStyle: PropTypes.object
    }
    constructor(props) {
        super(props);
        const { index, children } = this.props;
        const currentIndex = this.props.index + 1 >= this.props.children.length ? this.props.children.length : this.props.index + 1;
        this.state = {
            currentIndex,
            offsetX: new Animated.Value(-this.props.width * currentIndex),
            needAnimate: true
        }
        this.previousX = 0;
        this._offsetX = 0;
        this.moveX = 0;
        this.previousIndex = 0;
        this._onStartShouldSetPanResponder = this._onStartShouldSetPanResponder.bind(this);
        this._onPanResponderMove = this._onPanResponderMove.bind(this);
        this._onMoveShouldSetPanResponder = this._onMoveShouldSetPanResponder.bind(this);
        this._onPanResponderRelease = this._onPanResponderRelease.bind(this);
        this.resetImgListPosition = this.resetImgListPosition.bind(this);
    }
    _onStartShouldSetPanResponder(e, gesture) {
        return true;
    }
    _onMoveShouldSetPanResponder(e, gesture) {
        if(Math.abs(gesture.dx) >= Math.abs(gesture.dy)) return true;
    }
    _onPanResponderMove(e, gesture) {
        clearInterval(this.interval)
        this.state.offsetX.setValue(gesture.dx - this.state.currentIndex * this.props.width)
    }
    _onPanResponderRelease(e, gesture) {
        const config = Math.abs(gesture.vx >= VX_MAX) ? {velocity: gesture.vx} : {duration: 200};
        if(Math.abs(gesture.dx) >= (this.props.width / 5)) {
            if(gesture.dx >= 0) this.autoMoveCarousel(this.state.currentIndex - 1, true, config)    
            else this.autoMoveCarousel(this.state.currentIndex + 1, true, config);
        }
        else {
            this.autoMoveCarousel(this.state.currentIndex, true);
        }
        this.interval = this.props.autoPlay ? this.runCarousel() : null;
    }
    //运行轮播图，启动定时器
    runCarousel() {
        return setInterval(
            () => {
                const currentIndex = this.state.currentIndex + 1;
                this.autoMoveCarousel(currentIndex, true);
            },
            this.props.autoPlayTimeout + 200
        );

    }
    //如果轮播到了第一张图片，立即将其轮播到最后一张图片
    //如果轮播到了最后一张图片，立即将其轮播到第一张图片
    resetImgListPosition() {
        let currentIndex = this.state.currentIndex;
        switch (this.state.currentIndex) {
            case this.props.children.length + 1:
                currentIndex = 1;
                this.autoMoveCarousel(currentIndex, false);
                break;
            case 0:
                currentIndex = this.props.children.length;
                this.autoMoveCarousel(currentIndex, false);
                break;
            default:
                break;
        }
        if (this.props.onIndexChanged && currentIndex != this.previousIndex) {
            this.props.onIndexChanged(currentIndex - 1);
        }
    }
    //切换图片
    autoMoveCarousel(currentIndex, needAnimate, config) {
        this.setState({
            //offsetX: -currentIndex * this.props.width,
            currentIndex,
            needAnimate
        }, () => {
            if(needAnimate) {
                Animated.spring(
                    this.state.offsetX,
                    {
                        toValue: -currentIndex * this.props.width,
                        duration: needAnimate ? 100 : 0,
                        //bounciness: 0,
                        overshootClamping: true,
                        restSpeedThreshold: 0.1,
                        easing: Easing.out(Easing.sin),
                        ...config
                    }
                ).start(() => this.resetImgListPosition());
            }
            else {
                Animated.timing(
                    this.state.offsetX,
                    {
                        toValue: -currentIndex * this.props.width,
                        duration: needAnimate ? 100 : 0
                    }
                ).start(() => this.resetImgListPosition());
            }
            
        });
        
    }
    //渲染轮播图
    _renderCarousel(imgList, enableDrag) {
        let imgViewList = [];
        let dotList = [];
        React.Children.map(this.props.children, (img, index) => {
            const imgView = img;
            if (index == 0) {
                this._endImgView = imgView;
            }
            if (index == this.props.children.length - 1) {
                this._startImgView = imgView;
            }
            imgViewList.push(
                this._renderImg(imgView, index, enableDrag)
            );
            const dotWidth = this.props.dotWidth;
            const marginRight = index == this.props.children.length - 1 ? 0 : dotWidth;
            const backgroundColor = this.state.currentIndex - 1 == index ? this.props.activeDotColor : this.props.dotColor;
            const dotListStyle = {
                marginRight: marginRight,
                backgroundColor,
                width: dotWidth,
                height: dotWidth,
                borderRadius: dotWidth
            }
            dotList.push(
            	<View key = { index } style = { dotListStyle } ></View>
            );
        });
        imgViewList.splice(0, 0, this._renderImg(this._startImgView, -1, enableDrag));
        imgViewList.push(this._renderImg(this._endImgView, this.props.children.length, enableDrag));
        return {
            imgViewList,
            dotList
        }
    }
    //渲染图片
    _renderImg(imgView, key, enableDrag) {
        const touchStartHandler = enableDrag ? this.touchStartHandler : null;
        const touchEndHandler = enableDrag ? this.touchEndHandler : null;
        return (
        	<View
        		key = { key }
            	style = {{ width: this.props.width}}
            >
            	{ imgView }
            </View>
        )
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.index != this.props.index && nextProps.index != (this.state.currentIndex - 1)) {
            this.autoMoveCarousel(nextProps.index + 1, true);
        }
        if (nextProps.autoPlay != this.props.autoPlay) {
            if (nextProps.autoPlay == false) {
                clearInterval(this.interval);
                this.interval = null;
            } else {
                this.interval = this.props.children.length > 1 ?
                    this.runCarousel() : null;
            }
        }
    }

    componentWillMount() {
        this.watcher = PanResponder.create({
            onStartShouldSetPanResponder: this._onStartShouldSetPanResponder,
            onMoveShouldSetPanResponder: this._onMoveShouldSetPanResponder,
            onPanResponderMove: this._onPanResponderMove,
            onPanResponderTerminationRequest: () => false,
            onPanResponderRelease: this._onPanResponderRelease,
            onPanResponderTerminate: this._onPanResponderRelease,
        });
    }

    componentDidMount() {
        const carousel = this.refs.carousel;
        this.interval = this.props.children.length > 1 && this.props.autoPlay ?
            this.runCarousel() : null;
    }
    render() {
        const enableDrag = this.props.children.length > 1 ? true : false;
        const { imgViewList, dotList } = this._renderCarousel(this.props.children, enableDrag);
        const animateTime = this.state.needAnimate ? 0.2 : 0;
        const bottom = this.props.dotBottomOffset ? this.props.dotBottomOffset : this.props.dotWidth;
        const containerStyle = {
            width: this.props.width,
            height: this.props.height,
            backgroundColor: 'transparent'
        }
        let dotContainerStyle = {
            bottom
        }
        const currentIndex = this.props.index + 1 >= this.props.children.length ? this.props.children.length : this.props.index + 1;
        return (
        	<View style = { [this.props.carouselStyle, containerStyle, styles.container] } {...this.watcher.panHandlers} >
            	<Animated.View
            		ref = "carousel"
            		style = {{ width: this.props.width * (this.props.children.length + 2), transform: [{translateX: this.state.offsetX}], flexDirection: 'row' }}
            	>
            		{ imgViewList }
            	</Animated.View>
                {
                    this.props.showDot ? (
                        <View style = {[styles.dotContainer, {width: this.props.width, height: bottom * 2 + this.props.dotWidth, bottom: 0}]} >
                            <View style = {{flexDirection: 'row'}} >{dotList}</View>
                        </View>
                    ) : null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        overflow: "hidden",
        position: "relative"
    },
    dotContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    }
})