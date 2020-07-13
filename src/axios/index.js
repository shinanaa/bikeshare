import JsonP from 'jsonp'
import axios from 'axios'
import Utils from '../utils/utils'
import { Modal } from 'antd'
export default class Axios {
    static requestList(_this, params, url) {
        const data = {
            params: params
        }
        this.Ajax({
            url,
            data
        }).then((res) => {
            if(res){
                _this.setState({
                    list: res.result.item_list.map((item, index) => {
                        item.key = index
                        return item
                    }),
                    pagination: Utils.pagination(res, (current) => {
                        _this.params.page = current
                    })
                })
            }
        })
    }
    static jsonp(options) {
        return new Promise((resolve, reject) => {
            JsonP(options.url, {
                param: 'callback'
            }, function (err, response) {
                if (response.status === 'success') {
                    resolve(response)
                } else {
                    reject(response.message)
                }
            })
        })
    }
    static Ajax(options) {
        let loading
        if (options.data && options.data.isShowLoading !== false) {
            loading = document.getElementById('ajaxLoading')
            loading.style.display = 'block'
        }
        let baseApi = 'http://106.12.220.186:4000/api';
        // let baseApi = '/api';
        return new Promise((resolve, reject) => {
            axios({
                url: options.url,
                method: 'get',
                baseURL: baseApi,
                timeout: 5000,
                params: (options.data && options.data.params) || ''
            }).then((response) => {
                if (options.data && options.data.isShowLoading !== false) {
                    loading = document.getElementById('ajaxLoading')
                    loading.style.display = 'none'
                }
                if (response.status == '200') {
                    let res = response.data
                    if (res.code == '0') {
                        resolve(res)
                    } else {
                        Modal.info({
                            title: '提示',
                            content: res.msg
                        })
                    }
                } else {
                    reject(response.data)
                }
            })
        })
    }
}