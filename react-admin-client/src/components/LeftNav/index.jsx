import React, { Component } from 'react'
import { Link,withRouter } from 'react-router-dom'
import { Menu } from 'antd';

import menuList from '../../config/menuConfig'

import logo from '../../assets/images/logo-images.jpg'
import './index.less'

const { SubMenu } = Menu;


class LeftNav extends Component {
    constructor(props) {
        super(props);
        //第一次render()之前执行一次
        //为第一次render()准备数据(同步的)
        this.menuNodes = this.getMenuNodes_map(menuList)
    }

    getMenuNodes_map = (menuList) => {
        let path = this.props.location.pathname
        return menuList.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key} icon={item.icon}>
                        <Link to={item.key}>
                            {item.title}
                        </Link>
                    </Menu.Item>
                )
            } else {
                const cItem = item.children.find(cItem => cItem.key === path)
                if (cItem) this.openKey = item.key
                return (
                <SubMenu key={item.key} icon={item.icon} title={item.title}>
                    
                    {/* <Menu.Item key="/role">
                        <Link to='/role'>
                        角色管理
                        </Link>
                    </Menu.Item> */}
                    {this.getMenuNodes_map(item.children)}
                </SubMenu>
                )
            }
        })
    }

    getMenuNodes = (menuList) => {
        let path = this.props.location.pathname
        return menuList.reduce((pre, item) => {
            //向pre添加<Menu.item>
            if (!item.children) {
                pre.push ((
                    <Menu.Item key={item.key} icon={item.icon}>
                        <Link to={item.key}>
                            {item.title}
                        </Link>
                    </Menu.Item>
                ))
            } else {
                //查找一个与当前请求路径匹配的子item
                //如果存在,说明当前路径所在的自列表需要展开
                const cItem = item.children.find(cItem => cItem.key === path)
                if (cItem) this.openKey = item.key
                //向pre添加<SubMenu>
                pre.push ((
                <SubMenu key={item.key} icon={item.icon} title={item.title}>
                    
                    {/* <Menu.Item key="/role">
                        <Link to='/role'>
                        角色管理
                        </Link>
                    </Menu.Item> */}
                    {this.getMenuNodes(item.children)}
                </SubMenu>
                ))
            }
            return pre
        }, [])
    }

    render() {
        let path = this.props.location.pathname
        let openKey = this.openKey
        return (
            <div className="left-nav">
                <Link to="/" className="left-nav-header">
                    <img src={logo} alt="logo" />
                    <h1>测试案例</h1>
                </Link>

                <Menu
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                    mode="inline"
                    theme="dark"
                >

                    {
                        this.menuNodes
                    }

                </Menu>

            </div>
        )
    }
}

//withRouter高阶组件
//包装非路由组件,返回一个新的组件
//新的组件向费路由组件传递三个属性: histoty/location/match
export default withRouter(LeftNav)
