<template>
    <div class="basic-layout">
        <div :class="['nav-side',isCollapse?'fold':'unfold']">
            <el-row>
                <el-col>
                    <!-- 系统logo -->
                    <div class="logo">
                        <img src="./../assets/logo.png" alt="">
                        <div>Manager</div>
                    </div>
                    <!-- 系统菜单 -->
                    <el-menu
                        class="nav-menu"
                        background-color="#001529"
                        text-color="#fff"
                        router = true
                        :collapse="isCollapse"
                        collapse-transition = true
                    >
                        <el-sub-menu index="1">
                            <template #title>
                                <el-icon><Tools /></el-icon>
                                <span>系统管理</span>
                            </template>
                            <el-menu-item index="1-1">用户管理</el-menu-item>
                            <el-menu-item index="1-2">菜单管理</el-menu-item>
                        </el-sub-menu>
                        <el-sub-menu index="2">
                            <template #title>
                                <el-icon><Tools /></el-icon>
                                <span>审批管理</span>
                            </template>
                            <el-menu-item index="2-1">休假申请</el-menu-item>
                            <el-menu-item index="2-2">待我审批</el-menu-item>
                        </el-sub-menu>
                    </el-menu>
                </el-col>
            </el-row>
        </div>
        <div :class="['content-right',isCollapse?'fold':'unfold']">
            <div class="nav-top">
                <div class="nav-left">
                    <div class="nav-fold" @click="toggle()">
                        <el-icon><Fold /></el-icon>
                    </div>
                    <div class="bread">面包屑</div>
                </div>
                
                <div class="user-info">
                    <el-badge is-dot="true" class="notice" type="danger" :hidden='isHidden' @click="handlehidden">
                        <el-icon><Bell /></el-icon>
                    </el-badge>
                    <el-dropdown class="user" @command="handleCommand">
                        <span>
                            {{ userInfo.userName }}
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item command="email">邮箱：{{userInfo.userEmail}}</el-dropdown-item>
                                <el-dropdown-item command='logout'>退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </div>
            <div class="wrapper">
                <div class="main-page">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {Tools,Fold,Bell} from '@element-plus/icons'
export default {
    name:'Home',
    components:{
        Tools,
        Fold,
        Bell
    },
    data(){
        return {
            isHidden:true,
            isCollapse:false,
            userInfo:this.$store.state.userInfo
        }
    },
    methods:{
        handleCommand(command){
            // console.log(command)
            if(command == 'email') return;
            console.log(command);
            //退出登录
            // 1.清空vuex中的缓存，和当前userinfo
            //2.清空storage关于用户数据
            //3.跳转至登录页面
            this.userInfo = null;
            this.$store.commit('saveUserInfo','');
            this.$router.push('/login');
        },
        handlehidden(){
            this.isHidden = !this.isHidden
        },
        toggle(){
            this.isCollapse = !this.isCollapse
        }

    }
}
</script>
<style lang="scss">
    .basic-layout{
        position: relative;
        .nav-side{
            position: fixed;
            width: 200px;
            height: 100vh;
            background-color:#001529;
            color: #fff;
            transition: width .5s;
            -webkit-backface-visibility: hidden;
            -webkit-transform-style: preserve-3d;
            .logo{
                display: flex;
                align-items: center;
                font-size: 18px;
                height: 50px;
                overflow: hidden;
                transition: width .5s;
                -webkit-backface-visibility: hidden;
                -webkit-transform-style: preserve-3d;
                img{
                    margin: 0 16px;
                    width: 32px;
                    height: 32px;
                }
            }
            .nav-menu{
                border-right: none;
                height: calc(100vh - 50px);
            }
            &.fold{
                width: 64px;
            }
            &.unfold{
                width: 200px;
            }
        }

        .content-right{
            margin-left:200px;
            transition: all .5s;
            -webkit-backface-visibility: hidden;
            -webkit-transform-style: preserve-3d;
            &.fold{
                margin-left: 64px;
            }
            &.unfold{
                margin-left:200px;
            }
            .nav-top{
                box-sizing: border-box;
                display: flex;
                justify-content: space-between;
                height: 50px;
                line-height: 50px;
                border-bottom: 1px solid #ddd;
                padding: 0 20px;
                overflow: hidden;
                .nav-left{
                    display: flex;
                    align-items: center;
                    .nav-fold{
                        font-size: 20px;
                        display: flex;
                        align-items: center;
                        .el-icon{
                            font-size: 18px;
                            margin-right: 15px;
                        }
                    }
                }
                .user-info{
                    .notice{
                        line-height: 30px;
                        cursor: pointer;
                    }
                    .user{
                        user-select: none;
                        margin: 0 15px;
                        cursor: pointer;
                        color: #409EFF;
                    }
                }
            }
            .wrapper{
                box-sizing: border-box;
                padding: 20px;
                height: calc(100vh - 50px);
                background-color:#eef0f3;
                .main-page{
                    background-color: #fff;
                    height: 100%;
                    overflow-x: hidden;
                }
            }
        }
    }
</style>