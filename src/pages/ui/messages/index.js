import React from 'react'
import { Card, Button, message } from 'antd'
import '../ui.less'

export default class Messages extends React.Component{
    showMessage = (type) => {
        message[type]('hahahah')
    }
    render(){
        return(
            <div style={{width: "100%"}}>
                <Card title="全局提示框" className="card-wrap">
                    <Button type="primary" onClick={() => this.showMessage('success')}>success</Button>
                    <Button type="primary" onClick={() => this.showMessage('info')}>info</Button>
                    <Button type="primary" onClick={() => this.showMessage('warning')}>warning</Button>
                    <Button type="primary" onClick={() => this.showMessage('error')}>error</Button>
                    <Button type="primary" onClick={() => this.showMessage('loading')}>loading</Button>
                </Card>
            </div>
        )
    }
}