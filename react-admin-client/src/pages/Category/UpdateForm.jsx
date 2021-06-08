import React, { Component } from 'react'
import { Form, Input } from 'antd'


const Item = Form.Item
//添加分类的form组件
export default class UpdateForm extends Component {
    saveFormData = event => {
        this.props.setForm(event.target.value)
    }

    render() {
        let { name } = this.props
        return (
            <Form>
                <Item
                    name="inputs"
                    initialValue={name}
                    rules={[
                        {
                            required: true,
                            whitespace: true,
                            message: '分类名称必须输入!',
                        },
                        {
                            max: 10,
                            message: '最长10位!',
                        },
                        {
                            min: 1,
                            message: '至少1位!!',
                        }
                    ]}
                >
                    <Input onChange={this.saveFormData} placeholder="请输入分类名称" />
                </Item>
            </Form>
        )
    }
}
