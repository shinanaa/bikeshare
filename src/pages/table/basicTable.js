import React from 'react'
import { Card, Table, Modal, Button, message } from 'antd'
import axios from '../../axios'
import Utils from '../../utils/utils'
export default class BasicTable extends React.Component {
  state = {
    dataSource2: [],
    selectedRows: {},
    selectedRowKeys: []
  }
  params = {
    page: 1
  }
  componentDidMount() {
    const dataSource = [
      {
        id: "0",
        userName: "陈倩倩",
        sex: "1",
        state: "1",
        interest: "1",
        birthday: "2020-02-02",
        address: "黑龙江省哈尔滨市",
        time: "09:00"
      },
      {
        id: "1",
        userName: "陈芊芊",
        sex: "1",
        state: "1",
        interest: "1",
        birthday: "2020-02-02",
        address: "黑龙江省哈尔滨市",
        time: "09:00"
      },
      {
        id: "2",
        userName: "陈浅浅",
        sex: "1",
        state: "1",
        interest: "1",
        birthday: "2020-02-02",
        address: "黑龙江省哈尔滨市",
        time: "09:00"
      }
    ]
    dataSource.map((item, index) => {
      item.key = index
    })
    this.setState({
      dataSource
    })
    this.request()
  }
  request = async () => {
    const res = await axios.Ajax({
      url: '/table/list',
      data: {
        params: {
          page: this.params.page
        }
      }
    })
    const _this = this
    if (res.code == 0) {
      res.result.list.map((item, index) => {
        item.key = index
      })
      this.setState({
        dataSource2: res.result.list,
        selectedRowKeys: [],
        selectedRows: null,
        pagination: Utils.pagination(res, (current) => {
          _this.params.page = current
          _this.request()
        })
      })
    }
    console.info(333)
  }
  onRowClick = (record, index) => {
    let selectKey = [index]
    Modal.info({
      title: '信息',
      content: `用户名：${record.userName}`
    })
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record
    })
  }
  handleDelete = () => {
    let rows = this.state.selectedRows
    let ids = []
    rows.map((item) => {
      ids.push(item.id)
    })
    Modal.info({
      title: "删除提示",
      content: `确定要删除${ids.join(',')}吗？`,
      onOk: () => {
        message.success('删除成功')
        this.request()
      }
    })
  }
  render() {
    const colums = [
      {
        title: "用户id",
        dataIndex: "id"
      },
      {
        title: "用户名",
        dataIndex: "userName"
      },
      {
        title: "性别",
        dataIndex: "sex",
        render: (sex) => {
          return sex == 1 ? '男' : '女'
        }
      },
      {
        title: "状态",
        dataIndex: "state",
        render: (state) => {
          let config = {
            "1": "状态1",
            "2": "状态2",
            "3": "状态3",
            "4": "状态4",
            "5": "状态5"
          }
          return config[state]
        }
      },
      {
        title: "爱好",
        dataIndex: "interest",
        render: (interest) => {
          let config = {
            "1": "游泳",
            "2": "打篮球",
            "3": "足球",
            "4": "跑步",
            "5": "爬山",
            "6": "骑行",
            "7": "桌球",
            "8": "麦霸"
          }
          return config[interest]
        }
      },
      {
        title: "生日",
        dataIndex: "birthday"
      },
      {
        title: "地址",
        dataIndex: "address"
      },
      {
        title: "早起时间",
        dataIndex: "time"
      }
    ]
    const selectedRowKeys = this.state.selectedRowKeys
    const rowSelection = {
      type: 'radio',
      selectedRowKeys
    }
    const rowSelectionCheckBox = {
      type: 'checkbox',
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys,
          selectedRows
        })
      }
    }
    return (
      <div style={{ width: '100%' }}>
        <Card title="基础表格">
          <Table bordered dataSource={this.state.dataSource} columns={colums} />
        </Card>
        <Card title="动态渲染表格" style={{ margin: "10px 0" }}>
          <Table dataSource={this.state.dataSource2} columns={colums} />
        </Card>
        <Card title="单选表格" style={{ margin: "10px 0" }}>
          <Table
            rowSelection={rowSelection}
            onRow={
              (record, index) => {
                return {
                  onClick: () => {
                    this.onRowClick(record, index)
                  }
                }
              }
            }
            dataSource={this.state.dataSource2}
            columns={colums} />
        </Card>
        <Card title="多选表格" style={{ margin: "10px 0" }}>
          <div style={{ marginBottom: "10px" }}>
            <Button type="primary" onClick={this.handleDelete}>删除</Button>
          </div>
          <Table
            rowSelection={rowSelectionCheckBox}
            dataSource={this.state.dataSource2}
            columns={colums}
            pagination={false}
          />
        </Card>
        <Card title="分页表格" style={{ margin: "10px 0" }}>
          <Table
            dataSource={this.state.dataSource2}
            columns={colums}
            pagination={this.state.pagination}
          />
        </Card>
      </div>
    )
  }
}