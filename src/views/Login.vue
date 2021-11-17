<template>
    <div>
        <p>login</p>
        <el-button @click="ToWelcome">去登陆</el-button>
    </div>
</template>
<script>
export default {
    name:'Login',
    mounted() {
        this.$request.get('/login').then((res)=>{
            console.log(res)
        })
    },
    methods:{
        ToWelcome(){
            this.$router.push('/Welcome')
        }
    }
}
</script>