/**
 * api管理
 */
import request from './../utils/request'
export default {
    login(params) {
        return request({
            url: '/users/login',
            method: 'post',
            data: params
        })
    },
    noticeCount(params) {
        return request({
            url: '/leave/count',
            nethod: 'get',
            data: {},
            mock:true
        })
    },
    getMenuList(params) {
        return request({
            url: '/menu/list',
            nethod: 'get',
            data: {},
            mock:true
        })
    },

    getUserList(params) {
        return request({
            url: '/users/list',
            nethod: 'get',
            data: params,
        })
    },
    userDel(params) {
        return request({
            url: '/users/delete',
            method: 'post',
            data: params
        })
    },
    getRoleAllList() {
        return request({
            url: '/roles/allList',
            method: 'get',
            data: {},
            mock:true
        })
    },
    getDeptList(params) {
        return request({
            url: '/dept/list',
            method: 'get',
            data: params,
            mock:true
        })
    },
    userSubmit(params) {
        return request({
            url: '/users/operate',
            method: 'post',
            data: params
        })
    }
}