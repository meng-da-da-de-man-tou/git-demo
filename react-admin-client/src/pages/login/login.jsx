import React, { Component } from 'react'
import './login.less'
import logo from './images/logo-images.jpg'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {reqLogin} from '../../api'
// 登录的路由组件
export default class Login extends Component {

    onFinish = async (values) => {
        console.log('Success:', values);
        const {username, password} = values
        // reqLogin(username, password).then(response => {
        //     console.log(response)
        // }).catch(error => {
        //     console.log(error)
        // })
            const response = await reqLogin(username, password)
            console.log(response)
    }

    onFinishFailed = () => {
        console.log('Failed:');
    }

    validatePwd = (_, value) => {
        if (value.length >= 6 && value.length <= 10) {
            return Promise.resolve()
        } else {
            return Promise.reject('密码长度必须是6~10位')
        }
    }


    render() {
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo" />
                    <h1>后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                    >
                        <Form.Item name="username"
                            //声明式验证:直接使用别人定义好的验证规则
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: 'Please input your Username!',
                                },
                                {
                                    max: 20,
                                    message: '最长20位!',
                                },
                                {
                                    min: 5,
                                    message: '至少5位!!',
                                },
                                {
                                    pattern: /^[A-Za-z\d_]+$/,
                                    message: '自能包含字母数字下划线字符!',
                                }
                            ]}
                            initialValue="admin"
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" style={{ color: 'rgba(0,0,0,0.25)' }} />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item name="password"
                            //自定义验证,用于已有验证不满足使用需求时使用.
                            rules={[
                                {
                                    validator: this.validatePwd
                                }
                            ]}
                        >
                            <Input prefix={<LockOutlined className="site-form-item-icon" style={{ color: 'rgba(0,0,0,0.25)' }} />} type="password" placeholder="Password" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                        </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}
