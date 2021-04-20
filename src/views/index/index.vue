<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu v-for="menu in menuList.menuData" :key="menu">
        <el-submenu :index="menu.grade + ''">
          <template #title>
            <i
              :class="menu.iconImg == null ? 'el-icon-warning' : menu.iconImg"
            />
            {{ menu.menuName }}
          </template>
          <el-menu-item-group v-for="item in menu.childList" :key="item">
            <el-menu-item
              v-if="item.grade == 2"
              :index="menu.sn + '-' + item.sn"
              v-on:click="toDirect(item.route)"
            >
              {{ item.menuName }}
            </el-menu-item>
            <!-- <el-menu-item v-if="item.grade==3" :index="menu.grade+'-'+ item.grade + '-' + item.sn "> {{ item.menuName }} </el-menu-item> -->
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>

      <el-main>
        <!-- <el-table :data="tableData">
          <el-table-column prop="date" label="日期" width="140">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
        </el-table> -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { onMounted, reactive } from "vue";
import { getRequest } from "@/utils/api";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { valueIsNull1 } from "@/utils/validate";
export default {
  name: "index",
  setup() {
    let router = useRouter();
    let menuList = reactive({
      menuData: Object,
    });
    onMounted(() => {
      getRequest("/menu/getMenuList").then((res) => {
        if (res.code == 200) {
          menuList.menuData = res.data;
        }
      });
    });
    let toDirect = function (route) {
      if (valueIsNull1(route)) {
        router.push(route);
      } else {
        ElMessage.error("路由错误");
      }
    };
    return {
      menuList,
      toDirect,
    };
  },
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
