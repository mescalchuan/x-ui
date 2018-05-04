import React, {Component} from 'react';
import PropTypes from 'prop-types';
import IconMap from './iconMap.json';
import utils from '../../common/util.d';
import './index.scss';

/**
 * name: icon名字，参考iconMap.json
 * size: icon大小
 * color: icon颜色
 * iconStyle: 自定义icon样式
 */

export default class Icon extends Component {
    static defaultProps = {
        name: 'ios-add',
        size: 30,
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
            fontSize: utils.getFontSize(size),
            color,
            ...iconStyle
        };
        let iconCode = IconMap[name];
        if(!iconCode) iconCode = IconMap['ios-add'];
        return (
            <i className = {'x-icon'} style = {_iconStyle} >{String.fromCharCode(iconCode)}</i>
        )
    }
}
