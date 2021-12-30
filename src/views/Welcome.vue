<template>
    <div class="welcome">
        <div class="content">
            <div class="sub-title">欢迎体验</div>
            <div class="title">通用后台管理系统</div>
            <div class="desc">-vue3.0 + elementPlus + node + Mongo 打造通用后台管理系统 </div>
        </div>
        <div class="img"></div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name:'Welcome',
    methods:{
        Tologin(){
            this.$router.push('/Login')
        }
    }
}
</script>
<style lang="scss">
    .welcome{
        display: flex;
        align-items: center;
        justify-content: space-around;
        height: 100%;
        background:#fff;
        .content{
            position: relative;
            bottom: 40px;
            .sub-title{
                font-size: 30px;
                line-height: 42px;
                color: #333;
            }
            .title{
                font-size: 40px;
               line-height: 62px;
               color:#409eff;
            }
            .desc{
                text-align: right;
                font-size: 14px;
                color: #999;
            }
        }
        .img{
            margin-left: 105px;
            width: 371px;
            height: 438px;
            background-image: url(./../assets/images/welcome.png);
            background-repeat: no-repeat;
        }
    }
</style>