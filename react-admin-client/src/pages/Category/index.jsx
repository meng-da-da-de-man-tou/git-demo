import React, { Component } from 'react'
import {
    Card,
    Table,
    Button,
    message,
    Modal
} from 'antd'
import LinkButton from '../../components/LinkButton'
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { reqCategorys, reqUpdateCategory, reqAddCategory } from '../../api'
import AddForm from './AddForm'
import UpdateForm from './UpdateForm'


//商品分类  路由
export default class Category extends Component {
    // constructor (props) {
    //     super(props)
    //     //初始化状态
    //     this.state ={
    //         loading: true,
    //         dataSource: []
    //     }
    // }
    state = {
        loading: false,
        dataSource: [],  //一级分类列表
        subCategorys: [],  //二级分类列表
        parentId: '0',   //当前需要先试的分类列表的父分类ID
        parentName: '',  //当前需要显示的分类列表的父分类名
        showStatus: 0,   //1显示添加,2显示更新,0都不显示
        indexItem: {}
    }

    // 初始化页面数据
    componentDidMount() {
        this.listConfig()
        //获取一级分类列表显示
        this.reqCategorys()
    }

    //列表配置项
    listConfig = () => {
        this.columns = [
            {
                title: '分类名称',
                dataIndex: 'name',  //显示数据对应的属性名
            },
            {
                title: '操作',
                width: 300,
                render: (dataSource) => (  //返回需要现实的界面标签
                    <span>
                        <LinkButton onClick={() => this.modifyCategory(dataSource)}>修改分类</LinkButton>
                        { this.state.parentId === '0' ? <LinkButton onClick={() => this.showSubCategory(dataSource)}>查看子分类</LinkButton> : null}
                    </span>
                )
            }
        ]
    }

    //查看子分类
    showSubCategory = (dataSource) => {
        this.reqCategorys(dataSource._id, dataSource.name)
    }

    //获取一级/二级分类列表
    reqCategorys = async (parentId = '0', parentName) => {
        // console.log(typeof parentId)
        this.setState({ loading: true })
        parentName = parentName || this.state.parentName
        const result = await reqCategorys(parentId)
        if (result.status === 0) {
            if (parentId === '0') {
                // 更新一级分类状态
                this.setState({ dataSource: result.data, loading: false, parentId, parentName })
            } else {
                // 更新二级分类状态
                this.setState({ subCategorys: result.data, loading: false, parentId, parentName })
            }
        } else {
            message.error(result.msg);
        }
    }

    //添加分类
    addCategory = async () => {
        this.setState({ showStatus: 0 })
        if (this.form) {
            const { categoryname, parentId } = this.form
            const result = await reqAddCategory(categoryname, parentId)
            this.form = ''
            if (result.status === 0) {
                if (parentId === this.state.parentId) {
                    this.reqCategorys(parentId)
                } else if (parentId === '0') {
                    this.reqCategorys('0')
                }
            } else {
                message.error('添加失败');
            }

        }
    }

    //更新分类
    updateCategory = async () => {

        const categoryname = this.form
        const parentId = this.state.indexItem._id
        this.clearShowStatus()
        if (categoryname !== '' && categoryname !== undefined) {
            const result = await reqUpdateCategory({ categoryname, parentId })
            if (result.status === 0) {
                // console.log(result)
                this.reqCategorys()
            }
        }
    }

    clearShowStatus = () => {
        this.form = ''
        this.setState({ showStatus: 0 })
    }

    modifyCategory = (dataSource) => {
        // console.log(dataSource)
        this.setState({ showStatus: 2, indexItem: dataSource })
    }



    render() {
        const { parentId, loading, dataSource, subCategorys, parentName, showStatus, indexItem } = this.state
        //card左侧
        const title = parentId === '0' ? <LinkButton style={{ color: 'black' }}>一级分类列表</LinkButton> : (
            <span>
                <LinkButton onClick={() => this.setState({ parentId: '0' })}>一级分类列表</LinkButton>
                <ArrowRightOutlined />
                <span style={{ marginLeft: 5 }}>{parentName}</span>
            </span>
        )
        //card右侧按钮
        const extra = (<Button type="primary" onClick={() => this.setState({ showStatus: 1 })}><PlusOutlined />添加</Button>)


        return (
            <Card title={title} extra={extra}>
                <Table rowKey="_id"
                    bordered
                    loading={loading}
                    dataSource={parentId === '0' ? dataSource : subCategorys}
                    columns={this.columns}
                    pagination={{ defaultPageSize: 10, showQuickJumper: true, showSizeChanger: false }}
                    scroll={{ y: 560 }}
                />

                <Modal
                    title="添加分类"
                    visible={showStatus === 1}
                    onOk={this.addCategory}
                    onCancel={this.clearShowStatus}
                    destroyOnClose
                >
                    <AddForm dataSource={dataSource} parentId={parentId} setForm={form => this.form = form} />
                </Modal>

                <Modal
                    title="更新分类"
                    visible={showStatus === 2}
                    onOk={this.updateCategory}
                    onCancel={this.clearShowStatus}
                    destroyOnClose
                >
                    <UpdateForm {...indexItem} setForm={form => this.form = form} />
                </Modal>
            </Card>
        )
    }
}
