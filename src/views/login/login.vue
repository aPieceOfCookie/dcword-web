<template>
  <div>
    <el-form :rules="rules" ref="loginForm" class="loginContainer">
      <h3 class="loginTitle">系统登录</h3>
      <el-form-item label="帐号" prop="userAccount">
        <el-input
          placeholder="请输入帐号"
          v-model="username"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="userPassword">
        <el-input
          v-model="password"
          auto-complete="false"
          placeholder="请输入密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.stop="onSubmit">登录</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ref } from "vue";
import {getRequest} from "@/utils/api";
//import { ElMessage } from 'element-plus';
export default {
  name: "login",
  setup: function () {
    const loginFormRef = ref(null);
    const rules = {
      userAccount: [
        { required: true, message: "请输入帐号", trigger: "blur" },
      ],
      userPassword:[
        { required: true, message: "请输入密码", trigger: "blur" },
      ],
    };
    const onSubmit = function () {
      getRequest("admin/user/login",{}).then((res)=>{
        console.log(res)
      });
    };
    return {
      onSubmit,
      loginFormRef,
      rules,
      username: ref(""),
      password: ref(""),
    };
  },
};
</script>

<style>
.loginContainer {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 15px 35px 15px 35px;
  background: #ffffff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.loginTitle {
  margin: 0 auto 40px auto;
  text-align: center;
}
</style>