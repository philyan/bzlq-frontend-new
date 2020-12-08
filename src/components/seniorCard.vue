<template>
  <div style="width: 100%;overflow-x: hidden;">
    <div v-if="openType">
      <div class="info" id="newImg">
        <img src="https://api.ostep.com.cn/file/spec/BZLQ_LOGO.png" alt="" style="width: 0.71rem;height: 0.57rem;position: absolute;top: 0;left: 0.03rem;z-index: 1;" crossorigin="anonymous">
        <img src="https://api.ostep.com.cn/file/spec/signet.png" alt="" style="width: 1rem;height: 1rem;position: absolute;bottom: 1.6rem;right: 0.3rem;z-index: 1;" crossorigin="anonymous">
        <h3>巴中龙泉外国语学校</h3>
        <h3>2020年直升考试</h3>
        <h2 style="margin-bottom: 0.3rem">准考证</h2>
        <div class="card-box">
          <div class="card-info">
            <div><p class="info-name">毕业学校</p><p class="info-cont">{{infoData.primary_school}}&nbsp;</p></div>
            <div><p class="info-name">姓名</p><p class="info-cont">{{infoData.name}}</p></div>
            <div><p class="info-name">性别</p><p class="info-cont">{{infoData.gender | genderFilter}}</p></div>
            <div><p class="info-name">报名类型</p><p class="info-cont">直升</p></div>
            <div><p class="info-name">报名序号</p><p class="info-cont">{{infoData.no}}</p></div>
            <div><p class="info-name">考试地点</p><div class="info-cont"><p>巴中龙泉外国语学校教学楼</p></div></div>
          </div><div class="card-photo">
            <div><img style="width: 1rem;height: 1.4rem;position: relative;z-index: -1" :src="infoData.photo" alt=""></div>
          </div>
        </div>
        <!--<el-row>
          <el-col :span="16" style="border-bottom: none">
            <el-col :span="10">毕业学校</el-col>
            <el-col :span="14"><p>{{infoData.primary_school}}&nbsp;</p></el-col>
            <el-col :span="10">姓名</el-col>
            <el-col :span="14">{{infoData.name}}&nbsp;</el-col>
            <el-col :span="10">性别</el-col>
            <el-col :span="14">{{infoData.gender | genderFilter}}&nbsp;</el-col>
            <el-col :span="10">报名类别</el-col>
            <el-col :span="14">直升</el-col>
            <el-col :span="10">报名序号</el-col>
            <el-col :span="14"><p>{{infoData.no}}&nbsp;</p></el-col>
            <el-col :span="10">考试地点</el-col>
            <el-col :span="14"><p>巴中龙泉外国语学校教学楼</p></el-col>
          </el-col>
          <el-col :span="8" style="border-bottom: none">
            <div><img style="width: 1rem;height: 1.4rem;margin-top: 0.4rem" :src="infoData.photo" alt=""></div>
          </el-col>
        </el-row>-->
        <div class="senior-time">
          <h4>考试时间及科目安排</h4>
          <table>
            <tr>
              <td style="width: 15%" rowspan="3">
                <p>直</p>
                <p>升</p>
              </td>
              <td style="width: 30%" rowspan="3">
                <p>考试日期</p>
                <p>待通知</p>
              </td>
              <td style="width: 35%">8:00-10:00</td>
              <td style="width: 20%">语文</td>
            </tr>
            <tr>
              <td>10:20-12:20</td>
              <td>数学</td>
            </tr>
            <tr>
              <td>14:00-16:00</td>
              <td>英语</td>
            </tr>
          </table>
        </div>
      </div>
      <div v-if="createBtn">
        <el-button type="primary" @click="imgCreate">点击生成图片, 然后长按屏幕选择保存到手机</el-button>
      </div>
    </div>
    <el-row v-if="!openType" style="padding: 0.2rem;">
      <div style="height: 0.6rem">巴中龙泉外国语学校<br><b>初升高直升考试准考证查看</b></div>
      <el-col :span="24">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <el-form-item prop="name">
            <h3><span></span>学生中文名/Student Chinese Name</h3>
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item prop="identity_num">
            <h3><span></span>身份证号码/No.</h3>
            <el-input v-model="ruleForm.identity_num" placeholder="请输入/Please input..."></el-input>
          </el-form-item>
          <el-form-item style="margin-top: 0.3rem;">
            <el-button type="primary" @click="submitForm('ruleForm')">查询</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import html2canvas from 'html2canvas'
  import { MessageBox, Message } from 'element-ui'

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
    name: 'seniorCard',
    data() {
      return {
        openType: false,
        createBtn: true,
        infoData: {
          level:{}
        },
        ruleForm: {
          name: '',
          identity_num: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入/Please input...', trigger: 'blur'}
          ],
          identity_num: [
            {required: true, message: '请输入/Please input...', trigger: 'change'},
            {
              pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
              message: '请输入正确的身份证号码格式',
              trigger: 'blur'
            }
          ]
        },
      }
    },
    mounted(){
      if(getQuery('code')){
        this.axios.get(`https://api.ostep.com.cn/bzlq/candidate/senior/getByCode?js_code=${getQuery('code')}`).then(res => {
          if (res.data.result_code === 200) {
            this.openType = true
            this.infoData = res.data.data
            if(!this.infoData.level){
              this.infoData.level = {}
            }
          } else if (res.data.result_code === 401) {
            this.openType = false
          } else {
            MessageBox.alert(`<strong style="color: red">${res.data.msg}</strong>`, '提示', {
              dangerouslyUseHTMLString: true,
              closeOnClickModal: true,
              showConfirmButton: false,
              showClose: true
            })
          }
        })
      } else if(getQuery('id')){
        this.axios.get(`https://api.ostep.com.cn/bzlq/candidate/senior/get?id=${getQuery('id')}`).then(res => {
          if (res.data.result_code === 200) {
            this.openType = true
            this.infoData = res.data.data
            if(!this.infoData.level){
              this.infoData.level = {}
            }
          } else if (res.data.result_code === 401) {
            this.openType = false
          } else {
            MessageBox.alert(`<strong style="color: red">${res.data.msg}</strong>`, '提示', {
              dangerouslyUseHTMLString: true,
              closeOnClickModal: true,
              showConfirmButton: false,
              showClose: true
            })
          }
        })
      }
    },
    computed: {},
    methods: {
      submitForm(formName) {
        let query = JSON.parse(JSON.stringify(this.ruleForm))
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios.get(`https://api.ostep.com.cn/bzlq/candidate/getByIdNumAndName?id_num=${query.identity_num}&name=${query.name}`).then(res => {
              if (res.data.result_code === 200) {
                this.openType = true
                this.infoData = res.data.data
                if(!this.infoData.level){
                  this.infoData.level = {}
                }
              } else {
                MessageBox.alert(`<strong style="color: red">${res.data.msg}</strong>`, '提示', {
                  dangerouslyUseHTMLString: true,
                  closeOnClickModal: true,
                  showConfirmButton: false,
                  showClose: true
                })
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      imgCreate(){
        window.pageYOffset = 0;
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
        this.createBtn = false
        let opts = {useCORS: true,allowTaint: false};
        html2canvas(document.getElementById("newImg"), opts).then(function (canvas) {
          let imgUri = canvas.toDataURL("image/jpeg", 2); // 获取生成的图片的url
          document.getElementById("newImg").innerHTML = `<img src="${imgUri}" alt="" style="width: 100%"/>`;
        })
      },
    },
    filters: {
      genderFilter(value){
        let map = {
          'male': '男',
          'female': '女'
        }
        return map[value] ? map[value] : ''
      }
    }
  }
</script>

<style lang="less" scoped>
  .card-box{
    width: 100%;
    .card-info{
      display: inline-block;
      width: 68%;
    }
    .card-photo{
      display: inline-block;
      width: 32%;
      vertical-align: top;
      margin-top: 0.1rem;
    }
    .info-name{
      text-align: justify;
      display: inline-block;
      width: 38%;
      padding-right: 2%;
    }
    .info-cont{
      display: inline-block;
      width: 60%;
      border-bottom: 1px solid #ccc;
      p{
        white-space:nowrap;
      }
    }
    .info-name::after, .info-name::before, .info-cont::after, .info-cont::before{
      display: inline-block;
      width: 100%;
      content: '';
      height: 0;
    }
  }
  .demo-ruleForm {
    h3 {
      line-height: 28px;
      text-align: left;
      font-weight: normal;
      span {
        display: inline-block;
        width: 10px;
        height: 10px;
        background-color: #F56C6C;
        border-radius: 5px;
        margin-right: 0.05rem;
      }
    }
  }
  .info {
    padding: 0.1rem 0.1rem 0.3rem;
    line-height: 0.8;
    text-align: center;
    position: relative;
    .el-col{
      padding: 0 0.05rem;
      p{
        white-space:nowrap;
      }
    }
    h3{
      font-size: 0.16rem;
      line-height: 1.5;
    }
    h2{
      font-size: 0.28rem;
      line-height: 1.5;
    }
  }
  .senior-time{
    padding: 0 0.1rem;
    margin-top: 0.1rem;
    h4{
      line-height: 0.4rem;
      font-size: 0.18rem;
      font-weight: bold;
    }
    table{
      width: 100%;
      border: 0.01rem solid #ccc;
      td{
        height: 0.4rem;
        line-height: 1.5;
        border-bottom: 0.01rem solid #ccc;
        border-left: 0.01rem solid #ccc;
      }
    }
  }
</style>
<style>
  .el-message-box{
    width: 2.4rem !important;
  }
</style>
