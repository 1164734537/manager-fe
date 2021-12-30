<template>
  <template v-for="menu in userMenu" :key="menu._id">
    <el-sub-menu
      v-if="
        menu.children &&
        menu.children.length > 0 &&
        menu.children[0].menuType == 1
      "
      :index="menu.path"
    >
      <template #title>
        <el-icon>
          <component :is="menu.icon" />
        </el-icon>
        <span>{{ menu.menuName }}</span>
      </template>
      <TreeMenu :userMenu="menu.children" />
    </el-sub-menu>
    <el-menu-item v-else-if="menu.menuType == 1" :index="menu.path"
      >{{ menu.menuName }}
    </el-menu-item>
  </template>
  <!-- <el-sub-menu index="1">
        <template #title>
            <el-icon><Setting /></el-icon>
            <span>系统管理</span>
        </template>
        <el-menu-item index="1-1">用户管理</el-menu-item>
        <el-menu-item index="1-2">菜单管理</el-menu-item>
    </el-sub-menu> -->
  <!-- <div>{{ userMenu }}</div>-->
</template>
<script>
import { Setting, Promotion } from "@element-plus/icons";
export default {
  name: "TreeMenu",
  components: {
    Setting,
    Promotion,
  },
  props: {
    userMenu: {
      // type:Array,
      default() {
        return [];
      },
    },
  },
};
</script>
