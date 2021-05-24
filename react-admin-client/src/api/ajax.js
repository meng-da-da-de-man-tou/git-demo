/*
  封装发送异步ajax请求的函数模块  -- axios库
  函数返回值是一个promise对象
  1.优化:统一处理返回的异常
    在外层包裹一个自己创建的promise对象.
    请求出错时显示错误提示而不是reject.
*/
import axios from 'axios'
import {message} from 'antd'
export default function ajax(url, data={}, type='GET') {
    let promise
    return new Promise((resolve, reject) => {
        //1.执行异步ajax请求

        if (type === 'GET') {
            promise = axios.get(url, {params: data})
        } else {
            promise = axios.post(url, data)
        }


        //2.如果请求成功调用resolve(value)
        //3.如果失败了提示异常信息

        promise.then(response => {
            resolve(response.data)
        }).catch(error => {
            message.error('请求出错了:' + error);
        })

        
    })

}


// ajax('/login', { username: 'tom', password: '123456' }, 'POST').then()

// ajax('/manage/user/add', { username: 'tom', password: '123456', phone: '15282793669' }, 'POST').then()

