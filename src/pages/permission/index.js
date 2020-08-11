import React from 'react'
import {Card, Button, Modal, Form, Select, Input, Tree, Transfer} from 'antd'
import ETable from "../../components/ETable";
import menuConfig from "../../config/menuConfig"
import BaseForm from "../../components/BaseForm"
import Utils from "../../utils/utils"
import axios from "../../axios"

export default class Perimission extends React.Component {
    formRef = React.createRef();
    state = {
        isRoleVisible: false,
        isPermVisible: false,
        isUserVisible: false
    }
    componentDidMount() {
        axios.requestList(this, {},'/role/list' )
    }
    // 创建角色打开弹窗
    handleRole = () => {
        this.setState({
            isRoleVisible: true
        })
    }
    // 创建角色提交
    handleRoleSubmit = () => {
        let data = this.formRef.current.getFieldsValue()
        axios.Ajax({
            url: 'role/create',
            data: {
                params: data
            }
        }).then((res) => {
            if(res.code == 0) {
                this.setState({
                    isRoleVisible: false
                })
                this.formRef.current.resetFields()
                axios.requestList(this, {},'/role/list' )
            }
        })
    }
    // 打开设置权限弹窗
    handlePermission = () => {
        if(!this.state.selectedItem) {
            Modal.info({
                title: '信息',
                content: '请选择一个角色'
            })
            return
        }
        this.setState({
            isPermVisible: true,
            detailInfo: this.state.selectedItem,
            menuInfo: this.state.selectedItem.menus
        })
    }
    // 权限树递归生成
    renderTreeNodes = (data) => {
        return data.map(item => {
            if(item.children){
                return (
                    <Tree.TreeNode title={item.title} key={item.key}>
                        {this.renderTreeNodes(item.children)}
                    </Tree.TreeNode>
                )
            }else {
                return (
                    <Tree.TreeNode {...item} />
                )
            }
        })
    }
    // 权限树修改状态保存
    check = (checkedKeys) => {
        this.setState({
            menuInfo: checkedKeys
        })
    }
    // 设置权限提交
    handlePermEditSubmit = () => {
        let data = this.formRef.current.getFieldsValue()
        data.role_id = this.state.selectedItem.id
        data.menus = this.state.menuInfo
        axios.Ajax({
            url: '/permission/edit',
            data: {
                params: data
            }
        }).then((res) => {
            if(res){
                this.setState({
                    isPermVisible: false,
                    detailInfo: this.state.selectedItem,
                })
                axios.requestList(this, {},'/role/list' )
            }
        })
    }
    // 打开用户授权弹窗
    handleUserAuth = () => {
        if(!this.state.selectedItem) {
            Modal.info({
                title: '信息',
                content: '未选中任何项目'
            })
            return
        }
        this.getRoleUserList(this.state.selectedItem.id);
        this.setState({
            isUserVisible: true,
            detailInfo: this.state.selectedItem,
        })
    }
    // 根据id获取用户列表
    getRoleUserList = (id) => {
        axios.Ajax({
            url: '/role/user_list',
            data: {
                params: {
                    id
                }
            }
        }).then((res) => {
            if(res) {
                this.getAuthUserList(res.result)
            }
        })
    }
    // 筛选目标用户
    getAuthUserList = (dataSource) => {
        const mockData = []
        const targetData = []
        if(dataSource && dataSource.length > 0) {
            for(let i = 0; i < dataSource.length; i++){
                const data = {
                    key: dataSource[i].user_id,
                    title: dataSource[i].user_name,
                    status: dataSource[i].status
                }
                if(data.status == 1){
                    targetData.push(data.key)
                }
                mockData.push(data)
            }
            this.setState({
                mockData,
                targetData
            })
        }
    }
    // 用户授权提交
    handleUserSubmit = () => {
        const data = {}
        data.user_ids = this.state.targetData
        data.role_id = this.state.selectedItem.id
        debugger
        axios.Ajax({
            url: '/role/user_role_edit',
            data: {
                params: data
            }
        }).then((res) => {
            if(res){
                this.setState({
                    isUserVisible: false
                })
                axios.requestList(this, {},'/role/list' )
            }
        })
    }
    // 穿梭框搜索查询
    filterOption = (inputValue, option) => option.description?.indexOf(inputValue) > -1;
    // 穿梭框切换的回调
    handleChange = (targetKeys) => {
        this.setState({ targetData: targetKeys });
    }
    render() {
        const columns = [
            {
                title: '角色ID',
                dataIndex: 'id'
            }, {
                title: '角色名称',
                dataIndex: 'role_name'
            },{
                title: '创建时间',
                dataIndex: 'create_time',
                render: Utils.formateData
            }, {
                title: '使用状态',
                dataIndex: 'status',
                render(status){
                    if (status == 1) {
                        return "启用"
                    } else {
                        return "停用"
                    }
                }
            }, {
                title: '授权时间',
                dataIndex: 'authorize_time',
                render: Utils.formateData
            }, {
                title: '授权人',
                dataIndex: 'authorize_user_name',
            }
        ]
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 },
        }
        return(
            <div style={{width: '100%'}}>
                <Card>
                    <Button type='primary' style={{marginRight: '10px'}} onClick={this.handleRole}>创建角色</Button>
                    <Button type='primary' style={{marginRight: '10px'}} onClick={this.handlePermission}>设置权限</Button>
                    <Button type='primary' onClick={this.handleUserAuth}>用户授权</Button>
                </Card>
                <ETable
                    updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                    selectedRowKeys={this.state.selectedRowKeys}
                    dataSource={this.state.list}
                    columns={columns}
                />
                {this.state.isRoleVisible &&
                    <Modal
                        title='创建角色'
                        visible={this.state.isRoleVisible}
                        onCancel={() => {
                            this.formRef.current.resetFields();
                            this.setState({
                                isRoleVisible: false
                            })
                        }}
                        onOk={this.handleRoleSubmit}
                    >
                        <Form
                            ref={this.formRef}
                            {...formItemLayout}
                        >
                            <Form.Item label='角色名称' name='role_name'>
                                <Input placeholder='请输入角色名称' />
                            </Form.Item>
                            <Form.Item label='状态' name='status'>
                                <Select style={{ width: 100 }} placeholder='请选择'>
                                    <Select.Option value="0">开启</Select.Option>
                                    <Select.Option value="1">关闭</Select.Option>
                                </Select>
                            </Form.Item>
                        </Form>
                    </Modal>
                }
                {this.state.isPermVisible &&
                    <Modal
                        title='设置授权'
                        visible={this.state.isPermVisible}
                        onCancel={() => {
                            this.formRef.current.resetFields()
                            this.setState({
                                isPermVisible: false
                            })
                        }}
                        onOk={this.handlePermEditSubmit}
                    >
                        <Form
                            ref={this.formRef}
                            {...formItemLayout}
                            initialValues={this.state.detailInfo}
                        >
                            <Form.Item label='角色名称' name='role_name'>
                                <Input placeholder='请输入角色名称' disabled />
                            </Form.Item>
                            <Form.Item label='状态' name='status'>
                                <Select style={{ width: 100 }} placeholder='请选择'>
                                    <Select.Option value={1}>开启</Select.Option>
                                    <Select.Option value={0}>关闭</Select.Option>
                                </Select>
                            </Form.Item>
                            <Tree
                                checkable
                                defaultExpandAll
                                checkedKeys={this.state.menuInfo}
                                onCheck={(checkedKeys) => this.check(checkedKeys)}
                            >
                                <Tree.TreeNode>
                                    {this.renderTreeNodes(menuConfig)}
                                </Tree.TreeNode>
                            </Tree>
                        </Form>
                    </Modal>
                }
                {this.state.isUserVisible &&
                    <Modal
                        width={760}
                        title='用户授权'
                        visible={this.state.isUserVisible}
                        onCancel={() => {
                            this.setState({
                                isUserVisible: false
                            })
                        }}
                        onOk={this.handleUserSubmit}
                    >
                        <Form
                            ref={this.formRef}
                            {...formItemLayout}
                            initialValues={this.state.detailInfo}
                        >
                            <Form.Item label='角色名称' name='role_name'>
                                <Input placeholder='请输入角色名称' disabled />
                            </Form.Item>
                            <Form.Item label='用户选择' name='role_name'>
                                <Transfer
                                    listStyle={{width: 210, height: 400}}
                                    dataSource={this.state.mockData}
                                    targetKeys={this.state.targetData}
                                    title={['待选用户', '已选用户']}
                                    showSearch
                                    searchPlaceholdr='请输入用户名'
                                    render={item => item.title}
                                    filterOption={this.filterOption}
                                    onChange={this.handleChange}
                                />
                            </Form.Item>
                        </Form>
                    </Modal>
                }
            </div>
        )
    }
}