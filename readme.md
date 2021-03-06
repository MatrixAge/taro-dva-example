## 编码建议

- 就近原则
- 最小粒度原则
- 从简原则
- 可扩展原则

### 就近原则

属于页面的组件在页面所属文件夹下建立 component 文件夹，用来存放页面所属组件，同理如果页面组件膨胀到了一定程度，需要继续分割，则在组件所属文件夹建立 component 文件夹。

只有可复用的公共组件需要放在最外层的 componnet 文件中，且为最小粒度。

### 最小粒度原则

最小粒度是相对而言的，并不是绝对的。

如果页面/组件的某一部分变量过多（超过 6 个），那么这个时候就需要考虑进行分割，把这部分分离成单独的组件，通过传参的方式进行与父组件的交互。

如果页面变量并不多，大部分是静态模版时，当代码量达到一定之后（300 行），也需要进行划分，这样是为了不出现代码量巨大的文件，影响后期维护。

对于公共的方法，如果可复用，就需要提出来，如果不可复用，当方法代码量达到 300 行之后，要分割出来，放在页面/组件所属文件夹下。

对于一些页面的子组件，其状态并不需要与父或兄弟组件进行交互，则可以通过 hooks 进行管理，不需要通过 model，而页面组件的状态不需要通过 hooks 进行管理。

### 从简原则

如非必要的情况下，不需要引入复杂的 hooks，如 useCallback，useMemo 等，因为上述 hooks 可能会造成无法预测的后果。对于性能优化，通过 React 提供的 memo 方法即可，如果需要深比较，不需要引入 lodash 的 DeepEqual，手动进行对象的深比较，性能会更好，包体积也更小。

尽量使用函数式组件，如非必要，不实用`class`组件。

对于页面组件，统一叫做 Index，因为它只是一个称谓，导出之后即失去作用，叫一个名称是为了用于`connect`和通过`memo`进行性能优化。

不要不定义名称，然后用各种高阶函数将组件包起来，那样会导致嵌套变深，不利于阅读。

对于以下内容使用下划线命名，不求短小，尽量做到语意化：

- 文件（不包括组件）
- 文件夹
- 变量（为区分 model 变量，useState 变量使用`state_`开头，useRef 变量使用`ref_`开头，依据此内推）

对于以下内容使用驼峰命名：

- 组件（首字母大写）
- 函数

另外：

- 对于绑定在 DOM 上的方法，以`on`开头
- 对于 API 变量以`API_`开头
- 对于 Service 变量以`Service_`开头

### 可扩展原则

可扩展性需考虑以下方面：

- 项目目录结构的设计
- 公共组件的设计
- 页面组件化分割
- 公共函数的设计

可扩展性要求，当因业务需求，代码量不断增加时，上述内容不会因为未留下扩展空间而无法维护，需要重写，或是复制一份进行拓展。

## 如何使用

### Redux

首先需要明确的是 Redux 与 React 结合之后，数据是如何在组件之间流动的，下面这几张图简单地说明了这个过程：

![flow](http://www.45fan.com/upload/2018-06-02/19101708704819315389176358.png)

![process](https://blog.codecentric.de/files/2017/12/Bildschirmfoto-2017-12-01-um-08.53.32.png)

### Dva

Dva 是基于 Redux Redux-saga 的封装，用几个简单的概念重述了 Redux，下面是 Dva 的数据流：

![dva](https://zos.alipayobjects.com/rmsportal/PPrerEAKbIoDZYr.png)

### 目录结构

这里仅讨论 src 目录下的结构。说明：项目以但单数命名法进行命名，如非必要，如 pages 文件夹涉及到自动化导入，文件 & 文件夹都按照单数命名法命名。

- api 用于存放 api，不同模块的 api 在 api 目录下建立不同的文件，所有模块需在最外层，
- component 用于存放公共组件，一个组件建立一个文件夹，文件夹名称即为组件名称，文件夹下文件名称应皆为 index
- config 用于存放应用配置文件，慎用，如非多处使用的项目层面的关键信息，无需放入此文件夹
- image 用于存放图片
- model 用于存放 dva 公共 model
- package 用于存放小程序分包
- pages Taro 规定，所有页面文件皆需在 pages 下
- service 用于存放项目公共 Service
- style 用于存放公共样式文件
- typings 用于存放类型定义文件
- util 用于存放全局工具函数

页面结构，一个页面主要由如下几个部分组成：

- index.tsx
- index.less
- index.config.ts
- model.ts
- service.ts
- component 文件夹

### Q&A

#### 为什么要在页面组件中使用 class 组件，而不是用函数组件？

答：

Taro 会给页面组件传递 forwardRef 用于获取页面实例，但 react-redux 的 HOC 传递 forwardRef 时没有判断 WrappedComponent 是否是 Functional Component，然后就会出现一个 warning。

如果在 Taro 里判断页面 component 是 react-redux 的 HOC 且里面的 WrappedComponent 是函数式组件，这样不好判断而且除了 react-redux Taro 还会兼容其它状态管理库，这样做不太合理。

因此，建议使用 Class Component 或在使用函数式组件时使用 useSelector、useDispatch、useStore 代替 connect function。

#### 为什么在操作过程中，案例页面中的图片会一直变化？

答：

因为案例使用的是 unsplash 的开放 API，每一次携带`r` key 的请求都会返回一张全新的图片，当在 React 的模版代码中使用`Math.random()`时，每一次 React 组件的更新都会导致`Math.random()`生成一个新的值，这个值会导致 img 会将之识别为一个新的图片链接，进而发起新的请求。

这个过程也间接地表达了 React 的更新过程，所以开发者在处理 React 模版时千万不要直接在使用`Math.random()`或是`UUID`这样的东西，因为它会产生不可预料的结果，可能会严重影响性能（禁止将`Math.random()`或是`UUID`作为 key 使用，当列表不包含交互时，key 可以为数组索引）。
