import React, { Component } from 'react';
import PropTypes from 'prop-types';
import utils from '../../common/util.d';
import './index.scss';
/**
 * listStyle: list样式
 * title: 列表标题
 * titleStyle: 自定义标题样式
 * rightContent: list右侧内容
 * rightIcon: 右侧icon
 * showRightIcon: 是否显示右侧icon
 *  leftContent: list左侧内容
 *  leftContentFlex: 左侧内容的垂直布局（flex-start、center、flex-end、stretch、baseline）
 *  rightContentFlex: 右侧内容的垂直布局（flex-start、center、flex-end、stretch、baseline）
 *  onPress: list点击时的回调
 *  showLine: 是否显示底部分割线
 *  lineMargin: 底部分割线的margin 基于html font-size
 */

export default class List extends Component {
    static defaultProps = {
        listStyle: {},
        title: '',
        titleStyle: {},
        rightContent: null,
        rightIcon: <img className = {'x-list-icon'} src = {utils.icon64.right}/>,
        showRightIcon: true,
        leftContent: null,
        leftContentFlex: 'center',
        rightContentFlex: 'center',
        onPress: () => {},
        showLine: false,
        lineMargin: 30,
    }
    static propTypes = {
        listStyle: PropTypes.object,
        title: PropTypes.string,
        titleStyle: PropTypes.object,
        rightContent: PropTypes.element,
        rightIcon: PropTypes.element,
        showRightIcon: PropTypes.bool,
        leftContent: PropTypes.element,
        leftContentFlex: PropTypes.string,
        rightContentFlex: PropTypes.string,
        onPress: PropTypes.func,
        showLine: PropTypes.bool,
        lineMargin: PropTypes.number,
    }
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className = {'x-list-container'} >
                <div className = {'x-list-content'} onClick = {() => this.props.onPress()} style = {this.props.listStyle} >
                    <div className = {`x-list-row-flex x-list-align-${this.props.leftContentFlex}`} >
                        {this.props.leftContent}
                        <div>
                            <p className = {'x-list-title'} style = {this.props.titleStyle} >{this.props.title}</p>
                            {this.props.children}
                        </div>
                    </div>
                    <div className = {`x-list-row-flex x-list-align-${this.props.rightContentFlex}`} >
                        {this.props.rightContent}
                        {
                            this.props.showRightIcon ? this.props.rightIcon : null
                        }
                    </div>
                </div>
                {
                    this.props.showLine ? <hr style = {{margin: `0 ${utils.px2rem(this.props.lineMargin)}`}} /> : null
                }
            </div>
        )
    }
}
