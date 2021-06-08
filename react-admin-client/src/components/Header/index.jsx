import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { amapAjax } from '../../api'
import menuList from '../../config/menuConfig'
import { message } from 'antd'
import { formateDate } from '../../utils/dateUtils'
import user from '../../utils/memoryUtils'
import store from '../../utils/storageUtils'
import LinkButton from '../LinkButton'

import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './index.less'

const { confirm } = Modal;

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTime: formateDate(Date.now()),
            weather: '',
            username: user.user.username
        }
        this.ajaxs()
    }

    logout = () => {
        confirm({
            title: '退出登录?',
            icon: <ExclamationCircleOutlined />,
            content: '您确定要退出登录么?',
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                store.removeUser()
                user.user = {}
                this.props.history.replace('/login')
            }
        });
    }


    getTime = () => {
        // this.timer = setInterval(() => {
            const currentTime = formateDate(Date.now())
            this.setState({currentTime})
        // }, 1000)
    }

    getTitle = () => {
        //得到当前请求路径
        const path = this.props.location.pathname
        let title
        menuList.forEach(item => {
            if (item.key === path) {
                    title = item.title
                // console.log(title)
            } else if (item.children) {
                //在所有的子item中查找匹配的项
                const cItem = item.children.find(citem => citem.key === path)
                //如果cItem有值说明有匹配的项
                if (cItem) {
                    title = cItem.title
                    // console.log(title)
                }
            }
            
        })

        return title
    }

    //第一次render()之后执行
    componentDidMount() {
        this.getTime()
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    ajaxs = async () => {
        const result = await amapAjax()
        if (result.status === '1') {
            // console.log(result)
            const {weather} = result.lives[0]
            this.setState({weather})
        } else {
            message.error('天气信息获取失败!')
        }
    }

    render() {
        const title = this.getTitle()
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎, {this.state.username}</span>
                    {/* <span style={{cursor: 'pointer'}} onClick={this.logout}>退出</span> */}
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{this.state.currentTime}</span>
                        <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="weather" />
                        <span>{this.state.weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)