<template>
  <div class="box">
    <h2>巴中龙泉外国语学校六年级综合素质测评报名</h2>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <el-form-item prop="name">
        <h3><span></span>学生中文名/Student Chinese Name</h3>
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item prop="gender">
        <h3><span></span>性别/Gender</h3>
        <el-select style="width: 100%" v-model="ruleForm.gender" placeholder="请选择/Please select...">
          <el-option label="男/Male" value="male"></el-option>
          <el-option label="女/Female" value="female"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item  prop="identity_num">
        <h3><span></span>身份证号码/No.</h3>
        <el-input v-model="ruleForm.identity_num" placeholder="请输入/Please input..."></el-input>
      </el-form-item>
      <el-form-item prop="parent_phone">
        <h3><span></span>父亲手机号/Father's Mobile Phone</h3>
        <el-input v-model="ruleForm.parent_phone"></el-input>
      </el-form-item>
      <el-form-item prop="parent_phone_back">
        <h3><span></span>母亲手机号/Mother's Mobile Phone</h3>
        <el-input v-model="ruleForm.parent_phone_back"></el-input>
      </el-form-item>
      <el-form-item prop="region">
        <h3><span></span>毕业学校所在区县/District</h3>
        <el-select style="width: 100%" v-model="ruleForm.region" placeholder="请选择/Please select...">
          <el-option label="通江" value="通江"></el-option>
          <el-option label="南江" value="南江"></el-option>
          <el-option label="巴州" value="巴州"></el-option>
          <el-option label="平昌" value="平昌"></el-option>
          <el-option label="恩阳" value="恩阳"></el-option>
          <el-option label="外地" value="外地"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="primary_school">
        <h3><span></span>毕业学校/Graduate from</h3>
        <el-input v-model="ruleForm.primary_school"></el-input>
      </el-form-item>
      <el-form-item prop="class_no">
        <h3><span></span>班号/Class</h3>
        <el-select style="width: 100%" v-model="ruleForm.class_no" placeholder="请选择/Please select...">
          <el-option v-for="(item,index) in classList" :key="index" :label="item.label" :value="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="head_teacher">
        <h3><span></span>班主任/Head Teacher</h3>
        <el-input v-model="ruleForm.head_teacher"></el-input>
      </el-form-item>
      <el-form-item prop="head_teacher_phone">
        <h3><span></span>班主任电话/Head Teacher's Phone</h3>
        <el-input v-model="ruleForm.head_teacher_phone"></el-input>
      </el-form-item>
      <el-form-item prop="photo" style="text-align: left">
        <h3><span></span>上传附件/Attachments</h3>
        <p style="margin: 0;padding: 0;line-height: 20px;color: #aaa;">近期1寸免冠照片<span style="color: red;font-size: 0.1rem;">(大小不超过3M,格式为PNG/JPG/JPEG)</span></p>
        <el-upload
          :action="uploadUrl"
          :show-file-list="false"
          list-type="picture-card"
          :on-success="bannerSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="ruleForm.photo" :src="ruleForm.photo" class="avatar">
          <i v-else class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item style="margin-top: 0.3rem;">
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {MessageBox, Message, Loading} from 'element-ui'

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
    name: 'senior',
    data() {
      return {
        uploadUrl: 'http://106.13.40.93:8000/bzlq/file/upload/image',
        openId: '',
        loading: '',
        classList: [],

        ruleForm: {
          "name":"", //姓名
          "gender":"", //性别
          "identity_num":"",  //身份证号码
          "parent_phone":"", //父母电话1
          "parent_phone_back":"",  //父母电话2
          "region":"", //区域
          "primary_school":"", //毕业学校
          "class":"",  //班级
          "head_teacher":"",  //班主任
          "head_teacher_phone":"",  //电话
          "photo": ""
        },
        rules: {
          name: [
            { required: true, message: '请输入/Please input...', trigger: 'blur' }
          ],
          gender: [
            { required: true, message: '请选择/Please select...', trigger: 'change' }
          ],
          identity_num: [
            { required: true, message: '请输入/Please input...', trigger: 'change' },
            {pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '请输入正确的身份证号码格式', trigger: 'blur'}
          ],
          parent_phone: [
            { required: true, message: '请输入/Please input...', trigger: 'change' },
            {pattern: /^1[0-9]{10}$/, message: '请输入正确的手机号格式', trigger: 'blur'}
          ],
          parent_phone_back: [
            { required: true, message: '请输入/Please input...', trigger: 'change' },
            {pattern: /^1[0-9]{10}$/, message: '请输入正确的手机号格式', trigger: 'blur'}
          ],
          region: [
            { required: true, message: '请选择/Please select...', trigger: 'blur' }
          ],
          primary_school: [
            { required: true, message: '请输入/Please input...', trigger: 'blur' }
          ],
          class_no: [
            { required: true, message: '请选择/Please select...', trigger: 'blur' }
          ],
          head_teacher: [
            { required: true, message: '请输入/Please input...', trigger: 'blur' }
          ],
          head_teacher_phone: [
            { required: true, message: '请输入/Please input...', trigger: 'blur' },
            {pattern: /^1[0-9]{10}$/, message: '请输入正确的手机号格式', trigger: 'blur'}
          ],
          photo: [{
            required: true, trigger: 'blur', validator: (rule, value, callback) => {
              if (!this.ruleForm.photo) {
                callback(new Error('请上传一寸照片'))
              } else {
                callback()
              }
            }
          }]
        }
      }
    },
    mounted() {
      this.classList = (() => {
        let arr = []
        for(let i=1; i<31; i++){
          arr.push({label: i + '班'})
        }
        return arr
      })()
      this.axios.get('http://106.13.40.93:8000/bzlq/candidate/junior/getByCode?js_code=' + getQuery('code')).then(res => {
        if(res.data.result_code === 200){
          this.ruleForm = res.data.data
        } else if(res.data.result_code === 401){
          this.openId = res.data.data?res.data.data.openid:''
        }  else {
          MessageBox.alert(`<strong style="color: red">${res.data.msg}</strong>`, '提示', {
            dangerouslyUseHTMLString: true,
            closeOnClickModal: true,
            showConfirmButton: false,
            showClose: true
          })
        }
      })
    },
    computed: {},
    methods: {
      openFullScreen1() {
        this.loading = Loading.service({
          lock: true,
          text: '图片上传中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      },
      beforeAvatarUpload(file) {
        this.openFullScreen1()
        const isJPG = file.type === 'image/jpeg' || 'image/JPEG' || 'image/jpg' || 'image/JPG' || 'image/png' || 'image/PNG';
        const isLt1M = file.size / 1024 / 1024 < 3;

        if (!isJPG) {
          Message({
            message: '上传头像图片只能是 JPG 格式!',
            type: 'error'
          })
        }
        if (!isLt1M) {
          Message({
            message: '上传头像图片大小不能超过 3MB!',
            type: 'error'
          })
        }
        return isJPG && isLt1M;
      },
      bannerSuccess(res, file) {
        this.loading.close();
        this.ruleForm.photo= res
      },
      submitForm(formName) {
        let query = JSON.parse(JSON.stringify(this.ruleForm))
        if(this.openId){
          query.openid = this.openId
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios.post('http://106.13.40.93:8000/bzlq/candidate/junior/save', query).then(res => {
              if(res.data.result_code === 200){
                MessageBox.alert(`<strong style="color: blue">${res.data.msg}</strong>`, '成功提示', {
                  dangerouslyUseHTMLString: true,
                  closeOnClickModal: true,
                  showConfirmButton: false,
                  showClose: true
                })
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
        this.ruleForm.photo = ''
      }

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
