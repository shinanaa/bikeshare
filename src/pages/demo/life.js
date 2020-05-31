import React from 'react'
import Child from './child'
import { Button } from 'antd'
import 'antd/dist/antd.css'

export default class Life extends React.Component{
    constructor(props) {
        super(props);
        this.state = {count: 0};
    }
    handleAdd = () => {
        this.setState({
            count: this.state.count + 1
        })
    }
    render() {
        return (
            <div>
                <p>生命周期</p>
                <Button onClick={this.handleAdd}>点击一下</Button>
                <p>{this.state.count}</p>
                <Child name={this.state.count}></Child>
            </div>
        )
    }
}