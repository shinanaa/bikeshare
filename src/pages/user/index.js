import React from 'react'
import {Card, Form, Input, Button, Modal, Radio, Select, DatePicker} from 'antd'
import moment from 'moment'
import ETable from '../../components/ETable'
import Utils from '../../utils/utils'
import axios from '../../axios'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const {Option} = Select
export default class User extends React.Component{
    formRef = React.createRef();
    state = {
        list:[],
        title: '',
        isVisble: false
    }

    params = {
        page:1
    }
    componentDidMount() {
        this.requestList()
    }
    getState = (state)=>{
        return {
            '1':'咸鱼一条',
            '2':'风华浪子',
            '3':'北大才子一枚',
            '4':'百度FE',
            '5':'创业者'
        }[state]
    }
    handleOperator = (type) => {
        let item = this.state.selectedItem
        if(type == 'create') {
            this.setState({
                type,
                title: '创建员工',
                isVisble: true
            })
        } else if(type == 'edit') {
            if(!item){
                Modal.info({
                    title: '信息',
                    content: '请选择一个用户'
                })
                return;
            }
            this.setState({
                type,
                title: '编辑员工',
                isVisble: true,
                userInfo: {
                    userName: item.userName,
                    sex: item.sex,
                    state: this.getState(item.state),
                    birthday: moment(item.birthday),
                    address: item.address
                }
            })
        } else if(type == 'detail') {
            console.log(item)
            if(!item){
                Modal.info({
                    title: '信息',
                    content: '请选择一个用户'
                })
                return;
            }
            this.setState({
                type,
                title: '员工详情',
                isVisble: true,
                userInfo: {
                    userName: item.userName,
                    sex: item.sex,
                    state: this.getState(item.state),
                    birthday: moment(item.birthday),
                    address: item.address
                }
            })
            console.log(this.state.userInfo)
        }
    }
    handleSubmit = () => {
        let type = this.state.type
        let data = this.formRef.current.getFieldsValue()
        axios.Ajax({
            url: type == 'create' ? '/user/add' : '/user/edit',
            data: {
                params: data
            }
        }).then((res) => {
            if(res.code == 0){
                this.formRef.current.resetFields()
                this.setState({
                    isVisble:false
                })
                this.requestList();
            }
        })
    }
    requestList = () => {
        axios.requestList(this, this.params, '/user/list')
      }
    render() {
        const columns = [
              {
                title: 'id',
                dataIndex: 'id'
              }, 
              {
                title: '用户名',
                dataIndex: 'userName'
              }, 
              {
                title: '性别',
                dataIndex: 'sex',
                render(sex){
                    return sex ==1 ?'男':'女'
                }
              },
              {
                title: '状态',
                dataIndex: 'state',
                render(state){
                    let config = {
                        '1':'咸鱼一条',
                        '2':'风华浪子',
                        '3':'北大才子一枚',
                        '4':'百度FE',
                        '5':'创业者'
                    }
                    return config[state];
                }
              },
              {
                title: '爱好',
                dataIndex: 'interest',
                render(interest){
                    let config = {
                        '1':'游泳',
                        '2':'打篮球',
                        '3':'踢足球',
                        '4':'跑步',
                        '5':'爬山',
                        '6':'骑行',
                        '7':'桌球',
                        '8':'麦霸'
                    }
                    return config[interest];
                }
              },
                {
                    title: '爱好',
                    dataIndex: 'isMarried',
                    render(isMarried){
                        return isMarried?'已婚':'未婚'
                    }
                },
                {
                    title: '生日',
                    dataIndex: 'birthday'
                },
                {
                    title: '联系地址',
                    dataIndex: 'address'
                },
                {
                    title: '早起时间',
                    dataIndex: 'time'
                }
     
        ]
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 16}
        };
        const userInfo = this.state.userInfo || {}
        const foot = {
            footer: this.state.type == 'detail' ? null : ''
        }
        return(
            <div style={{width: '100%'}}>
                <Card>
                    <Form layout="inline">
                        <Form.Item>
                            <Input placeholder="请输入用户名" />
                        </Form.Item>
                        <Form.Item>
                            <Input type="password" placeholder="请输入密码"/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary">登 录</Button>
                        </Form.Item>
                    </Form>
                </Card>
                <Card style={{marginTop: '10px'}} className="operator-button">
                    <Button type="primary" onClick={()=>this.handleOperator('create')}>创建员工</Button>
                    <Button type="primary" onClick={()=>this.handleOperator('edit')}>编辑员工</Button>
                    <Button type="primary" onClick={()=>this.handleOperator('detail')}>员工详情</Button>
                    <Button type="primary" onClick={()=>this.handleOperator('delete')}>删除员工</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                        columns={columns}
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        selectedRowKeys={this.state.selectedRowKeys}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                    />
                </div>
                <Modal
                    title={this.state.title}
                    visible={this.state.isVisble}
                    onOk={this.handleSubmit}
                    width={800}
                    onCancel={() => {
                        this.formRef.current.resetFields()
                        this.setState({
                            isVisble: false
                        })
                    }}
                    {...foot}
                >
                    <Form ref={this.formRef} layout="horizontal" initialValues={userInfo}>
                        <FormItem label="姓名" {...formItemLayout} name="userName">
                                <Input type="text" placeholder="请输入姓名" disabled={this.state.type == 'detail' ? true : false}/>
                        </FormItem>
                        <FormItem label="性别" {...formItemLayout} name="sex">
                            <RadioGroup disabled={this.state.type == 'detail' ? true : false}>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label="状态" {...formItemLayout} name="state">
                            <Select disabled={this.state.type == 'detail' ? true : false}>
                                <Option value={1}>咸鱼一条</Option>
                                <Option value={2}>风华浪子</Option>
                                <Option value={3}>北大才子一枚</Option>
                                <Option value={4}>百度FE</Option>
                                <Option value={5}>创业者</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="生日" {...formItemLayout} name="birthday">
                            <DatePicker disabled={this.state.type == 'detail' ? true : false} />
                        </FormItem>
                        <FormItem label="联系地址" {...formItemLayout} name="address">
                            <Input.TextArea disabled={this.state.type == 'detail' ? true : false} rows={3} placeholder="请输入联系地址"/>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}
class UserForm extends React.Component{
    // formRef = React.createRef();
    render() {
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 16}
        };
        return(
            <Form ref={this.props.ref} layout="horizontal">
                <FormItem label="姓名" {...formItemLayout} name="user_name">
                    <Input type="text" placeholder="请输入姓名"/>
                </FormItem>
                <FormItem label="性别" {...formItemLayout} name="sex">
                    <RadioGroup>
                        <Radio value={1}>男</Radio>
                        <Radio value={2}>女</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="状态" {...formItemLayout} name="state">
                    <Select>
                        <Option value={1}>咸鱼一条</Option>
                        <Option value={2}>风华浪子</Option>
                        <Option value={3}>北大才子一枚</Option>
                        <Option value={4}>百度FE</Option>
                        <Option value={5}>创业者</Option>
                    </Select>
                </FormItem>
                <FormItem label="生日" {...formItemLayout} name="birthday">
                    <DatePicker />
                </FormItem>
                <FormItem label="联系地址" {...formItemLayout} name="address">
                    <Input.TextArea rows={3} placeholder="请输入联系地址"/>
                </FormItem>
            </Form>
        )
    }
}