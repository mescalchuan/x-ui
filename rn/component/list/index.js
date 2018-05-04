import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Animated,
    PanResponder
} from 'react-native';
import PropTypes from 'prop-types';
import utils from '../../common/util';

const ARROW_RIGHT = require('./arrow-right.png');

/**
 * listStyle: list最顶层的样式，一般用于margin和padding
 * contentStyle: list内容样式，不包括按钮
 * title: 列表标题
 * titleStyle: 自定义标题样式
 * rightContent: list右侧内容
 * rightIcon: 右侧icon
 * showRightIcon: 是否显示右侧icon
 *  leftContent: list左侧内容
 *  leftContentFlex: 左侧内容的垂直布局
 *  rightContentFlex: 右侧内容的垂直布局
 *  onPress: list点击时的回调
 *  touchOpacity: list点击时的透明度
 *  showLine: 是否显示底部分割线
 *  lineMargin: 底部分割线的margin
 *  btnConfig: 按钮配置项 --> {text, color, fontSize, backgroundColor, width}
 */

export default class List extends Component {
    static defaultProps = {
        listStyle: {}, //list最顶层的样式，一般用于margin和padding
        contentStyle: {}, //list内容样式，不包括按钮
        title: '',
        titleStyle: {},
        rightContent: null,
        rightIcon: <Image source = {ARROW_RIGHT} style = {{width: 15, height: 15}} />,
        showRightIcon: true,
        leftContent: null,
        leftContentFlex: 'center',
        rightContentFlex: 'center',
        onPress: () => {},
        touchOpacity: 1,
        showLine: false,
        lineMargin: 15,
        btnConfig: [], //{text, color, fontSize, backgroundColor, width}
    }
    static propTypes = {
        listStyle: PropTypes.object,
        contentStyle: PropTypes.object,
        title: PropTypes.string,
        titleStyle: PropTypes.object,
        rightContent: PropTypes.element,
        rightIcon: PropTypes.element,
        showRightIcon: PropTypes.bool,
        leftContent: PropTypes.element,
        leftContentFlex: PropTypes.string,
        rightContentFlex: PropTypes.string,
        onPress: PropTypes.func,
        touchOpacity: PropTypes.number,
        showLine: PropTypes.bool,
        lineMargin: PropTypes.number,
        btnConfig: PropTypes.array
    }
    constructor(props) {
        super(props);
        this.state = {
            btnTranslate: new Animated.Value(0),
            containerDragValue: new Animated.Value(0),
            btnWidth: 0,
            btnHeight: 0,
        }
        this.btnTranslate = 0;
        this.containerDragValue = 0;
        this.btnHasShown = false;
        this._onStartShouldSetPanResponder = this._onStartShouldSetPanResponder.bind(this);
        this._onPanResponderMove = this._onPanResponderMove.bind(this);
        this._onMoveShouldSetPanResponder = this._onMoveShouldSetPanResponder.bind(this);
        this._onPanResponderRelease = this._onPanResponderRelease.bind(this);
        this.currentValue = 0;
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
        let _btnWidth = 0;
        this.props.btnConfig.map(item => {
            let itemWidth = item.width ? item.width : 80;
            _btnWidth +=itemWidth;
        });
        this.setState({btnWidth: _btnWidth});
        this.state.btnTranslate.setValue(_btnWidth);
        this.btnTranslate = _btnWidth;
    }
    _onStartShouldSetPanResponder(e, gesture) {
        if(this.props.btnConfig.length > 0) return true;
        return false;
    }
    _onMoveShouldSetPanResponder(e, gesture) {
        if(this.props.btnConfig.length > 0){
            if(Math.abs(gesture.dx) >= Math.abs(gesture.dy)) return true;
        }
        return false;
    }
    _onPanResponderMove(e, gesture) {
        let letBtnMoveX = gesture.dx;
        let containerMoveX = gesture.dx;
        const {btnWidth} = this.state;
        //用户在向左滑或者是左滑后尚未撒手就向右滑
        if(gesture.dx < 0){
            if(this.btnHasShown){
                letBtnMoveX -= btnWidth;
                containerMoveX -= btnWidth;
            }
            if(-letBtnMoveX > btnWidth) letBtnMoveX = -btnWidth;
            this.state.containerDragValue.setValue(containerMoveX);
            this.state.btnTranslate.setValue(btnWidth + letBtnMoveX);
            this.containerDragValue = Math.abs(containerMoveX);
            this.btnTranslate = Math.abs(btnWidth + letBtnMoveX);
            if(this.containerDragValue == btnWidth) this.btnHasShown = true;
        }
        //用户在向右滑或者是右划后尚未撒手就向左滑
        else if(gesture.dx > 0){
            if(this.btnHasShown){
                if(containerMoveX > btnWidth) containerMoveX = btnWidth;
                this.state.containerDragValue.setValue(containerMoveX - btnWidth);
                this.state.btnTranslate.setValue(containerMoveX);
                this.containerDragValue = Math.abs(containerMoveX - btnWidth);
                this.btnTranslate = Math.abs(letBtnMoveX);
                if(this.containerDragValue == 0) this.btnHasShown = false;
            }
        }
        else{
            this.state.containerDragValue.setValue(0);
            this.state.btnTranslate.setValue(btnWidth);
            this.containerDragValue = 0;
            this.btnTranslate = btnWidth;
        }
    }
    _onPanResponderRelease(e, gesture) {
       const {btnWidth} = this.state;
        if(Math.abs(gesture.vx) >= 0.1){
            //打开 : 关闭
            (this.containerDragValue >= btnWidth || !this.btnHasShown && gesture.dx < 0) ? this.autoOpenBtn({velocity: gesture.vx}) : this.autoCloseBtn({velocity: gesture.vx})
        }
        else{
            if(Math.abs(gesture.dx) >= (btnWidth / 2)){
                (this.containerDragValue >= btnWidth || !this.btnHasShown && gesture.dx < 0) ? this.autoOpenBtn() : this.autoCloseBtn()
            }
            else{
                (this.containerDragValue >= btnWidth || this.btnHasShown && gesture.dx > 0) ? this.autoOpenBtn() : this.autoCloseBtn()
            }
            if(this.containerDragValue > btnWidth && Math.abs(gesture.vs) < 0.1){
                this.autoRunAnimation(this.state.containerDragValue, -btnWidth, {})
            }
        }
    }
    autoRunAnimation(target, toValue, options, callback) {
        Animated.spring(target, {
            toValue,
            bounciness: 0,
            overshootClamping: true,
            restSpeedThreshold: 0.1,
            useNativeDriver: true,
            ...options
        }).start(() => {
            if(callback) callback();
        });
    }
    autoOpenBtn(options = {}){
        Animated.parallel([
            this.autoRunAnimation(this.state.btnTranslate, 0, ...options),
            this.autoRunAnimation(this.state.containerDragValue, -this.state.btnWidth, ...options)
        ]).start(() => {
            this.containerDragValue = this.state.btnWidth;
            this.btnTranslate = 0;
            this.btnHasShown = true;
        })
    }
    autoCloseBtn(options = {}){
        Animated.parallel([
            this.autoRunAnimation(this.state.btnTranslate, this.state.btnWidth, ...options),
            this.autoRunAnimation(this.state.containerDragValue, 0, ...options)
        ]).start(() => {
            this.containerDragValue = 0;
            this.btnTranslate = this.state.btnWidth;
            this.btnHasShown = false;
        })
    }
    releaseHandler(options) {
        (this.containerDragValue >= this.state.btnWidth || !this.btnHasShown) ? this.autoOpenBtn(options) : this.autoCloseBtn(options)
    }
    measureBtnHeight(e){
        this.setState({
            btnHeight: e.nativeEvent.layout.height
        })
    }
    renderBtn() {
        let btnList = [];
        this.props.btnConfig.map((item, index) => {
            const backgroundColor = item.backgroundColor ? item.backgroundColor : utils.theme.mainColor;
            const width = item.width ? item.width : 80;
            const fontSize = item.fontSize ? item.fontSize : 16;
            const color = item.color ? item.color : 'white';
            const onPress = item.onPress ? item.onPress : () => {};
            btnList.push(
                <TouchableOpacity
                    key = {index}
                    activeOpacity = {this.props.touchOpacity}
                    style = {{
                        backgroundColor,
                        width,
                        height: this.state.btnHeight,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onPress = {onPress}
                >
                    <Text style = {{fontSize, color}} >{item.text}</Text>
                </TouchableOpacity>
            )
        })
        return (
            <Animated.View style = {[
                styles.btnContainer,
                    {
                        width: this.state.btnWidth,
                        transform:[{translateX: this.state.btnTranslate}],
                        height: this.state.btnHeight
                    }
                ]}
            >
                {btnList}
            </Animated.View>
        )
    }
    render() {
        return (
            <Animated.View {...this.watcher.panHandlers} style = {this.props.listStyle} >
                <TouchableOpacity
                    activeOpacity = {this.props.touchOpacity}
                    style = {{backgroundColor: 'white'}}
                    onPress = {() => this.props.onPress()}
                >
                    <View style = {styles.listContainer} onLayout = {(e) => this.measureBtnHeight(e)} >
                        <Animated.View style = {[styles.container, this.props.contentStyle, {transform: [{translateX: this.state.containerDragValue}]}]} >
                            <View style = {[styles.rowFlex, {alignSelf: this.props.leftContentFlex}]} >
                                {this.props.leftContent}
                                <View>
                                    <Text style = {[styles.title, this.props.titleStyle]} >{this.props.title}</Text>
                                    {this.props.children}
                                </View>
                            </View>
                            <View style = {[styles.rowFlex, {alignSelf: this.props.rightContentFlex}]} >
                                {this.props.rightContent}
                                {
                                    this.props.showRightIcon ? this.props.rightIcon : null
                                }
                            </View>
                        </Animated.View>
                        {this.renderBtn()}
                    </View>
                    {
                        this.props.showLine ? <View style = {[styles.horizontalLine, {marginHorizontal: this.props.lineMargin}]} ></View> : null
                    }
                </TouchableOpacity>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    listContainer: {
        flexDirection: 'row',
        backgroundColor: '#b2b2b2'
    },
    container: {
        minHeight: 45,
        flex: 1,
        paddingVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    title: {
        color: utils.theme.minorColor,
        fontSize: 16
    },
    horizontalLine: {
        height: 1,
        backgroundColor: utils.theme.lineColor,
        marginHorizontal: 15
    },
    icon: {
        width:15,
        height:15
    },
    btnContainer: {
        flexDirection: 'row',
        position: 'absolute',
        right: 0,
        zIndex: 99
    },
    rowFlex: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})
