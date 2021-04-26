<template>
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu v-for="menu in menuList.menuData" :key="menu">
      <el-submenu :index="menu.grade + ''">
        <template #title>
          <i :class="menu.iconImg == null ? 'el-icon-warning' : menu.iconImg" />
          {{ menu.menuName }}
        </template>
        <el-menu-item-group v-for="item in menu.childList" :key="item">
          <el-menu-item v-if="item.grade == 2" :index="item.route" v-on:click="toDirect(item.route)"> 
            {{ item.menuName }}
          </el-menu-item>
          <!-- <el-menu-item v-if="item.grade==3" :index="menu.grade+'-'+ item.grade + '-' + item.sn "> {{ item.menuName }} </el-menu-item> -->
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
import { onMounted, reactive } from "vue";
import { getRequest } from "@/utils/api";
//import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { valueIsNull1 } from "@/utils/validate";
export default {
  setup() {
    //let router = useRouter();
    let menuList = reactive({
      menuData: Object,
      url: "",
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
        menuList.url = "/index" + route;
        console.log(menuList.url);
        //router.push(route);
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

<style></style>
