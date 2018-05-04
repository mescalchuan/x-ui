import React, {Component, cloneElement} from 'react';
import './index.scss';
/**
 * content -->toast显示的内容
 * duration -->持续时间
 * mask -->是否使用遮罩层，默认为true，使用遮罩层的话在toast显示期间无法对屏幕进行任何操作
**/

const defaultConfig = {
    duration: 3000,
    mask: true,
    content: ''
}   

export default class Toast extends Component{
    constructor(props){
        super(props);
        this.state = {
            opacity: 0,
            renderView: false,
            ...defaultConfig
        }
        this.timer = null;
    }
    timerPromise(time) {
        return new Promise(resolve => {
            this.timer = setTimeout(() => {
                resolve(true);
            }, time)
        })
    }
    statePromise(obj) {
        return new Promise(resolve => {
            this.setState(prevState => (obj));
            resolve(true);
        })
    }
    show(config){
        let {content, duration, mask} = config;
        duration = duration ? duration : defaultConfig.duration;
        if(mask == undefined) {
            mask = defaultConfig.mask;
        }
        this.setState(prevState => ({
            renderView: true,
            content,
            duration,
            mask
        }));
        this.timer && clearTimeout(this.timer);
        this.statePromise({
            renderView: true,
            content,
            duration,
            mask})
            .then(() => this.timerPromise(0)) //等待视图更新完毕后再opacity: 1
            .then(() => this.statePromise({opacity: 1}))
            .then(() => this.timerPromise(duration))
            .then(() => this.statePromise({opacity: 0}))
            .then(() => this.timerPromise(200))
            .then(() => this.statePromise({renderView: false}))
            
    }
    componentWillUnmount(){
        if(this.anim){
          this.anim.stop();
          this.anim = null;
        }
    }
    render() {
        const toastStyle = {
            WebkitTransition: 'opacity 0.2s',
            transition: 'opacity 0.2s',
            opacity: this.state.opacity
        }
        return (
            this.state.renderView ?
            <div className = {`x-toast-mask ${this.state.mask ? 'x-toast-point-auto' : 'x-toast-point-none'}`} style = {toastStyle} >
                    <div className = {'x-toast-box'} >
                        <p className = {'x-toast-text'} >{this.state.content}</p>
                    </div>
            </div> : null
        )
    }
}
