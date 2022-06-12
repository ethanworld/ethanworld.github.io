# cpython

cpython是python众多解释器中的一种，采用C语言编写。

**Python 解释器**（*Python Interpreter*）由 **Python 编译器**（*Python Compiler*）和 **Python 虚拟机**（*Python Virutal Machine*）两部分组成。当我们通过 Python 命令执行 Python 代码时，Python 编译器会将 Python 代码编译为 **Python 字节码**（*[bytecode](https://link.zhihu.com/?target=https%3A//www.quora.com/What-is-the-difference-between-byte-code-and-machine-code-and-what-are-its-advantages)*）；随后 Python 虚拟机会读取并逐步执行这些字节码。

cpython源码链接：https://github.com/python/cpython



## 概述

cpython源码目录结构

```
cpython/
│
├── Doc      ← 源代码文档说明
├── Grammar  ← 计算机可读的语言定义
├── Include  ← C 语言头文件（头文件中一般放一些重复使用的代码）
├── Lib      ← Python 写的标准库文件
├── Mac      ← Mac 支持的文件
├── Misc     ← 杂项
├── Modules  ← C 写的标准库文件
├── Objects  ← 核心类型和对象模块
├── Parser   ← Python 解析器源码
├── PC       ← Windows 编译支持的文件
├── PCbuild  ← 老版本的 Windows 系统 编译支持的文件
├── Programs ← Python 可执行文件和其他二进制文件的源代码
├── Python   ← CPython  解析器源码
└── Tools    ← 用于构建或扩展 Python 的独立工具
```



可变变量`PyVarObject`

```c
typedef struct {
    PyObject ob_base;
    Py_ssize_t ob_size; /* Number of items in variable part */
} PyVarObject;

typedef struct _object PyObject;

struct _object {
    _PyObject_HEAD_EXTRA
    Py_ssize_t ob_refcnt;
    PyTypeObject *ob_type;
};

typedef struct _typeobject PyTypeObject;

struct _typeobject {
    PyObject_VAR_HEAD
    const char *tp_name; /* For printing, in format "<module>.<name>" */
    Py_ssize_t tp_basicsize, tp_itemsize; /* For allocation */

    /* Methods to implement standard operations */
		// ...
}

#define PyObject_VAR_HEAD      PyVarObject ob_base;
```



- [【译】Python 幕后 #1: CPython 虚拟机如何工作](https://www.linuxzen.com/python-behind-the-scenes_1_how_cpython_vm_works.html)
- [Python’s Innards: Introduction](https://tech.blog.aknin.name/2010/04/02/pythons-innards-introduction/)
- [教你阅读 Cpython 的源码（一）](https://zhuanlan.zhihu.com/p/79656976)
- [Python 源码学习：编译器和虚拟机](https://zhuanlan.zhihu.com/p/375323851)
- [深入理解python虚拟机](https://nanguage.gitbook.io/inside-python-vm-cn/)
- [cpython 源码概览](https://blog.runc.dev/2018/10/06/py-source/)