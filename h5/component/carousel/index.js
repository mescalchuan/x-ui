import React, { Component } from "react";
import PropTypes from "prop-types";
import utils from '../../common/util.d';
import './index.scss';

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
 * onIndexChanged：索引值发生改变时的回掉
 */

export default class Carousel extends Component {
    static defaultProps = {
        index: 0,
        autoPlay: true,
        autoPlayTimeout: 3000,
        showDot: true,
        dotColor: '#666666',
        activeDotColor: utils.theme.mainColor,
        dotWidth: 20,
        onIndexChanged: () => {}
    }

    static propTypes = {
        index: PropTypes.number,
        width: PropTypes.any.isRequired,
        height: PropTypes.any.isRequired,
        autoPlay: PropTypes.bool,
        autoPlayTimeout: PropTypes.number,
        showDot: PropTypes.bool,
        dotColor: PropTypes.string,
        activeDotColor: PropTypes.string,
        dotWidth: PropTypes.number,
        onIndexChanged: PropTypes.func
    }

    constructor(props) {
        super(props);
        const { index, children } = this.props;
        this.childNum = this.props.children.length
        const currentIndex = this.props.index + 1 >= this.childNum ? this.childNum : this.props.index + 1;
        this.state = {
            currentIndex,
            offsetX: -currentIndex * 100,
            needAnimate: true
        }
        this.previousX = 0;
        this._offsetX = 0;
        this.moveX = 0;
        this.previousIndex = 0;
        this.touchStartHandler = this.touchStartHandler.bind(this);
        this.touchMoveHandler = this.touchMoveHandler.bind(this);
        this.touchEndHandler = this.touchEndHandler.bind(this);
        this.resetImgListPosition = this.resetImgListPosition.bind(this);
        this._onVisibleChange = this._onVisibleChange.bind(this);
        this.transitionend = '';
    }
    //兼容性处理
    transitionEvent() {
        const transitions = {
            'transition':'transitionend',
            'WebkitTransition':'webkitTransitionEnd'
        }
        for(let t in transitions){
            if(this.refs.carousel.style[t] !== undefined ){
                return transitions[t];
            }
        }
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
            case this.childNum + 1:
                currentIndex = 1;
                this.autoMoveCarousel(currentIndex, false);
                break;
            case 0:
                currentIndex = this.childNum;
                this.autoMoveCarousel(currentIndex, false);
                break;
            default:
                break;
        }
        if (this.props.onIndexChanged && currentIndex != this.previousIndex) {
            this.props.onIndexChanged(currentIndex - 1);
        }
    }
    getCarouselWidth() {
        return window.getComputedStyle(document.querySelector('.x-carousel-container')).width;
    }
    //移动端触摸，停止定时器，记录之前的索引值、当前的偏移量previousX、当前轮播图偏移量_offestX
    touchStartHandler(e) {
        clearInterval(this.interval);
        this.interval = null;
        this.previousX = e.targetTouches[0].pageX;
        this._offsetX = this.state.offsetX;
        this.previousIndex = this.state.currentIndex;
        this.refs.carousel.addEventListener('touchmove', this.touchMoveHandler);
        this.transitionend && this.refs.carousel.removeEventListener(this.transitionend, this.resetImgListPosition);
    }
    //记录最新的偏移量nowX，图片随用户手势的移动而移动
    touchMoveHandler(e) {
        const nowX = e.targetTouches[0].pageX;
        this.moveX = nowX - this.previousX;

        this.setState({
            offsetX: this._offsetX + (this.moveX / parseInt(this.getCarouselWidth())) * 100,
            needAnimate: false
        })
    }
    //判断用户移动的距离，如果过短则返回之前的图片，否则，切换到下一张图片
    touchEndHandler(e) {
        let currentIndex;
        if (Math.abs(this.moveX) >= parseInt(this.getCarouselWidth()) / 5) {
            switch (true) {
                case (this.moveX > 0):
                    currentIndex = this.state.currentIndex - 1;
                    break;
                case (this.moveX < 0):
                    currentIndex = this.state.currentIndex + 1;
                    break;
                default:
                    currentIndex = this.state.currentIndex;
                    break;
            }
        } else {
            currentIndex = this.state.currentIndex;
        }
        this.refs.carousel.removeEventListener('touchmove', this.touchMoveHandler);
        this.transitionend && this.refs.carousel.addEventListener(this.transitionend, this.resetImgListPosition);
        this.autoMoveCarousel(currentIndex, true);
        this.previousX = 0;
        this._offsetX = 0;
        this.moveX = 0;
        this.interval = this.props.autoPlay ? this.runCarousel() : null;
    }
    //当页面激活状态发生改变时触发，如果当前页面不处于激活态则停用定时器防止布局混乱
    _onVisibleChange() {
        if(document.hidden) {
            clearInterval(this.interval);
            this.interval = null;
        }
        else {
            if(!this.interval) {
                this.interval = this.childNum > 1 && this.props.autoPlay ?
                    this.runCarousel() : null;
            }
        }
    }
    //切换图片
    autoMoveCarousel(currentIndex, needAnimate) {
        this.setState({
            offsetX: -currentIndex * 100,
            currentIndex,
            needAnimate
        });
    }
    //渲染轮播图
    _renderCarousel(imgList, enableDrag) {
        let imgViewList = [];
        let dotList = [];
        React.Children.map(this.props.children, (img, index) => {
            if (index == 0) this._endImgView = img;
            if (index == this.childNum - 1) this._startImgView = img;
            imgViewList.push(
                this._renderImg(img, index, enableDrag)
            );
            const dotWidth = this.props.dotWidth;
            const marginRight = index == this.childNum - 1 ? 0 : dotWidth;
            const backgroundColor = this.state.currentIndex - 1 == index ? this.props.activeDotColor : this.props.dotColor;
            const dotListStyle = {
                marginRight: utils.px2rem(marginRight),
                backgroundColor,
                width: utils.px2rem(dotWidth),
                height: utils.px2rem(dotWidth),
                borderRadius: utils.px2rem(dotWidth)
            }
            dotList.push(
            	<div key = { index } className = {'x-carousel-dot'} style = { dotListStyle } ></div>
            );
        });
        imgViewList.splice(0, 0, this._renderImg(this._startImgView, -1, enableDrag));
        imgViewList.push(this._renderImg(this._endImgView, this.childNum, enableDrag));
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
        	<div
        		key = { key }
        		className = 'x-carousel-list'
            	style = {{ width: `${100 / (this.childNum + 2) }%`}}
            	onTouchStart = { touchStartHandler }
            	onTouchEnd = { touchEndHandler }
            >
            	{ imgView }
            </div>
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
                this.interval = this.childNum > 1 ?
                    this.runCarousel() : null;
            }
        }
    }

    componentDidMount() {
        const carousel = this.refs.carousel;
        const transitionend = this.transitionEvent();
        transitionend && carousel.addEventListener(transitionend, this.resetImgListPosition);
        document.addEventListener('visibilitychange', this._onVisibleChange);
        this.interval = this.childNum > 1 && this.props.autoPlay ?
            this.runCarousel() : null;
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        const enableDrag = this.childNum > 1 ? true : false;
        const { imgViewList, dotList } = this._renderCarousel(this.props.children, enableDrag);
        const animateTime = this.state.needAnimate ? 0.2 : 0;
        const containerStyle = {
            width: this.props.width,
            height: this.props.height,
        }
        const dotContainerStyle = {
            bottom: utils.px2rem(this.props.dotWidth)
        }
        const translateValue = `translate(${this.state.offsetX / (this.childNum + 2)}%,0px)`;
        const mainStyle = {
            width: `${this.childNum + 2}00%`, 
            WebkitTransform: translateValue,
            transform: translateValue, 
            WebkitTransition: `WebkitTransform ${animateTime}s`,
            transition: `transform ${animateTime}s`
        }
        return (
        	<div className = 'x-carousel-container' style = { containerStyle } >
            	<div
            		ref = 'carousel'
            		className = 'x-carousel-main'
            		style = {mainStyle}
            	>
            		{ imgViewList }
            	</div>
            	{
               		this.props.showDot ? (
               			<div className = 'x-carousel-dot-container' style = { dotContainerStyle }> { dotList } </div>
                	) : null
            	}
            </div>
        )
    }
}