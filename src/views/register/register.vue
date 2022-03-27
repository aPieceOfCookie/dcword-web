<template>
  <el-form :rules="rules" ref="userForm" :model="user" label-width="80px">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="user.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="user.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" ref="pa" prop="againPassword">
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
import { ref, reactive } from "vue";
export default {
  name: "register",
  setup: function () {
    const userForm = ref(null);
    const pa = ref(null);
    const router = useRouter();
    let user = reactive({
      username: "",
      password: "",
      againPassword: "",
    });
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (user.password != "") {
          console.log(1);
          //pa;
          //this.$refs.userForm.validateField("againPassword");
        }
        callback();
      }
    };
    const validateAgainPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码"));
      } else {
        if (value != user.password) {
          callback(new Error("两次密码输入不一致，请确认！"));
        }
        callback();
      }
    };
    let rules = {
      password: [{ validator: validatePass, trigger: "blur" }],
      username: [{ required: true, message: "请输入帐号", trigger: "blur" }],
      againPassword: [{ validator: validateAgainPass, trigger: "blur" }],
    };
    let regist = function () {
      postRequest("/admin/register", user).then((res) => {
        if (res.code == 200) {
          router.push("/");
        }
      });
    };
    return {
      userForm,
      user,
      regist,
      validatePass,
      rules,
      pa,
    };
  },
};
</script>

<style scoped></style>
