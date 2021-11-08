<template>
    <div>
        <p>login</p>
        <el-button @click="ToWelcome">去登陆</el-button>
    </div>
</template>
<script>
export default {
    name:'Login',
    methods:{
        ToWelcome(){
            this.$router.push('/Welcome')
        }
    }
}
</script>