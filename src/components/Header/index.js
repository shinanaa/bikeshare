import React from 'react'
import { Row, Col } from 'antd'
import Util from '../../utils/utils'
import Axios from '../../axios'
import "./index.less"

export default class Header extends React.Component{
    componentWillMount() {
        this.setState({
            userName: 'lalal'
        })
        setInterval(() => {
            let sysTime = Util.formateData(new Date().getTime())
            this.setState({
                sysTime
            })
        }, 1000);
    }
    getWeatherAPIData() {
        let city = '北京'
        Axios.jsonp({
            url: `http://api.map.baidu.com/telematics/v3/weather?location=${encodeURIComponent(city)}&output=json&ak=NGjm6UCDtLYuOXOmizKUtu87fahSgd5h`
        }).then((res) => {
            if (res.status === 'success') {
                let data = res.result[0].weather_data[0]
            }
        })
    }
    render() {
        const menuType = this.props.menuType
        return(
            <div className="header">
                <Row className="header-top">
                    {
                        menuType ?
                            <Col span="6" className="logo">
                                <img className="logo" src="/assets/logo-ant.svg" />
                                <span>bike MS通用管理系统</span>
                            </Col> : ''
                    }
                    <Col span={menuType ? 18 : 24}>
                        <span>hello,{this.state.userName}</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>
                {menuType ? '' :
                <Row className="breadcrumb">
                    <Col span="4" className="breadcrumb-title">
                        首页
                    </Col>
                    <Col span="20" className="weather">
                        <span className="date">{this.state.sysTime}</span>
                        <span className="weather-detail">晴天</span>
                    </Col>
                </Row>
            }
            </div>
        )
    }
}