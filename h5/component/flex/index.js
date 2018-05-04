import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './index.scss';

/**
 * justify --> justifyContent
 * align --> alignItems: 比rn版本多了stretch和baseline
 * wrap --> flexWrap
 * flexStyle --> 自定义flex容器样式
 */

class Flex extends Component{
    static defaultProps = {
        justify: 'flex-start',
        align: 'flex-start',
        wrap: 'wrap',
        flexStyle: {}
    }
    static propTypes = {
        justify: PropTypes.string,
        align: PropTypes.string,
        wrap: PropTypes.string,
        flexStyle: PropTypes.object
    }
    constructor(props){
        super(props);
    }
    render() {
        const {justify, align, wrap, flexStyle, children} = this.props;
        return (
            <div className = {`x-flex-container x-flex-justify-${justify} x-flex-align-${align} x-flex-${wrap}`} style = {flexStyle} >
                {children}
            </div>
        )
    }
}

/**
 * flex: 占用比例
 * flexItemStyle: 自定义flexItem样式
 */

class Item extends Component{
    static defaultProps = {
        flex: 1,
        flexItemStyle: {}
    }
    static propTypes = {
        flex: PropTypes.number,
        flexItemStyle: PropTypes.object
    }
    constructor(props){
        super(props);
    }
    render(){
        const {flex, flexItemStyle, children}  = this.props;
        const _flexItemStyle = {
            flex,
            WebkitFlex: flex
        }
        return (
            <div style = {{..._flexItemStyle, ...flexItemStyle}} >
                {children}
            </div>
        )
    }
}

Flex.Item = Item;
export default Flex;
