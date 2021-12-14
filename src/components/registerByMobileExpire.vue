<template>
  <el-container>
    <el-main>
       <el-dialog title="" :visible.sync="seeDialog" v-if="seeDialog" width="60%">
            <span>{{message}}</span>
        </el-dialog>
    </el-main>
  </el-container>
</template>
<script>
  import Vue from "vue";
  import { Popup, Uploader, Button } from "vant";
  Vue.use(Popup)
  .use(Uploader)
  .use(Button);

  const getQuery = (variable) => {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
      let pair = vars[i].split("=");
      if (pair[0] == variable) {
        return pair[1]
      }
    }
    return false;
  }

  export default {
    name: 'RegisterByMobileExpire',
    data () {
      return {
        message: '',
        seeDialog: true,
      }
    },
    mounted () {
      this.message = this.$route.params.message
    },
    created(){
      
    },
    methods: {

    }
  }
</script>
<style lang='less' scoped>
  .list{
    text-align: left;
    h2{
      text-align: center;
      line-height: 60px;
      margin-bottom: 10px;
      font-size: 24px;
    }
  }
  .info {
    padding: 10px;
    line-height: 0.8;
    text-align: center;
    position: relative;
    .el-col{
      padding: 0 5px;
      p{
        white-space:nowrap;
      }
    }
    h3{
      font-size: 16px;
      line-height: 1.5;
    }
    h2{
      font-size: 28px;
      line-height: 1.5;
    }
  }
  .box {
    padding: 0;
    h2{
      margin-bottom: 0.1rem;
    }
    .el-form-item{
      margin-bottom: 16px;
    }
    .avatar{
      width: 148px;
      height: 148px;
      display: block;
    }
    h3{
      line-height: 28px;
      text-align: left;
      font-weight: normal;
      span{
        display: inline-block;
        width: 10px;
        height: 10px;
        background-color: #F56C6C;
        border-radius: 5px;
        margin-right: 5px;
      }
    }
  }
</style>
<style>
  .info .el-col-18, .info .el-col-4, .info .el-col-8{
    border-bottom: 1px solid #ccc;
  }
  .info .el-col-6::after, .info .el-col-18::after, .info .el-col-8::after, .info .el-col-4::after {
    display: inline-block;
    width: 100%;
    content: '';
    height: 0;
  }
  .info .el-col-6::before, .info .el-col-18::before, .info .el-col-8::before, .info .el-col-4::before {
    display: inline-block;
    width: 100%;
    content: '';
    height: 0;
  }
  .info .el-col-6{
    text-align: justify;
  }
</style>

