import { defineConfig } from 'vuepress/config'
import {
  Navbar,
  Sidebar
} from './config/index'
// .vuepress/config.js
console.log(Sidebar)
module.exports = {
  title: '',
  description: '伊森沃德个人博客',
  base: "/",
  head: [
      ['link', { rel: 'icon', href: '/statics/icon.png' }]
  ],
  themeConfig: {
    logo: '/statics/logo.png',
    sidebarDepth: 2,
    displayAllHeaders: true,
    activeHeaderLinks: true,
    nav: Navbar,
    // sidebar: Sidebar
    sidebar: Sidebar
  }
}