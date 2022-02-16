<template>
    <div class="role-manage">
        <div class="query-form">
            <el-form 
                :inline="true"
                :model="queryForm"
                ref="form"
            >
                <el-form-item label="角色管理" prop="roleName">
                    <el-input placeholder="请输入角色名称" v-model="queryForm.roleName"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getMenulist">查询</el-button>
                    <el-button @click="handleReset('form')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="base-table">
            <div class="action">
                <el-button type="primary" @click="handleAdd('1')">创建</el-button>
            </div>
            <el-table 
            :data="roleList"
            >
                <el-table-column 
                v-for="item in columns"
                :key="item.prop"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                :formatter="item.formatter"
                >
                </el-table-column>
                <el-table-column label="操作" width="250">
                    <template #default="scope">
                        <el-button @click="handleEdit(scope.row)" size="mini">编辑</el-button>
                        <el-button @click="handleEdit(scope.row)" size="mini">设置权限</el-button>
                        <el-button type="danger" @click="handleDel(scope.row._id)" size="mini">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                class="pagination"
                background
                layout="prev, pager, next, jumper"
                :total="pager.total"
                :page-size="pager.pageSize"
                @current-change="handleCurrentChange"
            ></el-pagination>
            
        </div>
    </div>
</template>
<script>
import { getCurrentInstance, onMounted, ref, reactive, toRaw } from 'vue'
import './../utils/utils'
import utils from './../utils/utils'
export default {
    name: "role",
    setup() {
        // 获取Composition API 上下文对象
        const { proxy } = getCurrentInstance()
        // 表单数据
        const queryForm = reactive({
            roleName:""
        })
        // 定义表头
        const columns = ref([
            {
                prop:'roleName',
                label:'角色名称',
            },
            {
                prop:'remark',
                label:'备注',
            },
            {
                prop:'permissionList',
                label: '权限列表',
                formatter(row,column,value) {
                    return {
                        1: "菜单",
                        2: "按钮",
                    }[value];
                }
            },
            {
                prop:'updateTime',
                label:'更新时间',
                formatter(row,column,value) {
                    return utils.formateDate(new Date(value))
                }
            },
            {
                prop:'createTime',
                label:'创建时间',
                formatter(row,column,value) {
                    return utils.formateDate(new Date(value))
                }
            }

        ])
        // 表单内容
        const roleList = ref([])
        // 分页对象
        // 初始化分页对象
        let pager = reactive({
            total: 0,
            pageNum: 1,
            pageSize: 10
        });
        // 发起请求
        onMounted(() =>{
            // 菜单列表初始化
            getRolelist();
        })
        
        // 初始化菜单列表 / 当queryForm 有值时为查询
        const getRolelist = async ()=>{
            try {
                let { page, list } = await proxy.$api.getRoleList(queryForm)
                roleList.value = list
                pager = page
                // console.log(page, list)

            } catch (error) {
                throw new Error(error);
            }
        }
        // 重置表单
        const handleReset = (form) => {
            proxy.$refs[form].resetFields();
        }
        
        // 表单校验
        // const rules = reactive({

        // })
        // 定义弹框
        // const showModel = ref(false)

        // 新增弹框显示
        // const handleAdd = (type,row)=>{
        //     action.value = 'add'
        //     showModel.value = true
        //     // console.log(type,row)
        //     if(type=='2'){
        //         //1.获取parentId, 不为空就push,在获取_id，push 
        //         let { parentId , _id} = row
        //         // menuForm.parentId = [...parentId,_id].filter(Boolean)
        //         proxy.$nextTick(()=>{
        //             menuForm.parentId = [...parentId,_id].filter(Boolean)
                    
        //         })
        //     }
        // }
        // 编辑弹框显示
        // const handleEdit = (row)=>{
        //     // console.log(row)
        //     action.value = 'edit'
        //     showModel.value = true
        //     proxy.$nextTick(()=>{
        //         Object.assign(menuForm,row)
        //         // console.log(menuForm)
        //         // let { parentId , _id,menuState, menuType} = row
        //         // menuForm.parentId = [...parentId,_id].filter(Boolean)
        //         // menuForm.menuState = menuState - 0 
        //         // menuForm.menuType =  menuType - 0 
        //         // console.log(menuForm)

        //     })
        // }
        // 弹框确认
        // const handleSubmit = async()=>{
        //     //1.验证成功
        //     proxy.$refs.dialogForm.validate( async(valid)=>{
        //         if(valid){
        //              // 发请求
        //             const truemenuForm = toRaw(menuForm)
        //             const trueaction = toRaw(action.value)
        //             let params = {
        //                 ...truemenuForm,
        //                 action:trueaction
        //             }
        //             try {
        //                 console.log(params)
        //                 const res = await proxy.$api.menuSubmit(params)
        //                 console.log('确认=>',res)
        //                 if(res){
        //                     proxy.$message.success('操作成功')
        //                     proxy.handleReset('dialogForm')
        //                     showModel.value = false
        //                     getMenulist()
        //                 }
        //             } catch (error) {
        //                 throw new Error(error);
        //             }
                    
        //         }
        //     })
           
        // }
        // 监听关闭/取消弹框，重置
        // const handleClose = ()=>{
        //     handleReset('dialogForm')
        //     showModel.value = false
        // }
        // 删除按钮
        // const handleDel = async(_id)=>{
        //     // console.log(_id)
        //     try {
        //         const res = await proxy.$api.menuSubmit({_id, aciton: "delect"})
        //         // console.log('确认=>',res)
        //         proxy.$message.success('删除成功')
        //     } catch (error) {
        //          throw new Error(error);
        //     }
               
        // }
        return { 
                queryForm,
                 columns,
                 roleList,
                 getRolelist,
                 pager,
                 handleReset
        }
    }
}
</script>
<style lang="scss">
    
</style>