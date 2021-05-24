/*
  能根据接口文档定义接口请求
  包含应用中所有接口请求函数的模块
  每个函数的返回值都是promise
*/

import ajax from './ajax'
// const BASE = 'http://120.55.193.14:5000'

//登录
// export function reqLogin(username, password) {
//    return ajax('./login', {username, password}, 'POST')
// }

export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST')

//添加用户

export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST')