<template>
  <div class="add">
    <el-button
      size="mini"
      type="primary"
      @click.stop="baseData.dialogVisible = true"
      icon="el-icon-circle-plus-outline"
    >
      新增
    </el-button>
  </div>
  <el-table :data="baseData.tableData" style="width: 100%">
    <el-table-column prop="companyName" label="企业名称" width="180" />
    <el-table-column prop="address" label="地址" width="180"> </el-table-column>
    <el-table-column prop="creater" label="创建人"> </el-table-column>
    <el-table-column prop="createTime" label="创建时间"> </el-table-column>
    <el-table-column label="操作">
      <template v-slot="{ row }">
        <el-button type="primary" icon="el-icon-edit" circle></el-button>
        <el-button
          type="danger"
          @click.stop="removeInfo(row.companyId)"
          icon="el-icon-delete"
          circle
        ></el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog title="新增" v-model="baseData.dialogVisible" width="40%">
    <el-form
      :rules="baseData.fromRules"
      ref="company"
      :model="baseData.company"
      label-width="80px"
    >
      <el-form-item label="企业名称" prop="companyName">
        <el-input v-model="baseData.company.companyName"></el-input>
      </el-form-item>
      <el-form-item label="企业地址" prop="address">
        <el-input v-model="baseData.company.address"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button size="mini" @click="baseData.dialogVisible = false"
          >取 消</el-button
        >
        <el-button size="mini" type="primary" @click="saveCompany"
          >保存</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { reactive, onMounted } from "vue";
import { getRequest, postRequest, delRequest } from "@/utils/api";
import { ElMessageBox } from "element-plus";
export default {
  setup() {
    let baseData = reactive({
      tableData: null,
      dialogVisible: false,
      company: {
        companyName: "",
        address: "",
      },
      fromRules: {
        companyName: [
          { required: true, message: "请输入企业名称", trigger: "blur" },
        ],
        address: [
          { required: true, message: "请输入企业地址", trigger: "blur" },
        ],
      },
    });
    let loadData = () => {
      getRequest("company/getAll", {}).then((res) => {
        if (res.code == 200) {
          baseData.tableData = res.data;
        }
      });
    };
    onMounted(() => {
      loadData();
    });
    //删除
    let removeInfo = (companyId) => {
      ElMessageBox.confirm("是否删除该信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          delRequest("/company/removeCompany/" + companyId);
        })
        .then(() => {
          loadData();
        });
    };
    //保存
    let saveCompany = function () {
      let params = baseData.company;
      postRequest("/company/saveCompany", params).then((res) => {
        if (res.code == 200) {
          baseData.dialogVisible = false;
          loadData();
        }
      });
    };
    let addCompany = () => {};
    return {
      baseData,
      removeInfo,
      loadData,
      addCompany,
      saveCompany,
    };
  },
};
</script>

<style>
.add {
  border-style: hidden;
  width: 80px;
  float: right;
}
</style>
