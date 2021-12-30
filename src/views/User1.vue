<template>
  <div class="user-manage">
    <div class="query-form">
      <el-form :inline="true">
        <el-form-item label="用户ID">
          <el-input type="text" size="small" placeholder="请输入用户ID"></el-input>
        </el-form-item>
        <el-form-item label="用户名称">
          <el-input type="text" size="small" placeholder="请输入用户名称"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select model-value="在职" size="small">
            <el-option value="所有">所有</el-option>
            <el-option value="在职">在职</el-option>
            <el-option value="离职">离职</el-option>
            <el-option value="试用期">试用期</el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small">查询</el-button>
          <el-button size="small">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" size="small">新增</el-button>
        <el-button type="danger" size="small">批量删除</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%" size="small">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="用户ID" width="180" />
        <el-table-column prop="name" label="用户名" width="180" />
        <el-table-column prop="play" label="用户角色" width="180" />
        <el-table-column prop="status" label="用户状态" width="180" />
        <el-table-column prop="firstTime" label="注册时间" width="180" />
        <el-table-column prop="lastTime" label="最后登录时间" width="180" />
        <el-table-column label="操作">
          <template #default>
            <el-button size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :total="1000" />
    </div>
  </div>
</template>
<script>
export default {
  name: "user",
  data() {
    return {
      tableData: [
        {
          id: "007",
          name: "Tom",
          play: "admin",
          status: "在职",
          firstTime: "2021-01-17 21:32:06",
          lastTime: "2021-01-17 21:32:06",
          todo: "删除",
        },
        {
          id: "007",
          name: "Tom",
          play: "admin",
          status: "在职",
          firstTime: "2021-01-17 21:32:06",
          lastTime: "2021-01-17 21:32:06",
          todo: "删除",
        },
        {
          id: "007",
          name: "Tom",
          play: "admin",
          status: "在职",
          firstTime: "2021-01-17 21:32:06",
          lastTime: "2021-01-17 21:32:06",
          todo: "删除",
        },
        {
          id: "007",
          name: "Tom",
          play: "admin",
          status: "在职",
          firstTime: "2021-01-17 21:32:06",
          lastTime: "2021-01-17 21:32:06",
          todo: "删除",
        },
        {
          id: "007",
          name: "Tom",
          play: "admin",
          status: "在职",
          firstTime: "2021-01-17 21:32:06",
          lastTime: "2021-01-17 21:32:06",
          todo: "删除",
        },
        {
          id: "007",
          name: "Tom",
          play: "admin",
          status: "在职",
          firstTime: "2021-01-17 21:32:06",
          lastTime: "2021-01-17 21:32:06",
          todo: "删除",
        },
      ],
    };
  },
};
</script>
