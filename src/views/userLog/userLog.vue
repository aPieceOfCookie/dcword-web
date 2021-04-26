<template>
  <el-table :data="baseData.tableData" style="width: 100%">
    <el-table-column prop="date" label="日期" width="180"> </el-table-column>
    <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
    <el-table-column prop="address" label="地址"> </el-table-column>
  </el-table>
</template>

<script>
import { reactive, onMounted } from "vue";
import { getRequest } from "@/utils/api";
export default {
  setup() {
    let baseData = reactive({
      tableData: null,
    });
    const getUserLogList = () => {
    console.log("进入方法");
      getRequest("/userLog/getAll", {}).then((res) => {
        if (res.code == 200) {
          //baseData.tableData
        }
      });
    };
    onMounted({
      getUserLogList,
    });

    return {
      baseData,
      getUserLogList,
    };
  },
};
</script>

<style></style>
