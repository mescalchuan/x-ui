# 一个跨平台UI组件库

x-ui是基于react native和react开发出的跨android、ios和h5的三端ui组件库。

文档地址请戳[「这里」](https://mescalchuan.github.io/xui/)

### 如何使用

#### 起步
`git clone`本项目地址，将`common`和`component`放入项目中，之后您需要根据自身需求做出相应配置。

#### H5

##### 移动端适配
`x-ui` h5端统一使用了阿里的`flexible.js`适配方案，版本为`0.3.4`，通过`<script src="http://g.tbcdn.cn/mtb/lib-flexible/0.3.4/??flexible_css.js,flexible.js"></script>`将其链接到`header`标签中。`flexible.js`以iphone6为参考单位：在`375 x 667`dp， `dpr`为2的情况下，页面的缩放比例为0.5，html的`font-size`为75px。以100px为例，最终计算出的rem值为`(100*2/75)rem`。对于字体而言，建议以`[data-dpr]`属性来区分不同dpr下的文本字号大小：

```css
div { font-size: 16px; } 
[data-dpr="2"] div { font-size: 32px; } 
[data-dpr="3"] div { font-size: 48px; }
```

##### 字体
请将`fonts`文件夹放入您的项目中，并在css文件中配置：

```css
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

> H5 与 Native 单位换算：1rem(h5) = 37.5px(h5) = 37.5(rn)
