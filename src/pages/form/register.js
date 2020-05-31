import React from 'react'
import { Card, Form, Input, Button, message, Checkbox, Radio, InputNumber, Select, Switch, DatePicker, TimePicker, Upload } from 'antd'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import moment from 'moment'
const FormItem = Form.Item
const { Option } = Select;

export default class Register extends React.Component {
  state = {}
  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          userImg: imageUrl,
          loading: false,
        }),
      );
    }
  };
  onFinish = (val) => {
    console.log(val)
  }
  render() {
    const layout = {
      labelCol: {
        xs: 24,
        sm: 4
      },
      wrapperCol: {
        xs: 24,
        sm: 12
      },
    }
    const offset = {
      wrapperCol: {
        xs: 24,
        sm: {
          span: 12,
          offset: 4
        }
      }
    }
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    return (
      <div style={{ width: '100%' }}>
        <Card title="注册表单">
          <Form onFinish={this.onFinish} layout="horizontal" {...layout} initialValues={{ birthDay: moment('2020-08-05') }}>
            <FormItem name="userName" label="用户名" rules={[{ required: true }]}>
              <Input placeholder="请输入用户名" />
            </FormItem>
            <FormItem
              name="userPwd"
              label="密码"
              rules={[
                { required: true, message: '密码不能为空' },
                { min: 5, max: 10, message: '长度不在范围内' }
              ]}
            >
              <Input type="password" placeholder="请输入密码" />
            </FormItem>
            <FormItem name="sex" label="性别" rules={[{ required: true }]}>
              <Radio.Group>
                <Radio value="1">男</Radio>
                <Radio value="2">女</Radio>
              </Radio.Group>
            </FormItem>
            <FormItem name="age" label="年龄" rules={[{ required: true }]}>
              <InputNumber />
            </FormItem>
            <FormItem name="state" label="当前状态" rules={[{ required: true }]}>
              <Select>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </FormItem>
            <FormItem name="hoby" label="爱好" rules={[{ required: true }]}>
              <Select mode="multiple">
                <Option value="1">篮球</Option>
                <Option value="2">足球</Option>
                <Option value="3">钢琴</Option>
              </Select>
            </FormItem>
            <FormItem name="isMarried" label="婚姻状况" rules={[{ required: true }]}>
              <Switch />
            </FormItem>
            <FormItem name="birthDay" label="生日" rules={[{ required: true }]}>
              <DatePicker showTime />
            </FormItem>
            <FormItem name="address" label="联系地址" rules={[{ required: true }]}>
              <Input.TextArea rows={4} />
            </FormItem>
            <FormItem name="time" label="早起时间" rules={[{ required: true }]}>
              <TimePicker />
            </FormItem>
            <FormItem name="userImg" label="头像" rules={[{ required: true }]}>
              <Upload
                listType="picture-card"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                onChange={this.handleChange}
              >
                {this.state.userImg ? <img src={this.state.userImg} /> : uploadButton}
              </Upload>
            </FormItem>
            <FormItem {...offset} name="agree" valuePropName="checked" rules={[{ required: true }]}>
              <Checkbox>我已阅读</Checkbox>
            </FormItem>
            <FormItem {...offset} name="agree" valuePropName="checked" rules={[{ required: true }]}>
              <Button type="primary" htmlType="submit">注册</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    )
  }
}