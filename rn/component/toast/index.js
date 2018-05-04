import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated
} from 'react-native';

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
            opacity: new Animated.Value(0),
            renderView: false,
            ...defaultConfig
        }
        this.anim = null;
    }
    show(config){
        if(this.anim){
            this.anim.stop();
            this.anim = null;
        }
        let {content, duration, mask} = config;
        duration = duration ? duration : defaultConfig.duration;
        if(mask == undefined){
            mask = defaultConfig.mask;
        }

        this.setState({
            content,
            duration,
            mask,
            renderView: true
        }, () => {
            const timing = Animated.timing;
            const animArr = [
                timing(this.state.opacity, {
                    toValue: 1,
                    duration: 200
                }),
                Animated.delay(this.state.duration)
            ];
            if(this.state.duration > 0){
                animArr.push(
                    timing(this.state.opacity, {
                        toValue: 0,
                        duration: 200
                    })
                )
            }
            this.anim = Animated.sequence(animArr);
            this.anim.start(() => {
                if(this.state.duration > 0){
                    this.anim = null;
                    this.setState({
                        renderView: false
                    })
                }
            })
        })

    }
    componentWillUnmount(){
        if(this.anim){
          this.anim.stop();
          this.anim = null;
        }
      }
    render(){
        return (
            this.state.renderView ?
            <View style = {styles.container} pointerEvents = {this.state.mask ? undefined : 'box-none'} >
                <Animated.View style = {{opacity: this.state.opacity}} >
                    <View style = {styles.toastBox} >
                        <Text style = {styles.toastText} >{this.state.content}</Text>
                    </View>
                </Animated.View>
            </View> : null
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    },
    toastBox: {
        paddingVertical: 9,
        paddingHorizontal: 15,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 3,
        minWidth: 100,
        alignItems: 'center'
    },
    toastText: {
        color: 'white',
        fontSize: 17,
    }
})
