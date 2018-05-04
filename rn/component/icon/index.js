import React, {Component} from 'react';
import {
    Text
} from 'react-native';
import PropTypes from 'prop-types';
import IconMap from './iconMap.json';

/**
 * name: icon名字，参考iconMap.json
 * size: icon大小
 * color: icon颜色
 * iconStyle: 自定义icon样式（Text）
 */

export default class Icon extends Component {
    static defaultProps = {
        name: 'ios-add',
        size: 15,
        color: '#666666',
        iconStyle: {}
    }
    static propTypes = {
        name: PropTypes.string,
        size: PropTypes.number,
        color: PropTypes.string,
        iconStyle: PropTypes.object
    }
    constructor(props) {
        super(props);
    }
    render() {
        const {name, size, color, iconStyle} = this.props;
        const _iconStyle = {
            fontSize: size,
            color,
            ...iconStyle
        };
        let iconCode = IconMap[name];
        if(!iconCode) iconCode = IconMap['ios-add'];
        return (
            <Text style = {{fontFamily: 'Ionicons', ..._iconStyle}} >{String.fromCharCode(iconCode)}</Text>
        )
    }
}
