<template>
   <el-dialog title="错误链接,请联系管理员" :visible.sync="seeDialog" v-if="seeDialog">
          <div>
            <img src="http://api.ostep.com.cn/file/spec/signet.png" alt="" style="width: 71px;height: 57px;position: absolute;top: 0;left: 5px;z-index: 1;" crossorigin="anonymous">
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="seeDialog = false">关闭</el-button>
          </div>
        </el-dialog>
</template>

<script>
  import Vue from "vue";
  import {MessageBox, Message, Loading} from 'element-ui'
  import { Popup, Uploader, Button } from "vant";
  Vue.use(Popup)
  .use(Uploader)
  .use(Button);
  import { VueCropper } from "vue-cropper";
  import config from "../utils/config";
  import axios from 'axios';

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
    name: 'registerLink',
    data() {
      return {
        seeDialog: false,
        linkParam: this.$route.params.link,
        level: this.$route.query.level,
      }
    },
    mounted() {
      
    },
    computed: {

    },
    created() {
       this.link()
    },
    methods: {
       link(){
         console.log(this.level)
         if(this.level === 'junior'){
            // this.$router.push({name: 'registerByMobileExpire',params:{message:'小升初报名已结束!'}})
           this.$router.push({name: 'juniorListMobile'})
         }else if(this.level === 'senior'){
           this.$router.push({name: 'seniorListMobile'})
         }else{
           this.seeDialog = true
         }
       },
       
    }
  }
</script>

<style lang="less" scoped>
  .box {
    padding: 0.2rem 0.2rem 0.1rem;
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
        margin-right: 0.05rem;
      }
    }
  }
</style>
<style>
  .banner-hide .el-upload--picture-card{
    display: none;
  }
  .el-upload--picture-card:hover, .el-upload:focus{
    border: none;
  }
  .el-message-box{
    width: 2.4rem !important;
  }
  .el-select-dropdown__wrap{
    margin-bottom: 0 !important;
  }
</style>
