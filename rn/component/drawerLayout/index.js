import React, {Component} from 'react';
import {
    View,
    TouchableWithoutFeedback,
    PanResponder,
    Animated,
    StyleSheet,
    Keyboard
} from 'react-native';
import PropTypes from 'prop-types';
import utils from '../../common/util';

const MIN_SWIPE_DISTANCE = 3;
const DEVICE_WIDTH = utils.window.width;
const VX_MAX = 0.1;
const TOUCH_START_POINT = 35;

export const DRAWER_POSITION = {
    LEFT: 'left',
    RIGHT: 'right'
}
export const DRAWER_LOCK_MODE = {
    UNLOCKED: 'unlocked',
    LOCKED_CLOSED: 'locked-closed',
    LOCKED_OPEN: 'locked-open'
}
export const KEYBOARD_DISMISS_MODE = {
    NONE: 'none',
    ON_DRAG: 'on-drag'
}

/**
 * 与react native的DrawerLayoutAndroid api保持一致，去掉了onDrawerStateChanged
 */

export default class DrawerLayout extends Component{
    static defaultProps = {
        drawerWidth: 200,
        renderNavigationView: () => {},
        drawerPosition: DRAWER_POSITION.LEFT,
        drawerLockMode: DRAWER_LOCK_MODE.UNLOCKED,
        keyboardDismissMode: KEYBOARD_DISMISS_MODE.NONE,
        onDrawerOpen: () => {},
        onDrawerClose: () => {},
        onDrawerSlide: () => {}
    }
    static propTypes = {
        drawerWidth: PropTypes.number,
        renderNavigationView: PropTypes.func,
        drawerPosition: PropTypes.string,
        drawerLockMode: PropTypes.string,
        keyboardDismissMode: PropTypes.string,
        onDrawerOpen: PropTypes.func,
        onDrawerClose: PropTypes.func,
        onDrawerSlide: PropTypes.func
    }
    constructor(props){
        super(props);
        this.state = {
            drawerStartShow: false,
            drawerHasShown: false,
            openValue: new Animated.Value(0)
        }
        this._onPanResponderMove = this._onPanResponderMove.bind(this);
        this._shouldSetPanResponder = this._shouldSetPanResponder.bind(this);
        this._onPanResponderRelease = this._onPanResponderRelease.bind(this);

    }
    componentWillMount() {
        this.watcher = PanResponder.create({
            onMoveShouldSetPanResponder: this._shouldSetPanResponder,
            onPanResponderMove: this._onPanResponderMove,
            onPanResponderTerminationRequest: () => false,
            onPanResponderRelease: this._onPanResponderRelease,
            onPanResponderTerminate: () => {},
        })
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.drawerLockMode != this.props.drawerLockMode){
            if(nextProps.drawerLockMode == DRAWER_LOCK_MODE.LOCKED_OPEN && !this.state.drawerHasShown){
                this.openDrawer();
            }
            else if(nextProps.drawerLockMode == DRAWER_LOCK_MODE.LOCKED_CLOSED && this.state.drawerHasShown){
                this.closeDrawer();
            }
        }
    }

    openDrawer(){
        this.setState({
            drawerStartShow: true
        })
        Animated.spring(this.state.openValue, {
            toValue: 1,
            bounciness: 0,
            overshootClamping: true,
            restSpeedThreshold: 0.1,
            useNativeDriver: true,
        }).start(() => {
            this.props.onDrawerOpen && this.props.onDrawerOpen();
            this.setState({
                drawerHasShown: true
            })
        });
    };

    closeDrawer(options){
        Animated.spring(this.state.openValue, {
            toValue: 0,
            bounciness: 0,
            restSpeedThreshold: 0.1,
            useNativeDriver: true,
            ...options,
        }).start(() => {
            this.props.onDrawerClose && this.props.onDrawerClose();
            this.setState({
                drawerStartShow: false,
                drawerHasShown: false
            })
        });
    };
    overlayClick(){
        if(this.props.drawerLockMode == DRAWER_LOCK_MODE.UNLOCKED){
            this.closeDrawer();
        }
    }
    _shouldSetPanResponder(e, gesture) {
        if(this.props.drawerLockMode == DRAWER_LOCK_MODE.UNLOCKED){
            if(this.props.drawerPosition == DRAWER_POSITION.LEFT){
                if(!this.state.drawerHasShown){
                    if(gesture.dx > MIN_SWIPE_DISTANCE &&
                        gesture.moveX > MIN_SWIPE_DISTANCE &&
                        gesture.moveX < TOUCH_START_POINT &&
                        Math.abs(gesture.dx) > Math.abs(gesture.dy) * MIN_SWIPE_DISTANCE) return true;
                }
                else{
                    if(gesture.dx < -MIN_SWIPE_DISTANCE &&
                        gesture.moveX > MIN_SWIPE_DISTANCE &&
                        gesture.moveX <= this.props.drawerWidth &&
                        Math.abs(gesture.dx) > Math.abs(gesture.dy) * MIN_SWIPE_DISTANCE) return true;
                }
            }
            else{
                if(!this.state.drawerHasShown){
                    if(-gesture.dx > MIN_SWIPE_DISTANCE &&
                        (utils.window.width - gesture.moveX) > MIN_SWIPE_DISTANCE &&
                        (utils.window.width - gesture.moveX) < TOUCH_START_POINT &&
                        Math.abs(gesture.dx) > Math.abs(gesture.dy) * MIN_SWIPE_DISTANCE) return true;
                }
                else{
                    if(gesture.dx  > MIN_SWIPE_DISTANCE &&
                        (utils.window.width - gesture.moveX) > MIN_SWIPE_DISTANCE &&
                        (utils.window.width - gesture.moveX) <= this.props.drawerWidth &&
                        Math.abs(gesture.dx) > Math.abs(gesture.dy) * MIN_SWIPE_DISTANCE &&
                        Math.abs(gesture.dx) > Math.abs(gesture.dy) * MIN_SWIPE_DISTANCE) return true;
                }
            }
        }
        return false;
    }

    _onPanResponderMove(e, gesture) {
        let openValue = this.props.drawerPosition == DRAWER_POSITION.LEFT ?
            gesture.moveX / this.props.drawerWidth :
            (utils.window.width - gesture.moveX) / this.props.drawerWidth;
        if (openValue >= 1) {
            openValue = 1;
        }
        else if (openValue < 0) {
            openValue = 0;
        }
        if(this.state.drawerHasShown){
            openValue = (this.props.drawerWidth - Math.abs(gesture.dx)) / this.props.drawerWidth;
        }
        this.state.openValue.setValue(openValue);
        this.props.onDrawerSlide && this.props.onDrawerSlide();
        this.props.keyboardDismissMode == KEYBOARD_DISMISS_MODE.ON_DRAG && Keyboard.dismiss();
    };

    _onPanResponderRelease(e, gesture) {
        if(Math.abs(gesture.vx) >= VX_MAX){
            !this.state.drawerHasShown ? this.openDrawer() : this.closeDrawer({velocity: gesture.vx});
        }
        else{
            if(this.props.drawerPosition == DRAWER_POSITION.LEFT){
                if(gesture.moveX < this.props.drawerWidth / 2){
                    this.closeDrawer();
                }
                else{
                    this.openDrawer();
                }
            }
            else{
                if((utils.window.width - gesture.moveX) < this.props.drawerWidth / 2){
                    this.closeDrawer();
                }
                else{
                    this.openDrawer();
                }
            }
        }
    }

    render() {
        const outputRange = this.props.drawerPosition == DRAWER_POSITION.LEFT ? [-this.props.drawerWidth, 0] : [util.window.width, util.window.width - this.props.drawerWidth];
        const drawerTranslateX = this.state.openValue.interpolate({
            inputRange: [0, 1],
            outputRange
        });
        const overlayOpacity = this.state.openValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.5]
        });
        const pointerEvents = this.state.drawerHasShown ? 'auto' : 'none';
        return (
            <>
                <Animated.View {...this.watcher.panHandlers} style = {{flex: 1}} >
                    {this.props.children}
                </Animated.View>
                <TouchableWithoutFeedback
                    onPress = {() => this.overlayClick()}
                    pointerEvents = {pointerEvents}
                >
                    <Animated.View
                        pointerEvents={pointerEvents}
                        style = {[styles.overlay, {opacity: overlayOpacity}]}
                    />
                </TouchableWithoutFeedback>
                {
                    this.state.drawerStartShow ? <Animated.View
                        style = {[
                            styles.drawer,
                            {width: this.props.drawerWidth, left: 0, elevation: 5},
                            {transform: [{translateX: drawerTranslateX}]},
                        ]}
                    >
                        {this.props.renderNavigationView()}
                    </Animated.View> : null
                }

            </>
        );
    }
}

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: '#000',
        position: 'absolute',
        width: util.window.width,
        height: util.window.height,
        zIndex: 98,
        top: 0,
        left: 0
    },
    drawer: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: util.window.height,
        zIndex: 99,
        backgroundColor: 'white'
    },
})
