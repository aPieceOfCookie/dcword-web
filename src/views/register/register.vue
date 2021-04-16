<template>
  <el-form  ref="form" :model="user" label-width="80px">
    <el-form-item label="用户名">
      <el-input v-model="user.username"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="user.password"></el-input>
    </el-form-item>
    <el-form-item label="确认密码">
      <el-input v-model="user.againPassword"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="regist">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { postRequest } from "@/utils/api";
import { useRouter } from "vue-router";
export default {
  name: "register",
  setup: function () {
    const router=useRouter();
    let user = {
      username: "",
      password: "",
      againPassword: "",
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (rule.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    /*let rule={
      password: [
          required:true,message: "请输入密码",
      ]
    };*/
    let regist = function(){
      postRequest("/admin/regist", user).then((res) => {
        if (res.code == 200) {
          router.push("/index")
        }
      })
    }
    return {
      user,
      regist,
      validatePass,
    };
  },
};
</script>

<style scoped></style>
