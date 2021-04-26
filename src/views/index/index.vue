<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <aside-view />
    <el-container>
      <head-view />
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import HeadView from "@/components/headView/headView.vue";
import AsideView from "@/components/asideView/asideView.vue";
export default {
  name: "index",
  components: {
    HeadView,
    AsideView,
  },
  setup() {},
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
