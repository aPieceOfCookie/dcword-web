<template>
  <div></div>
</template>

<script>
import { onMounted, reactive } from 'vue'
export default {
  setup(){
    let logData=reactive({
      logList: null
    })
    onMounted({
      getRequest("/log/getUserLogList",{}).then((res)=>{
        if(res.code==200){
          logData.logList=res.data;
        }
      })
    });
    return{
      logData,
    }
  }
}
</script>

<style>

</style>