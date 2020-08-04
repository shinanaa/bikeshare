import React from 'react'
import {Card, Button, Modal} from 'antd'
import ETable from "../../components/ETable";
import BaseForm from "../../components/BaseForm"
import Utils from "../../utils/utils"
import axios from "../../axios"

export default class Perimission extends React.Component {
    state = {
        isRoleVisible: false,
    }
    componentDidMount() {
        axios.requestList(this, {},'/role/list' )
    }
    handleRole = () => {
        this.setState({
            isRoleVisible: true
        })
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
        const formList = [
            {
                type: 'INPUT',
                label: '角色名称',
                filed: 'role_name',
                placeholdr: '请输入角色名称',
                width: '100%',
            },
            {
                type: 'SELECT',
                label: '状态',
                filed: 'state',
                placeholdr: '全部',
                initialValue: '0',
                width: '100%',
                list: [
                    {id: '0', key: '0', name: '开启'},
                    {id: '1', key: '1', name: '关闭'}
                ]
            }
        ]
        return(
            <div style={{width: '100%'}}>
                <Card>
                    <Button type='primary' style={{marginRight: '10px'}} onClick={this.handleRole}>创建角色</Button>
                    <Button type='primary' style={{marginRight: '10px'}}>设置权限</Button>
                    <Button type='primary'>用户授权</Button>
                </Card>
                <ETable
                    updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                    selectedRowKeys={this.state.selectedRowKeys}
                    dataSource={this.state.list}
                    columns={columns}
                />
                <Modal
                    title='创建角色'
                    visible={this.state.isRoleVisible}
                >
                    <BaseForm
                        formList={formList}
                        noFoot={true}
                        layout='horizontal'
                    />
                </Modal>
            </div>
        )
    }
}