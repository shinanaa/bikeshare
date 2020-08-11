import React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import App from './App'
// import Login from './pages/login'
import Button from './pages/ui/button'
import Modals from './pages/ui/modals'
import Loading from './pages/ui/loading'
import Notice from './pages/ui/notice'
import Messages from './pages/ui/messages'
import Tabs from './pages/ui/tabs'
import Gallery from './pages/ui/gallery'
import Carousel from './pages/ui/carousel'
import Login from './pages/form/login'
import Home from './pages/home'
import Register from './pages/form/register'
import BasicTable from './pages/table/basicTable'
import HeightTable from './pages/table/heightTable'
import City from './pages/city'
import Order from './pages/order'
import User from './pages/user'
import Admin from './admin'
import BikeMap from './pages/map/bikeMap'
import Bar from './pages/echarts/bar'
import Pie from './pages/echarts/pie'
import Line from './pages/echarts/line'
import Rich from './pages/rich'
import Perimission from "./pages/permission";
import NoMatch from './pages/nomatch'

import Common from './common'
import OrderDetails from './pages/order/details'

export default class IRouter extends React.Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/common" render={() =>
                        <Common>
                            <Route path="/common/order/detail/:orderId" component={OrderDetails}></Route>
                        </Common>
                    } />
                    <Route path="/" render={() =>
                        <Admin>
                            <Switch>
                                <Route path="/home" component={Home}></Route>
                                <Route path="/ui/buttons" component={Button}></Route>
                                <Route path="/ui/modals" component={Modals}></Route>
                                <Route path="/ui/loadings" component={Loading}></Route>
                                <Route path="/ui/notification" component={Notice}></Route>
                                <Route path="/ui/messages" component={Messages}></Route>
                                <Route path="/ui/tabs" component={Tabs}></Route>
                                <Route path="/ui/gallery" component={Gallery}></Route>
                                <Route path="/ui/carousel" component={Carousel}></Route>
                                <Route path="/form/login" component={Login}></Route>
                                <Route path="/form/register" component={Register}></Route>
                                <Route path="/table/basic" component={BasicTable}></Route>
                                <Route path="/table/high" component={HeightTable}></Route>
                                <Route path="/city" component={City}></Route>
                                <Route path="/order" component={Order}></Route>
                                <Route path="/user" component={User}></Route>
                                <Route path="/bikeMap" component={BikeMap}></Route>
                                <Route path="/charts/bar" component={Bar}></Route>
                                <Route path="/charts/pie" component={Pie}></Route>
                                <Route path="/charts/line" component={Line}></Route>
                                <Route path="/rich" component={Rich}></Route>
                                <Route path="/permission" component={Perimission}></Route>
                                <Redirect to="/home" />
                                <Route component={NoMatch}></Route>
                            </Switch>
                        </Admin>
                    } />
                </App>
            </HashRouter>
        )
    }
}