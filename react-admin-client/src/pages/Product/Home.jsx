import React, { Component } from 'react'
import { Card, Select, Button, Input, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import LinkButton from '../../components/LinkButton'

import { reqProducts, reqSearchProducts } from '../../api'
import { PAGE_SIZE } from '../../utils/constants'

const Option = Select.Option
//产品的home路由
export default class ProductHome extends Component {

    state = {
        products: [],  //商品的数组
        total: '',  //商品的总数量
        loading: false,  //是否正在加载中
        searchName: '',  //搜索关键字
        searchType: 'productName',  //搜索的类型
    }

    componentDidMount() {
        this.getProducts(1)
    }


    getProducts = async pageNum => {

        const { searchName, searchType } = this.state
        this.setState({ loading: true })
        let result 
        if (searchName) {
            result = await reqSearchProducts({pageNum, pageSize: PAGE_SIZE, searchType, searchName})
            this.setState({loading: false})
        } else {
            result = await reqProducts(pageNum, PAGE_SIZE)
            this.setState({loading: false})
        }

        if (result.status === 0) {
            // console.log(result)
            this.setState({ products: result.data.list, total: result.data.total, loading: false})
        }


    }

    reqSearchProducts = () => {
        console.log(this.state.searchName, this.state.searchType)
    }


    //初始化table表格列的数组
    initColums = () => {
        return [
            {
                title: '商品名称',
                dataIndex: 'name'
            },
            {
                title: '商品描述',
                dataIndex: 'desc'
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: (price) => '￥' + price //当前指定了对应属性,传入相应的属性值
            },
            {
                width: 100,
                title: '状态',
                dataIndex: 'status',
                render: (status) => {
                    return (
                        <span>
                            <Button type="primary">下架</Button>
                            <span>在售</span>
                        </span>
                    )
                }
            },
            {
                width: 100,
                title: '操作',
                render: (products) => {
                    return (
                        <span>
                            <LinkButton style={{ height: 20 }}>详情</LinkButton>
                            <LinkButton style={{ height: 20 }}>修改</LinkButton>
                        </span>
                    )
                }
            }
        ]
    }

    render() {
        const { products, total, loading, searchType } = this.state
        const columns = this.initColums()
        const title = (
            <span>
                <Select onChange={value => this.setState({ searchType: value })} defaultValue={searchType} style={{ width: 130 }}>
                    <Option value='productName'>按名称搜索</Option>
                    <Option value='productDesc'>按描述搜索</Option>
                </Select>
                <Input onChange={event => this.setState({ searchName: event.target.value })} style={{ width: 150, margin: '0 15px' }} placeholder='关键字' />
                <Button onClick={() => this.getProducts(1)} type='primary'>搜索</Button>
            </span>
        )
        const extra = (
            <Button type="primary"><PlusOutlined />添加商品</Button>
        )
        return (
            <Card title={title} extra={extra}>
                <Table
                    loading={loading}
                    rowKey="_id"
                    bordered
                    dataSource={products}
                    columns={columns}
                    pagination={{
                        total,
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper: true,
                        showSizeChanger: false,
                        onChange: this.getProducts
                    }}
                />
            </Card>
        )
    }
}
