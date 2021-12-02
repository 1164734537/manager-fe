/**
 * api管理
 */
import request from './../uitls/request'
export default {
    login(params){
       return request({
            url:'/users/login',
            method:'post',
            data:params
        })             
    },
    noticeCount(){
        return request({
            url:'/leave/count',
            nethod:'get',
            data:{}
        })
    }
}