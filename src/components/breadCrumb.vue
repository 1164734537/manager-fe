<template>
  <!-- <el-breadcrumb separator-class="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
    <el-breadcrumb-item>promotion management</el-breadcrumb-item>
    <el-breadcrumb-item>promotion list</el-breadcrumb-item>
    <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
  </el-breadcrumb> -->
    <el-breadcrumb separator=">">
        <el-breadcrumb-item 
        v-for="(item,index) in breadList" 
        :key="item.path"
        >
        <router-link to='/welcome' v-if="index==0">{{item.name}}</router-link>
        <span v-else>{{item.name}}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script>
import { ArrowRight } from '@element-plus/icons'
export default {
    name:'breadCrumb',
    components:{
        ArrowRight
    },
    computed:{
        breadList(){
            return this.$route.matched
        }
    }
}
</script>