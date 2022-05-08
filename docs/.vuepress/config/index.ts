import fs from 'fs'
import path from 'path'

// md文件所在根目录
const root = path.resolve(__dirname, '../../')
// 根目录的过滤名单
const navBlackList:Array<string> = ['.vscode', '.vuepress', 'assets', '.DS_Store']

function filterDir(filename:string, blackList:Array<string>, strict=false) {
  let passBlackList = true
  blackList.forEach(item => {
    if (item === filename) {
      passBlackList = false
      return
    }
  })
  if (strict) {
    return passBlackList && fs.statSync(path.resolve(root, filename)).isDirectory()
  } else {
    return passBlackList
  }
}

// 获取根目录下得文件夹数组
function getNavbar () {
  let navList = fs.readdirSync(path.resolve(root))
  .filter(filename => {return filterDir(filename, navBlackList, true)})
  let navItems:Array<any> = []
  navList.forEach(nav => {
    navItems.push({'name': nav, 'text': nav.split('.')[1], 'link': '/' + nav + '/'})
  })
  return navItems
}

/**
 * 过滤所要导航的文件
 * 文件名 包含.md 但 不包含  README */
function getFileName(filename:string) {
  filename = filename.replace('.md', '')
  if (filename.includes('README')) {
    return ''
  }
  // filename =  filename.split('/')[1]
  return filename
}

/**
 * 递归获取分组信息并排序*/
 function scan(filepath: string, node: Array<any>) {
  let list = fs.readdirSync(path.resolve(root, filepath))
  // let palist=pa;
  // list = list.sort(function (a, b) {
  //     return a.replace(".md", "").match(/[^-]*$/) - b.replace(".md", "").match(/[^-]*$/)
  // });
  list.forEach(function (item, index) {
    let info = fs.statSync(path.resolve(root, filepath, item));
    if (info.isDirectory()) {
      let children:any = [];
      scan(filepath + '/' + item, children)
      children.sort()
      let group = {
        title: item,
        collapsable: true,
        sidebarDepth: 2,
        children: children
      };
      node.push(group);
    } else {
      node.push(getFileName('/' + filepath  + '/' + item));
      node.sort()
    }
  })
}

function getSidebar(){
  let navList = getNavbar()
  let map = {}
  navList.forEach(nav => {
    let navSidebar:any = []
    scan(nav['name'], navSidebar)
    map[nav['link']] = navSidebar
  })
  // scan('', node)
  // let root = node.jsonify()['children']
  // let map = {}
  // root.forEach(item => {
  //   map[item['path']] = item['children']
  // });
  return map
}

export const Navbar:Array<string>  = getNavbar()
export const Sidebar:any = getSidebar()
