import React from 'react'
import { Form, Input, Select, DatePicker, Radio, Checkbox, Button} from 'antd'

const FormItem = Form.Item
const { RangePicker } = DatePicker;
const { Option } = Select;

export default class FilterForm extends React.Component{
    formRef = React.createRef();
    handleFilterSubmit = ()=>{
        let fieldsValue = this.formRef.current.getFieldsValue();
        this.props.filterSubmit(fieldsValue);
    }

    reset = ()=>{
        this.form.current.resetFields();
    }
    getOptionList = (data, type) => {
        if(!data) {
            return []
        }
        let options = []
        data.map((item) => {
            switch(type){
                case 'option':
                    options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
                    break;
                case 'radio':
                    options.push(
                        <Radio value={item.id} key={item.id}>{item.name}</Radio>,
                    );
                    break;
                case 'checkbox':
                    options.push(
                        <Checkbox value={item.id} key={item.id}>{item.name}</Checkbox>,
                    );
                    break;
            }   
        })
        return options
    }
    initFormList = () => {
        const formList = this.props.formList
        const formItemList = []
        if(formList && formList.length > 0){
            formList.forEach((item, i) => {
                const {
                    label,
                    field,
                    initialValue,
                    defaultValue,
                    labelInValue,
                    placeholder,
                    width,
                    styles,
                    rules,
                    formItemLayout,
                    FormItemStyles,
                    allowClear,
                    disabled
                } = item
                if(item.type == '时间查询'){
                    const RANGEPICKER = (
                        <FormItem name={field} label={label} key={field} {...formItemLayout}>
                            <RangePicker disabled={disabled} />
                        </FormItem>
                    )
                    formItemList.push(RANGEPICKER)
                } else if(item.type == '城市'){
                    const city = (
                        <FormItem
                            name={field}
                            rules={rules}
                            label='城市'
                            key={field}
                            {...formItemLayout}
                            style={FormItemStyles}
                            >
                            <Select
                                labelInValue={labelInValue}
                                placeholder={placeholder}
                                allowClear={allowClear}
                                defaultValue={defaultValue}
                                style={{ width: '80px'}}
                                disabled={disabled}
                            >
                                {this.getOptionList([
                                    { id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '天津' }, { id: '3', name: '上海' }
                                ], 'option')}
                            </Select>
                        </FormItem>
                    )
                    formItemList.push(city)
                } else if(item.type == 'INPUT'){
                    const INPUT = (
                        <FormItem
                            name={field}
                            rules={rules}
                            label={label}
                            key={field}
                            {...formItemLayout}
                            style={FormItemStyles}
                            >
                            <Input
                                style={{ width, ...styles }}
                                allowClear={allowClear}
                                autoComplete="off"
                                type="text"
                                disabled={disabled}
                                placeholder={placeholder}
                            />
                        </FormItem>
                    )
                    formItemList.push(INPUT)
                } else if(item.type == 'SELECT'){
                    const SELECT = (
                        <FormItem
                            name={field}
                            rules={rules}
                            label={label}
                            key={field}
                            {...formItemLayout}
                            style={FormItemStyles}
                            >
                            <Select
                                labelInValue={labelInValue}
                                placeholder={placeholder}
                                allowClear={allowClear}
                                defaultValue={defaultValue}
                                style={{ width, ...styles }}
                                disabled={disabled}
                            >
                                {this.getOptionList(item.list, 'option')}
                            </Select>
                        </FormItem>
                    )
                    formItemList.push(SELECT)
                } else if(item.type == 'CHECKBOX') {
                    const CHECKBOX = (
                        <FormItem
                          name={field}
                          rules={rules}
                          label={label}
                          key={field}
                          {...formItemLayout}
                          style={FormItemStyles}
                          disabled={disabled}
                        >
                          <span>{this.getOptionList(item.list, 'checkbox')}</span>
                        </FormItem>
                      );
                    formItemList.push(CHECKBOX);
                }
            })
            return formItemList
        }
    }
    render(){
        return(
            <Form layout={this.props.layout || 'inline'} ref={this.formRef}>
                { this.initFormList() }
                {!this.props.noFoot && (
                    <FormItem>
                        <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleFilterSubmit}>查询</Button>
                        <Button onClick={this.reset}>重置</Button>
                    </FormItem>
                )}
            </Form>
        )
    }
}