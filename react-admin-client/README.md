<!-- 
  antD按需引入
  安装: npm add react-app-rewired customize-cra babel-plugin-import
  定义加载配置的js模块: config-overrides.js
   const {override, fixBabelImports} = require('customize-cra')
   针对antd实现按需打包,根据import来打包(babel-plugin-import)
   module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css'
    })
   )

   antD自定义主题
   安装: npm i less less-loader
   配置：
   const { override, fixBabelImports, addLessLoader } = require('customize-cra');

  module.exports = override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }),
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: { '@primary-color': '#1DA57A' },
    }),
  );
  运行后会报错this.getOptions is not a function,因为less-loader版本太高不兼容,安装5.0左右版本的less-loader即可解决.
  npm install less-loader@5.0.0
  https://www.cnblogs.com/lhongsen/p/14608910.html



  高阶函数
   -- 一类特别的函数
      1.接收函数类型的参数
      2.返回值是函数
   -- 常见的高阶函数
      1.定时器 setTimeout() / setInterval()
      2.Promise(() => then(value => {}, reason => {}))
      3.数组遍历相关的方法 forEach()/filter()/map()/reduce()/find()/findIndex()
      4.函数对象的bind()
      5.Form.create()()/getFieldDecorator()()
   -- 高阶函数更新动态更具有扩展性

  高阶组件
   -- 本质是一个函数.
   -- 接收一个组件(被包装组件),返回一个新的组件(包装组件),包装组件会向被包装组件传入特定属性.
   -- 扩展组件的功能.
   -- 高阶组件本质也是高阶函数: 接收租减函数,返回一个新的组件函数.


  antD表单验证的两种方式:声明式验证/自定义验证
  https://www.cnblogs.com/jlyuan/p/12774414.html


  git管理项目
    1.创建远程仓库
    2.创建本地仓库
      1. 配置 .gitignore
      2. git add .
      3. git commit -m 'init'
    3.将本地仓库推送到远程仓库
      1. git remote add origin url
      2. git push origin master
    4.在本地创建dev分支并推送到远程
      1. git checkout -b dev
      2. git push origin dev
    5.如果本地有修改
      1. git add .
      2. git commit -m "xxx"
      3. git push origin dev
    6.克隆仓库
      1. git clone url
      2. git checkout -b dev origin/dev
      3. git pull origin dev
    7. 如果远程修改
      git pull origin dev

  项目的基本结构
    api： ajax请求模块
    components: 非路由组件
    pages: 路由组件
    App.js: 应用的根组件
    index.js: 入口js


  封装ajax请求模块
    安装: npm add axios
    跨域问题: 配置proxy参数.

    import axios from 'axios'
    export default function ajax(url, data={}, type='GET') {
      if (type === 'GET') {
          return axios.get(url, {params: data})
      } else {
          return axios.post(url, data)
      }
    }

    优化




  async/await
    作用: 简化promise对象的使用: 不再使用.then()来制定成功/失败的回调函数.
    以同步编码方式实现异步流程.
    哪里需要await
    在返回promise边大师的左侧写await:不要promise,而是要promise异步执行成功的value数据.
    哪里需要async
    await所在行数定义的左侧
 -->