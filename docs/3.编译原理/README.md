# 概述

## 优质链接

- 自己动手写编译器：https://pandolia.net/tinyc/ch1_overview.html
- 



## 基本概念

- clang：Apple推出的编译前端
- llvm：Apple资助的编译后端
- clang和llvm可以作为完整的编译方案，对标gcc
- flex，lex升级版，基于正则表达式生成词法分析器，用于词法分析，生成token stream；
- Bison，yacc升级版，基于正则表达式生成语法分析器，用于语法分析，生成中间代码；
- flex与bison搭配使用作为编译前端的解决方案，类比clang的功能；



源代码 --> 目标代码：

- 编译前端：通常与目标平台无关，仅负责分析源代码
  - 词法分析
  - 语法分析
  - 语义分析
- 编译后端：与目标平台有关
  - 中间代码生成
  - 优化
  - 目标代码生成
