/*
  进行local数据存储管理的工具模块
*/

import store from 'store'
const USER_KEY = 'user_key'
const userFunc = {
    // 保存user
    saveUser (user) {
        store.set(USER_KEY, user)
    },
    // 读取user
    getUser () {
        return store.get(USER_KEY) || {}
    },
    removeUser () {
        store.remove(USER_KEY)
    }
}
export default userFunc