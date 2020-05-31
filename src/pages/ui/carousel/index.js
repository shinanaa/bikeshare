import React from 'react'
import { Card, Carousel} from 'antd'
import '../ui.less'

export default class CarouselCom extends React.Component{
    render() {
        return(
            <div style={{width: '100%'}}>
                <Card title="文字背景轮播" className="card-wrap">
                    <Carousel autoplay effect="fade">
                        <div><h3>React</h3></div>
                        <div><h3>Vue</h3></div>
                        <div><h3>Angular</h3></div>
                    </Carousel>
                </Card>
                <Card title="图片背景轮播" className="slide-wrap">
                    <Carousel autoplay effect="fade">
                        <div><img src="/carousel-img/carousel-1.jpg" /></div>
                        <div><img src="/carousel-img/carousel-2.jpg" /></div>
                        <div><img src="/carousel-img/carousel-3.jpg" /></div>
                    </Carousel>
                </Card>
            </div>
        )
    }
}