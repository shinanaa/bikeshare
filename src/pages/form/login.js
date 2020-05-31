import React from 'react'
import { Card, Form, Input, Button, message, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
const FormItem = Form.Item

export default class Login extends React.Component {
    onFinish = values => {
        console.log(values)
        message.success(`${values.userName}当前密码为:${values.userPwd}`)
    }
    formRef = React.createRef();
    render() {
        const handleSubmit = () => {
            let userInfo = this.formRef.current.getFieldsValue()
            this.formRef.current.validateFields()
                .then(() => {
                    message.success(`${userInfo.userName}当前密码为:${userInfo.userPwd}`)
                })
        }
        return (
            <div style={{ width: '100%' }}>
                <Card title="登录行内表单" className="card-wrap">
                    <Form layout="inline">
                        <FormItem>
                            <Input placeholder="请输入用户名" />
                        </FormItem>
                        <FormItem>
                            <Input placeholder="请输入密码" />
                        </FormItem>
                        <FormItem>
                            <Button type="primary">登录</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card title="登录水平表单" className="card-wrap">
                    <Form
                        ref={this.formRef}
                        onFinish={this.onFinish}
                        initialValues={{ userName: 'jack', userPwd: '123456', remember: false }}
                        style={{ width: '300px' }}>
                        <FormItem
                            form=""
                            name="userName"
                            rules={[
                                { required: true, message: '用户名不能为空' },
                                // { pattern: /^\w+$/g, message: '用户名必须为字母或者数字' }
                                { pattern: new RegExp('^\\w+$', 'g'), message: '用户名必须为字母或者数字' }
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
                        </FormItem>
                        <FormItem
                            name="userPwd"
                            rules={[
                                {
                                    required: true,
                                    message: '密码不能为空'
                                },
                                { min: 5, max: 10, message: '长度不在范围内' }
                            ]}
                        >
                            <Input type="password" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入密码" />
                        </FormItem>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>记住密码</Checkbox>
                            </Form.Item>

                            <a style={{ float: 'right' }} href="">
                                Forgot password
                            </a>
                        </Form.Item>
                        {/* <Button type="primary" htmlType="submit">Submit</Button> */}
                        <FormItem>
                            <Button type="primary" onClick={handleSubmit}>登录</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}