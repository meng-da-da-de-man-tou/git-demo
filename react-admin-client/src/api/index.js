/*
  能根据接口文档定义接口请求
  包含应用中所有接口请求函数的模块
  每个函数的返回值都是promise
*/

import ajax from './ajax'

const BASE = 'http://120.55.193.14:5000'
const city = '500105'

//登录
// export function reqLogin(username, password) {
//    return ajax('./login', {username, password}, 'POST')
// }

//登录
export const reqLogin = (username, password) => ajax(BASE + '/login', {username, password}, 'POST')

//添加用户
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add', user, 'POST')

//获取天气
export const amapAjax = () => ajax(`https://restapi.amap.com/v3/weather/weatherInfo?city=${city}&key=4afc5ac9b4bd73b71d4d32eeee213f17`)

//获取分类一级/二级列表  请求方式用形参默认值设置为GET方式
export const reqCategorys = parentId => ajax(BASE + '/manage/category/list', {parentId})

//添加分类
export const reqAddCategory = (categoryname, parentId) => ajax(BASE + '/manage/category/add', {categoryname, parentId}, 'POST')

//更新分类
export const reqUpdateCategory = ({categoryname, parentId}) => ajax(BASE + '/manage/category/update', {categoryname, parentId}, 'POST')

//获取商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax(BASE + '/manage/product/list', {pageNum, pageSize})

//搜索产品分页列表(根据商品名称/商品描述搜索)
//searchType: 搜索的类型-- productName/productDesc
export const reqSearchProducts = ({pageNum, pageSize, searchName, searchType}) => ajax(BASE + '/manage/product/search', {pageNum, pageSize, [searchType]: searchName})



