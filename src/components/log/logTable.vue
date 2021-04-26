<template>
  <div></div>
</template>

<script>
import { reactive } from 'vue';
import { getRequest } from "@/utils/api";
export default {
  setup(){
    let logData=reactive({
      logList: null
    });
    // onMounted({
    //   loadData();
    // });
    let loadData= function(){
      getRequest( "/log/getUserLogList",{}).then((res)=>{
        if(res.code==200){
          logData.logList=res.data;
        }
      })
    }
    return{
      logData,
      loadData,
    }
  }
}
</script>

<style>

</style>