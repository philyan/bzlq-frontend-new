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
        <p class="indent">{{fetchData.fee.label}}：{{fetchData.fee.value}}</p>
        <p class="indent">备注：</p>
        <p style="padding-left: 2em">1.咨询电话0827–5281170     5281172</p>
        <p style="padding-left: 2em">2.就读报名方式:招生办现场报读或线上报读(按提示操作)。</p>
        <p style="padding-left: 2em">3.即日起开始就读报名，学位有限，名额报完截止。</p>
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
        openType: false,
        fetchData: {
          level: {},
          fee: {}
        }
      }
    },
    mounted(){
      this.axios.get('http://106.13.40.93:8000/bzlq/candidate/result?js_code=' + getQuery('code')).then(res => {
        if (res.data.result_code === 200) {
          this.openType = true
          this.fetchData = res.data.data
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
    ,
    computed: {}
    ,
    methods: {
      submitForm(formName) {
        let query = JSON.parse(JSON.stringify(this.ruleForm))
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios.get(`http://106.13.40.93:8000/bzlq/candidate/result/byIdNumAndName?id_num=${query.identity_num}&name=${query.name}
`).then(res => {
              if (res.data.result_code === 200) {
                this.openType = true
                this.fetchData = res.data.data
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
