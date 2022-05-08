import { defineConfig } from 'vuepress/config'
import {
  Navbar,
  Sidebar
} from './config/index'
// .vuepress/config.js
console.log(Sidebar)
module.exports = {
  title: 'JVM.run',
  description: '伊森沃德个人博客',
  base: "/",
  head: [
      ['link', { rel: 'icon', href: '/logo.png' }]
  ],
  themeConfig: {
    logo: '/statics/logo.jpg',
    sidebarDepth: 2,
    displayAllHeaders: true,
    activeHeaderLinks: true,
    nav: Navbar,
    // sidebar: Sidebar
    sidebar: Sidebar
  }
}