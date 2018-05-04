# x-ui
跨平台的移动端ui组件库

### 介绍
x-ui是基于react native和react开发出的移动app端和h5端的三端ui组件库。

### 如何使用
#### 起步
`git clone`本项目地址，将`common`和`component`放入项目中，之后您需要根据自身需求做出相应配置。

#### H5
##### 移动端适配
`x-ui` h5端统一使用了阿里的`flexible.js`适配方案，版本为`0.3.4`，通过`<script src="http://g.tbcdn.cn/mtb/lib-flexible/0.3.4/??flexible_css.js,flexible.js"></script>`将其链接到`header`标签中。`flexible.js`以iphone6为参考单位：在`375 x 667`dp， `dpr`为2的情况下，页面的缩放比例为0.5，html的`font-size`为75px。以100px为例，最终计算出的rem值为`(100*2/75)rem`。对于字体而言，建议以[data-dpr]属性来区分不同dpr下的文本字号大小：
```
div { font-size: 16px; } 
[data-dpr="2"] div { font-size: 32px; } 
[data-dpr="3"] div { font-size: 48px; }
```

##### 字体
请将`fonts`文件夹放入您的项目中，并在css文件中配置：
```
@font-face
{
    font-family: Ionicons;
    src: url('fonts/Ionicons.ttf');
    font-style: italic; //required
}
```

#### React Native
##### Android
请将`fonts`文件夹放入`android/app/src/main/assets/`中。
##### IOS
请将`fonts`文件夹托至xcode中，勾选`Add to targets`和`Create groups`。在`Info.plist`中新建`Fonts provided by application`属性，item设置为`Ionicons`。

### 组件
#### actionsheet
底部弹出框，多用于分享、图片下载等操作。

属性 | 说明 | 类型 | 默认值
----|-----|------|------
title | 标题 | string | `""`
options | 按钮配置项 | array | `[]`
showCancelButton | 是否显示取消按钮 | boolean | `true`
cancelButtonTitle | “取消”按钮的标题 | string | `"取消"`
cancelButtonColor | “取消”按钮的颜色 | string | `"#108EE9"`
backdropPressToClose | 点击遮罩层时是否关闭ActionSheet | boolean | `false`
onPress | ActionSheet点击事件，会返回每个options的索引 | function | `() => {}`
show() `static` | 外部打开actionsheet | function | |
hide()  `static` | 外部关闭actionsheet | function | |
```
<ActionSheet
  ref = {o => this.ActionSheet = o}
  options = {[
    'option1',
    <span className = {'header-text text-blue-color'} >{'option2'}</span>,
    <span className = {'intro-title main-text-color'} >{'删除'}</span>
  ]}
  title = {'自定义组件'}
  backdropPressToClose = {true}
  cancelButtonColor = {'#ff4f4f'}
  onPress = {() => alert(index)}
/>
<button onClick = {() => this.ActionSheet.show()} >open</button>
```

```
<ActionSheet
  ref = {o => this.ActionSheet = o}
  options = {[
    'option1',
    <Text style = {{color: '#108EE9', fontSize: 18}} >{'option2'}</Text>,
    <Text style = {{color: '#ff4f4f', fontSize: 20}} >{'删除'}</Text>
  ]}
  title = {'自定义组件'}
/>
<Button title = {'open'} onPress = {() => this.ActionSheet.show()} />
```

#### badge
角标，用于消息数量的显示以及一般的小型徽标。当含有子组件时，角标悬浮在自组件右上角，num生效，text失效；当不含自组件时，角标作为单独的徽标，text失效，num生效。

属性 | 说明 | 类型 | 默认值
----|-----|------|------
num | 角标数字 | number | `0`
defaultBackColor | 角标背景色 | string | `"#ff4f4f"`
fontColor | 角标文字颜色 | string | `"white"`
text | 自定义角标内容 | string | `""`
style | 自定义角标样式 | object | `{}`

```
const boxContainer = <div className = {'badge-box'} ></div>
<Badge num = {1} style = {{marginRight: '0.8rem'}} >{boxContainer}</Badge>
<Badge text = {'券'} defaultBackColor = {'#f19736'} />
```

```
const containerBox = {
  width: 30,
  height: 30,
  backgroundColor: 'gray'
}
<Badge num = {1} style = {{marginRight: 30}} >
  <View style = {containerBox} ></View>
</Badge>
```

