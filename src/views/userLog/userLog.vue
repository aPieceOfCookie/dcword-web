<template>
  <el-table :data="baseData.tableData" style="width: 100%">
    <el-table-column
      prop="loginTime"
      value-format="yyyy-MM-dd HH:hh:ss"
      label="日期"
      width="180"
    />
    <el-table-column prop="ip" label="姓名" width="180"> </el-table-column>
    <el-table-column prop="address" label="地址"> </el-table-column>
    <el-table-column label="操作">
      <template v-slot="{ row }">
        <el-button type="primary" icon="el-icon-edit" circle></el-button>
        <el-button
          type="danger"
          @click.stop="removeInfo(row.logId)"
          icon="el-icon-delete"
          circle
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { reactive, onMounted } from "vue";
import { getRequest, delRequest } from "@/utils/api";
export default {
  setup() {
    let baseData = reactive({
      tableData: null,
    });
    let loadData = () => {
      getRequest("/userLog/getAll", {}).then((res) => {
        if (res.code == 200) {
          baseData.tableData = res.data;
        }
      });
    };
    onMounted(() => {
      loadData();
    });
    let removeInfo = (logId) => {
      delRequest("/userLog/delOne", { logId: logId  });
    };
    return {
      baseData,
      removeInfo,
      loadData,
    };
  },
};
</script>

<style></style>
