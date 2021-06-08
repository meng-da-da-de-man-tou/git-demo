import React, { Component } from 'react'
import { Form, Select, Input } from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item
const Option = Select.Option
//添加分类的form组件
export default class AddForm extends Component {

    static propTypes = {
        dataSource: PropTypes.array.isRequired,
        parentId: PropTypes.string.isRequired
    }

    state = {categoryname: '' , parentId: '0'}

    componentDidMount () {
        const {parentId} = this.props
        this.setState({parentId})
    }


    getParentId = (event) => {
        this.setState({parentId: event})
    }

    getCategoryName = (event) => {
        this.setState({categoryname: event.target.value}, () => {
            const {categoryname, parentId} = this.state
            this.props.setForm({categoryname, parentId})
        })
        
    }

    render() {
        const {dataSource, parentId} = this.props
        return (
            <Form>
                <Item name="selects" initialValue={parentId}>
                    <Select onChange={this.getParentId}>
                        <Option key={0} value="0">一级分类</Option>
                        {
                            dataSource.map((item, index) => <Option key={index + 1} value={item._id}>{item.name}</Option>)
                        }
                    </Select>
                </Item>
                <Item name="inputs" initialValue=''>
                    <Input onChange={this.getCategoryName} placeholder="请输入分类名称" />
                </Item>
            </Form>
        )
    }
}
