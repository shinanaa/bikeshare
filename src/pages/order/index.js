import React from 'react'
import { Card, Table, Form, Button, Select, Modal, message, DatePicker } from 'antd'
import axios from '../../axios'
import Utils from '../../utils/utils'
import ETable from '../../components/ETable'
import BaseForm from '../../components/BaseForm'
const { Option } = Select;
export default class Order extends React.Component {
    state = {
      orderInfo: {}
    }
    formList = [
      {
          type:'SELECT',
          label:'城市',
          field:'city',
          placeholder:'全部',
          initialValue:'1',
          width:80,
          list: [{ id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '天津' }, { id: '3', name: '上海' }]
      },
      {
          type: '时间查询',
          label: '时间查询'
      },
      {
          type: 'SELECT',
          label: '订单状态',
          field:'order_status',
          placeholder: '全部',
          initialValue: '1',
          width: 80,
          list: [{ id: '0', name: '全部' }, { id: '1', name: '进行中' }, { id: '2', name: '结束行程' }]
      }
  ]
    componentDidMount() {
        this.requestList()
    }
    requestList = () => {
      axios.requestList(this, this.params, 'order/list')
    }
    handleFilter = (params)=>{
      this.params = params;
      this.requestList();
    }
    openOrderDetail = () => {
      let item = this.state.selectedItem
      if(!item) {
        Modal.info({
          title: '信息',
          content: '请先选择一条订单'
        })
        return
      }
      window.open(`/#/common/order/detail/${item.id}`, '_blank')
    }
    handleConfirm = () => {
      let item = this.state.selectedItem
      if(!item) {
        Modal.info({
          title: '信息',
          content: '请选择一条订单进行结束'
        })
        return
      }
      axios.Ajax({
        url: '/order/ebike_info',
        data: {
          params: {
            orderId: item.id
          }
        }
      }).then((res) => {
        if(res.code == 0){
          this.setState({
            orderInfo: res.result,
            orderConfirmVisble: true
          })
        }
      })
    }
    handleFinishOrder = () => {
      let item = this.state.selectedItem
      axios.Ajax({
        url: '/order/finish_order',
        data: {
          params: {
            orderId: item.id
          }
        }
      }).then((res) => {
        if(res.code == 0){
          message.success('订单结束成功')
          this.setState({
            orderConfirmVisble: false
          })
          this.requestList()
        }
      })
    }
    render(){
        const columns = [
            {
              title: '订单编号',
              dataIndex: 'order_sn'
            },
            {
              title: '车辆编号',
              dataIndex: 'bike_sn'
            },
            {
                title: '用户名',
                dataIndex: 'user_name'
            },
            {
                title: '手机号',
                dataIndex: 'mobile'
            },
            {
                title: '里程',
                dataIndex: 'distance',
                render(distance){
                    return distance/1000 + 'Km';
                }
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time'
            },
            {
                title: '状态',
                dataIndex: 'status'
            },
            {
                title: '开始时间',
                dataIndex: 'start_time'
            },
            {
                title: '结束时间',
                dataIndex: 'end_time'
            },
            {
                title: '订单金额',
                dataIndex: 'total_fee'
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay'
            }
          ]
        const formItemLayout = {
            labelCol:{span:5},
            wrapperCol:{span:19}
        }
          const selectedRowKeys = this.state.selectedRowKeys;
          const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }
        return(
            <div style={{width: '100%'}}>
                <Card>
                    {/* <FilterForm /> */}
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter}/>
                </Card>
                <Card style={{marginTop:10}}>
                    <Button type="primary" onClick={this.openOrderDetail}>订单详情</Button>
                    <Button type="primary" style={{marginLeft:10}} onClick={this.handleConfirm}>结束订单</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                      updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                      columns={columns}
                      dataSource={this.state.list}
                      pagination={this.state.pagination}
                      selectedRowKeys={this.state.selectedRowKeys}
                      selectedItem={this.state.selectedItem}
                      selectedIds={this.state.selectedIds}
                      rowSelection="checkbox"
                    />
                    {/* <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index);
                                }
                            };
                        }}
                    /> */}
                </div>
                <Modal
                  title='结束订单'
                  visible={this.state.orderConfirmVisble}
                  onCancel={() => {
                    this.setState({
                      orderConfirmVisble: false
                    })
                  }}
                  onOk={this.handleFinishOrder}
                >
                    <Form layout="horizontal" {...formItemLayout}>
                        <Form.Item label="车辆编号">
                            {this.state.orderInfo.bike_sn}
                        </Form.Item>
                        <Form.Item label="剩余电量">
                            {this.state.orderInfo.battery + '%'}
                        </Form.Item>
                        <Form.Item label="行程开始时间">
                            {this.state.orderInfo.start_time}
                        </Form.Item>
                        <Form.Item label="当前位置">
                            {this.state.orderInfo.location}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}