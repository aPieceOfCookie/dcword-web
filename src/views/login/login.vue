<template>
  <div>
    <el-form
      :rules="rules"
      :model="user"
      ref="loginForm"
      class="loginContainer"
    >
      <h3 class="loginTitle">系统登录</h3>
      <el-form-item label="帐号" prop="username">
        <el-input placeholder="请输入帐号" v-model="user.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="user.password"
          auto-complete="false"
          placeholder="请输入密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.stop="onSubmit" round>登录</el-button>
        <el-button type="primary" @click.stop="onRegist" round>注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { postRequest } from "@/utils/api";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
export default {
  name: "login",
  setup: function () {
    const router = useRouter();
    const loginFormRef = ref(null);
    const rules = {
      username: [{ required: true, message: "请输入帐号", trigger: "blur" }],
      password: [{ required: true, message: "请输入密码", trigger: "blur" }],
    };
    let user = reactive({
      username: "",
      password: "",
    });
    const onSubmit = function () {
      postRequest("/admin/login", user).then((res) => {
        if (res.code == 200) {
          router.push("/index");
        } else {
          ElMessage.error("用户名或密码错误");
        }
      });
    };
    //到注册页面
    const onRegist = function () {
      router.push("/register");
    };
    return {
      onSubmit,
      loginFormRef,
      rules,
      user,
      onRegist,
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
