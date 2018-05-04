import React, { Component } from 'react';
import PropTypes from 'prop-types';
import utils from '../../common/util.d';
import './index.scss';

const ITEM_HEIGHT = 120;
const LINE_HEIGHT = 2;
const TITLE_HEIGHT = 80;
const CANCEL_MARGIN = 20;
const animateTime = 0.2;

/**
 * title: 标题
 * options: 每个按钮的标题，也可以是自定义组件 ['button1', <Text>button2</Text>]
 * showCancelButton: 是否显示取消按钮
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
            isShow: false,
            opacity: 0,
            sheetAnim: this.translateY
        }
        this.timer = null;
    }

    calculateHeight(props) {
        let optionsLength = props.options.length;
        if(props.showCancelButton) {
            optionsLength++;
        }
        let height = optionsLength * ITEM_HEIGHT;
        height += (optionsLength - 1) * LINE_HEIGHT;
        if(this.props.showCancelButton) {
            height += CANCEL_MARGIN;
            height -= LINE_HEIGHT;
        }
        if(this.props.title) {
            height += TITLE_HEIGHT;
        }
        return utils.px2rem(height);
    }

    show() {
        this.setState(prevState => ({
            isShow: true
        }));
        this.timer = setTimeout(() => this.setState({opacity: 0.5, sheetAnim: 0}), 0);
    }

    close(callback) {
        this.timer && clearTimeout(this.timer);
        this.setState(prevState => ({
            opacity: 0,
            sheetAnim: this.translateY
        }));
        this.timer = setTimeout(() => {
            this.setState({
                isShow: false
            });
            callback && callback()
        }, animateTime * 1000)
    }

    renderButton() {
        const _options = this.props.options;
        let options = this.props.showCancelButton ? _options.concat(this.props.cancelButtonTitle) : _options;
        if(this.props.title){
            options.splice(0, 0, this.props.title);
        }
        return options.map((item, index) => {
            let lineView = null;
            if(this.props.showCancelButton){
                lineView = options.length > 1 && (index != options.length - 2 && index != options.length - 1) ? <hr/> : null;
            }
            else{
                lineView = index != options.length - 1 ? <hr/> : null;
            }
            const isCancel = this.props.showCancelButton && index == options.length - 1;
            const isTitle = this.props.title && index == 0;
            const marginTop = isCancel ? CANCEL_MARGIN : 0;
            const height = isTitle ? utils.px2rem(TITLE_HEIGHT) : utils.px2rem(ITEM_HEIGHT);
            const fontClass = isTitle ? 'x-ah-title-text' : 'x-ah-item-text';
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
                <div key = {index} >
                    <div
                        className = {'x-ah-item'}
                        style = {{marginTop, height}}
                        onClick = {_onPress}
                    >
                        <span className = {`${fontClass}`} style = {{fontWeight, color}} >{item}</span>
                    </div>
                    {lineView}
                </div>
            )
        })
    }

    componentWillReceiveProps(nextProps){
        this.translateY = this.calculateHeight(nextProps)
    }

    render() {
        const maskStyle = {
            WebkitTransition: `all ${animateTime}s`,
            transition: `all ${animateTime}s`,
            backgroundColor: `rgba(0, 0, 0, ${this.state.opacity})`
        }
        const optionsStyle = {
            WebkitTransition: `all ${animateTime}s`,
            transition: `all ${animateTime}s`,
            bottom: '-' + this.state.sheetAnim
        }
        const externalClass = this.state.isShow ? 'x-show' : 'x-hide';
        return (
            <div
                className = {`x-ah-mask ${externalClass}`}
                style = {maskStyle}
                onClick = {this.props.backdropPressToClose ? () => this.close() : () => {}}
            >
                <div className = {`x-ah-bd ${externalClass}`} style = {optionsStyle} >
                    {this.renderButton()}
                </div>
            </div>
        )
    }
}
