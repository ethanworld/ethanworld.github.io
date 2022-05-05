Python相关链接：

- 官方链接：https://docs.python.org/zh-cn/3/index.html



# 基础语法

## 差异语法

> 该小节主要记录Python在基础语法部分与Java/C等其他语言的差异点



### 转义和不转义

如果字符串里面有很多字符都需要转义，就需要加很多`\`，同时Python还允许用`r''`表示`''`内部的字符串默认不转义

```python
if __name__ == '__main__':
    print("-----\t----")
    print(r"-----\t----")
 
""" 输出
-----	  ----
-----\t----
"""
```



### 逻辑运算

- 与：`and`等同于`&&`
- 或：`or`等同于`||`
- 非：`not`等同于`!`



### 空值None

空值是Python里一个特殊的值，用`None`表示。`None`不能理解为`0`，因为`0`是有意义的，而`None`是一个特殊的空值。



### 除法

`/`除法计算结果是浮点数，即使是两个整数恰好整除，结果也是浮点数：

```Python
>>> 9 / 3
3.0
```



`//`称为地板除，两个整数的除法仍然是整数：

```python
>>> 10 // 3
3
```



## 字符编码

**ASCII**：解决英文字母、数字、符号的编码

由于计算机是美国人发明的，因此，最早只有127个字符被编码到计算机里，也就是大小写英文字母、数字和一些符号，这个编码表被称为`ASCII`编码，比如大写字母`A`的编码是`65`，小写字母`z`的编码是`122`。



**Unicode**：将不同语言统一到一套编码体系

但是要处理中文显然一个字节是不够的，至少需要两个字节，而且还不能和ASCII编码冲突，所以，中国制定了`GB2312`编码，用来把中文编进去。你可以想得到的是，全世界有上百种语言，日本把日文编到`Shift_JIS`里，韩国把韩文编到`Euc-kr`里，各国有各国的标准，就会不可避免地出现冲突，结果就是，在多语言混合的文本中，显示出来会有乱码。因此，Unicode字符集应运而生。Unicode把所有语言都统一到一套编码里，这样就不会再有乱码问题了。



**UTF-8**：可变长编码，节省文本编码存储空间

现在，捋一捋ASCII编码和Unicode编码的区别：ASCII编码是1个字节，而Unicode编码通常是2个字节。

- 字母`A`用ASCII编码是十进制的`65`，二进制的`01000001`；
- 字符`0`用ASCII编码是十进制的`48`，二进制的`00110000`，注意字符`'0'`和整数`0`是不同的；
- 汉字`中`已经超出了ASCII编码的范围，用Unicode编码是十进制的`20013`，二进制的`01001110 00101101`。

你可以猜测，如果把ASCII编码的`A`用Unicode编码，只需要在前面补0就可以，因此，`A`的Unicode编码是`00000000 01000001`。

所以，本着节约的精神，又出现了把Unicode编码转化为“可变长编码”的`UTF-8`编码。UTF-8编码把一个Unicode字符根据不同的数字大小编码成1-6个字节，常用的英文字母被编码成1个字节，汉字通常是3个字节，只有很生僻的字符才会被编码成4-6个字节。如果你要传输的文本包含大量英文字符，用UTF-8编码就能节省空间：

| 字符 | ASCII    | Unicode           | UTF-8                      |
| :--- | :------- | :---------------- | :------------------------- |
| A    | 01000001 | 00000000 01000001 | 01000001                   |
| 中   | x        | 01001110 00101101 | 11100100 10111000 10101101 |



**在计算机内存中，统一使用Unicode编码，当需要保存到硬盘或者需要传输的时候，就转换为UTF-8编码。**

用记事本编辑的时候，从文件读取的UTF-8字符被转换为Unicode字符到内存里，编辑完成后，保存的时候再把Unicode转换为UTF-8保存到文件：

![rw-file-utf-8](https://cdn.jsdelivr.net/gh/ethanworld/images@main/202201151108666.png)

浏览网页的时候，服务器会把动态生成的Unicode内容转换为UTF-8再传输到浏览器：

![web-utf-8](https://cdn.jsdelivr.net/gh/ethanworld/images@main/202201151108221.png)

所以你看到很多网页的源码上会有类似`<meta charset="UTF-8" />`的信息，表示该网页正是用的UTF-8编码。



在操作字符串时，我们经常遇到`str`和`bytes`的互相转换。为了避免乱码问题，应当始终坚持使用UTF-8编码对`str`和`bytes`进行转换。

由于Python源代码也是一个文本文件，所以，当你的源代码中包含中文的时候，在保存源代码时，就需要务必指定保存为UTF-8编码。当Python解释器读取源代码时，为了让它按UTF-8编码读取，我们通常在文件开头写上这两行：

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
```

第一行注释是为了告诉Linux/OS X系统，这是一个Python可执行程序，Windows系统会忽略这个注释；

第二行注释是为了告诉Python解释器，按照UTF-8编码读取源代码，否则，你在源代码中写的中文输出可能会有乱码。

申明了UTF-8编码并不意味着你的`.py`文件就是UTF-8编码的，必须并且要确保文本编辑器正在使用UTF-8 without BOM编码：



## 字符串格式化

### `%`占位符

`%`与C语言用法差不多，有几个`%?`占位符，后面就跟几个变量或者值，顺序要对应好。如果只有一个`%?`，括号可以省略。

```python
>>> 'Hello, %s' % 'world'
'Hello, world'
>>> 'Hi, %s, you have $%d.' % ('Michael', 1000000)
'Hi, Michael, you have $1000000.'
```

常见的占位符有：

| 占位符 | 替换内容     |
| :----- | :----------- |
| %d     | 整数         |
| %f     | 浮点数       |
| %s     | 字符串       |
| %x     | 十六进制整数 |

有些时候，字符串里面的`%`是一个普通字符怎么办？这个时候就需要转义，用`%%`来表示一个`%`：

```python
>>> 'growth rate: %d %%' % 7
'growth rate: 7 %'
```



### format()

另一种格式化字符串的方法是使用字符串的`format()`方法，它会用传入的参数依次替换字符串内的占位符`{0}`、`{1}`……

```python
>>> 'Hello, {0}, 成绩提升了 {1:.1f}%'.format('小明', 17.125)
'Hello, 小明, 成绩提升了 17.1%'
```



# 数据结构

## list列表

**支持按负数索引取值**

```python
# 例如，还可以用`-1`做索引，直接获取最后一个元素：
classmates = ['Michael', 'Bob', 'Tracy']
print(classmates[-1])

# 输出：'Tracy'
```



**支持指定索引插入元素**

```python
classmates = ['Michael', 'Bob', 'Tracy']
classmates.insert(1, 'Jack')
print(classmates)

# 输出：['Michael', 'Jack', 'Bob', 'Tracy']
```



**尾部追加元素**

```python
classmates = ['Michael', 'Bob', 'Tracy']
classmates.append('Mary')
classmates.append(['James'])
print(classmates)

# 输出：['Michael', 'Bob', 'Tracy', 'Mary', ['James']]
```

`append()`会将入参当做列表的一个元素，例如上面的`['James']`



**尾部拼接元素**

```python
classmates = ['Michael', 'Bob', 'Tracy']
classmates += 'Mary'
classmates += ['James', 'Kate']
print(classmates)

# 输出：['Michael', 'Bob', 'Tracy', 'M', 'a', 'r', 'y', 'James', 'Kate']
```

如下用`+`拼接列表，当`list`拼接`str`时，`str`会先转换成字符列表再拼接，`list`拼接`list`时，会将2个`list`按次序合并成一个`list`。



**支持指定索引删除元素**

```python
classmates = ['Michael', 'Bob', 'Tracy', 'Marry']
classmates.pop()
print(classmates)

# 输出：['Michael', 'Bob', 'Tracy']

classmates.pop(1)
print(classmates)

# 输出：['Michael', 'Tracy']
```

要删除list末尾的元素，用`pop()`方法，要删除指定位置的元素，用`pop(i)`方法，其中`i`是索引位置：



## tuple元组

- tuple与list类似，也是有序的元素列表
- tuple一旦初始化，就不能修改，因此不支持`append()`，`pop()`等函数
- 访问tuple元素的方式同list类似，例如正负索引
- 当tuple只有一个元素时，为区别于数学计算中的`()`，需要补充一个逗号，例如`a = (1,)`

```python
classmates = ('Michael', 'Bob', 'Tracy', 'Marry')
print(classmates)
print(classmates[-1])

""" 输出
('Michael', 'Bob', 'Tracy', 'Marry')
Marry
"""
```



## dict字典

Python内置了字典：dict的支持，dict全称dictionary，在其他语言中也称为map，使用键-值（key-value）存储，具有极快的查找速度。

- dict的key必须是**不可变对象**，原因是为保证key进行hash算法时的准确性；因此，list这种可变类型不能作为key

- 删除一个key，用`pop(key)`方法，对应的value也会从dict中删除

- 判断key是否存在于dict中：

  - 通过`key in dic`进行判断，返回`True` / `False` 

  - 通过`get()`，当key不存在时默认返回`None`，当然也可以指定该情况下得返回值，例如如下返回`-1`

```python
classmates = {'Michael': 1, 'Bob': 2, 'Tracy': 3, 'Marry': 4}
print('Michael' in classmates)
print(classmates.get('Mic', -1))
print(classmates.get('Mic'))

"""输出
True
-1
None
"""
```



## set集合

set和dict类似，也是一组key的集合，但不存储value。由于key不能重复，所以，在set中，没有重复的key。

- 只有key，没有value，key为不可变类似且不重复
- 支持`add(key)`和`remove(key)`增删操作
- 支持交集、并集运算

```python
a = {1, 2, 3, 3}
print(a)
print(4 in a)

a.add(4)
print(a)

a.remove(3)
print(a)

b = {2, 3, 5, 6}
print(a & b)
print(a | b)

""" 输出
{1, 2, 3}
False
{1, 2, 3, 4}
{1, 2, 4}
{2}
{1, 2, 3, 4, 5, 6}
"""
```



## 切片

取一个list或tuple的部分元素是非常常见的操作，Python提供了切片（Slice）操作符，简化实现这种取指定索引范围的操作。

```python
L = list(range(100))
```

- `L[0:3]`表示，从索引0开始取，直到索引3为止，但不包括索引3；

- 如果第一个索引是`0`，还可以省略：`L[:3]`

- 支持负数切片：`L[-2:-1]`取表示倒数第二个元素，`L[-2:]`表示取最后2个元素

- 支持指定间距：`L[:10:2]`表示前10个数，每两个取一个；`L[::5]`表示所有数，每5个取一个

- tuple也是一种list，唯一区别是tuple不可变。因此，tuple也可以用切片操作，只是操作的结果仍是tuple：

  ```python
  >>> (0, 1, 2, 3, 4, 5)[:3]
  (0, 1, 2)
  ```

- 字符串`'xxx'`也可以看成是一种list，每个元素就是一个字符。因此，字符串也可以用切片操作，只是操作结果仍是字符串：

  ```python
  >>> 'ABCDEFG'[:3]
  'ABC'
  >>> 'ABCDEFG'[::2]
  'ACEG'
  ```



## 迭代

- 对dict按value迭代：`for value in d.values()`

- 对dict同时按key和value迭代：`for k, v in d.items()`

- 对list同时按index和value迭代：

  - Python内置的`enumerate`函数可以把一个`list`变成索引-元素对：`for i, value in enumerate(['A', 'B', 'C'])`

- 同时引用多个变量：（注：其实就是省略了元组的括号）

  ```python
  >>> for x, y in [(1, 1), (2, 4), (3, 9)]:
  ...     print(x, y)
  ...
  1 1
  2 4
  3 9
  ```



## 列表生成器

列表生成式即List Comprehensions，是Python内置的非常简单却强大的可以用来创建list的生成式。

- 案例1：列表元素求平方

  ```python
  >>> [x * x for x in range(1, 11)]
  [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
  ```

- 案例2：带if判断，筛选偶数求平方

  ```python
  >>> [x * x for x in range(1, 11) if x % 2 == 0]
  [4, 16, 36, 64, 100]
  ```

- 案例3：两重for循环

  ```python
  >>> [m + n for m in 'ABC' for n in 'XYZ']
  ['AX', 'AY', 'AZ', 'BX', 'BY', 'BZ', 'CX', 'CY', 'CZ']
  ```

- 案例4：区分if与for在列表生成式中的用法

  - 在一个列表生成式中，`for`前面的`if ... else`是表达式，而`for`后面的`if`是过滤条件，不能带`else`。

  ```python
  >>> [x if x % 2 == 0 else -x for x in range(1, 11)]
  [-1, 2, -3, 4, -5, 6, -7, 8, -9, 10]
  ```



## 生成器

通过列表生成式，我们可以直接创建一个列表。但是，受到内存限制，列表容量肯定是有限的。所以，如果列表元素可以按照某种算法推算出来，那我们是否可以在循环的过程中不断推算出后续的元素呢？这样就不必创建完整的list，从而节省大量的空间。在Python中，这种一边循环一边计算的机制，称为生成器：generator。



创建generator，有很多种方法。

第一种方法很简单，只要把一个列表生成式的`[]`改成`()`，就创建了一个generator：

```python
>>> g = (x * x for x in range(10))
>>> g
<generator object <genexpr> at 0x1022ef630>
>>> for n in g:
...     print(n)
... 
0
1
4
9
16
25
36
49
64
81
```

定义generator的另一种方法。如果一个函数定义中包含`yield`关键字，那么这个函数就不再是一个普通函数，而是一个generator函数，调用一个generator函数将返回一个generator：

generator函数和普通函数的执行流程不一样。普通函数是顺序执行，遇到`return`语句或者最后一行函数语句就返回。而变成generator的函数，在每次调用`next()`的时候执行，遇到`yield`语句返回，再次执行时从上次返回的`yield`语句处继续执行。

举个简单的例子，定义一个generator函数，依次返回数字1，3，5：

```python
def odd():
    print('step 1')
    yield 1
    print('step 2')
    yield(3)
    print('step 3')
    yield(5)
```

调用该generator函数时，首先要生成一个generator对象，然后用`next()`函数不断获得下一个返回值：

```python
>>> o = odd()
>>> next(o)
step 1
1
>>> next(o)
step 2
3
>>> next(o)
step 3
5
>>> next(o)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
StopIteration
```



## 迭代器

> `Iterable`可迭代对象：可以直接作用于`for`循环
>
> `Iterator`迭代器：一定是`Iterable`，并且可以被`next()`函数调用并不断返回下一个值的对象称为迭代器：`Iterator`。
>
> - 凡是可作用于`for`循环的对象都是`Iterable`类型；
>
> - 凡是可作用于`next()`函数的对象都是`Iterator`类型，它们表示一个惰性计算的序列；
>
> - 集合数据类型如`list`、`dict`、`str`等是`Iterable`但不是`Iterator`，不过可以通过`iter()`函数获得一个`Iterator`对象。



Python可以直接作用于`for`循环的数据类型有以下几种：

- 一类是集合数据类型，如`list`、`tuple`、`dict`、`set`、`str`等；

- 一类是`generator`，包括生成器和带`yield`的generator function。

这些可以直接作用于`for`循环的对象统称为可迭代对象：`Iterable`。可以使用`isinstance()`判断一个对象是否是`Iterable`对象：

```python
>>> from collections.abc import Iterable
>>> isinstance([], Iterable)
True
>>> isinstance({}, Iterable)
True
>>> isinstance('abc', Iterable)
True
>>> isinstance((x for x in range(10)), Iterable)
True
>>> isinstance(100, Iterable)
False
```

生成器都是`Iterator`对象，但`list`、`dict`、`str`虽然是`Iterable`，却不是`Iterator`。

把`list`、`dict`、`str`等`Iterable`变成`Iterator`可以使用`iter()`函数：

```python
>>> isinstance(iter([]), Iterator)
True
>>> isinstance(iter('abc'), Iterator)
True
```



# 函数

## 空函数

`pass`语句单纯作为占位符，表示当前还没想好代码怎么写，但为了语法正确，表示什么都不做：

- 可用于定义空函数

  ```python
  def nop():
      pass
  ```

- 可用于定义空代码块

  ```python
  if age >= 18:
      pass
  ```



## 返回值

Python支持函数返回”多个值“，但实际时多个值转换成一个tuple；因为语法上，返回一个tuple可以省略括号，Python的函数返回多值其实就是返回一个tuple。

- 函数执行完毕也没有`return`语句时，自动`return None`。
- 函数可以同时返回多个值，但其实就是一个tuple。

```python
def get_position():
    x = 5
    y = 6
    return x, y


if __name__ == '__main__':
    p = get_position()
    print(p)
    print(type(p))
    
    
""" 输出
(5, 6)
<class 'tuple'>
"""
```



## 入参

- 必选参数：指函数定义时的入参，调用时必须传入该参数否则报错：

  ```python
  # x为必选参数
  def power(x):
      ret = x * x
      return ret
    
  if __name__ == '__main__':
      val = power(5) # 必须传入参数
  ```

- 默认参数：指函数定义时入参有默认值，调用时可以不传入该参数

  ```python
  # x为必选参数；n为默认参数，函数调用时可以不传入该参数
  def power(x, n=2):
      ret = 1
      while n > 0:
          n = n - 1
          ret = ret * x
      return ret
  
  
  if __name__ == '__main__':
      val = power(5)
  ```

  - 默认参数设计原则：当函数有多个参数时，把变化大的参数放前面，变化小的参数放后面。变化小的参数就可以作为默认参数。

  - 函数定义时，默认参数不能放在必选参数前面：因为这样的话，函数调用时就会有歧义，程序无法辨别传入的参数是对应到必选参数还是默认参数

    ![image-20220116144302847](https://cdn.jsdelivr.net/gh/ethanworld/images@main/202201161443902.png)

  - **默认参数必须指向不变对象！**

- 可变参数：可变参数允许你传入0个或任意个参数，这些可变参数在函数调用时自动组装为一个tuple

  - 函数定义时：在参数前面加了一个`*`号。在函数内部，参数`numbers`接收到的是一个tuple
  - 函数调用时：在list或tuple前面加一个`*`号，把list或tuple的元素变成可变参数传进去：

  ```python
  def calc_sum(*numbers):
      s = 0
      for num in numbers:
          s += num
      return s
  
  
  if __name__ == '__main__':
      print(calc_sum())
      print(calc_sum(1, 2, 3))
  
      nums = [4, 5, 6]
      print(calc_sum(*nums))
  
      nums = (4, 5, 6)
      print(calc_sum(*nums, 7))
      
      
  """ 输出
  0
  6
  15
  22
  """
  ```

- 关键字参数：关键字参数允许你传入0个或任意个含参数名的参数，这些关键字参数在函数内部自动组装为一个dict

  - 函数定义时：在参数前面加了`**`号。在函数内部，参数`kwargs`接收到的是一个dict

  ```python
  def create_person(name, gender, **kwargs):
      print(name, gender, kwargs)
  
  
  if __name__ == '__main__':
      create_person("zeng", 'male')
      create_person("zeng", gender='male', school="cqu", location="cq")
  
      
  """ 输出
  zeng male {}
  zeng male {'school': 'cqu', 'location': 'cq'}
  """
  ```

- 命名关键字参数：如上对于关键字参数，函数的调用者可以传入任意不受限制的关键字参数，而如果要限制关键字参数的名字，就可以用命名关键字参数；

  - 和关键字参数`**kw`不同，命名关键字参数需要一个特殊分隔符`*`，`*`后面的参数被视为命名关键字参数：
  - 命名关键字参数必须传入参数名

  ```python
  def create_person(name, gender, *, school):
      print(name, gender, school)
  
  
  if __name__ == '__main__':
      create_person("zeng", 'male')  # missing 1 required keyword-only argument: 'school'
      create_person("zeng", gender='male', school="cqu", location="sdf")  # got an unexpected keyword argument 'location'
  ```

  - 如果函数定义中已经有了一个可变参数，后面跟着的命名关键字参数就不再需要一个特殊分隔符`*`了：

  ```python
  def create_person(name, gender, *args, school):
      print(name, gender, args, school)
  ```

- 参数组合：
  - 在Python中定义函数，可以用必选参数、默认参数、可变参数、关键字参数和命名关键字参数，这5种参数都可以组合使用。
  - 但是请注意，参数定义的顺序必须是：必选参数、默认参数、可变参数、命名关键字参数和关键字参数。
  - 所以，对于任意函数，都可以通过类似`func(*args, **kw)`的形式调用它，无论它的参数是如何定义的。



## 高阶函数

把函数作为参数传入，这样的函数称为高阶函数。函数式编程就是指这种高度抽象的编程范式。

- 函数名也是变量

  ```python
  if __name__ == '__main__':
      f = abs
      val = f(10)
      print(val)  # 输出：10
  ```

- 把函数名作为入参，就是让函数的参数能够接收别的函数。

  ```python
  def add(x, y, f):
      return f(x) + f(y)
  
  
  if __name__ == '__main__':
      val = add(1, -1, abs)
      print(val)  # 输出：2
  ```



# 面向对象

`object`是所有类的父类。



## 访问限制

如果要让内部属性不被外部访问，可以把属性的名称前加上两个下划线`__`，在Python中，实例的变量名如果以`__`开头，就变成了一个私有变量（private），只有内部可以访问，外部不能访问。

```python
class Student(object):

    def __init__(self, name, score):
        self.__name = name
        self.__score = score
        self.gender = 'male'

    def print_score(self):
        print('%s: %s, %s' % (self.__name, self.__score, self.gender))


if __name__ == '__main__':
    stu = Student('zhang', 60)
    stu.print_score()
    # 输出为：zhang: 60, male

    stu.gender = 'female'
    stu.__name = 'li'
    stu.print_score()
    # 输出为：zhang: 60, female
```

从输出结果可见：

- 类属性`gender`外部可访问可修改
- 类属性`__name`外部不可访问，更不可能被修改

![image-20220123140437553](https://cdn.jsdelivr.net/gh/ethanworld/images@main/202201231404574.png)



如下图中，表面上看，外部代码“成功”地设置了`__name`变量，但实际上这个`__name`变量和class内部的`__name`变量不是一个变量！内部的`__name`变量已经被Python解释器自动改成了`_Student__name`，而外部代码给`stu`新增了一个`__name`变量。

![image-20220123140309003](https://cdn.jsdelivr.net/gh/ethanworld/images@main/202201231403058.png)



总结：

- `name`可被外部访问
- `__name`前面有2个下划线，仅内部访问
- `_name`前面1个下划线，外部可以访问，但是表示“虽然我可以被访问，但是，请把我视为私有变量，不要随意访问"
- `__name__`前后都有2个下划线，外部可访问，但是表示是特殊变量



## 对象信息

**`type()`与`isinstance()`**

- `type`用了判断变量的类型
- `isinstance`也用与判断变量类型，但同时也支持继承关系中的父类判断
- 能用`type`判断的场景基本也可以用`isinstance`
- `isinstance`还可以判断一个变量是否是某些类型中的一种

```python
stu = Student('zhang', 60)
print(type(123))
print(type(stu))

print(isinstance(123, int))
print(isinstance(stu, Student))
print(isinstance(stu, (str, Student)))  # 判断是否属于某几个类型中的一种

""" 输出
<class 'int'>
<class '__main__.Student'>
True
True
True
"""
```



**`dir()`获取一个对象的所有属性和方法**

- 可以作用于类，也可以作用于类实例

```python
stu = Student('zhang', 60)
for item in dir(stu):
    print(item)
    
""" 输出
_Student__name
_Student__score
__class__
__delattr__
__dict__
__dir__
__doc__
__eq__
__format__
__ge__
__getattribute__
__gt__
__hash__
__init__
__init_subclass__
__le__
__lt__
__module__
__ne__
__new__
__reduce__
__reduce_ex__
__repr__
__setattr__
__sizeof__
__str__
__subclasshook__
__weakref__
gender
print_score
"""
```



**`getattr()`、`setattr()`以及`hasattr()`**

- `getattr()`：获取类实例的属性值
- `setattr()`：设置类实例的属性值，支持默认值设置
- `hasattr()`：判断类实例是否存在指定属性

```python
stu = Student('zhang', 60)

print(getattr(stu, 'gender'))
print(getattr(stu, 'school', 'cqu'))  # 可以传入一个default参数，如果属性不存在，就返回默认值：

setattr(stu, 'gender', 'test')
print(getattr(stu, 'gender'))

print(hasattr(stu, 'print_score'))
print(hasattr(Student, 'print_score'))

""" 输出
male
cqu
test
True
True
"""
```



**类属性与实例属性**

- 类属性：直接在`class`中定义，归类所有
- 实例属性：通过`self.`定义，归实例所有
- 实例对象可以访问类属性，但属性名称相同时，实例对象访问的是实例属性
- 实例属性属于各个实例所有，互不干扰；类属性属于类所有，所有实例共享一个属性；

```python
class Student(object):

    school = 'CQU'

    def __init__(self):
        self.school = 'cqu'


if __name__ == '__main__':
    stu = Student()
    print('类属性：', Student.school)
    print('实例属性：', stu.school)

    delattr(stu, 'school')
    print('删除实例属性后，类属性：', Student.school)
    print('删除实例属性后，实例属性：', stu.school)
```

从上面的例子可以看出，在编写程序的时候，千万不要对实例属性和类属性使用相同的名字，因为相同名称的实例属性将屏蔽掉类属性，但是当你删除实例属性后，再使用相同的名称，访问到的将是类属性。



实例属性属于各个实例所有，互不干扰；类属性属于类所有，所有实例共享一个属性；

```python
class Student(object):

    school = 'CQU'

    def __init__(self):
        pass


if __name__ == '__main__':
    stu1 = Student()
    stu2 = Student()
    print('实例1：', stu1.school)
    print('实例2：', stu2.school)

    # 注意：这里如果改为stu1.school = 'PKU'，其实给stu1增加一个实例属性，然后stu1优先访问该实例属性，不会影响Student类属性
    Student.school = 'PKU'
    print('修改类属性，实例1：', stu1.school)
    print('修改类属性，实例2：', stu2.school)
    
    
""" 输出
实例1： CQU
实例2： CQU
修改实例1，实例1： PKU
修改实例1，实例2： PKU
"""
```



上述例子，如果改为stu1.school = 'PKU'，其实给stu1增加一个实例属性，然后stu1优先访问该实例属性，不会影响Student类属性

```python
class Student(object):

    school = 'CQU'

    def __init__(self):
        pass


if __name__ == '__main__':
    stu1 = Student()
    stu2 = Student()

    print('类属性内存地址：', Student.school, id(Student.school))
    print('实例1访问类属性内存地址：', stu1.school, id(stu1.school))
    print('实例2访问类属性内存地址：', stu2.school, id(stu2.school))

    stu1.school = 'PKU'
    print('类属性内存地址：', Student.school, id(Student.school))
    print('实例1访问实例属性内存地址：', stu1.school, id(stu1.school))
    print('实例2访问类属性内存地址：', stu2.school, id(stu2.school))
    

""" 输出
类属性内存地址： CQU 4340435376
实例1访问类属性内存地址： CQU 4340435376
实例2访问类属性内存地址： CQU 4340435376
类属性内存地址： CQU 4340435376
实例1访问实例属性内存地址： PKU 4340677936
实例2访问类属性内存地址： CQU 4340435376
"""
```



**动态绑定方法**

- Python支持在运行时给实例绑定方法，但是这种情况的方法不能适用于其他类实例
- Python支持在运行时给类绑定方法，这种情况的方法适用于该类的所有实例

```python
from types import MethodType


class Student(object):
    school = 'CQU'

    def __init__(self):
        pass


def func(self):
    print(self.school)


if __name__ == '__main__':
    stu1 = Student()
    stu2 = Student()
    
    # 动态给类实例绑定方法，仅适用于该实例
    stu1.print_school = MethodType(func, stu1)
    stu1.print_school()
    stu2.print_school()  # AttributeError: 'Student' object has no attribute 'print_school'
    
    # 动态给类绑定方法，适用于该类的所有实例
    Student.print_school = func
    stu1.print_school()
    stu2.print_school()
```



**`__slots__`限定类实例属性**

- 子类未定义`__slots__`时， 父类`__slots__`对子类不起作用
- 子类定义了`__slots__`时， 子类实例允许定义的属性就是自身的__slots__加上父类的`__slots__`

```python
class Student(object):

    # 适用元组限定类实例的属性
    __slots__ = ('school', 'name')

    def __init__(self):
        pass


if __name__ == '__main__':
    stu = Student()
    stu.school = 'cqu'
    stu.name = 'zhang'
    stu.gender = 'male'  # AttributeError: 'Student' object has no attribute 'gender'
    print(stu)
```

```python
class Student(object):
    # 适用元组限定类实例的属性
    __slots__ = ('school', 'name')

    def __init__(self):
        pass


class SpecStudent(Student):
    pass


if __name__ == '__main__':
    stu = SpecStudent()
    stu.school = 'cqu'
    stu.name = 'zhang'
    stu.gender = 'male'  # 子类未定义__slots__时， 父类__slots__对子类不起作用
    print(stu)
```

```python
class Student(object):
    # 适用元组限定类实例的属性
    __slots__ = ('school', 'name')

    def __init__(self):
        pass


class SpecStudent(Student):
    __slots__ = ('gender', 'location')


if __name__ == '__main__':
    stu = SpecStudent()
    stu.school = 'cqu'
    stu.name = 'zhang'
    stu.gender = 'male'  # 子类定义了__slots__时， 子类实例允许定义的属性就是自身的__slots__加上父类的__slots__
    stu.age = 30  # AttributeError: 'SpecStudent' object has no attribute 'age'
    print(stu)
```



@property装饰器

- 封装类实例属性的操作，对外提供set和get接口
- `@property`自身只提供getter接口，此时赋值会报错
- `@property`本身又创建了另一个装饰器`@score.setter`，负责把一个setter方法变成属性赋值

- 属性的方法名不要和实例变量重名，否则会陷入递归死循环

```python
class Student(object):

    def __init__(self):
        self._age = 30

    @property
    def age(self):
        return 'my age is ' + str(self._age)


if __name__ == '__main__':
    stu = Student()
    print(stu.age)   # 输出：my age is 30
    stu.age = 'sdf'  # AttributeError: can't set attribute 'age'
```

```python
class Student(object):

    def __init__(self):
        self._age = 30

    @property
    def age(self):
        return 'my age is ' + str(self._age)

    @age.setter
    def age(self, value):
        if value > 100:
            print("输入有误")
            return
        self._age = value


if __name__ == '__main__':
    stu = Student()
    print(stu.age)   # 输出：my age is 30
    stu.age = 200  # 输出：输入有误
```



## 定制类

```python
class Student(object):

    def __init__(self):
        self.name = 'zhang'
        self.age = 30

    def __call__(self, *args, **kwargs):
        """
        直接对类实例发起调用
        :param args:
        :param kwargs:
        :return:
        """
        print("类实例直接调用")

    def __str__(self):
        """
        print(类实例)打印信息
        :return:
        """
        return "Student: {name: %s, age: %d}" % (self.name, self.age)

    def __getattr__(self, item):
        """
        注意，只有在没有找到属性的情况下，才调用__getattr__，已有的属性，比如name，不会在__getattr__中查找。
        :param item: 外部访问的类实例属性名称
        :return:
        """
        if item == 'location':
            return '位置未知'
        if item == 'name':
            return 'name是已有属性，根本不会走进这个流程'

    def __iter__(self):
        """
        让类实例支持被迭代，该方法返回一个迭代对象，
        然后，Python的for循环就会不断调用该迭代对象的__next__()方法拿到循环的下一个值，直到遇到StopIteration错误时退出循环。
        :return: 该方法返回一个迭代对象
        """
        return self

    def __next__(self):
        """
        和__iter__配合适用，让类实例支持被迭代
        :return:
        """
        self.age += 1
        if self.age > 35:
            raise StopIteration()
        return self.age

    def __getitem__(self, item):
        """
        让类实例支持按列表索引取值
        :param item:
        :return:
        """
        temp = range(self.age, 100)
        return temp[item]


if __name__ == '__main__':
    stu = Student()
    
    # __call__
    stu()  # 输出：类实例直接调用

    # __str__
    print(stu)  # 输出：Student: {name: zhang, age: 30}

    # __get_attr__
    print(stu.name)  # 输出：zhang
    print(stu.location)  # 输出：位置未知

    # __iter__和__next__
    for i in stu:
        print(i)  # 输出：31，32，33，34，35

    # __get_item__
    print(stu[2])  # 输出：38
```



## 枚举类

- `@unique`装饰器可以帮助检查枚举定义中没有重复值

```python
from enum import Enum, unique


class Student(object):

    def __init__(self):
        self.name = 'zhang'
        self.age = 30


@unique
class Month(Enum):
    JAN = 1
    FEB = 2
    MAR = 3
    APR = 3  # duplicate values found in <enum 'Month'>: APR -> MAR


if __name__ == '__main__':
    stu = Student()
    stu.age = Month.JAN
```



## 多重继承

在设计类的继承关系时，多重继承这种设计通常称之为MixIn。

MixIn的目的就是给一个类增加多个功能，这样，在设计类的时候，我们优先考虑通过多重继承来组合多个MixIn的功能，而不是设计多层次的复杂的继承关系。

Python自带的很多库也使用了MixIn。举个例子，Python自带了`TCPServer`和`UDPServer`这两类网络服务，而要同时服务多个用户就必须使用多进程或多线程模型，这两种模型由`ForkingMixIn`和`ThreadingMixIn`提供。通过组合，我们就可以创造出合适的服务来。

比如，编写一个多进程模式的TCP服务，定义如下：

```python
class MyTCPServer(TCPServer, ForkingMixIn):
    pass
```



## 元类





# 异常

## 异常类继承关系

Python所有的错误都是从`BaseException`类派生的，常见的错误类型和继承关系看这里：

https://docs.python.org/3/library/exceptions.html#exception-hierarchy

```python
BaseException
 +-- SystemExit
 +-- KeyboardInterrupt
 +-- GeneratorExit
 +-- Exception
      +-- StopIteration
      +-- StopAsyncIteration
      +-- ArithmeticError
      |    +-- FloatingPointError
      |    +-- OverflowError
      |    +-- ZeroDivisionError
      +-- AssertionError
      +-- AttributeError
      +-- BufferError
      +-- EOFError
      +-- ImportError
      |    +-- ModuleNotFoundError
      +-- LookupError
      |    +-- IndexError
      |    +-- KeyError
      +-- MemoryError
      +-- NameError
      |    +-- UnboundLocalError
      +-- OSError
      |    +-- BlockingIOError
      |    +-- ChildProcessError
      |    +-- ConnectionError
      |    |    +-- BrokenPipeError
      |    |    +-- ConnectionAbortedError
      |    |    +-- ConnectionRefusedError
      |    |    +-- ConnectionResetError
      |    +-- FileExistsError
      |    +-- FileNotFoundError
      |    +-- InterruptedError
      |    +-- IsADirectoryError
      |    +-- NotADirectoryError
      |    +-- PermissionError
      |    +-- ProcessLookupError
      |    +-- TimeoutError
      +-- ReferenceError
      +-- RuntimeError
      |    +-- NotImplementedError
      |    +-- RecursionError
      +-- SyntaxError
      |    +-- IndentationError
      |         +-- TabError
      +-- SystemError
      +-- TypeError
      +-- ValueError
      |    +-- UnicodeError
      |         +-- UnicodeDecodeError
      |         +-- UnicodeEncodeError
      |         +-- UnicodeTranslateError
      +-- Warning
           +-- DeprecationWarning
           +-- PendingDeprecationWarning
           +-- RuntimeWarning
           +-- SyntaxWarning
           +-- UserWarning
           +-- FutureWarning
           +-- ImportWarning
           +-- UnicodeWarning
           +-- BytesWarning
           +-- EncodingWarning
           +-- ResourceWarning
```



## try处理异常

> **如果错误没有被捕获，它就会一直往上抛，最后被Python解释器捕获**

`try`语句的工作原理如下：

- 首先，执行`try`子句 ，即`try` 和 `except` 关键字之间的语句。
- 如果没有触发异常，则跳过`except`子句，`try`语句执行完毕。
- 如果在执行`try`子句时发生了异常，则跳过该子句中剩下的部分。 如果异常的类型与`except`关键字后指定的异常相匹配，则会执行`except`子句，**然后到`try/except`代码块之后继续执行**。
- **如果发生的异常与`except`子句 中指定的异常不匹配，则它会被传递到外部的`try`语句中；如果没有找到处理程序，则它是一个未处理异常 且执行将终止并输出如上所示的消息**。
- `try` 语句可以有多个 *except 子句* 来为不同的异常指定处理程序。 但最多只有一个处理程序会被执行。 
- `except` 子句 可以用带圆括号的元组来指定多个异常，例如`except (RuntimeError, TypeError, NameError):`
- 如果有`finally`语句块，则最后都会执行`finally`语句块。



## raise触发异常

[`raise`](https://docs.python.org/zh-cn/3/reference/simple_stmts.html#raise) 语句支持强制触发指定的异常

- 这个参数必须是异常实例或异常类（派生自 [`Exception`](https://docs.python.org/zh-cn/3/library/exceptions.html#Exception) 类）。
- 如果传递的是异常类，将通过调用没有参数的构造函数来隐式实例化：

```python
raise ValueError  # shorthand for 'raise ValueError()'
```

```python
def my_abs(x):
    if not isinstance(x, (int, float)):
        raise TypeError('bad operand type')
    if x >= 0:
        return x
    else:
        return -x
```



# 装饰器

装饰器在执行main函数之前就已经运行了，但是被装饰的函数只有在调用时才能运行。