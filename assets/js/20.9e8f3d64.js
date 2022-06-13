(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{437:function(e,t,r){"use strict";r.r(t);var n=r(62),a=Object(n.a)({},(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("h1",{attrs:{id:"elf"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#elf"}},[e._v("#")]),e._v(" ELF")]),e._v(" "),r("p",[e._v("Executable and Linkable Format，可执行与可链接格式。是一种用于"),r("a",{attrs:{href:"https://baike.baidu.com/item/%E4%BA%8C%E8%BF%9B%E5%88%B6%E6%96%87%E4%BB%B6/996661",target:"_blank",rel:"noopener noreferrer"}},[e._v("二进制文件"),r("OutboundLink")],1),e._v("、"),r("a",{attrs:{href:"https://baike.baidu.com/item/%E5%8F%AF%E6%89%A7%E8%A1%8C%E6%96%87%E4%BB%B6/2885816",target:"_blank",rel:"noopener noreferrer"}},[e._v("可执行文件"),r("OutboundLink")],1),e._v("、"),r("a",{attrs:{href:"https://baike.baidu.com/item/%E7%9B%AE%E6%A0%87%E4%BB%A3%E7%A0%81/9407934",target:"_blank",rel:"noopener noreferrer"}},[e._v("目标代码"),r("OutboundLink")],1),e._v("、共享库和核心转储格式文件的文件格式。")]),e._v(" "),r("p",[e._v("elf定义的是一种文件格式，使用该格式的文件后缀有："),r("code",[e._v("o")]),e._v("，"),r("code",[e._v("so")]),e._v("，"),r("code",[e._v("elf")]),e._v("，"),r("code",[e._v("prx")]),e._v("。")]),e._v(" "),r("ul",[r("li",[e._v("可执行文件：被操作系统中的加载器从硬盘上读取，载入到内存中去执行;")]),e._v(" "),r("li",[e._v("目标文件：被链接器读取，用来产生一个可执行文件或者共享库文件;")]),e._v(" "),r("li",[e._v("共享库文件：在动态链接的时候，由 ld-linux.so 来读取;")])]),e._v(" "),r("h2",{attrs:{id:"组成部分"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#组成部分"}},[e._v("#")]),e._v(" 组成部分")]),e._v(" "),r("p",[e._v("ELF文件由4部分组成，")]),e._v(" "),r("ul",[r("li",[e._v("ELF头（ELF header）")]),e._v(" "),r("li",[e._v("程序头表（Program header table）")]),e._v(" "),r("li",[e._v("节（Section）")]),e._v(" "),r("li",[e._v("节头表（Section header table）")])]),e._v(" "),r("p",[e._v("实际上，一个文件中不一定包含全部内容，而且它们的位置也未必如同所示这样安排，只有ELF头的位置是固定的，其余各部分的位置、大小等信息由ELF头中的各项值来决定。")]),e._v(" "),r("blockquote",[r("p",[e._v("虽然elf文件一共有4部分组成，但是不同的软件在读取elf文件时，关注的地方是不尽相同。例如连接器不关注program头，加载器不关注section头。")])]),e._v(" "),r("h2",{attrs:{id:"连接器与加载器"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#连接器与加载器"}},[e._v("#")]),e._v(" 连接器与加载器")]),e._v(" "),r("p",[e._v("链接器看ELF文件，看不见 Program header table.\n加载器看ELF文件，看不见 section header table, 并将section改个名字叫segment;")]),e._v(" "),r("p",[e._v("可以理解为：一个 Segment 可能包含一个或者多个 Sections，就像下面这样：")]),e._v(" "),r("p",[r("img",{attrs:{src:"https://cdn.jsdelivr.net/gh/ethanworld/images@main/202206112226039.png",alt:"img"}})]),e._v(" "),r("h2",{attrs:{id:"参考文献"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#参考文献"}},[e._v("#")]),e._v(" 参考文献")]),e._v(" "),r("ul",[r("li",[r("a",{attrs:{href:"https://blog.csdn.net/nirendao/article/details/123883856",target:"_blank",rel:"noopener noreferrer"}},[e._v("ELF文件介绍"),r("OutboundLink")],1)]),e._v(" "),r("li",[r("a",{attrs:{href:"https://blog.csdn.net/xuehuafeiwu123/article/details/72963229",target:"_blank",rel:"noopener noreferrer"}},[e._v("ELF格式文件详细分析"),r("OutboundLink")],1)]),e._v(" "),r("li",[r("a",{attrs:{href:"https://blog.csdn.net/u014587123/article/details/115276998",target:"_blank",rel:"noopener noreferrer"}},[e._v("ELF文件详解"),r("OutboundLink")],1)]),e._v(" "),r("li",[r("a",{attrs:{href:"https://blog.csdn.net/mazongshan1/article/details/37936971",target:"_blank",rel:"noopener noreferrer"}},[e._v("linux 如何运行一个可执行文件"),r("OutboundLink")],1)]),e._v(" "),r("li",[r("a",{attrs:{href:"https://blog.csdn.net/weixin_39807067/article/details/111266063",target:"_blank",rel:"noopener noreferrer"}},[e._v("linux 执行.out文件_Linux可执行文件与进程的虚拟地址空间"),r("OutboundLink")],1)]),e._v(" "),r("li",[r("a",{attrs:{href:"https://blog.csdn.net/qq_30011277/article/details/103711155",target:"_blank",rel:"noopener noreferrer"}},[e._v("gcc的-g,-o,-c,-D,-w,-W,-Wall,-O3等参数的意义"),r("OutboundLink")],1)]),e._v(" "),r("li",[r("a",{attrs:{href:"https://blog.csdn.net/qq_35423154/article/details/110307784",target:"_blank",rel:"noopener noreferrer"}},[e._v("Linux 内存管理 | 物理内存管理：物理内存、内存碎片、伙伴系统、slab分配器"),r("OutboundLink")],1)]),e._v(" "),r("li",[r("a",{attrs:{href:"https://blog.csdn.net/qq_35423154/article/details/111084188",target:"_blank",rel:"noopener noreferrer"}},[e._v("Linux 内存管理 | 虚拟内存管理：虚拟内存空间、虚拟内存分配"),r("OutboundLink")],1)]),e._v(" "),r("li",[r("a",{attrs:{href:"https://blog.csdn.net/qq_35423154/article/details/111084633",target:"_blank",rel:"noopener noreferrer"}},[e._v("Linux 内存管理 | 地址映射：分段、分页、段页"),r("OutboundLink")],1)]),e._v(" "),r("li")])])}),[],!1,null,null,null);t.default=a.exports}}]);