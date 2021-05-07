import axios from "axios";
import { ElMessage } from "element-plus";
import router from "../router";

axios.interceptors.request.use(config=>{
    //token
    if (window.sessionStorage.getItem("token")) {
      config.headers[
        "HTTP2_HEADER_AUTHORIZATION"
      ] = window.sessionStorage.getItem("token");
    }
    return config;
  },
  (error) => {
    console.log(error);
});
//interceptors拦截器
axios.interceptors.response.use(
  (success) => {
    //业务逻辑错误
    if (success.status && success.status === 200) {
      if (
        success.data.code === 500 ||
        success.data.code === 401 ||
        success.data.code === 403
      ) {
        ElMessage.error({
          message: success.data.message,
        });
        return;
      }
      if (success.data.message) {
        ElMessage.success({
          message: success.data.message,
          type: "success",
        });
      }
    }
    return success.data;
  },
  //访问不到，服务器问题或者接口错误
  (error) => {
    if (error.response.code === 504) {
      ElMessage.error({ message: "服务器错误" });
    } else if (error.response.code === 404) {
      ElMessage.error({ message: "服务器错误" });
    } else if (error.response.code === 403) {
      ElMessage.warning({
        message: "权限不足,请联系管理员",
        type: "warning",
      });
    } else if (error.response.code === 401) {
      ElMessage.warning({
        message: "暂未登录",
        type: "warning",
      });
      router.replace("/");
    } else {
      if (error.response.data.message) {
        ElMessage(error.response.data.message);
      } else {
        ElMessage("未知错误");
      }
    }
    return;
  }
);
//let base="http://localhost:8081";
//let mid = "/api"; //中间体
//post请求头
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
axios.defaults.baseURL = "";
axios.defaults.timeout = 5000;
//json格式的post请求axios
export const postRequest = (url, params) => {
  return axios({
    method: "post",
    url: url,
    data: params,
  });
};

export const getRequest = (url, params) => {
  return axios({
    method: "get",
    url: url,
    data: params,
  });
};

export const delRequest = (url, params) => {
  return axios.delete(url + "?" + JSON.stringify(params));
  // return axios({
  //   method: "get",
  //   url: url,
  //   data: params,
  // });
};

export const putRequest = (url, params) => {
  return axios({
    method: "get",
    url: url,
    data: params,
  });
};