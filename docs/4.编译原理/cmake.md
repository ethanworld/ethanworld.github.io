# 概述

## cmake、make、gcc的区别

`gcc`工具：源码文件经`gcc`编译成目标文件。

`make`工具，批处理编译工具：但如果源文件太多，一个一个编译时就会特别麻烦，于是人们想到，为什么不设计一种类似批处理的程序，来批处理编译源文件呢，于是就有了make工具，它是一个自动化编译工具，你可以使用一条命令实现完全编译。

`makefile`文件，指导make进行批量编译的规则文件

- makefile中包含大量通过gcc编译或链接源码的命令；
- 不同平台下，makefile需要适配；

`cmake`工具，自动为工程生成makefile文件：对于一个大工程，编写makefile实在是件复杂的事，于是人们又想，为什么不设计一个工具，读入所有源文件之后，自动生成makefile呢，于是就出现了cmake工具，它能够输出各种各样的makefile或者project文件,从而帮助程序员减轻负担。

- cmake是跨平台编译工具，能跨平台生成makefile

`CMakeLists.txt`文件，指导cmake生成makefile的规则文件。

![img](https://cdn.jsdelivr.net/gh/ethanworld/images@main/202205150745744.png)

# gcc

