# 参考文献

- https://blog.csdn.net/weixin_37517329/article/details/121861019





# vuex

## 安装

```
npm install vuex@3 --save

```





# 源码目录

```
src
	- compiler
	- core
		- components
		- global-api
		- instance
		- observer
		- util
		- vdom
		- config.js
		- index.js
	- platforms
	- server
	- sfc
	- shared
	
	
```



## `Dep`类

- 维护`subs`订阅数组，数组元素为：`Watcher`
- `Dep.target`：JS为单线程，同一时间，target指向唯一的`Watcher`
- `dep.notfify()`方法：遍历`dep.subs`，调用`watch.update()`



## `Observer`类

- 对入参value进行封装
- `Object.defineProperty(value, '__ob__', observer实例)`
- 遍历对象：this.walk
  - defineReactive





# vue调试方法

- 克隆vue： `git clone https://github.com/vuejs/vue`
- 安装依赖： `npm install`
- 安装rollup: `npm i -g rollup`

- 修改package.json，打包生成sourcemap

  ```json
  "dev": "rollup -w -c scripts/config.js --environment TARGET:web-full-dev --sourcemap",
  ```

- npm run dev 生成dist文件

- 在项目根目录新建index.html，引入vue.js

- 点击调试，新建launch.json,把入口文件配置为index.html

  ```json
  {
    // 使用 IntelliSense 了解相关属性。 
    // 悬停以查看现有属性的描述。
    // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
      {
        "type": "pwa-chrome",
        "request": "launch",
        "name": "Open index.html",
        "file": "/Users/zengyuan/Documents/coding/vue/index.html"
      }
    ]
  }
  ```

- 在chrome中打开index.html，并使用vscode调试vue 中src目录下的源码



参考：https://blog.csdn.net/weixin_42630688/article/details/118930813



#  vue源码

阅读框架的方法：

- 从需求入手，先理解要实现解决什么问题，实现什么功能，才理解框架如何实现的
- 运用UML时序图、交互图、类图等从整体角度展示框架设计思路



```javascript
//vue 构造函数
function Vue(options) {
  this._init(options);
}

initMixin(Vue);    //初始化vue
stateMixin(Vue);  //数据绑定，$watch方法
eventsMixin(Vue);  // 初始化事件绑定方法
lifecycleMixin(Vue); // 初始化vue 更新 销毁 函数
renderMixin(Vue); //初始化vue 需要渲染的函数
```



![lifecycle](https://cdn.jsdelivr.net/gh/ethanworld/images@main/202204171732291.svg)

## `stateMixin`

```javascript
//数据绑定，$watch方法
function stateMixin(Vue) {
  // 添加多一个数组数据或者对象数据
  Vue.prototype.$set = set;
  // 删除一个数组数据或者对象数据
  Vue.prototype.$delete = del;
  var dataDef = {};
  //重新定义get 和set方法
  dataDef.get = function () {
    return this._data //获取data中的数据
  };
  var propsDef = {};
  propsDef.get = function () {
    return this._props// 获取props 数据
  };
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);
  Vue.prototype.$watch = function (expOrFn, //用户手动监听
                                    cb, // 监听 变化之后 回调函数
                                    options //参数
                                   ) {...};
}
```



## `renderMixin`

```javascript
function renderMixin(Vue) {
  Vue.prototype.$nextTick = function (fn) {...};
  Vue.prototype._render = function (fn) {...};
}
```



## `lifecycleMixin`

```javascript
// 初始化vue 更新 销毁 函数
function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode, hydrating) {...};
  Vue.prototype.$forceUpdate = function () {...};
  Vue.prototype.$destroy = function () {...};
}
```



## `eventsMixin`

```javascript
function eventsMixin(Vue) {
  Vue.prototype.$on = function (event, fn) {...};
  Vue.prototype.$once = function (event, fn) {...};
  Vue.prototype.$off = function (event, fn) {...};
  Vue.prototype.$emit = function (event) {...};
}
```



## `initMixin`

```javascript
function initMixin(Vue) {
  // 初始化函数
	Vue.prototype._init = function (options) {
    
    //合并参数 将两个对象合成一个对象 将父值对象和子值对象合并在一起，并且优先取值子值，如果没有则取子值
    vm.$options = mergeOptions(
      resolveConstructorOptions(vm.constructor), //  //解析constructor上的options属性的
      options || {},
      vm
    );
    
    
    vm._self = vm;
    initLifecycle(vm); //初始化生命周期 标志
    initEvents(vm); //初始化事件
    initRender(vm); // 初始化渲染
    // 触发beforeCreate钩子函数
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props 在数据/道具之前解决注入问题 //初始化 inject
    // 初始化状态，props，methods，data，computed，watch
    initState(vm);
    initProvide(vm); // resolve provide after data/props  解决后提供数据/道具  provide 选项应该是一个对象或返回一个对象的函数。该对象包含可注入其子孙的属性，用于组件之间通信。
    // 触发created钩子函数
    callHook(vm, 'created');
  }
  
  if (vm.$options.el) {
    // Vue 的$mount()为手动挂载，
    // 在项目中可用于延时挂载（例如在挂载之前要进行一些其他操作、判断等），之后要手动挂载上。
    // new Vue时，el和$mount并没有本质上的不同。
    vm.$mount(vm.$options.el);
  }
}
```



```javascript
//真实dom 或者是string
//新的虚拟dom vonde
Vue.prototype.$mount = function (el, hydrating) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

//安装组件
function mountComponent(vm, el, hydrating) {
  vm.$el = el; //dom
  //执行生命周期函数 beforeMount
  callHook(vm, 'beforeMount');
  var updateComponent = function () {
    //直接更新view试图
    vm._update(vm._render(), hydrating);
  };
  new Watcher(
    vm,  //vm vode
    updateComponent, //数据绑定完之后回调该函数。更新组件函数 更新 view试图
    noop, //回调函数
    null, //参数
    true //是否渲染过得观察者
    /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  //手动挂载实例，调用挂载在self上
  // 在插入的钩子中为呈现器创建的子组件调用// mount
  if (vm.$vnode == null) {
    vm._isMounted = true;
    //执行生命周期函数mounted
    callHook(vm, 'mounted');
  }

  return vm
}
```



# 双向数据绑定

vue实现数据双向绑定主要是：采**用数据劫持结合发布者-订阅者模式**的方式，通过 `Object.defineProperty()` 来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应监听回调。当把一个普通 Javascript 对象传给 Vue 实例来作为它的 data 选项时，Vue 将遍历它的属性，用 `Object.defineProperty()` 将它们转为 `getter/setter`。用户看不到 `getter/setter`，但是在内部它们让 Vue 追踪依赖，在属性被访问和修改时通知变化。

vue的数据双向绑定 将MVVM作为数据绑定的入口，整合Observer，Compile和Watcher三者，通过Observer来监听自己的model的数据变化，通过Compile来解析编译模板指令（vue中是用来解析 `{{}}`），最终利用watcher搭起observer和Compile之间的通信桥梁，达到数据变化 —>视图更新；视图交互变化（input）—>数据model变更双向绑定效果。

```html
<body>

  <div id="app">
    <input type="text" id="txt">
    <p id="show"></p>
  </div>

  <script>
  var obj = {}

  Object.defineProperty(obj, 'txt', {
    get: function () {
      return obj
    },
    set: function (newValue) {
      document.getElementById('txt').value = newValue
      document.getElementById('show').innerHTML = newValue
    }
  })
  document.addEventListener('keyup',
  function (e) {
    obj.txt = e.target.value
  })
  </script>
</body>
```

