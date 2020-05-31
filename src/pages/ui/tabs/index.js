import React from 'react'
import { Card, message, Tabs } from 'antd'
import {PlusOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons'
import '../ui.less'
const TabPane = Tabs.TabPane

export default class TabsZJ extends React.Component{
    newTabIndex = 0
    componentWillMount() {
        const panes = [
            {
                title: 'Tab 1',
                content: 'Tab 1',
                key: '1'
            },
            {
                title: 'Tab 2',
                content: 'Tab 2',
                key: '2'
            },
            {
                title: 'Tab 3',
                content: 'Tab 3',
                key: '3'
            }
        ]
        this.setState({
            panes,
            activeKey: panes[0].key
        })
    }
    handleCallback = (key) => {
        message.info(`您选择了页签${key}`)
    }
    onChange = (activeKey) => {
        this.setState({
            activeKey
        })
    }
    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };
    add = () => {
        const { panes } = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: activeKey, content: 'Content of new Tab', key: activeKey });
        this.setState({ panes, activeKey });
    };
    remove = targetKey => {
        let { activeKey } = this.state;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
          if (pane.key === targetKey) {
            lastIndex = i - 1;
          }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
          if (lastIndex >= 0) {
            activeKey = panes[lastIndex].key;
          } else {
            activeKey = panes[0].key;
          }
        }
        this.setState({ panes, activeKey });
    };
    render(){
        return (
            <div style={{width: "100%"}}>
                <Card title="Tab页签" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                        <TabPane tab="Tab 1" key="1">Tab 1</TabPane>
                        <TabPane tab="Tab 2" key="2" disabled>Tab 2</TabPane>
                        <TabPane tab="Tab 3" key="3">Tab 3</TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab页签加图标" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                        <TabPane tab={<span><PlusOutlined />Tab 1</span>} key="1">Tab 1</TabPane>
                        <TabPane tab={<span><EditOutlined />Tab 2</span>} key="2">Tab 2</TabPane>
                        <TabPane tab={<span><DeleteOutlined />Tab 3</span>} key="3">Tab 3</TabPane>
                    </Tabs>
                </Card>
                <Card title="动态Tab页签" className="card-wrap">
                    <Tabs
                        onChange={this.onChange}
                        onEdit={this.onEdit}
                        activeKey={this.state.activeKey}
                        type="editable-card"
                    >
                        {
                            this.state.panes.map((pane) => {
                                return <TabPane tab={pane.title} key={pane.key}>{pane.content}</TabPane>
                            })
                        }
                    </Tabs>
                </Card>
            </div>
        )
    }
}