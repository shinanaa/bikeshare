import React from 'react'
import {Card, Form, Input, Button, Modal, Radio, Select, DatePicker} from 'antd'
import BaseForm from '../../components/BaseForm'
import axios from '../../axios'

export default class City extends React.Component {
    state={}
    map = ''
    formList = [
        {
            type: '城市'
        },
        {
            type: '时间查询',
            label: '订单时间',
        },
        {
            type: 'SELECT',
            label: '订单状态',
            filed: 'order_status',
            placeholdr: '全部',
            initialValue: '0',
            width: '100px',
            list: [
                {id: '0', name: '全部'},
                {id: '1', name: '进行中'},
                {id: '2', name: '行程结束'}
            ]
        }
    ]
    // 获取数据
    requstList = () => {
        axios.Ajax({
            url: '/map/bike_list',
            data: {
                params: this.params
            }
        }).then((res) => {
            if(res.code == 0) {
                this.setState({
                    total_count: res.result.total_count
                })
                this.renderMap(res.result)
            }
        })
    }
    // 条件查询
    handleFilterSubmit = (filterParams) => {
        this.params = filterParams
        this.requestList();
    }
    // 渲染地图数据
    renderMap = (res) => {
        let list = res.route_list
        this.map = new window.BMapGL.Map("contaner", {enableMapClick: false})
        let gps1 = list[0].split(',')
        let startPoint = new window.BMapGL.Point(gps1[0], gps1[1])
        let gps2 = list[list.length - 1].split(',')
        let endPoint = new window.BMapGL.Point(gps2[0], gps2[1])
        this.map.centerAndZoom(endPoint, 11)

        // 添加起始点图标
        let startPointIcon = new window.BMapGL.Icon("/assets/start_point.png", new window.BMapGL.Size(36, 42), {
            imgSize: new window.BMapGL.Size(36, 42),
            anchor: new window.BMapGL.Size(18, 42)
        })

        var bikeMarkerStart = new window.BMapGL.Marker(startPoint, {icon: startPointIcon})

        this.map.addOverlay(bikeMarkerStart)

        // 添加终点图标
        let endPointIcon = new window.BMapGL.Icon("/assets/end_point.png", new window.BMapGL.Size(36, 42), {
            imgSize: new window.BMapGL.Size(36, 42),
            anchor: new window.BMapGL.Size(18, 42)
        })

        var bikeMarkerEnd = new window.BMapGL.Marker(endPoint, {icon: endPointIcon})

        this.map.addOverlay(bikeMarkerEnd)

        // 行驶路线
        let routeList = []
        list.forEach((item) => {
            let p = item.split(',')
            let point = new window.BMapGL.Point(p[0], p[1])
            routeList.push(point)
        })

        var polyLine = new window.BMapGL.Polyline(routeList, {
            strokeColor: '#ef4136',
            strokeWeight: 3,
            strokeOpacity: 1
        })
        this.map.addOverlay(polyLine)

         // 服务区路线
         let serviceList = res.service_list
         let servicePointist = []
         serviceList.forEach((item) => {
             let point = new window.BMapGL.Point(item.lon, item.lat)
             servicePointist.push(point)
         })

         var polyServiceLine = new window.BMapGL.Polyline(servicePointist, {
            strokeColor: '#ef4136',
            strokeWeight: 3,
            strokeOpacity: 1
         })
         this.map.addOverlay(polyServiceLine)

         // 自行车
         let bikeList = res.bike_list
         let bikeIcon = new window.BMapGL.Icon("/assets/bike.jpg", new window.BMapGL.Size(36, 42), {
            imgSize: new window.BMapGL.Size(36, 42),
            anchor: new window.BMapGL.Size(18, 42)
         })
         bikeList.forEach((item) => {
             let p = item.split(',')
             let point = new window.BMapGL.Point(p[0], p[1])
             var bikeMarker = new window.BMapGL.Marker(point, {icon: bikeIcon})
             this.map.addOverlay(bikeMarker)
         })

         // 添加地图控件
        this.addMapControl();
    }
    addMapControl = () => {
        let map = this.map
        // 左上角 添加比例尺
        var top_right_control = new window.BMapGL.ScaleControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT})
        var top_right_navigation = new window.BMapGL.NavigationControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT})
        // 添加控件和比例尺
        map.addControl(top_right_control)
        map.addControl(top_right_navigation)
        map.enableScrollWheelZoom(true)
    }
    componentDidMount(){
        this.requstList()
    }
    render(){
        return(
            <div style={{width: '100%'}}>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit} />
                </Card>
                <Card style={{marginTop: '10px'}}>
                    <div>共{this.state.total_count}辆车</div>
                    <div id="contaner" style={{height: '500px'}}></div>
                </Card>    
            </div>
        )
    }
}