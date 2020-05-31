import React from 'react'

export default class Child extends React.Component{
    constructor(props) {
        super(props);
        this.state = {count: 0};
    }
    componentWillMount() {
        console.log('1')
    }
    componentDidMount() {
        console.log('2')
    }
    componentWillReceiveProps(newProps) {
        console.log(newProps.name)
    }
    shouldComponentUpdate() {
        console.log('3')
        return true
    }
    componentWillUpdate() {
        console.log('4')
    }
    componentDidUpdate() {
        console.log('5')
    }
    render() {
        return (
            <div>
                <p>子组件</p>
                <p>{this.props.name}</p>
            </div>
        )
    }
}