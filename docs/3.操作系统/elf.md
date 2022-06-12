# ELF

Executable and Linkable Format，可执行与可链接格式。是一种用于[二进制文件](https://baike.baidu.com/item/二进制文件/996661)、[可执行文件](https://baike.baidu.com/item/可执行文件/2885816)、[目标代码](https://baike.baidu.com/item/目标代码/9407934)、共享库和核心转储格式文件的文件格式。

elf定义的是一种文件格式，使用该格式的文件后缀有：`o`，`so`，`elf`，`prx`。

- 可执行文件：被操作系统中的加载器从硬盘上读取，载入到内存中去执行;
- 目标文件：被链接器读取，用来产生一个可执行文件或者共享库文件;
- 共享库文件：在动态链接的时候，由 ld-linux.so 来读取;



## 组成部分

ELF文件由4部分组成，

- ELF头（ELF header）
- 程序头表（Program header table）
- 节（Section）
- 节头表（Section header table）

实际上，一个文件中不一定包含全部内容，而且它们的位置也未必如同所示这样安排，只有ELF头的位置是固定的，其余各部分的位置、大小等信息由ELF头中的各项值来决定。

> 虽然elf文件一共有4部分组成，但是不同的软件在读取elf文件时，关注的地方是不尽相同。例如连接器不关注program头，加载器不关注section头。



## 连接器与加载器

链接器看ELF文件，看不见 Program header table. 
加载器看ELF文件，看不见 section header table, 并将section改个名字叫segment;

可以理解为：一个 Segment 可能包含一个或者多个 Sections，就像下面这样：

![img](https://cdn.jsdelivr.net/gh/ethanworld/images@main/202206112226039.png)





## 参考文献

- [ELF文件介绍](https://blog.csdn.net/nirendao/article/details/123883856)
- [ELF格式文件详细分析](https://blog.csdn.net/xuehuafeiwu123/article/details/72963229)
- [ELF文件详解](https://blog.csdn.net/u014587123/article/details/115276998)
- [linux 如何运行一个可执行文件](https://blog.csdn.net/mazongshan1/article/details/37936971)
- [linux 执行.out文件_Linux可执行文件与进程的虚拟地址空间](https://blog.csdn.net/weixin_39807067/article/details/111266063)
- [gcc的-g,-o,-c,-D,-w,-W,-Wall,-O3等参数的意义](https://blog.csdn.net/qq_30011277/article/details/103711155)
- [Linux 内存管理 | 物理内存管理：物理内存、内存碎片、伙伴系统、slab分配器](https://blog.csdn.net/qq_35423154/article/details/110307784)
- [Linux 内存管理 | 虚拟内存管理：虚拟内存空间、虚拟内存分配](https://blog.csdn.net/qq_35423154/article/details/111084188)
- [Linux 内存管理 | 地址映射：分段、分页、段页](https://blog.csdn.net/qq_35423154/article/details/111084633)
- 

