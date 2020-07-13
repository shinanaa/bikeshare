import React from 'react'
import Utils from '../../utils/utils'
import {Table} from 'antd'

export default class ETable extends React.Component{
    
    // 点击选择表格行
    onRowClick = (record, index) => {
        let rowSelection = this.props.rowSelection
        if(rowSelection == 'checkbox'){
            let selectedRowKeys = this.props.selectedRowKeys;
            let selectedIds = this.props.selectedIds;
            let selectedItem = this.props.selectedItem || [];
            if (selectedIds) {
                console.log(1)
                const i = selectedIds.indexOf(record.id);
                if (i == -1) {//避免重复添加
                    console.log(3)
                    selectedIds.push(record.id)
                    selectedRowKeys.push(index);
                    selectedItem.push(record);
                }else{
                    console.log(4)
                    selectedIds.splice(i,1);
                    selectedRowKeys.splice(i,1);
                    selectedItem.splice(i,1);
                }
            } else {
                console.log(2)
                selectedIds = [record.id];
                selectedRowKeys = [index]
                selectedItem = [record];
            }
            this.props.updateSelectedItem(selectedRowKeys,selectedItem || {},selectedIds);
 
        }else{
            let selectedRowKeys = [index]
            let selectRowItem = record
            this.props.updateSelectedItem(selectedRowKeys, selectRowItem)
        }
    }
    // 可选表格  选中项发生变化的回调
    onSelectChange = (selectedRowKeys, selectedRows) => {
        let rowSelection = this.props.rowSelection;
        const selectedIds = [];
        if(rowSelection == 'checkbox'){
            selectedRows.map((item)=>{
                selectedIds.push(item.id);
            });
            this.setState({
                selectedRowKeys,
                selectedIds:selectedIds,
                selectedItem: selectedRows[0]
            });
        }
        this.props.updateSelectedItem(selectedRowKeys,selectedRows[0],selectedIds);
    }
    onSelectAll = (selected, selectedRows, changeRows) => {
        let selectedIds = [];
        let selectKey = [];
        selectedRows.forEach((item,i)=> {
            selectedIds.push(item.id);
            selectKey.push(i);
        });
        this.props.updateSelectedItem(selectKey,selectedRows[0] || {},selectedIds);
    }
    getOptions = () => {
        // 当前选中项的id
        // debugger
        const { selectedRowKeys } = this.props;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys,
            onChange: this.onSelectChange,
            onSelect:(record, selected, selectedRows)=>{
                console.log('...')
            },
            onSelectAll:this.onSelectAll
        };
        // 判断需要的模式 普通表格/单选表格/多选表格
        let row_selection = this.props.rowSelection;
        if(row_selection===false || row_selection === null){
            row_selection = false;
        }else if(row_selection == 'checkbox'){
            //设置类型未复选框
            rowSelection.type = 'checkbox';
        }else{
            //默认未单选
            row_selection = 'radio';
        }
        return<Table
            className="page-table"
            bordered
            {...this.props}
            rowSelection={row_selection ? rowSelection : null}
            onRow={(record,index) => ({
                onClick: ()=>{
                    if(!row_selection){
                        return;
                    }
                    this.onRowClick(record,index)
                }
              })}
        />
    }
    render() {
        return(
            <div>
                {this.getOptions()}
            </div>
        )
    }
}