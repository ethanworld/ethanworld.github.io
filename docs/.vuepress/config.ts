import { defineConfig } from 'vuepress/config'
import {
  Navbar,
  Sidebar
} from './config/index'
// .vuepress/config.js
console.log(Sidebar)
module.exports = {
  title: '程序员的极简生活',
  description: '操作系统/编译原理/软件架构',
  base: "/",
  head: [
      ['link', { rel: 'icon', href: '/statics/icon.png' }]
  ],
  themeConfig: {
    logo: '/statics/logo.png',
    sidebarDepth: 2,
    smoothScroll: true,
    lastUpdated: '上次更新',
    displayAllHeaders: true,
    activeHeaderLinks: true,
    nav: Navbar,
    // sidebar: Sidebar
    sidebar: Sidebar
  }
}