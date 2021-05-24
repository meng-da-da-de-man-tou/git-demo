import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { Layout } from 'antd';

import memoryUtils from '../../utils/memoryUtils'

import LeftNav from '../../components/LeftNav'
import Header from '../../components/Header'

import Home from '../Home'
import Category from '../Category'
import Product from '../Product'
import Role from '../Role'
import User from '../User'

import Bar from '../Charts/bar'
import Line from '../Charts/line'
import Pie from '../Charts/pie'




const { Footer, Sider, Content } = Layout;

// 后台管理的路由组件
export default class Admin extends Component {
    render() {
        const user = memoryUtils.user
        if (!user || !user.id) {
            return <Redirect to='/login' />
        }
        return (
            <Layout style={{height: '100%'}}>
                <Sider>
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header style={{color: '#fff'}}>
                        <Header />
                    </Header>
                    <Content style={{backgroundColor: 'white'}}>
                        <Switch>
                            <Route path='/home' component={Home} />
                            <Route path='/category' component={Category} />
                            <Route path='/product' component={Product} />
                            <Route path='/role' component={Role} />
                            <Route path='/user' component={User} />
                            <Route path='/Charts/bar' component={Bar} />
                            <Route path='/Charts/line' component={Line} />
                            <Route path='/Charts/pie' component={Pie} />
                            <Redirect to='/home' />
                        </Switch>
                    </Content>
                    <Footer style={{textAlign: 'center',color: '#cccccc'}}>推荐使用谷歌浏览器,可以获得更佳页面操作体验</Footer>
                </Layout>
            </Layout>
        )
    }
}
