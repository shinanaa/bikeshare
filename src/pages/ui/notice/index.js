import React from 'react'
import { Card, Button, notification } from 'antd'
import {LoadingOutlined} from '@ant-design/icons'
import '../ui.less'

export default class Notice extends React.Component{
    openNotification = (type, direction) =>{
        if (direction) {
            notification.config({
                placement: direction
            })
        }
        notification[type]({
            message: '发工资了',
            description: '关于上月工资具体核算的相关数据'
        })
    }
    render() {
        return (
            <div style={{width: "100%"}}>
                <Card title='通知提醒框' className="card-wrap">
                    <Button type="primary" onClick={() => this.openNotification('success')}>success</Button>
                    <Button type="primary" onClick={() => this.openNotification('info')}>info</Button>
                    <Button type="primary" onClick={() => this.openNotification('warning')}>warning</Button>
                    <Button type="primary" onClick={() => this.openNotification('error')}>error</Button>
                </Card>
                <Card title='通知提醒框位置设置' className="card-wrap">
                    <Button type="primary" onClick={() => this.openNotification('success', 'topLeft')}>success</Button>
                    <Button type="primary" onClick={() => this.openNotification('info', 'topRight')}>info</Button>
                    <Button type="primary" onClick={() => this.openNotification('warning', 'bottomLeft')}>warning</Button>
                    <Button type="primary" onClick={() => this.openNotification('error', 'bottomRight')}>error</Button>
                </Card>
            </div>
        )
    }
}