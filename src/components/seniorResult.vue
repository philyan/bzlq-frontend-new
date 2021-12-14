<template>
  <div class="box">
    <h2>巴中龙泉外国语学校招生考试成绩查询</h2>
    <el-row v-if="openType">
      <el-col :span="24">
        <p>{{fetchData.name}}</p>
        <p class="indent">{{fetchData.notice}}</p>
        <p class="text-center" v-for="item in fetchData.subject_points">
          {{item.subject}}：{{item.points}}
        </p>
        <p class="indent">{{fetchData.level.label}}：{{fetchData.level.value}}</p>
        <p class="indent">{{fetchData.grade.label}}：{{fetchData.grade.value}}</p>
      </el-col>
      <el-col v-if="showPass">
        <p class="indent">{{fetchData.fee.label}}：{{fetchData.fee.value}}/学期</p>
        <p class="indent">{{fetchData.homestayFee.label}}：{{fetchData.homestayFee.value}}/学期</p>
        <p class="indent">{{fetchData.incidentalFee.label}}：{{fetchData.incidentalFee.value}}/学期</p>
        <p class="indent">{{fetchData.description.label}}{{fetchData.description.value}}</p>
      </el-col>
      <el-col>
        <p style="padding-left: 2em">咨询电话: 0827–5281170     5281172</p>
        <p class="indent">{{fetchData.subname}}</p>
      </el-col>
    </el-row>
    <el-row v-if="!openType">
      <el-col :span="24">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <el-form-item prop="name">
            <h3><span></span>学生中文名/Student Chinese Name</h3>
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item prop="identity_num">
            <h3><span></span>手机号码(本人、父母亲手机号均可)/Phone.</h3>
            <el-input v-model="ruleForm.phone" placeholder="请输入/Please input..."></el-input>
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
    name: 'fetch',
    data() {
      return {
        ruleForm: {
          name: '',
          phone: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入考生姓名/Please input...', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入手机号/Please input...', trigger: 'change'},
            {
              pattern: /^1[34578]\d{9}$/,
              message: '请输入正确的手机格式',
              trigger: 'blur'
            }
          ]
        },
        openType: false,
        fetchData: {
          level: {},
          fee: {}
        },
        showPass: true
      }
    },
    mounted(){}
    ,
    computed: {}
    ,
    methods: {
      submitForm(formName) {
        let query = JSON.parse(JSON.stringify(this.ruleForm))
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios.get(`http://api.ostep.com.cn/bzlq/candidate/senior/result?phone=${query.phone}&name=${query.name}
`).then(res => {
              if (res.data.result_code === 200) {
                this.openType = true
                this.fetchData = res.data.data
                if(this.fetchData.level.value == '未录取'){
                   this.showPass = false
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
      }
    }
  }
</script>

<style lang="less" scoped>
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

  .box {
    padding: 0.2rem 0.2rem 0.1rem;
    h2 {
      margin-bottom: 0.2rem;
    }
    p {
      text-align: left;
      line-height: 2;
    }
    .indent {
      text-indent: 2em;
    }
    .text-center {
      text-align: center;
    }
  }
</style>
<style>
  .banner-hide .el-upload--picture-card {
    display: none;
  }

  .el-upload--picture-card:hover, .el-upload:focus {
    border: none;
  }
  .el-message-box{
    width: 2.4rem !important;
  }
</style>
