import React, {Component} from 'react';
import {
    View
} from 'react-native';
import PropTypes from 'prop-types';

/**
 * justify --> justifyContent
 * align --> alignItems
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
        const _flexStyle = {
            flexDirection: 'row',
            justifyContent: justify,
            alignItems: align,
            flexWrap: wrap
        }
        return (
            <View style = {[_flexStyle, flexStyle]} >
                {children}
            </View>
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
        return (
            <View style = {[{flex}, flexItemStyle]} >
                {children}
            </View>
        )
    }
}

Flex.Item = Item;
export default Flex;
