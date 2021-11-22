<template>
    <div class="login-wrapper">
        <div class="modal">
            <el-form ref="userForm" :model="user" status-icon :rules="rules">
                <div class="title">火星</div>
                <el-form-item prop="userName">
                    <el-icon class="user_icon">
                        <User />
                    </el-icon>
                    <el-input type="text" class="inp_user" v-model="user.userName">
                    </el-input>
                </el-form-item>
                <el-form-item  prop="userPwd">
                <el-icon class="view_icon">
                    <View />
                </el-icon>
                    <el-input type="password" class="inp_view" v-model="user.userPwd"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="btn-login" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import {User,View} from '@element-plus/icons'
export default {
    name:'Login',
    components:{
        User,
        View
    },
    data(){
        return {
            user:{
                userName:'',
                userPwd:''
            },
            rules:{
                userName:[
                    {required:true,message:"请输入用户名",tigger:"blur"}
                ],
                userPwd:[
                    {required:true,message:"请输入密码",tigger:"blur"}
                ]
            }
        }
    },
    mounted() {
        // this.$request.get('/login').then((res)=>{
        //     console.log(res)
        // })
        // this.$request({
        //     url:'/users/login',
        //     data:'123',
        //     method:'post'
        // }).then((res)=>{
        //     console.log(res)
        // })
        // this.$request.post('/users/login','123')
        // .then((res)=>{
        //     console.log(res)
        // })

    },
    methods:{
        login(){
            this.$refs.userForm.validate((valid)=>{
                console.log(valid)
                if(valid){
                    // 接口提交
                   this.$api.login(this.user)
                    .then((res)=>{
                        console.log(res)
                    })
                }else{
                    return false;
                }
            })
        },
        ToWelcome(){
            this.$router.push('/Welcome')
        }
    }
}
</script>
<style lang="scss">
 @import './../assets/style/reset.css';
 .login-wrapper{
     display: flex;
     justify-content: center;
     align-items: center;
     width: 100vw;
     height: 100vh;
     background: #f9fcff;
     .modal{
         width: 500px;
         padding: 50px;
         background: #fff;
         border-radius: 4px;
        //  box-shadow:0 0 0 1px #cacaca,0 0 0 4px #eee;
        // box-shadow: 0px 0px 20px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
     }
     .title{
         font-size: 50px;
         line-height: 1.5;
         text-align: center;
         margin-bottom: 30px;
     }
     .btn-login{
         width: 100%;
     }
     .user_icon,.view_icon{
         position:absolute;
         z-index: 999;
         top: 50%;
         transform: translateY(-50%);
         left: 5px;
     }
     .inp_user input,.inp_view input{
         padding-left:20px;
     }

 }
</style>