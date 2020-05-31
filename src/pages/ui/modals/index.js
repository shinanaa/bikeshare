import React from 'react'
import { Card, Button, Modal } from 'antd'
import {PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, DownloadOutlined, LeftOutlined, RightOutlined} from '@ant-design/icons'
import '../ui.less'

export default class Buttons extends React.Component{
    state = {
        showModal1: false,
        showModal2: false,
        showModal3: false,
        showModal4: false
    }
    handleOpen = (type) => {
        this.setState({
            [type]: true
        })
    }
    handleConfirm = (type) => {
        Modal[type]({
            title: '确认？',
            content: '你确定什么吗？',
            onOk() {
                console.log('ok')
            },
            onCancel() {
                console.log('cancel')
            }
        })
    }
    render(){
        return (
            <div style={{width: "100%"}}>
                <Card title="基础模态窗" className="card-wrap">
                    <Button type="primary" onClick={() => this.handleOpen('showModal1')}>open</Button>
                    <Button type="primary" onClick={() => this.handleOpen('showModal2')}>自定义页脚</Button>
                    <Button type="primary" onClick={() => this.handleOpen('showModal3')}>顶部20px弹窗</Button>
                    <Button type="primary" onClick={() => this.handleOpen('showModal4')}>水平垂直居中</Button>
                </Card>
                <Card title="信息确认框" className="card-wrap">
                    <Button type="primary" onClick={() => this.handleConfirm('confirm')}>Confirm</Button>
                    <Button type="primary" onClick={() => this.handleConfirm('info')}>info</Button>
                    <Button type="primary" onClick={() => this.handleConfirm('success')}>success</Button>
                    <Button type="primary" onClick={() => this.handleConfirm('warning')}>warning</Button>
                </Card>
                <Modal
                    title='React'
                    visible={this.state.showModal1}
                    onCancel={() => {
                        this.setState({
                            showModal1: false
                        })
                    }}
                >
                    <p>发v觉得你富士康的奶粉丹诺夫斯克</p>
                </Modal>
                <Modal
                    title='React'
                    visible={this.state.showModal2}
                    okText="好的"
                    cancelText='算了'
                    onCancel={() => {
                        this.setState({
                            showModal2: false
                        })
                    }}
                >
                    <p>发v觉得你富士康的奶粉丹诺夫斯克</p>
                </Modal>
                <Modal
                    title='React'
                    style={{top: 20}}
                    visible={this.state.showModal3}
                    onCancel={() => {
                        this.setState({
                            showModal3: false
                        })
                    }}
                >
                    <p>发v觉得你富士康的奶粉丹诺夫斯克</p>
                </Modal>
                <Modal
                    title='React'
                    wrapClassName="vertical-center-modal"
                    visible={this.state.showModal4}
                    onCancel={() => {
                        this.setState({
                            showModal4: false
                        })
                    }}
                >
                    <p>发v觉得你富士康的奶粉丹诺夫斯克</p>
                </Modal>
            </div>
        )
    }
}