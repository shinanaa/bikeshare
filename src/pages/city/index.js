import React from 'react'
import { Card, Table, Form, Button, Select, Modal, message } from 'antd'
import axios from '../../axios'
import Utils from '../../utils/utils'
import BaseForm from '../../components/BaseForm'
const { Option } = Select;
export default class City extends React.Component {
  formRef = React.createRef();
  state = {
    list: [],
    isShowOpenCity: false
  }
  params = {
    page: 1
  }
  formList = [
    {
      type: 'SELECT',
      label: '城市',
      field:'city_id',
      placeholder:'全部',
      initialValue:'1',
      width:80,
      list: [{ id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '天津' }]
    },
    {
      type: 'SELECT',
      label: '用车模式',
      field:'mode',
      placeholder:'全部',
      initialValue:'1',
      width:80,
      list: [{ id: '0', name: '全部' }, { id: '1', name: '指定停车点模式' }, { id: '2', name: '禁停区模式' }]
    },
    {
      type: 'SELECT',
      label: '营运模式',
      field:'op_mode',
      placeholder:'全部',
      initialValue:'1',
      width:80,
      list: [{ id: '0', name: '全部' }, { id: '1', name: '自营' }, { id: '2', name: '加盟' }]
    },
    {
      type: 'SELECT',
      label: '加盟商授权状态',
      field:'auth_status',
      placeholder:'全部',
      initialValue:'1',
      width:80,
      list: [{ id: '0', name: '全部' }, { id: '1', name: '已授权' }, { id: '2', name: '未授权' }]
    }
  ]
  componentDidMount() {
    this.requestList()
  }
  handleOpenCity = () => {
    this.setState({
      isShowOpenCity: true
    })
  }
  handleSubmit = () => {
    let cityInfo = this.formRef.current.getFieldsValue()
    axios.Ajax({
      url: '/city/open',
      data: {
        params: cityInfo
      }
    }).then((res) => {
      if (res.code == '0') {
        message.success('开通成功')
        this.setState({
          isShowOpenCity: false
        })
        this.requestList()
      }
    })
  }
  requestList = () => {
    axios.requestList(this, this.params, '/open_city')
  }
  handleFilter = (params)=>{
    console.log(params)
    this.params = params;
    this.requestList();
  }
  render() {
    const columns = [
      {
        title: '城市ID',
        dataIndex: 'id'
      },
      {
        title: '城市名称',
        dataIndex: 'name'
      },
      {
        title: '用车模式',
        dataIndex: 'mode',
        render(mode) {
          return mode == 1 ? '停车点' : '禁停区';
        }
      },
      {
        title: '营运模式',
        dataIndex: 'op_mode',
        render(op_mode) {
          return op_mode == 1 ? '自营' : '加盟';
        }
      },
      {
        title: '授权加盟商',
        dataIndex: 'franchisee_name'
      },
      {
        title: '城市管理员',
        dataIndex: 'city_admins',
        render(arr) {
          return arr.map((item) => {
            return item.user_name;
          }).join(',');
        }
      },
      {
        title: '城市开通时间',
        dataIndex: 'open_time'
      },
      {
        title: '操作时间',
        dataIndex: 'update_time',
        render: Utils.formateData
      },
      {
        title: '操作人',
        dataIndex: 'sys_user_name'
      }
    ]
    return (
      <div style={{ width: '100%' }}>
        <Card>
          <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
        </Card>
        <Card style={{ marginTop: '10px' }}>
          <Button type="primary" onClick={this.handleOpenCity}>开通城市</Button>
        </Card>
        <div className="content-wrap">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
          />
        </div>
        <Modal
          title="开通城市"
          visible={this.state.isShowOpenCity}
          onCancel={() => {
            this.setState({
              isShowOpenCity: false
            })
          }}
          onOk={this.handleSubmit}
        >
          <Form layout="horizontal" ref={this.formRef}>
            <Form.Item
              name="city_id"
              label="选择城市"
            >
              <Select style={{ width: 100 }}>
                <Option value="">全部</Option>
                <Option value="1">北京市</Option>
                <Option value="2">天津市</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="op_mode"
              label="营运模式"
            >
              <Select style={{ width: 100 }}>
                <Option value="1">自营</Option>
                <Option value="2">加盟</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="use_mode"
              label="用车模式"
            >
              <Select style={{ width: 100 }}>
                <Option value="1">指定停车点</Option>
                <Option value="2">禁停区</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}