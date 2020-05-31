import React from 'react'
import { Card, Table, Badge, Button, message, Modal } from 'antd'
import axios from '../../axios'
import Utils from '../../utils/utils'
export default class HeightTable extends React.Component {
  state = {
    dataSource: []
  }
  params = {
    page: 1
  }
  componentDidMount() {
    this.request()
  }
  request = () => {
    let _this = this;
    axios.Ajax({
      url: '/table/high/list',
      data: {
        params: {
          page: this.params.page
        }
      }
    }).then((res) => {
      if (res.code == 0) {
        res.result.list.map((item, index) => {
          item.key = index;
        })
        this.setState({
          dataSource: res.result.list,
          pagination: Utils.pagination(res, (current) => {
            _this.params.page = current
            _this.request()
          })
        })
      }
    })
  }
  handleDelete = (item) => {
    let id = item.id
    Modal.confirm({
      text: '确认',
      content: '确认删除此条数据吗？',
      onOk: () => {
        message.success('删除成功')
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
        dataIndex: "username"
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
    const colums2 = [
      {
        title: "用户id",
        dataIndex: "id",
        width: 80,
        fixed: 'left'
      },
      {
        title: "用户名",
        dataIndex: "username",
        width: 80,
        fixed: 'left'
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
        width: 120,
        dataIndex: "birthday"
      },
      {
        title: "生日",
        width: 120,
        dataIndex: "birthday"
      },
      {
        title: "生日",
        width: 120,
        dataIndex: "birthday"
      },
      {
        title: "生日",
        width: 120,
        dataIndex: "birthday"
      },
      {
        title: "生日",
        width: 120,
        dataIndex: "birthday"
      },
      {
        title: "生日",
        width: 120,
        dataIndex: "birthday"
      },
      {
        title: "地址",
        dataIndex: "address"
      },
      {
        title: "地址",
        dataIndex: "address"
      },
      {
        title: "地址",
        dataIndex: "address"
      },
      {
        title: "早起时间",
        dataIndex: "time",
        width: 100,
        fixed: 'right'
      }
    ]
    const colums3 = [
      {
        title: "用户id",
        dataIndex: "id"
      },
      {
        title: "用户名",
        dataIndex: "username"
      },
      {
        title: "年龄",
        dataIndex: "age",
        sorter: (a, b) => a.age - b.age
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
    const colums4 = [
      {
        title: "用户id",
        dataIndex: "id"
      },
      {
        title: "用户名",
        dataIndex: "username"
      },
      {
        title: "年龄",
        dataIndex: "age"
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
            "1": <Badge status="success" text="游泳" />,
            "2": <Badge status="error" text="打篮球" />,
            "3": <Badge status="default" text="足球" />,
            "4": <Badge status="processing" text="跑步" />,
            "5": <Badge status="warning" text="爬山" />,
            "6": <Badge status="success" text="骑行" />,
            "7": <Badge status="error" text="桌球" />,
            "8": <Badge status="warning" text="麦霸" />
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
      },
      {
        title: "操作",
        dataIndex: "operation",
        render: (text, record) => {
          return <a href="javascript: void(0)" onClick={(record) => { this.handleDelete(record) }}>删除</a>
        }
      }
    ]
    return (
      <div style={{ width: '100%' }}>
        <Card title="固定表头">
          <Table
            bordered
            dataSource={this.state.dataSource}
            columns={colums}
            scroll={{ y: 240 }}
            pagination={this.state.pagination} />
        </Card>
        <Card title="固定列头" style={{ margin: "10px 0" }}>
          <Table
            dataSource={this.state.dataSource}
            columns={colums2}
            pagination={this.state.pagination}
            scroll={{ x: 1800 }}
          />
        </Card>
        <Card title="表格排序" style={{ margin: "10px 0" }}>
          <Table
            dataSource={this.state.dataSource}
            columns={colums3}
            pagination={this.state.pagination}
          />
        </Card>
        <Card title="表格操作" style={{ margin: "10px 0" }}>
          <Table
            dataSource={this.state.dataSource}
            columns={colums4}
            pagination={this.state.pagination}
          />
        </Card>
      </div>
    )
  }
}