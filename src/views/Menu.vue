<template>
    <div class="role-manage">
        <div class="query-form">
            <el-form 
                :inline="true"
                :model="queryForm"
                ref="form"
            >
                <el-form-item label="菜单名称" prop="menuName">
                    <el-input placeholder="请输入菜单名称" v-model="queryForm.menuName"></el-input>
                </el-form-item>
                <el-form-item label="菜单状态" prop="menuState">
                    <el-select v-model="queryForm.menuState">
                        <el-option :value="1" label="正常"></el-option>
                        <el-option :value="2" label="停用"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getMenuList">查询</el-button>
                    <el-button @click="handleReset('form')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="base-table">
            <div class="action">
                <el-button type="primary" @click="handleAdd('1')">创建</el-button>
            </div>
            <el-table 
            :data="menuList"
            row-key="_id"
            :tree-props="{ children:'children' }"
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
                        <el-button type="primary" @click="handleAdd('2',scope.row)">新增</el-button>
                        <el-button @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="danger" @click="handleDel(scope.row._id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog
                title="新增菜单"
                v-model="showModel"
                @close="handleClose"
            >
                <el-form
                 ref="dialogForm"
                 label-width="100px"
                 :model="menuForm"
                 :rules="rules"
                >
                    <el-form-item label="父级菜单" prop="parentId">
                        <el-cascader
                            v-model = 'menuForm.parentId'
                            :options='menuList'
                            :props='{ checkStrictly: true,value:"_id",label:"menuName"}'
                            clearable
                        >
                        </el-cascader>
                        <span>不选，则直接创建一级菜单</span>
                    </el-form-item>
                    <el-form-item label="菜单类型" prop="menuType">
                        <el-radio-group v-model="menuForm.menuType">
                            <el-radio :label="1">菜单</el-radio>
                            <el-radio :label="2">按钮</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="菜单名称" prop="menuName">
                        <el-input v-model.trim="menuForm.menuName" placeholder="请输入菜单名称"></el-input>
                    </el-form-item>
                    <el-form-item
                      label="菜单图标"
                      prop="icon"
                      v-show="menuForm.menuType == 1">
                        <el-input  v-model="menuForm.icon" placeholder="请输入菜单图标"></el-input>
                    </el-form-item>
                    <el-form-item  
                        label="路由地址" 
                        prop="path"
                        v-show="menuForm.menuType == 1" >
                        <el-input v-model="menuForm.path" placeholder="请输入路由地址"></el-input>
                    </el-form-item>
                    <el-form-item  v-show="menuForm.menuType == 1" label="组件路径" prop="component">
                        <el-input placeholder="请输入组件路径" v-model="menuForm.component"></el-input>
                    </el-form-item>
                    <el-form-item
                      label="菜单状态" 
                      prop="menuState"
                      v-show="menuForm.menuType == 1"
                      >
                        <el-radio-group v-model="menuForm.menuState">
                            <el-radio :label="1">正常</el-radio>
                            <el-radio :label="2">停用</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item 
                        prop="menuCode"
                        label="限权标识"
                        v-show="menuForm.menuType == 2" >
                        <el-input v-model="menuForm.menuCode" placeholder="请输入限权标识"></el-input>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <div class="dialog-footer">
                        <el-button @click="handleClose">取消</el-button>
                        <el-button @click="handleSubmit" type="primary">确认</el-button>
                    </div>
                </template>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import { getCurrentInstance, onMounted, ref, reactive, toRaw } from 'vue'
import './../utils/utils'
import utils from './../utils/utils'
export default {
    name: "menu",
    setup() {
        // 获取Composition API 上下文对象
        const { proxy } = getCurrentInstance()
        // 表单数据
        const queryForm = reactive({
            menuState: 1
        })
        // 菜单列表
        const menuList = ref([])
        // 菜单表单
        const menuForm = reactive({
            parentId:[null],
            menuType: 1,
            menuState: 1
        })
        const action = ref('add')
        // 定义表头
        const columns = ref([
            {
                prop:'menuName',
                label:'菜单名称',
                width: '180'
            },
            {
                prop:'icon',
                label:'图标',
                width:'150'
            },
            {
                prop:'menuType',
                label: '菜单类别',
                width: '150',
                formatter(row,column,value) {
                    return {
                        1: "菜单",
                        2: "按钮",
                    }[value];
                }
            },
            {
                prop: 'menuCode',
                label: '权限标识',
            },
            {
                prop:'path',
                label:'路由地址',
                width: '150'
            },
            {
                prop:'component',
                label:'组件路径',
            },
            {
                prop:'menuState',
                label:'菜单状态',
                width: '150',
                formatter(row,column,value) {
                    return {
                        1: "正常",
                        2: "停用",
                    }[value];
                }
            },
            {
                prop:'createTime',
                label:'创建时间',
                width: '250',
                formatter(row,column,value) {
                    return utils.formateDate(new Date(value))
                }
            }
        ])
        // 发起请求
        onMounted(() =>{
            // 菜单列表初始化
            getMenulist();
        })
        
        // 初始化菜单列表 / 当queryForm 有值时为查询
        const getMenulist = async ()=>{
            try {
                let res = await proxy.$api.getMenuList(queryForm)
                // console.log(res)
                menuList.value = res
            } catch (error) {
                throw new Error(error);
            }

        }
        // 重置表单
        const handleReset = (form) => {
            proxy.$refs[form].resetFields();
        }
        
        // 表单校验
        const rules = reactive({
            menuName: [
                {
                    required: true,
                    message:'菜单名称不能为空',
                    trigger: 'blur'
                },
                {   
                    min:2,
                    max:8,
                    message:'长度在2-8个字符',
                    trigger: 'blur'
                }
            ]
        })
        // 定义弹框
        const showModel = ref(false)

        // 新增弹框显示
        const handleAdd = (type,row)=>{
            action.value = 'add'
            showModel.value = true
            // console.log(type,row)
            if(type=='2'){
                //1.获取parentId, 不为空就push,在获取_id，push 
                let { parentId , _id} = row
                // menuForm.parentId = [...parentId,_id].filter(Boolean)
                proxy.$nextTick(()=>{
                    menuForm.parentId = [...parentId,_id].filter(Boolean)
                    
                })
            }
        }
        // 编辑弹框显示
        const handleEdit = (row)=>{
            // console.log(row)
            action.value = 'edit'
            showModel.value = true
            proxy.$nextTick(()=>{
                Object.assign(menuForm,row)
                let { parentId , _id,menuState, menuType} = row
                menuForm.parentId = [...parentId,_id].filter(Boolean)
                menuForm.menuState = menuState - 0 
                menuForm.menuType =  menuType - 0 
                // console.log(menuForm)

            })
        }
        // 弹框确认
        const handleSubmit = async()=>{
            //1.验证成功
            proxy.$refs.dialogForm.validate( async(valid)=>{
                if(valid){
                     // 发请求
                    const truemenuForm = toRaw(menuForm)
                    const trueaction = toRaw(action.value)
                    let params = {
                        ...truemenuForm,
                        action:trueaction
                    }
                    try {
                        const res = await proxy.$api.menuSubmit(params)
                        console.log('确认=>',res)
                        if(res){
                            proxy.$message.success('操作成功')
                            proxy.handleReset('dialogForm')
                            showModel.value = false
                            getMenulist()
                        }
                    } catch (error) {
                        throw new Error(error);
                    }
                    
                }
            })
           
        }
        // 监听关闭/取消弹框，重置
        const handleClose = ()=>{
            handleReset('dialogForm')
            showModel.value = false
        }
        // 删除按钮
        const handleDel = async(_id)=>{
            // console.log(_id)
            try {
                const res = await proxy.$api.menuSubmit({_id, aciton: "delect"})
                // console.log('确认=>',res)
                proxy.$message.success('删除成功')
            } catch (error) {
                 throw new Error(error);
            }
            
        }
        return { queryForm,
                 columns,
                 menuList,
                 menuForm,
                 rules,
                 handleReset,
                 handleAdd,
                 handleEdit,
                 handleDel,
                 action,
                 handleClose,
                 handleSubmit,
                 showModel 
                }
    }
}
</script>
<style lang="scss">
    
</style>