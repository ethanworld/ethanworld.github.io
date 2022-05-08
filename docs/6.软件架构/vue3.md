packages/vue/src/index.ts

```js
function compileToFunction(template: string | HTMLElement, options?: CompilerOptions): RenderFunction
{
  const { code } = compile(template, )
  const render = (new Function(code)()) as RenderFunction;
}
```



packages/compiler-dom/src/index.ts

```ts
function compile(template: string, options: CompilerOptions = {}): CodegenResult
{
  return baseCompile(template, extend({}, parserOptions, options, {...});
}
```



packages/compiler-core/src/compile.ts

```ts
function baseCompile(template: string | RootNode, options: CompilerOptions = {}): CodegenResult
{
  const ast = isString(template) ? baseParse(template, options) : template
  transform(ast,)
  return generate(ast, extend({}, options, {prefixIdentifiers}))
}
```



package目录说明：

```bash
├── packages              
│   ├── compiler-core    // 核心编译器（平台无关）
│   ├── compiler-dom     // dom编译器
│   ├── compiler-sfc     // vue单文件编译器
│   ├── compiler-ssr     // 服务端渲染编译
│   ├── global.d.ts      // typescript声明文件
│   ├── reactivity       // 响应式模块，可以与任何框架配合使用
│   ├── runtime-core     // 运行时核心实例相关代码（平台无关）
│   ├── runtime-dom      // 运行时dom 关api，属性，事件处理
│   ├── runtime-test     // 运行时测试相关代码
│   ├── server-renderer   // 服务端渲染
│   ├── sfc-playground    // 单文件组件在线调试器
│   ├── shared             // 内部工具库,不对外暴露API
│   ├── size-check          // 简单应用，用来测试代码体积
│   ├── template-explorer  // 用于调试编译器输出的开发工具
│   └── vue                 // 面向公众的完整版本, 包含运行时和编译器
```

通过上面源码结构，可以看到有下面几个模块比较特别：

- compiler-core
- compiler-dom
- runtime-core
- runtime-dom

可以看到core, dom 分别出现了两次，那么compiler和runtime它们之间又有什么区别呢？

- compile：我们可以理解为程序编绎时，是指我们写好的源代码在被编译成为目标文件这段时间，可以通俗的看成是我们写好的源代码在被构建工具转换成为最终可执行的文件这段时间，在这里可以理解为我们将.vue文件编绎成浏览器能识别的.js文件的一些工作。
- runtime：可以理解为程序运行时，即是程序被编译了之后，在浏览器打开程序并运行它直到程序关闭的这段时间的系列处理。

在package目录下，除了上面列举的4个目录外，还有reactivity目录比较重要，他是响应式模块的源码，由于Vue 3整体源码采用的Monorepo规范，所以其下面每个子模块都可以独立编译和打包，从而独立对外提供服务，在使用时采用require('@vue/reactivity')引入，进入reactivity目录下可以看到有对应的package.json文件。

其他目录：compiler-sfc是一个单文件组件编译工具，server-renderer目录是服务端渲染模块的源码，sfc-playground是一个在线Vue单文件组件调试工具，shared目录则包括了常用的工具库方法的源码，size-check是一个工具，可以用来测试代码体积，template-explorer用于调试编译器输出的开发工具，最后的vue目录则是Vue.js的完整源码产生目录。



# `Monorepo`

> `Monorepo`是管理代码的一种方式，它是指在一个项目仓库（repo）下管理多个包

- 一个仓库中维护多个包
- 便于版本管理、依赖管理，模块间的引用，调用都非常的方便
- 缺点就是仓库的体积会变大



# 目录结构

- **`reactivity`**:响应式系统
- **`runtime-core`**:与平台无关的运行时核心 (可以创建针对特定平台的运行时 - 自定义渲染器)
- **`runtime-dom`**: 针对浏览器的运行时。包括`DOM API`，属性，事件处理等
- **`runtime-test`**:用于测试
- **`server-renderer`**:用于服务器端渲染
- **`compiler-core`**:与平台无关的编译器核心
- **`compiler-dom`**: 针对浏览器的编译模块
- **`compiler-ssr`**: 针对服务端渲染的编译模块
- **`compiler-sfc`**: 针对单文件解析
- **`size-check`**:用来测试代码体积
- **`template-explorer`**：用于调试编译器输出的开发工具
- **`shared`**：多个包之间共享的内容
- **`vue`**:完整版本,包括运行时和编译器

![img](https://cdn.jsdelivr.net/gh/ethanworld/images@main/202205021330037.jpg)



# 响应系统



```ts
// JS是单线程，activeEffect指向最后一个ReactiveEffect实例
export let activeEffect: ReactiveEffect | undefined

class ReactiveEffect<T = any> {
	run() {
    this.parent = activeEffect
    // activeEffect指向当前实例
    activeEffect = this
    trackOpBit = 1 << ++effectTrackDepth
    if (effectTrackDepth <= maxMarkerBits) {
      initDepMarkers(this)
    } else {
      cleanupEffect(this)
    }
    return this.fn()
  }
}

// 定义依赖集合，集合元素为函数
type Dep = Set<ReactiveEffect> & TrackedMarkers
// 定义对象主键与依赖集合之间的映射关系
type KeyToDepMap = Map<any, Dep>
// 定义对象与其子键映射关系的映射，target为如何JS对象
const targetMap = new WeakMap<any, KeyToDepMap>()

```

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

## 依赖管理



### 添加依赖

```ts
// 触发添加依赖的时机
export const enum TrackOpTypes {
  GET = 'get',
  HAS = 'has',
  ITERATE = 'iterate'
}

// 跟踪目标：将target的key与activeEffect构建绑定关系
export function track(target: object, type: TrackOpTypes, key: unknown) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()))
    }
    let dep = depsMap.get(key)
    if (!dep) {
      depsMap.set(key, (dep = createDep()))
    }

    const eventInfo = __DEV__
      ? { effect: activeEffect, target, type, key }
      : undefined

    trackEffects(dep, eventInfo)
  }
}
export function trackEffects(
  dep: Dep,
  debuggerEventExtraInfo?: DebuggerEventExtraInfo
) {
  let shouldTrack = false
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit // set newly tracked
      shouldTrack = !wasTracked(dep)
    }
  } else {
    // Full cleanup mode.
    shouldTrack = !dep.has(activeEffect!)
  }

  if (shouldTrack) {
    // 添加依赖
    dep.add(activeEffect!)
    activeEffect!.deps.push(dep)
  }
}
```



### 触发依赖

```ts
// 触发依赖的几种场景：写（改）、添加（增）、删除（删）、清楚（删）
export const enum TriggerOpTypes {
  SET = 'set',
  ADD = 'add',
  DELETE = 'delete',
  CLEAR = 'clear'
}

export function trigger(
  target: object,
  type: TriggerOpTypes,
  key?: unknown,
  newValue?: unknown,
  oldValue?: unknown,
  oldTarget?: Map<unknown, unknown> | Set<unknown>
) {
  // 局部变量，构建依赖
  let deps: (Dep | undefined)[] = []
  
  // 遍历deps，
  triggerEffect(,,,)
}

function triggerEffect(
  effect: ReactiveEffect,
  debuggerEventExtraInfo?: DebuggerEventExtraInfo
) {
  if (effect !== activeEffect || effect.allowRecurse) {
    if (effect.scheduler) {
      effect.scheduler()
    } else {
      effect.run()
    }
  }
}

```







