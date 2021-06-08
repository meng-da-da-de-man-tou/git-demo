import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import ProductAddUpdate from './AddUpdate'
import ProductDetail from './Detail'
import ProductHome from './Home'

//商品路由
export default class Product extends Component {
    render() {
        return (
            <Switch>``
                <Route exact path='/product' component={ProductHome} />
                <Route path='/product/addupdate' component={ProductAddUpdate} />
                <Route path='/product/detail' component={ProductDetail} />
                <Redirect to='/product' />
            </Switch>
        )
    }
}
