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

#### button
按钮，支持块级、内联级、全填充、边框填充、大小等设置。

`import Button, {BUTTON_SIZE, BUTTON_TYPE} from './component/button'`

属性 | 说明 | 类型 | 默认值
----|-----|------|------
activeOpacity `rn only` | 按钮点击时的按钮透明度 | number | `0.6`
inline | 是否是行内按钮 | boolean | `false`
buttonColor | 按钮背景色 | string | `"#ff4f4f"`
buttonStyle | 自定义按钮样式 | object | `{}`
size | 按钮大小 | BUTTON_SIZE| `BUTTON_SIZE.MIDDLE`
type | 按钮类型 | BUTTON_TYPE| `BUTTON_TYPE.FILL`
textStyle | 文本样式 | object | `{}`
disabled | 是否禁用 | boolean | `false`
loading `rn only` | 是否显示loading圈 | boolean | `false`
loadingColor `rn only` | loading圈的颜色 | string | `"white"`
icon | 按钮小图标, 如果loading为true，则icon无效 | element | `null`
onPress | 触摸函数 | function | `() => {}` 

```
<Button
  inline
  size = {BUTTON_SIZE.SMALL}
  type = {BUTTON_TYPE.GHOST}
  icon = {<Icon name = {'ios-close-circle'} color = {'white'} size = {14} />}
  onPress = {() => alert('button')}
>small</Button>
```

#### card
卡片视图，用于详细信息的展示。

属性 | 说明 | 类型 | 默认值
----|-----|------|------
`Card` cardStyle | 卡片基本样式 | object | `{}`
`Card.Header` headerStyle | 头部样式 | object | `{}`
`Card.Body` bodyStyle | 主要内容体样式 | object | `{}`
`Card.Footer` footerStyle | 底部样式 | object | `{}`

```
<Card cardStyle = {margin15Ver} >
  <Card.Header>
    <p className = {'intro-text'} >这是一个标题</p>
  </Card.Header>
  <Card.Body>
    <p className = {'intro-text'} >这是一个同时使用到了Card.Header、Card.Body、Card.Footer的卡片。</p>
  </Card.Body>
  <Card.Footer>
    <p className = {'intro-text'} >底部左侧</p>
    <p className = {'intro-text'} >底部右侧</p>
  </Card.Footer>
</Card>
```

```
<Card cardStyle = {{marginHorizontal: 15, borderRadius: 8}} >
  <Card.Header>
    <Text style = {{color: '#333333', fontSize: 16, fontWeight: 'bold'}} >标题</Text>
  </Card.Header>
  <Card.Body>
    <Text style = {{color: '#666666'}} >考虑到卡片的样式因需求的不同而不同，我们没有规定卡片所嵌套的组件的样式，这需要您自己定制。</Text>
  </Card.Body>
  <Card.Footer footerStyle = {{paddingVertical: 10}} >
    <Text style = {{color: '#68b1ed'}} >喜欢</Text>
    <Text style = {{color: '#68b1ed'}} >更多</Text>
  </Card.Footer>
</Card>
```

#### carousel
轮播图，用于图片切换展示。

属性 | 说明 | 类型 | 默认值
----|-----|------|------
index | 当前索引值 | number | `0`
width | 轮播图宽度 `required` | number `rn`, any `h5` | `null`
height | 轮播图高度 `required` | number `rn`, any `h5` | `null`
autoPlay | 是否自动播放 | boolean | `true`
autoPlayTimeout | 自动播放时每张图片的切换时间 | number | 3000 `ms`
showDot | 是否展示圆点 | boolean | true
dotColor | 圆点的颜色 | string | `"#666666"`
activeDotColor | 激活圆点的颜色 | string | `"#68b1ed"`
dotWidth | 圆点的宽度 | number | 10 `rn`, 20 `h5(px)`
dotBottomOffset `rn only` | 原点距离轮播图底部的距离，默认为圆点的宽度 | number | `dotWidth`
onIndexChanged | 索引值发生改变时的回调 | function | `() => {}`
carouselStyle `rn only` | 轮播图样式 | object | `{}` 

```
const imgArr = ['./image/1.jpg', './image/2.jpg', './image/3.jpg', './image/4.jpg'];
<Carousel
  width = { '100vw' }
  height = { '30vh' }
  autoPlay = {false} 
  index = {2} 
  onIndexChanged = {(index) => console.log(index)}
>
  {
    imgArr && imgArr.map((url, index) =>
      <img key = { index } src = { url }/>)
  }
</Carousel>
```

```
const style = {width: utils.window.width, height: 200}
<Carousel 
  carouselStyle = {{marginBottom: 20}} 
  width = {utils.window.width} 
  height = {200} 
  autoPlay = {false} 
  index = {2} 
  onIndexChanged = {(index) => console.log(index)}
>
  <Image source = {require('../../image/scenery.jpg')} style = {style } />
  <Image source = {require('../../image/carousel1.jpg')} style = {style} />
  <Image source = {require('../../image/swiper-bk.jpg')} style = {style} />
  <Image source = {require('../../image/carousel2.jpg')} style = {style} />
</Carousel>
```
 #### checkbox
多选框

属性 | 说明 | 类型 | 默认值
----|-----|------|------
`Checkbox.Group` defaultValue | 默认value | any | `null`
`Checkbox.Group` value | value（受控）| any | `null`
`Checkbox.Group` onChange | 多选框勾选值发生改变时的回调，将会返回新的勾选值 | function | `() => {}`
`Checkbox.Group` disabled | 是否禁用 | boolean | `false`
`Checkbox.Group` groupStyle | 自定义group容器样式 | object | `{}`
id `h5 only` | checkbox id，必填项 | string | `null`
value | checkbox value | any | `null`
checked | 是否勾选（受控）| boolean | `null`
checkboxColor `rn only` | 颜色 | string | `#ff4f4f`
checkboxStyle `rn only` | 自定义样式 | object | `{}`
textStyle | 自定义文本样式 | object | `{}`
disabled | 是否禁用 | boolean | `false`
onChange | 每次点击时的回调，返回勾选状态（bool） | function | `() => {}`

```
<Checkbox.Group value = {this.state.value} onChange = {value => this.setState({value})} >
  <Checkbox id = {'checkbox_1'} value = {'A'} >A</Checkbox>
  <Checkbox id = {'checkbox_2'} value = {'B'} >B</Checkbox>
  <Checkbox id = {'checkbox_3'} value = {'C'} >C</Checkbox>
</Checkbox.Group>
```

```
<Checkbox.Group defaultValue = {['B']} >
  <Checkbox value = {'A'} >A</Checkbox>
  <Checkbox value = {'B'} >B</Checkbox>
  <Checkbox value = {'C'} >C</Checkbox>
</Checkbox.Group>
```

#### collapse
折叠面板，信息的展开与收起。

属性 | 说明 | 类型 | 默认值
----|-----|------|------
activityKey | 当前激活项 | string, number | `""`
onChange | 任意一个折叠面板的折叠状态发生改变时的回调，返回当前激活项（string or JSON.stringify(stringArray)） | function | `() => {}`
accordion | 是否开启手风琴模式 | boolean | `false`
style | 自定义样式 | object | `{}`
`Collapse.Panel` key | id | string, number | `""`
`Collapse.Panel` title | 标题 | string, number | `""`

```
<Collapse
  accordion = {true}
  onChange = {(activeKey) => activeKey && alert(activeKey)}
  style = {{marginBottom: '0.4rem'}}
  activeKey = {'panel2'}
>
  <Collapse.Panel title = {'标题1'} panelKey = {'panel1'} >
    <p className = {'panel-margin'} >这是一个含有回调函数的手风琴模式的面板子组件</p>
  </Collapse.Panel>
  <Collapse.Panel title = {'标题2'} panelKey = {'panel2'} >
    <p className = {'panel-margin'} >这是一个含有回调函数的手风琴模式的面板子组件</p>
  </Collapse.Panel>
  <Collapse.Panel title = {'标题3'} panelKey = {'panel3'} >
    <p className = {'panel-margin'} >这是一个含有回调函数的手风琴模式的面板子组件</p>
  </Collapse.Panel>
</Collapse>
```

```
<Collapse
  accordion = {true}
  onChange = {(activeKey) => activeKey && ToastAndroid.show(activeKey, ToastAndroid.SHORT)}
  style = {{marginBottom: 20}}
>
  <Collapse.Panel title = {'标题1'} panelKey = {'panel1'} >
    <Text style= {styles.panel} >这是一个含有回调函数的手风琴模式的面板子组件</Text>
  </Collapse.Panel>
  <Collapse.Panel title = {'标题2'} panelKey = {'panel2'} >
    <Text style= {styles.panel} >这是一个含有回调函数的手风琴模式的面板子组件</Text>
  </Collapse.Panel>
  <Collapse.Panel title = {'标题3'} panelKey = {'panel3'} >
    <Text style= {styles.panel} >这是一个含有回调函数的手风琴模式的面板子组件</Text>
  </Collapse.Panel>
</Collapse>
```

#### counter
计数器，数字选择框。

属性 | 说明 | 类型 | 默认值
----|-----|------|------
defaultValue | 计数器默认值 | number | `null`
value | 计数器的值 | number | `null`
maxValue | 最大值 | number | `99`
minValue | 最小值 | number | `0`
stepNum | 跨度值 | number | `1`
btnWidth `rn only` | 按钮宽度 | number | `35`
containerHeight `rn only` | 总高度 | number | `30`
inputWidth `rn only` | 输入框宽度 | number | `40`
borderColor | 边框颜色 | string | `"#d5d3d3"`
btnColor | 按钮颜色 | string | `"#eeeeee"`
onChange | value发生改变时的回调 | function | `() => {}`
disabled | 是否禁用 | boolean | `false`

```
<Counter defaultValue = {5} stepNum = {2} minValue = {1} maxValue = {9} />
```

#### drawerlayout
抽屉视图，用于左右侧弹出的菜单。
`import DrawerLayout, {DRAWER_POSITION, DRAWER_LOCK_MODE, KEYBOARD_DISMISS_MODE} from './component/drawerLayout'`

属性 | 说明 | 类型 | 默认值
----|-----|------|------
drawerWidth `rn only` | 抽屉宽度 | number | `200`
renderNavigationView | 抽屉内容 | function | `() => {}`
drawerPosition | 抽屉位置 | DRAWER_POSITION |`DRAWER_POSITION.LEFT`
drawerLockMode `rn only` | 抽屉状态 | DRAWER_LOCK_MODE | `DRAWER_LOCK_MODE.UNLOCKED`
keyboardDismissMode `rn only` | 键盘关闭模式 | KEYBOARD_DISMISS_MODE | `KEYBOARD_DISMISS_MODE.NONE`
onDrawerOpen | 抽屉打开时的回调 | function | `() => {}`
onDrawerClose | 抽屉关闭时的回调 | function | `() => {}`
onDrawerSlide `rn only` | 抽屉滑动时的回调 | function | `() => {}`
openDrawer() `static` | 外部打开抽屉 | function | |
closeDrawer() `static` | 外部关闭抽屉 | function | |

```
const drawerView = (
  <div>
    <List title = {'前往商城'} showLine />
    <List title = {'个人中心'} showLine />
    <List title = {'设置'} showLine />
    <p className = {'margin-15 header-text'}>I'm in the Drawer!</p>
  </div>
)
<Button 
  onPress = {() => this.drawer.openDrawer()} 
>打开右侧抽屉</Button>
<DrawerLayout 
  drawerPosition = {DRAWER_POSITION.RIGHT} 
  renderNavigationView = {() => drawerView} 
  ref = {drawer => this.drawer = drawer} 
/>
```

```
const navigationView = (
  <View style={{flex: 1, backgroundColor: '#fff'}} >
    <List title = {'前往商城'} />
    <List title = {'个人中心'} />
    <List title = {'设置'} />
    <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
  </View>
)
<DrawerLayout
  drawerWidth = {200}
  renderNavigationView = {() => navigationView}
  onDrawerOpen = {() => console.log('opend')}
  onDrawerClose = {() => console.log('closed')}
  onDrawerSlide = {() => console.log('sliding')}
  ref = {drawer => this.Drawer = drawer}
>
  <View style = {styles.container} >
    <Text style = {styles.introduction} >一个纯JavaScript实现的抽屉组件，具有和React Native的DrawerLayoutAndroid相同的api。我们舍弃了使用率较低的onDrawerStateChanged，并将所有枚举类型单独提取出来。</Text>
    <Button buttonColor = {'#108EE9'} onPress = {() => this.Drawer.openDrawer()} >打开抽屉</Button>
  </View>
</DrawerLayout>
```
#### flex
基于flex实现的栅格系统。

属性 | 说明 | 类型 | 默认值
----|-----|------|------
justify | 主轴对齐方式 | string, flex-justify-conent | `"flex-start"`
align | 次轴对齐方式 | string, flex-align-items, (`h5`比`rn`多了`stretch`和`baseline`) | `"flex-start"`
wrap| 折行方式 | string, flex-wrap | `"wrap"`
flexStyle | 容器样式 | object | `{}`
`Flex.Item` flex | 空间分配比例 | number | `1`
`Flex.Item` flexItemStyle | flexItem样式 | object | `{}` 

```
<Flex flexStyle = {{marginBottom: '0.4rem'}} >
  <Flex.Item>
    <div className = {'flex-item'} style = {{backgroundColor: '#108EE9'}} >
      <p className = {'flex-text'} >50%</p>
    </div>
  </Flex.Item>
  <Flex.Item>
    <div className = {'flex-item'} style = {{backgroundColor: '#4badf3'}} >
      <p className = {'flex-text'} >50%</p>
    </div>
  </Flex.Item>
</Flex>
```

```
<Flex 
  justify = {'flex-end'} 
  align = {'flex-end'} 
  flexStyle = {{marginBottom: 20}} 
>
  {
    (function() {
      return [1,2,3].map((item, index) => {
        let secondViewStyle = {};
        if(index == 1) {
          secondViewStyle = {
            height: 20
          }
        }
        return (
          <View key = {index} style = {[styles.wrapStyle, secondViewStyle, {marginLeft: 10, marginRight: 0}, {backgroundColor: '#8c62f9'}]} >
            <Text style = {styles.flexText} >修改次轴</Text>
          </View>
        )
      })
    })()
  }
</Flex>
```
