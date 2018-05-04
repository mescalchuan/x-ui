import React, {Component} from 'react';
import PropTypes from 'prop-types';
import utils from '../../common/util.d';
import './index.scss';

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
            <div className = {'x-card'} style = {this.props.cardStyle} >
                {this.props.children}
            </div>
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
            <div className = {'x-card-header'} style = {this.props.headerStyle} >
                {this.props.children}
            </div>
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
            if(item.type == 'img') {
                return <div className = {'x-card-wrap-container'} >
                {
                    React.cloneElement(item, {
                        key: index,
                        style: item.props.style
                    })
                }
                </div>
            }
            return React.cloneElement(item, {
                key: index,
                style: item.props.style
            })
        })
    }
    render(){
        return (
            <div className = {'x-card-body'} style = {this.props.bodyStyle} >
                {this.wrapBody()}
            </div>
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
            <div className = {'x-card-footer'} style = {this.props.footerStyle} >
                {this.props.children}
            </div>
        )
    }
}

Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;

export default Card;
