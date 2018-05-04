import React, {Component} from 'react';
import Button from '../button';
import PropTypes from 'prop-types';
import utils from '../../common/util.d';
import error from '../../common/error';
import './index.scss';

/**
 * defaultPageNum --> 默认页码数
 * pageNum --> 页码数
 * pageTotal --> 总页数
 * previous --> 上一页按钮文字
 * next --> 下一页按钮文字
 * hidePage --> 隐藏数字
 * hideButton --> 隐藏按钮
 * disabled --> 禁用分页按钮
 * onChange --> 页码改变时的回调
 * activePageColor --> 当前页码的颜色
 * pageColor --> 数字的颜色(/pageTotal)
 * previousBtnStyle --> 上一页按钮样式
 * nextBtnStyle --> 下一页按钮样式
 * previousTextStyle --> 上一页文字样式
 * nextTextStyle --> 下一页文字样式
 */

export default class Pagination extends Component{
    static defaultProps = {
        pageTotal: 1,
        previous: '上一页',
        next: '下一页',
        hidePage: false,
        hideButton: false,
        disabled: false,
        activePageColor: utils.theme.mainColor,
        pageColor: utils.theme.minorColor,
        previousBtnStyle: {},
        nextBtnStyle: {},
        previousTextStyle: {},
        nextTextStyle: {},
        onChange: () => {}
    }
    // defaultPageNum/pageNum必须大于等于1且小于等于pageTotal
    // pageTotal必须大于等于1
    static propTypes = {
        defaultPageNum: error.customPageNumTypes,
        pageNum: error.customPageNumTypes,
        pageTotal: error.customPageTotalTypes,
        previous: PropTypes.string,
        next: PropTypes.string,
        hidePage: PropTypes.bool,
        hideButton: PropTypes.bool,
        disabled: PropTypes.bool,
        activePageColor: PropTypes.string,
        pageColor: PropTypes.string,
        previousBtnStyle: PropTypes.object,
        nextBtnStyle: PropTypes.object,
        previousTextStyle: PropTypes.object,
        nextTextStyle: PropTypes.object,
        onChange: PropTypes.func
    }
    constructor(props){
        super(props);
        this.state = {
            currentPage: 1
        }
    }
    componentWillMount(){
        if(this.props.pageNum != null){
            this.setState({
                currentPage: this.props.pageNum
            })
        }
        else if(this.props.defaultPageNum != null){
            this.setState({
                currentPage: this.props.defaultPageNum
            })
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.pageNum != this.props.pageNum){
            this.setState({
                currentPage: nextProps.pageNum
            })
        }
    }
    addPageNum(){
        const prevPage = this.state.currentPage;
        let nextPage = prevPage;
        if(prevPage < this.props.pageTotal){
            nextPage += 1;
        }
        if(this.props.pageNum == null){
            this.setState({
                currentPage: nextPage
            }, () => {
                this.props.onChange && this.props.onChange(this.state.currentPage)
            });
        }
        else{
            this.props.onChange && this.props.onChange(nextPage)
        }
    }
    subtractPageNum(){
        const prevPage = this.state.currentPage;
        let nextPage = prevPage;
        if(prevPage > 1){
            nextPage -= 1;
        }
        if(this.props.pageNum == null){
            this.setState({
                currentPage: nextPage
            }, () => {
                this.props.onChange && this.props.onChange(this.state.currentPage)
            });
        }
        else{
            this.props.onChange && this.props.onChange(nextPage)
        }
    }
    render(){
        const btnStyle = {
            borderColor: utils.theme.lineColor,
            borderWidth: 1,
            backgroundColor: 'white'
        };
        const justifyContent = this.props.hideButton ? 'center' : 'between';
        const previousDisabled = this.props.disabled || (this.state.currentPage > 1 ? false : true);
        const nextDisabled = this.props.disabled || (this.state.currentPage < this.props.pageTotal ? false : true);
        return (
            <div className = {`x-pagination-container x-pagination-justify-${justifyContent}`} >
                {
                    !this.props.hideButton ?
                    <Button
                        buttonStyle = {{...btnStyle, ...this.props.previousBtnStyle}}
                        textStyle = {{...{color: utils.theme.minorColor}, ...this.props.previousTextStyle}}
                        inline
                        disabled = {previousDisabled}
                        onPress = {() => this.subtractPageNum()}
                    >
                        {this.props.previous}
                    </Button> : null
                }
                {
                    !this.props.hidePage ?
                    <span className = {'x-pagination-text'} style = {{color: this.props.pageColor}} >
                        <span style = {{color: this.props.activePageColor}} >{this.state.currentPage}</span>
                        /{this.props.pageTotal}
                    </span> : null
                }
                {
                    !this.props.hideButton ?
                    <Button
                        buttonStyle = {{...btnStyle, ...this.props.nextBtnStyle}}
                        textStyle = {{...{color: utils.theme.minorColor}, ...this.props.nextTextStyle}}
                        inline
                        disabled = {nextDisabled}
                        onPress = {() => this.addPageNum()}
                    >
                        {this.props.next}
                    </Button> : null
                }
            </div>
        )
    }
}
