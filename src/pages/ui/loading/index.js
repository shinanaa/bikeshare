import React from 'react'
import { Card, Button, Spin, Alert } from 'antd'
import {LoadingOutlined} from '@ant-design/icons'
import '../ui.less'

export default class Loadings extends React.Component{
    render() {
        const icon = <LoadingOutlined />
        return(
            <div style={{width: "100%"}}>
                <Card title="Spin的用法" className="card-wrap">
                    <Spin size='small' />
                    <Spin style={{margin: "0 15px"}} />
                    <Spin size='large' />
                    <Spin style={{marginLeft: 15}} indicator={icon}/>
                </Card>
                <Card title="内容遮罩" className="card-wrap">
                    <Alert
                        message="React"
                        description="这里是相关的介绍信息"
                        type="info"
                    />
                    <Spin>
                        <Alert
                            message="React"
                            description="这里是相关的介绍信息"
                            type="warning"
                        />
                    </Spin>
                    <Spin
                        tip="加载中..."
                    >
                        <Alert
                            message="React"
                            description="这里是相关的介绍信息"
                            type="warning"
                        />
                    </Spin>
                    <Spin
                        indicator={icon}
                    >
                        <Alert
                            message="React"
                            description="这里是相关的介绍信息"
                            type="warning"
                        />
                    </Spin>
                </Card>
            </div>
        )
    }
}