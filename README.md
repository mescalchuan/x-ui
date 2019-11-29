# x-ui
跨平台的移动端ui组件库

### 介绍
x-ui是基于react native和react开发出的跨android、ios和h5的三端ui组件库。

### 如何使用
#### 起步
`git clone`本项目地址，将`common`和`component`放入项目中，之后您需要根据自身需求做出相应配置。

#### H5
##### 移动端适配
`x-ui` h5端统一使用了阿里的`flexible.js`适配方案，版本为`0.3.4`，通过`<script src="http://g.tbcdn.cn/mtb/lib-flexible/0.3.4/??flexible_css.js,flexible.js"></script>`将其链接到`header`标签中。`flexible.js`以iphone6为参考单位：在`375 x 667`dp， `dpr`为2的情况下，页面的缩放比例为0.5，html的`font-size`为75px。以100px为例，最终计算出的rem值为`(100*2/75)rem`。对于字体而言，建议以`[data-dpr]`属性来区分不同dpr下的文本字号大小：
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
* #### ActionSheet
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
close()  `static` | 外部关闭actionsheet | function | |
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

* #### Badge
角标，用于消息数量的显示以及一般的小型徽标。当含有子组件时，角标悬浮在自组件右上角，num生效，text失效；当不含自组件时，角标作为单独的徽标，text和num均生效。

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

* #### Button
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

* #### Card
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

* #### Carousel
轮播图，用于图片切换展示。

属性 | 说明 | 类型 | 默认值
----|-----|------|------
index | 当前索引值 | number | `0`
width | 轮播图宽度 `required` | number `rn`, any `h5` | `null`
height | 轮播图高度 `required` | number `rn`, any `h5` | `null`
autoPlay | 是否自动播放 | boolean | `true`
autoPlayTimeout | 自动播放时每张图片的切换时间 | number | `3000 => ms`
showDot | 是否展示圆点 | boolean | `true`
dotColor | 圆点的颜色 | string | `"#666666"`
activeDotColor | 激活圆点的颜色 | string | `"#68b1ed"`
dotWidth | 圆点的宽度 | number | `10 => rn`, `20 => h5(px)`
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
 * #### Checkbox
多选框

属性 | 说明 | 类型 | 默认值
----|-----|------|------
`Checkbox.Group` defaultValue | 默认value | any | `null`
`Checkbox.Group` value | value（受控）| any | `null`
`Checkbox.Group` onChange | 多选框勾选值发生改变时的回调，将会返回新的勾选值 | function | `() => {}`
`Checkbox.Group` disabled | 是否禁用 | boolean | `false`
`Checkbox.Group` groupStyle | 自定义group容器样式 | object | `{}`
id `h5 only` | checkbox id `required` | string | `null`
value | checkbox value | any | `null`
checked | 是否勾选（受控）| boolean | `null`
checkboxColor `rn only` | 颜色 | string | `#ff4f4f`
checkboxStyle | 自定义样式 | object | `{}`
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

* #### Collapse
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

* #### Counter
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
getValue() `static` | 外部获取计数值 | function | | 

```
<Counter defaultValue = {5} stepNum = {2} minValue = {1} maxValue = {9} />
```

* #### DrawerLayout
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
* #### Flex
基于flex实现的栅格系统。

属性 | 说明 | 类型 | 默认值
----|-----|------|------
justify | 主轴对齐方式 | string, flex-justify-conent | `"flex-start"`
align | 次轴对齐方式 | string, flex-align-items (`h5`比`rn`多了`stretch`和`baseline`) | `"flex-start"`
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
          <View 
            key = {index} 
            style = {[styles.wrapStyle, secondViewStyle, {marginLeft: 10, marginRight: 0}, {backgroundColor: '#8c62f9'}]} 
          >
            <Text style = {styles.flexText} >修改次轴</Text>
          </View>
        )
      })
    })()
  }
</Flex>
```

* #### Header
头部导航

属性 | 说明 | 类型 | 默认值
----|-----|------|------
containerStyle | 容器样式 | object | `{}`
title | 标题 | string | `""`
titleStyle | 标题样式 | object | `{}`
leftBtn | 自定义左侧按钮 | element | `null`
rightBtn | 自定义右侧按钮 | element | `null`

```
<Header
  title = {'导航栏'}
  containerStyle = {{backgroundColor: '#01DD9B'}}
  rightBtn = {<span className = {'header-text'} style = {{color: 'white'}} >更多</span>}
/>
```

```
const rightBtn = (
  <TouchableOpacity onPress = {() => alert('更多')} >
    <Text style = {styles.more} >更多</Text>
  </TouchableOpacity>
)
<Header
  title = {'头部'}
  leftBtn = {rightBtn}
  containerStyle = {{backgroundColor: '#f0eded'}}
  titleStyle = {{color: '#333333'}}
/>
```

* #### Icon
字体图标，基于`Ionicons`。

属性 | 说明 | 类型 | 默认值
----|-----|------|------
name | icon名字，参考`iconMap.json` | string | `"ios-add"`
size | icon大小 | number | `15 => rn`, `30 => h5(px)`
color | icon颜色 | string | `"#666666"`
iconStyle | 自定义icon样式 | object | `{}`

```
<Icon name = {'ios-analytics'} size = {20} color = {'#ff4f4f'} />
```

* #### List
列表，用于数据列表展示、基本内容呈现。

属性 | 说明 | 类型 | 默认值
----|-----|------|------
listStyle | list最顶层的样式，一般用于margin和padding | object | `{}`
contentStyle `rn only` | list内容样式，不包括按钮 | object | `{}`
title | 列表标题 | string | `""`
titleStyle | 自定义标题样式 | object | `{}`
rightContent | list右侧内容 | element | `null`
rightIcon | 右侧icon | element | `<Image/> => rn`, `<img/> => h5`
showRightIcon | 是否显示右侧icon | boolean | `false`
leftContent | list左侧内容 | element | `null`
leftContentFlex | 左侧内容的垂直布局 | string, flex-justify-content | `"center"`
rightContentFlex | 右侧内容的垂直布局 | string, flex-justify-content | `"center"`
onPress | list点击时的回调 | function | `() => {}`
touchOpacity `rn only` | list点击时的透明度 | number | `1`
showLine | 是否显示底部分割线 | boolean | `false`
lineMargin | 底部分割线的margin | number | `15 => rn`, `30 => h5(px)`
btnConfig `rn only` | 左滑显示出的按钮, `//[], {text, color, fontSize, backgroundColor, width}` | array | `[]`

```
<List
  title = {'控制左右内容的对齐方式'}
  showRightIcon = {false}
  leftContent = {contacts}
  rightContent = {<span className = {'list-third-text'} >12:00</span>}
  rightContentFlex = {'flex-start'}
>
  <p className = {'list-second-text'} >左侧内容居中于List</p>
  <p className = {'list-third-text'} >右侧内容上对齐于List</p>
</List>
```

```
<List
  title = {'灰色置顶'}
  listStyle = {{marginBottom: 20}}
  showRightIcon = {false}
  btnConfig = {[{
    text: '置顶',
    width: 60,
    backgroundColor: 'gray',
    onPress: () => alert('您点击了置顶按钮')
  }, {
    text: '提醒',
    width: 60,
    backgroundColor: '#c4af00',
    onPress: () => alert('您点击了提醒按钮')
  }, {
    text: '删除',
    width: 60,
    onPress: () => alert('您点击了删除按钮')
  }]}
>
  <Text style = {{fontSize: 15}} >黄色提醒</Text>
  <Text style = {{fontSize: 14}} >红色删除</Text>
</List>
```

* #### Pagination
分页控件

属性 | 说明 | 类型 | 默认值
----|-----|------|------
defaultPageNum | 默认页码数 | number | `null`
pageNum | 页码数 | number | `null`
pageTotal | 总页数 | number | `1`
previous | 上一页按钮文字 | string | `"上一页"`
next | 下一页按钮文字 | stirng | `"下一页"`
hidePage | 隐藏数字 | boolean | `false`
hideButton | 隐藏按钮 | boolean | `false`
disabled | 禁用分页按钮 | boolean | `false`
onChange | 页码改变时的回调 | function | `() => {}`
activePageColor | 当前页码的颜色 | string | `"#ff4f4f"`
pageColor | 数字的颜色(/pageTotal) | string | `"#333333"`
previousBtnStyle | 上一页按钮样式 | object | `{}`
nextBtnStyle | 下一页按钮样式 | object | `{}`
previousTextStyle | 上一页文字样式 | object | `{}`
nextTextStyle | 下一页文字样式 | object | `{}`

```
<Pagination
  pageTotal = {5}
  previous = {'prev'}
  next = {'next'}
  activePageColor = {'#108EE9'}
  pageColor = {'#333333'}
  previousBtnStyle = {{backgroundColor: '#108EE9', borderWidth: 0}}
  previousTextStyle = {{color: 'white'}}
  nextBtnStyle = {{backgroundColor: '#108EE9', borderWidth: 0}}
  nextTextStyle = {{color: 'white'}}
/>
```

* #### Radio
单选框

属性 | 说明 | 类型 | 默认值
----|-----|------|------
`Radio.Group` defaultValue | 默认值 | any | `null`
`Radio.Group` value | value --> 受控 | any | `null`
`Radio.Group` onChange | group value更改时的回调，返回当前value | function | `() => {}`
`Radio.Group` disabled | 是否禁用 | boolean | `false`
`Radio.Group` groupStyle | 自定义group容器样式 | object | `{}`
id `h5 only` | radio id `required` | string | `null`
value | radio value | any | `null`
checked | 是否勾选（受控）| boolean | `null`
radioColor `rn only` | radio颜色 | string | `"#ff4f4f"`
radioStyle | 自定义radio样式 | object | `{}`
textStyle | 自定义文本样式 | object | `{}`
disabled | 是否禁用 | boolean | `false`

```
<Radio.Group value = {this.state.value} onChange = {value => this.setState({value})} >
  <Radio id = {'radio_1'} value = {'A'} >A</Radio>
  <Radio id = {'radio_2'} value = {'B'} >B</Radio>
  <Radio id = {'radio_3'} value = {'C'} >C</Radio>
</Radio.Group>
```

```
<Radio.Group defaultValue = {'B'} >
  <Radio value = {'A'} >A</Radio>
  <Radio value = {'B'} >B</Radio>
  <Radio value = {'C'} >C</Radio>
</Radio.Group>
```

* #### Search
搜索框，一般放置于头部导航下方，用于搜索信息，支持弹出层。

属性 | 说明 | 类型 | 默认值
----|-----|------|------
defaultValue | 默认值 | string | `""`
value | value（受控）| string | `""`
placeholder | 提示信息 | string | `"搜索"`
cancelText | “取消”按钮的文本 | string | `"取消"`
touchableOpacity `rn only` | 触摸透明度 | number | `0.8`
onChange | 搜索框内容发生改变时触发 | function | `() => {}`
onSubmit | 提交时触发 | function | `() => {}`
onFocus | 聚焦时触发 | function | `() => {}`
onBlur | 失焦时触发 | function | `() => {}`
onCancel | 点击“取消”时触发 | function | `() => {}`
showModal | 是否启动modal模式 | boolean | `false`
showCancelButton | 是否始终显示“取消”按钮 | boolean | `false`
disabled | 是否禁用 | boolean | `false`
modalComponent | 如果开启了modal模式，使用该属性定义Modal组件内的子元素 | element | `null`

```
<Search
  defaultValue = {'test'}
  placeholder = {'输入任何内容'}
  showCancelButton
/>
```

```
<Search
  defaultValue = {'test'}
  value = {this.state.value}
  onChange = {(value) => {this.setState({value})}}
  showModal
  modalComponent = {
    <View style = {styles.component} >
      <Text style = {{fontSize: 16}} >您自己的组件</Text>
    </View>
  }
/>
```

* #### Slider
滑块

属性 | 说明 | 类型 | 默认值
----|-----|------|------
width | 滑块宽度 | number | `150 => rn`, `300 => h5(px)`
progress | 当前value值 | number | `0`
minValue | 滑块最小值 | number | `0`
maxValue | 滑块最大值 | number | `100`
barColor | 轨道颜色 | string | `"#d5d3d3"`
ballColor | 圆形按钮颜色 | string | `"#108ee9"`
crossColor | 已经过的轨道的颜色 | string | `"#108ee9"`
disabled | 是否禁用 | boolean | `false`
onChange | value发生改变时的回调 | function | `() => {}`
getValue() `static` | 外部获取滑块值 | function | |

```
<Slider
  progress = {1}
  minValue = {1}
  maxValue = {99}
  onChange = {val => this.setState({value2: val})}
/>
``` 

* #### Switch
开关，用于设置两个相互斥的选项。

属性 | 说明 | 类型 | 默认值
----|-----|------|------
value | 开关值（true or false）| boolean | `false`
onValueChange | value发生改变时的回调 | function | `() => {}`
onTintColor | 开关打开时背景色 | string | `"#00b247"`
tintColor | 开关关闭时背景色 | string | `"white"`
thumbTintColor | 圆形按钮背景色 | string | `"white"`
onTintBorderColor | 开关打开时边框颜色 | string | `"#eeeeee"`
tintBorderColor | 开关关闭时边框颜色 | string | `"#eeeeee"`
thumbBorderColor | 圆形按钮边框颜色 | string | `"#eeeeee"`
disabled | 是否禁用 | boolean | `false`

```
<Switch
  tintColor = {'gray'}
  onTintColor = {'#f75b25'}
  thumbTintColor = {'#68b1ed'}
  tintBorderColor = {'gray'}
  onTintBorderColor = {'#f75b25'}
  thumbBorderColor = {'#68b1ed'}
  value = {this.state.value}
  onValueChange = {value => this.setState({value: value})}
/>
```
* #### Tabbar
选项卡，位于页面最底部，用于页面切换。

属性`rn` | 说明 | 类型 | 默认值
----|-----|------|------
tabBarStyle | 自定义tabBar容器样式 | object | `{}`
tabBarShadowStyle | 自定义tabBar最上方的分割线的样式 | object | `{}`
hidesTabTouch | 指定为true时，touchableOpacity将变为1 | boolean | `false`
`TabBar.Item` selected | 是否被选中 | boolean | `false`
`TabBar.Item` titleStyle | 自定义默认（未选中）时的文本样式 | object | `{}`
`TabBar.Item` selectedTitleStyle | 自定义选中时的文本样式 | object | `{}`
`TabBar.Item` title | 标题 | string | `""`
`TabBar.Item` name | 指定一个key | string | `""`
`TabBar.Item` tabStyle | 自定义每个TabBar.Item的容器样式 | object | `{}`
`TabBar.Item` icon | 未选中时的图标 | element | `null`
`TabBar.Item` selectedIcon | 选中时的图标 | element | `null`
`TabBar.Item` changeTab | 切换时触发，返回选中状态的item的name（key）| function | `() => {}`

属性`h5` | 说明 | 类型 | 默认值
----|-----|------|------
tabBarStyle | 自定义tabBar容器样式 | object | `{}`
tabBarShadowStyle | 自定义tabBar最上方的分割线的样式 | object | `{}`
items | tabbarItems | array | `[]`
components | tabbarComponents | array | `[]`
selectedTab | 选中的tab的name | string | `""`
`TabBar.Item` titleStyle | 自定义默认（未选中）时的文本样式 | object | `{}`
`TabBar.Item` selectedTitleStyle | 自定义选中时的文本样式 | object | `{}`
`TabBar.Item` title | 标题 | string | `""`
`TabBar.Item` name | 指定一个key | string | `""`
`TabBar.Item` tabStyle | 自定义每个TabBar.Item的容器样式 | object | `{}`
`TabBar.Item` icon | 未选中时的图标 | element | `null`
`TabBar.Item` selectedIcon | 选中时的图标 | element | `null`
`TabBar.Item` changeTab | 切换时触发，返回选中状态的item的name（key）| function | `() => {}`

```
import {Home, Active, Timer, Settings} from './container';

constructor(props) {
  super(props);
  this.state = {
    currentTab: 'active'
  };
}
setTabItem(name, title, icon) {
  return (
    <TabBar.Item 
      changeTab = {(tab) => this.setState({currentTab: tab})}
      title = {title}
      name = {name}
      icon = {<Icon name = {icon} size = {25} color = {'#666666'} />}
      selectedIcon = {<Icon name = {icon} size = {25} color = {'#ff4f4f'} />}
    />
  )
}
setTabComponent(name, component) {
  return (
    <TabBar.Component name = {name} >
      {component}
    </TabBar.Component>
  )
}
renderTabItem() {
  let tabItems = [];
  tabItems.push(this.setTabItem('home', '首页', 'ios-home'));
  tabItems.push(this.setTabItem('active', '激活', 'ios-bulb'));
  tabItems.push(this.setTabItem('timer', '定时器', 'ios-clock'));
  tabItems.push(this.setTabItem('settings', '设置', 'ios-settings'));
  return tabItems;
}
renderTabComponents() {
  let tabComponents = [];
  tabComponents.push(this.setTabComponent('home', <Home/>));
  tabComponents.push(this.setTabComponent('active', <Active/>));
  tabComponents.push(this.setTabComponent('timer', <Timer/>));
  tabComponents.push(this.setTabComponent('settings', <Settings/>));
  return tabComponents;
}
render() {
  return (
    <TabBar 
      selectedTab = {this.state.currentTab} 
      items = {this.renderTabItem()} 
      components = {this.renderTabComponents()} 
    />
  )
}
```

```
import {Home, Active, Timer, Settings} from './container';
constructor(props) {
  super(props);
  this.state = {
    currentTab: 'active'
  }
}
renderTabItem(name, title, icon, component) {
  return (
    <TabBar.Item
      selected = {this.state.currentTab === name}
      changeTab = {(tab) => this.setState({currentTab: tab})}
      title = {title}
      name = {name}
      icon = {<Icon name = {icon} size = {25} color = {'#666666'} />}
      selectedIcon = {<Icon name = {icon} size = {25} color = {'#ff4f4f'} />}
      titleStyle = {{fontSize: 12, color: '#666666'}}
      selectedTitleStyle = {{fontSize: 12}}
    >
      {component}
    </TabBar.Item>
  )
}
render() {
  return (
    <TabBar hidesTabTouch>
      {this.renderTabItem('home', '首页', 'ios-home', <Home/>)}
      {this.renderTabItem('active', '激活', 'ios-bulb', <Active/>)}
      {this.renderTabItem('timer', '定时器', 'ios-clock', <Timer/>)}
      {this.renderTabItem('settings', '设置', 'ios-settings', <Settings/>)}
    </TabBar>
  )
}
```
* #### Toast
小型提示框

配置项 | 说明 | 类型
----|-----|------
content | 提示信息 | string
duration | 持续时间 | number (ms)
mask | 是否使用遮罩层，默认为true，使用遮罩层的话在toast显示期间无法对屏幕进行任何操作 | boolean

```
<Button onPress = {() => this.toast.show({
  content: '取消遮罩层',
  mask: false
})} >取消遮罩层</Button>
<Toast ref = {toast => this.toast = toast} />
```

##### 全局提示
```
//根js
componentDidMount() {
  window.addEventListener('showToast', e => {
    this.rootToast.show(window.toastConfig);
  })
}
render() {
  return (
    <div>
      <Router history={hashHistory} routes = {routerConfig} />
        <Toast ref = {toast => this.rootToast = toast} />
    </div>
  )
}

//子组件
<Button onPress = {() => {
  window.toastConfig = {
    content: '全局提示',
    mask: false
  }
  window.dispatchEvent(new Event('showToast'))
}} >全局提示</Button>
```

```
//根js
componentDidMount() {
  DeviceEventEmitter.addListener('showToast', (config) => {
    this.rootToast.show(config);
  })
}
render() {
  return (
    <View style = {{flex: 1}} >
      <Navigator />
      <Toast ref = {toast => this.rootToast = toast} />
    </View>
  );
}

//子组件
<Button 
  onPress = {() => DeviceEventEmitter.emit('showToast', {
    content: '全局提示',
    mask: false
})} >全局提示</Button>
```
