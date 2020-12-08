<template>
  <div class="login-bg">
    <div class="login-box">
      <h4 class="login-title">巴中龙泉外国语学校</h4>
      <el-form ref="loginForm" :model="formData" :rules="rules" class="login-form">
        <el-form-item prop="username">
          <el-input v-model="formData.username" :clearable="true" size="large" :autofocus="true" placeholder="请输入用户名">
            <i slot="prefix" class="el-input__icon self-icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="psd">
          <el-input v-model="formData.psd" :clearable="true" type="password" placeholder="请输入密码"
                    @keyup.enter.native="checkLogin">
            <i slot="prefix" class="el-input__icon self-icon-password">&ensp;</i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="checkLogin" style="width:100%;">登 录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { Loading, MessageBox } from 'element-ui'
  import { saveSessionItem } from '../common/util'
  export default {
    data() {
      return {
        formData: {
          orgCode: undefined,
          username: undefined,
          psd: undefined
        },
        orgList: [],
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          psd: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      login(){
        let params = {
          username: this.formData.username,
          password: this.formData.psd
        }
        this.axios.post(`https://api.ostep.com.cn/bzlq/checkPass?username=${params.username}&password=${params.password}`).then(res => {
          if (res.data.result_code === 200) {
            saveSessionItem('token', res.data.data.token)
            this.$router.push({path: '/seniorList'})
          } else {
            MessageBox.alert(`<strong style="color: red">${res.data.msg}</strong>`, '提示', {
              dangerouslyUseHTMLString: true,
              closeOnClickModal: true,
              showConfirmButton: true,
              showClose: true
            })
          }
        })
      },
      checkLogin() {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.login()
          } else {
            return false
          }
        })
      }
    },
    mounted(){
      window.onbeforeunload = function (e) {
        localStorage.removeItem('flag');
        let storage = window.localStorage;
        storage.clear()
      }
    }
  }
</script>

<style scoped lang="less">
  .login-bg {
    width: 100%;
    height: 100%;
    background: #314755;
    background: -webkit-linear-gradient(to left, #314755, #26a0da);
    background: linear-gradient(to left, #314755, #26a0da);
    background-size: cover;
    position: fixed;

  }

  .login-box {
    width: 450px;
    height: 450px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -225px;
    margin-top: -225px;
    background: rgba(255, 255, 255, .7);
    background-size: 450px 450px;
    border: 1px solid #fff;
    border-radius: 8px;

    .login-title {
      color: rgb(45, 62, 78);
      font: normal 36px/1.3em 'Microsoft YaHei';
      margin-top: 72px;
      text-align: center;
    }

    .login-form {
      margin: 72px 36px 0;
    }
  }

  .el-message-box{
    width: 480px !important;
  }
</style>
