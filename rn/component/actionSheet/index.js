import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    StyleSheet,
    Animated
} from 'react-native';
import PropTypes from 'prop-types';
import utils from '../../common/util';

const ITEM_HEIGHT = 60;
const LINE_HEIGHT = 1;
const TITLE_HEIGHT = 40;
const CANCEL_MARGIN = 10;

/**
 * title: 标题
 * options: 每个按钮的标题，也可以是自定义组件 ['button1', <Text>button2</Text>]
 * showCancelButtpn: 是否显示取消按钮
 * cancelButtonTitle: “取消”按钮的标题
 * cancelButtonColor: “取消”按钮的颜色
 * backdropPressToClose: 点击遮罩层时是否关闭ActionSheet
 * onPress: ActionSheet点击事件，会返回每个options的索引
 */

export default class ActionSheet extends Component{
    static defaultProps = {
        title: '',
        options: [],
        showCancelButton: true,
        cancelButtonTitle: '取消',
        cancelButtonColor: '#108EE9',
        backdropPressToClose: false,
        onPress: () => {}
    }
    static propTypes = {
		title: PropTypes.string,
        options: PropTypes.array,
        showCancelButton: PropTypes.bool,
        cancelButtonTitle: PropTypes.string,
        cancelButtonColor: PropTypes.string,
        backdropPressToClose: PropTypes.bool,
        onPress: PropTypes.func
	}
    constructor(props){
        super(props);
        this.translateY = this.calculateHeight(props);
        this.state = {
            modalVisible: false,
            sheetAnim: new Animated.Value(this.translateY)
        }
    }
    calculateHeight(props){
        let optionsLength = props.options.length;
        if(props.showCancelButton){
            optionsLength++;
        }
        let height = optionsLength * ITEM_HEIGHT;
        height += (optionsLength - 1) * LINE_HEIGHT;
        if(this.props.showCancelButton){
            height += CANCEL_MARGIN;
            height -= LINE_HEIGHT;
        }
        if(this.props.title){
            height += TITLE_HEIGHT;
        }
        return height;
    }
    show(){
        this.setState({
            modalVisible: true
        })
        this._showSheet();
    }
    _showSheet(){
        Animated.timing(this.state.sheetAnim, {
            toValue: 0,
            duration: 250
        }).start();
    }
    close(){
        this._closeSheet(() => this.setState({
            modalVisible: false
        }));
    }
    _closeSheet(callback){
        Animated.timing(this.state.sheetAnim, {
            toValue: this.translateY,
            duration: 200
        }).start(callback);
    }
    renderButton(){
        const _options = this.props.options;
        const options = this.props.showCancelButton ? _options.concat(this.props.cancelButtonTitle) : _options;
        if(this.props.title) {
            options.splice(0, 0, this.props.title);
        }
        return options.map((item, index) => {
            let lineView = null;
            if(this.props.showCancelButton){
                lineView = options.length > 1 && (index != options.length - 2 && index != options.length - 1) ? <View style = {styles.lineView} ></View> : null;
            }
            else{
                lineView = index != options.length - 1 ? <View style = {styles.lineView} ></View> : null;
            }
            const isCancel = this.props.showCancelButton && index == options.length - 1;
            const isTitle = this.props.title && index == 0;
            const marginTop = isCancel ? CANCEL_MARGIN : 0;
            const height = isTitle ? TITLE_HEIGHT : ITEM_HEIGHT;
            const fontSize = isTitle ? 15 : 18;
            const fontWeight = isCancel ? 'bold' : 'normal';
            let color = isCancel ? this.props.cancelButtonColor : utils.theme.minorColor;
            color = isTitle ? '#939393' : color;
            const _index = this.props.title ? index - 1 : index;
            let _onPress = () => {};
            //点击的是title
            if(this.props.title && index == 0){

            }
            //点击的是cancel
            else if(isCancel){
                _onPress = () => this.close();
            }
            else{
                _onPress = () => this.props.onPress(_index);
            }
            return (
                <View key = {index} >
                    <TouchableOpacity
                        activeOpacity = {1}
                        style = {[styles.itemContainer, {marginTop, height}]}
                        onPress = {_onPress}
                    >
                        <Text style = {[styles.itemText, {fontSize, fontWeight, color}]} >{item}</Text>
                    </TouchableOpacity>
                    {lineView}
                </View>
            )
        })
    }

    componentWillReceiveProps(nextProps){
        this.translateY = this.calculateHeight(nextProps)
    }

    render(){
        return (
            <Modal
                visible = {this.state.modalVisible}
                onRequestClose = {() => {}}
                transparent = {true}
                animationType = {'none'}
            >
                <TouchableOpacity
                    onPress = {this.props.backdropPressToClose ? () => this.close() : () => {}}
                    style = {styles.maskContainer}
                    activeOpacity = {1}
                >
                    <Animated.View
                        style={[styles.bd, {height: this.translateY, transform: [{translateY: this.state.sheetAnim}]}]}
                    >
                       <View style = {{backgroundColor: '#e8e8e8'}} >
                            {this.renderButton()}
                       </View>
                    </Animated.View>
                </TouchableOpacity>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    maskContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    bd: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    itemContainer: {
        height: ITEM_HEIGHT,
        width: utils.window.width,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemText: {
        color: utils.theme.minorColor,
        fontSize: 18
    },
    lineView: {
        height: 1,
        backgroundColor: utils.theme.lineColor
    }
})
