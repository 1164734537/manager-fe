/**
 * api管理
 */
import request from './../uitls/request'
export default {
    login(params){
       console.log('请求')
       return request({
            url:'/users/login',
            method:'post',
            data:params
        })             
    }
}