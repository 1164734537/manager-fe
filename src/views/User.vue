<template>
  <div class="user-manage">
    <div class="query-form">
      <el-form :inline="true" :model="user" ref="form">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="user.userId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="用户名称" prop="userName">
          <el-input v-model="user.userName" placeholder="请输入用户名称" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="user.state">
            <el-option :value="0" label="所有"></el-option>
            <el-option :value="1" label="在职"></el-option>
            <el-option :value="2" label="离职"></el-option>
            <el-option :value="3" label="试用期"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="handleReset('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleCreate">新增</el-button>
        <el-button type="danger" @click="handlePatchDel">批量删除</el-button>
      </div>
      <el-table :data="userList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :formatter="item.formatter"
        ></el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button type="primary" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button type="danger" @click="handleDelete(scope.row)"
              >删除</el-button
            >
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
      <el-dialog 
        title="新增用户" 
        v-model="showModel"
        @close="dialogClose"
      >
        <el-form
          ref="dialogForm"
          :model="userForm"
          label-width="100px"
          :rules="rules"
        >
          <el-form-item label="用户名" prop="userName">
            <el-input
              v-model.number="userForm.userName"
              :disabled="action == 'edit'"
              placeholder="请输入用户名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="userEmail">
            <el-input
              v-model="userForm.userEmail"
              placeholder="请输入用户邮箱"
              :disabled="action == 'edit'"
            >
              <template #append>
                <span>@imooc.com</span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input
              v-model="userForm.mobile"
              placeholder="请输入用户手机号"
            ></el-input>
          </el-form-item>
          <el-form-item label="岗位" prop="job">
            <el-input
              v-model="userForm.job"
              placeholder="请输入用户岗位"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="state">
            <el-select v-model="userForm.state">
              <el-option :value="1" label="在职"></el-option>
              <el-option :value="2" label="离职"></el-option>
              <el-option :value="3" label="试用期"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="系统角色" multiple prop="roleList">
            <el-select
              multiple
              placeholder="请输入用户角色"
              style="width: 100%"
              v-model="userForm.roleList"
            >
              <el-option
                v-for="item in roleList"
                :key="item._id"
                :value="item._id"
                :label="item.roleName"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属部门" prop="deptId">
            <el-cascader
              v-model="userForm.deptId"
              :options="deptList"
              :props="{ checkStrictly: true, value: '_id', label: 'deptName' }"
              placeholder="请选择所属部门"
              style="width: 100%"
              clearable
            />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="handleClose">取消</el-button>
            <el-button type="primary" @click="handleSubmit">确认</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getCurrentInstance, onMounted, reactive, ref, toRaw } from "vue";
import utils from './../utils/utils.js'
export default {
  name: "user",
  setup() {
    // 获取Composition API 上下文对象
    const { proxy } = getCurrentInstance();
    // 初始化用户表单对象
    const user = reactive({
      state: 1,
    });
    // 初始化用户列表数据
    const userList = ref([]);
    // 弹框显示对象
    const showModel = ref(false);
    // 新增用户Form对象
    const userForm = reactive({
      state: 3,
    });
    // 所有角色列表
    const roleList = ref([]);
    // 所有部门列表
    const deptList = ref([]);
    const action = ref("add");
    // 定义表单验证规则
    const rules = reactive({
      userName: [
        {
          required: true,
          message: "用户名不能为空",
          trigger: "blur",
        },
      ],
      userEmail: [
        {
          required: true,
          message: "请输入用户邮箱",
          trigger: "blur",
        },
      ],
      mobile: [
        {
          required: true,
          message: "请输入用户电话号码",
          trigger: "blur",
        },
        {
          pattern: /1[3-9]\d{9}/,
          message: "请输入正确的手机格式",
          trigger: "blur",
        },
      ],
      deptId: [],
    });

    // 初始化分页对象
    const pager = reactive({
      pageNum: 1,
      pageSize: 10,
    });
    // 选中用户列表对象
    const checkedUserIds = ref([]);

    // 定义动态表格-格式
    const columns = ref([
      {
        prop: "userId",
        label: "用户id",
      },
      {
        prop: "userName",
        label: "用户名",
      },
      {
        prop: "userEmail",
        label: "用户邮箱",
      },
      {
        prop: "role",
        label: "用户角色",
        formatter(row, column, value) {
          return {
            0: "管理员",
            1: "普通用户",
          }[value];
        },
      },
      {
        prop: "state",
        label: "用户状态",
        formatter(row, column, value) {
          return {
            1: "在职",
            2: "离职",
            3: "试用期",
          }[value];
        },
      },
      {
        prop: "createTime",
        label: "注册时间",
        width:180,
        formatter(row, column, value) {
         return utils.formateDate(new Date(value))

        }
      },
      {
        prop: "lastLoginTime",
        label: "最后登录时间",
        width:180,
        formatter(row, column, value) {
         return utils.formateDate(new Date(value))

        }
      },
    ]);
    //初始化接口调用
    onMounted(() => {
      // 请求用户列表
      getuserList();
      getRoleAllList();
      getDeptList();
    });
    //获取用户列表
    const getuserList = async () => {
      const params = { ...user, ...pager };
      try {
        const { page, list } = await proxy.$api.getUserList(params);
        // console.log(list, page);
        userList.value = list;
        pager.total = page.total;
      } catch (error) {}
    };
    // 获取角色列表
    const getRoleAllList = async () => {
      try {
        const list = await proxy.$api.getRoleAllList();
        roleList.value = list;
      } catch (error) {
        console.error(error);
      }
    };
    // 获取部门列表
    const getDeptList = async () => {
      try {
        const list = await proxy.$api.getDeptList();
        deptList.value = list;
      } catch (error) {
        console.error(error);
      }
    };

    //查询操作
    const handleQuery = () => {
      getuserList();
      // const res = userList.value.map( item =>{
      //     return
      // })
    };
    // 重置操作
    const handleReset = (form) => {
      // console.log(proxy.$refs);
      proxy.$refs[form].resetFields();
      //     if (proxy.$ref['form'] !== undefined) {
      //       proxy.resetField();//封装了清空操作
      //   }
    };

    // 分页事件处理
    const handleCurrentChange = (val) => {
      pager.pageNum = val;
      getuserList();
    };
    // 单个删除
    const handleDelete = async (row) => {
      console.log('delete', row.userId)
      await proxy.$api.userDel({
        userIds: [row.userId],
      });
      proxy.$message.success("删除成功");
      getuserList();
    };
    // 批量删除
    const handlePatchDel = async () => {
      if (checkedUserIds.value.length == 0) {
        proxy.$message.error("请选择要删除的用户");
        return;
      }
      console.log('deleteALL', checkedUserIds.value)
      const res = await proxy.$api.userDel({
        userIds: checkedUserIds.value,
      });
      if (res.nModified > 0) {
        proxy.$message.success("删除成功");
        getuserList();
      } else {
        proxy.$message.success("修改失败");
      }
    };
    // 用户新增弹框展示
    const handleCreate = () => {
      action.value = "add";
      showModel.value = true;
    };
    // 不是按取消关闭的用户弹框
    const dialogClose = ()=>{
      console.log('close!!!')
       handleReset("dialogForm");
    }

    // 用户弹框关闭
    const handleClose = () => {
      // console.log('close')
      handleReset("dialogForm");
      showModel.value = false;
    };
    //用户弹框提交
    const handleSubmit = () => {
      proxy.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          let { userEmail, ...data } = userForm;
          let params = {
            ...data,
            userEmail: userEmail + "@imooc.com",
            action: action.value,
          };
          let res = await proxy.$api.userSubmit(params);
          console.log(res)
          showModel.value = false;
          proxy.$message.success(`用户${res}成功`);
          handleReset("dialogForm");
          getuserList();
        }
      });
      // hanldeReset('dialogForm');
    };
    // 用户编辑
    const handleEdit = (row) => {
      action.value = "edit";
      showModel.value = true;
      // proxy.userForm = toRaw(row)
      proxy.$nextTick(()=>{
        Object.assign(userForm, row);
      });
    };
    // 表格选项发生变化
    const handleSelectionChange = (val) => {
      // console.log(val)
      const res = val.map((item) => {
        return item.userId;
      });
      checkedUserIds.value = res;
    };
    return {
      user,
      userList,
      columns,
      pager,
      showModel,
      action,
      userForm,
      roleList,
      deptList,
      rules,
      handleQuery,
      handleReset,
      handleCurrentChange,
      handleDelete,
      handlePatchDel,
      handleSelectionChange,
      handleCreate,
      handleClose,
      dialogClose,
      handleSubmit,
      handleEdit,
      checkedUserIds,
    };
  },
};
</script>
<style lang="scss"></style>
