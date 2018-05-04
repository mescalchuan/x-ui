import React, {Component} from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import utils from '../../common/util';

/**
**最基本的卡片组件，仅仅定义了Card、Card.Header、Card.Body、Card.Footer的基本布局。
**可以通过定义属性来修改它们
**Card.Body定义了图片的样式以保证图片是铺满整个宽度的
**/

class Card extends Component{
    static defaultProps = {
        cardStyle: {}
    }
    static propTypes = {
        cardStyle: PropTypes.object
    }
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <View style = {[styles.card, this.props.cardStyle]} >
                {this.props.children}
            </View>
        )
    }
}

class Header extends Component{
    static defaultProps = {
        headerStyle: {}
    }
    static propTypes = {
        headerStyle: PropTypes.object
    }
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <View style = {[styles.header, this.props.headerStyle]} >
                {this.props.children}
            </View>
        )
    }
}

class Body extends Component{
    static defaultProps = {
        bodyStyle: {}
    }
    static propTypes = {
        bodyStyle: PropTypes.object
    }
    constructor(props) {
        super(props);
    }
    wrapBody(){
        return React.Children.map(this.props.children, (item, index) => {
            let wrapStyle = {};
            let extendProps = {};
            if(item.type.displayName == 'Image'){
                wrapStyle = {
                    maxWidth: utils.window.width,
                }
                extendProps = {
                    resizeMode: 'cover'
                }
                return <View style = {styles.wrapContainer} >
                {
                    React.cloneElement(item, {
                        key: index,
                        style: [wrapStyle, item.props.style],
                        ...extendProps
                    })
                }
                </View>
            }
            return React.cloneElement(item, {
                key: index,
                style: item.props.style
            })
        })
    }
    render(){
        return (
            <View style = {[styles.body, this.props.bodyStyle]} >
                {this.wrapBody()}
            </View>
        )
    }
}

class Footer extends Component{
    static defaultProps = {
        footerStyle: {}
    }
    static propTypes = {
        footerStyle: PropTypes.object
    }
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <View style = {[styles.footer, this.props.footerStyle]} >
                {this.props.children}
            </View>
        )
    }
}

Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;

export default Card;

const styles = StyleSheet.create({
    wrapContainer: {
        marginHorizontal: -15,
        marginTop: -15,
        backgroundColor: 'white'
    },
    card: {
        borderWidth: 1,
        borderColor: utils.theme.lineColor,
        backgroundColor: 'white'
    },
    header: {
        padding: 15,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: utils.theme.lineColor
    },
    body: {
        padding: 15
    },
    footer: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderColor: utils.theme.lineColor
    }
})
