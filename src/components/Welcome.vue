<template>
    <div>
        <p>Welcome</p>
        <el-button @click="Tologin">去登陆</el-button>
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