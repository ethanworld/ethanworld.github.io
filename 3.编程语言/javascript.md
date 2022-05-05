ECMAScript

因为网景开发了JavaScript，一年后微软又模仿JavaScript开发了JScript，为了让JavaScript成为全球标准，几个公司联合ECMA（European Computer Manufacturers Association）组织定制了JavaScript语言的标准，被称为ECMAScript标准。

所以简单说来就是，ECMAScript是一种语言标准，而JavaScript是网景公司对ECMAScript标准的一种实现。



# 数据类型



## 数字

JavaScript不区分整数和浮点数，统一用Number表示，以下都是合法的Number类型：

```javascript
123; // 整数123
0.456; // 浮点数0.456
1.2345e3; // 科学计数法表示1.2345x1000，等同于1234.5
-99; // 负数
NaN; // NaN表示Not a Number，当无法计算结果时用NaN表示
Infinity; // Infinity表示无限大，当数值超过了JavaScript的Number所能表示的最大值时，就表示为Infinity

2 / 0; // Infinity
0 / 0; // NaN
```



## 字符串

- 字符串是以单引号'或双引号"括起来的任意文本，比如`'abc'`，`"xyz"`等等。

- 使用反引号表示多行字符串

  ```js
  <script>
      // 字符串中使用\n换行
      var str1 = "line1\nline2\nline3"
      // 字符串中使用`...`换行
      var str2 = `line9
      line8
      line7`
      console.log(str1)
      console.log(str2)
  </script>
  ```

- 使用模板字符串自动替换字符串中的变量：注意这种方式一定是反引号，不能是单引号或双引号

  ```js
  <script>
      var name = 'zhang';
      var age = 20;
  		// 注意一定是反引号，不能是单引号或双引号
      var str = `姓名：${name}, 年龄：${age}`;
      console.log(str)
  </script>
  ```

- 字符串是不可变的，如果对字符串的某个索引赋值，不会有任何错误，但是，也没有任何效果：

  ```js
  <script>
      var name = 'zhang';
      name[2] = 'A'
      console.log(name) // 仍然输出：zhang
  </script>
  ```



## 数组

- 数组可以包括**任意数据类型**。例如：`[1, 2, 3.14, 'Hello', null, true]`，甚至包括`undefined`和`null`

- 创建数组的方法有2种：

  - 直接用`[]`，推荐直接使用这种；
  - 通过`new Array(1, 2, 3); // 创建了数组[1, 2, 3]`

- `for ... in`对`Array`的循环得到的索引是`String`而不是`Number`

  ```JS
  <script>
      var arr = [0, 1, 2]
      for (let i in arr) {
          console.log(i) // 打印数组索引
          console.log(typeof(i)) // 输出：string，for ... in对Array的循环得到的索引是String而不是Number
          console.log(i === arr[i]) // 输出：false，===会先比较数据类型
      }
  </script>
  ```

- 直接给`Array`的`length`赋一个新的值会导致`Array`大小的变化：

  ```js
  <script>
      // 数组的元素可以是任意数据类型：甚至包括undefined和null
      var arr = [1, 'a', undefined, null]
      console.log(arr.length) // 输出：4
  
      // 直接改变length > 实际长度，会填充empty
      arr.length = 5
      console.log(arr, arr.length) //输出：[1, 'a', undefined, null, empty] 5
      // for in 遍历数组，最后的empty不会被遍历，此处只会遍历出前4个元素
      for(let i in arr) {
          console.log(`${i}：`, arr[i]) 
      }
      // 这种方式遍历，能取出arr[4]值为undefined
      for(let i  = 0; i < arr.length; i++) {
          console.log(`${i}：`, arr[i]) 
      }
  
      // js访问数组不会出现越界的错误，即索引超过了范围，同样会引起Array大小的变化
      arr[5] = 6
      console.log(arr) // 输出：[1, 'a', undefined, null, empty, 6]
      // for in遍历时，中间的arr[4]会被略过，最后的arr[5]能有效遍历
      for(let i in arr) {
          console.log(`${i}：`, arr[i]) 
      }
  
      // 直接改变length < 实际长度，会直接截断数组
      arr.length = 2
      console.log(arr) // 输出：[1, 'a']
      // 再将数组调整回去，仍按emply填充，相当于之前截断的元素找不回来了，被垃圾回收了？
      arr.length = 6
      console.log(arr) // 输出：[1, 'a', empty × 4]
  </script>
  ```

- `slice()`它截取`Array`的部分元素，然后**返回一个新的`Array`**：

  - 如果不给`slice()`传递任何参数，它就会从头到尾截取所有元素。利用这一点，我们可以很容易地复制一个`Array`：

    ```js
    <script>
        var arr1 = [1, 'a']
        var arr2 = arr1.slice()
        console.log(arr1 === arr2) // 输出：false
    
        arr1[0] = 2
        console.log(arr2) // 输出：[1, 'a']，即slice返回的是新数组，修改arr1中的普通变量元素，不会影响arr2
    </script>
    ```

- `push()`和`pop()`：数组末尾添加元素，删除末尾元素

- `unshift()`和`shift()`：数组头部添加元素，删除头部元素

- `sort()`和`reverse()`：数组排序和反排序

  ```js
  <script>
      var arr = [1, 3, 2]
      arr1 = arr
      arr1.sort() // sort是对数组自身进行排序，原地操作
      console.log(arr) // 输出：[1, 2, 3]
      console.log(arr1) // 输出：[1, 2, 3]
      console.log(arr === arr1) // 输出：true
  </script>
  ```

- `splice()`方法是修改`Array`的“万能方法”，它可以从指定的索引开始删除若干元素，然后再从该位置添加若干元素：

  ```js
  var arr = ['Microsoft', 'Apple', 'Yahoo', 'AOL', 'Excite', 'Oracle'];
  // 从索引2开始删除3个元素,然后再添加两个元素:
  arr.splice(2, 3, 'Google', 'Facebook'); // 返回删除的元素 ['Yahoo', 'AOL', 'Excite']
  arr; // ['Microsoft', 'Apple', 'Google', 'Facebook', 'Oracle']
  // 只删除,不添加:
  arr.splice(2, 2); // ['Google', 'Facebook']
  arr; // ['Microsoft', 'Apple', 'Oracle']
  // 只添加,不删除:
  arr.splice(2, 0, 'Google', 'Facebook'); // 返回[],因为没有删除任何元素
  arr; // ['Microsoft', 'Apple', 'Google', 'Facebook', 'Oracle']
  ```

- `concat()`方法把当前的`Array`和另一个`Array`连接起来，并返回一个新的`Array`：

  ```js
  var arr = ['A', 'B', 'C'];
  var added = arr.concat([1, 2, 3]);
  added; // ['A', 'B', 'C', 1, 2, 3]
  arr; // ['A', 'B', 'C']
  ```

  - *请注意*，`concat()`方法并没有修改当前`Array`，而是返回了一个新的`Array`。

  - 实际上，`concat()`方法可以接收任意个元素和`Array`，并且自动把`Array`拆开，然后全部添加到新的`Array`里：

  ```js
  var arr = ['A', 'B', 'C'];
  arr.concat(1, 2, [3, 4]); // ['A', 'B', 'C', 1, 2, 3, 4]
  ```

- `join()`方法是一个非常实用的方法，它把当前`Array`的每个元素都用指定的字符串连接起来，然后返回连接后的字符串：

  -  如果`Array`的元素不是字符串，将自动转换为字符串后再连接。

  ```js
  var arr = ['A', 'B', 'C', 1, 2, 3];
  arr.join('-'); // 'A-B-C-1-2-3'
  ```



## 对象

- JavaScript用一个`{...}`表示一个对象，键值对以`xxx: xxx`形式申明，用`,`隔开
- 对象是一组由**键-值**组成的**无序**集合；
- 对象的**键都是字符串类型**，值可以是任意数据类型；
- 对象访问属性有两种方式：
  - 通过`.`操作符，但这要求属性名必须是一个有效的变量名；
  - 通过`[]`，包含特殊字符的属性无法使用`.`操作符，必须用`['xxx']`来定义和访问：
- **访问不存在的属性不报错**，而是返回`undefined`
- 判断对象是否拥有某一属性有两种方式：
  - 通过`in`，注意通过原型链继承的属性也在`in`的判定范畴
  - 通过对象的`hasOwnProperty()`方法，仅判定对象自身而不是继承而来的属性

```js
<script>
    var person = {
        name: 'zhang',
        age: 20,
        'last-school': 'cqu'
    };

    for (let key in person) {
        console.log(typeof(key)) // 都输出string，即键都是字符串
    }

    console.log(person.name) // 通过.运算符访问属性
    console.log(person['last-school']) // 通过[]访问属性
    console.log(person.location) // 访问不存在的属性不报错，而是返回undefined
    
    person.location = 'cd' // 新增属性
    console.log(person) // 输出：{name: 'zhang', age: 20, last-school: 'cqu', location: 'cd'}
    delete person.name // 删除属性
    console.log(person) // 输出：{age: 20, last-school: 'cqu', location: 'cd'}

    console.log('age' in person) // 输出：true
    console.log('toString' in person) // 输出：true
    console.log(person.hasOwnProperty('age')) // 输出：true
    console.log(person.hasOwnProperty('toString')) // 输出：false
</script>
```



## Map



## Set







## `==` 与`===`

JavaScript在设计时，有两种比较运算符：

- 第一种是`==`比较，**它会自动转换数据类型再比较**，很多时候，会得到非常诡异的结果；
- 第二种是`===`比较，它不会自动转换数据类型，如果数据类型不一致，返回`false`，如果一致，再比较。

由于JavaScript这个设计缺陷，*不要*使用`==`比较，始终坚持使用`===`比较。



注意：

- `NaN`这个特殊的Number与所有其他值都不相等，包括它自己：

  ```js
  NaN === NaN; // false
  ```

- 唯一能判断`NaN`的方法是通过`isNaN()`函数：

  ```js
  isNaN(NaN); // true
  ```



## `null`与`undefined`

- `null`表示一个“空”的值，类似于python中的`None`
- `undefined`表示“未定义”



JavaScript的设计者希望用`null`表示一个空的值，而`undefined`表示值未定义。大多数情况下，我们都应该用`null`。`undefined`仅仅在判断函数参数是否传递的情况下有用。



## 变量

- 使用`var`申明的变量是局部变量，它的范围被限制在该变量被申明的函数体内；
- 如果不用`var`申明，则变量为全局变量；
- 注意下面的代码中，如果不先发起`test()`函数调用，则变量`j`也会无法访问；

```js
<script>
    function test () {
        var i = 10; // 定义局部变量，访问范围仅限test函数体内
        j = 'hello'; // 定义全局变量
    }
    test() // 如果不发起函数调用，则后续也会出现无法访问j的错误
    console.log(i) // Uncaught ReferenceError: i is not defined
    console.log(j) // 输出：hello
</script>

<script>
    console.log(i) // Uncaught ReferenceError: i is not defined
    console.log(j + ' world') // 输出：hello
</script>
```



未使用`var`对变量进行声明，可能会在引入不同script文件后出现变量访问混乱的情况，例如同名变量使用出乎意料。

为了修补JavaScript这一严重设计缺陷，ECMA在后续规范中推出了strict模式，在strict模式下运行的JavaScript代码，强制通过`var`申明变量，未使用`var`申明变量就使用的，将导致运行错误。

启用strict模式的方法是在JavaScript代码的第一行写上：`'use strict';`

这是一个字符串，不支持strict模式的浏览器会把它当做一个字符串语句执行，支持strict模式的浏览器将开启strict模式运行JavaScript。

```js
<script>
    'use strict';
    j = 'hello'
    console.log(j) // Uncaught ReferenceError: j is not defined
</script>
```



# 面向对象

JavaScript不区分类和实例的概念，而是通过原型（prototype）来实现面向对象编程。



## prototype

帮你彻底搞懂JS中的prototype、__proto__与constructor（图解）：

- https://blog.csdn.net/cc18868876837/article/details/81211729





## this

首先，必须搞清楚在JS里面，函数的几种调用方式:

- 普通函数调用
- 作为方法来调用
- 作为构造函数来调用
- 使用apply/call方法来调用
- Function.prototype.bind方法
- es6箭头函数

但是不管函数是按哪种方法来调用的，请记住一点：谁调用这个函数或方法,this关键字就指向谁。

参考：

- https://www.cnblogs.com/lisha-better/p/5684844.html

































