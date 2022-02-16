/**
 * api管理
 */
import request from './../utils/request'
export default {
    // 登录
    login(params) {
        return request({
            url: '/users/login',
            method: 'post',
            data: params
        })
    },
    // 消息
    noticeCount(params) {
        return request({
            url: '/leave/count',
            nethod: 'get',
            data: {},
            mock:true
        })
    },
    // 菜单列表
    getMenuList(params) {
        return request({
            url: '/menu/list',
            nethod: 'get',
            data: params,
            // mock:true
        })
    },
    // 用户列表
    getUserList(params) {
        return request({
            url: '/users/list',
            nethod: 'get',
            data: params,
        })
    },
    // 用户删除
    userDel(params) {
        return request({
            url: '/users/delete',
            method: 'post',
            data: params
        })
    },
    // 权限列表
    getRoleAllList() {
        return request({
            url: '/roles/allList',
            method: 'get',
            data: {},
            mock:true
        })
    },
    // 获取角色列表
    getRoleList(params){
        return request({
            url: '/roles/list',
            method: 'get',
            data: params,
            mock:true
        })
    },
    // 部门列表
    getDeptList(params){
        return request({
            url: '/dept/list',
            method: 'get',
            data: params,
            mock:true
        })
    },
    // 用户列表提交
    userSubmit(params) {
        return request({
            url: '/users/operate',
            method: 'post',
            data: params
        })
    },
    // 菜单列表提交
    menuSubmit(params) {
        return request({
            url:'/menu/operate',
            method:'post',
            data:params,
            // mock:true
        })
    },

}