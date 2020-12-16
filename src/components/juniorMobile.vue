<template>
  <div class="box">
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
        <p style="margin: 0;padding: 0;line-height: 20px;color: #aaa;">近期1寸免冠照片<span style="color: red;font-size: 0.1rem;">(大小不超过2M,格式为PNG/JPG/JPEG)</span></p>
        <!-- <el-upload
          :action="uploadUrl"
          :show-file-list="false"
          list-type="picture-card"
          :on-success="bannerSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="ruleForm.photo" :src="ruleForm.photo" class="avatar">
          <i v-else class="el-icon-plus"></i>
        </el-upload> -->
         <img v-if="ruleForm.photo" :src="ruleForm.photo" class="avatar">
         <el-button type="text" @click="dialogVisible = true">点击上传照片</el-button>
        <el-dialog
          title=""
          :visible.sync="dialogVisible"
          width="90%">
            <div class="dialog">
            <label
              class="btn btn-orange"
              for="uploads"
              style="display:inline-block;width: 100%;padding: 0;font-size: 16px; font-weight: bold;"
            >点击此处选择照片</label>
            <input
              type="file"
              id="uploads"
              style="position:absolute; clip:rect(0 0 0 0);"
              accept="image/png, image/jpeg, image/gif, image/jpg"
              @change="beforeAvatarUploadPS"
            />
            <!-- 剪切图片的弹框-->
            <div class="upload-dialog" id="cutImagBox">
              <a-modal title="图片裁剪" class="upload_dialog_a" v-model="isCropper" :on-ok="false" footer>
                <el-form-item style="margin-top: 0.1rem;">
                    <el-button type="primary" @click="turnRight">旋转</el-button>
                    <el-button type="primary" @click="changeScale(2)">放大</el-button>
                    <el-button type="primary" @click="changeScale(-2)">缩小</el-button>
                  </el-form-item>
                <div class="vue-cropper-box">
                  <div class="vue-cropper-content" style="height:200px;width:100%;">
                        <vueCropper
                          style="height:200px;"
                          ref="cropper"
                          :img="option.img"
                          :outputSize="option.size"
                          :outputType="option.outputType"
                          :info="option.info"
                          :full="option.full"
                          :canMove="option.canMove"
                          :canMoveBox="option.canMoveBox"
                          :centerBox="option.centerBox"
                          :original="option.original"
                          :autoCrop="option.autoCrop"
                          :autoCropWidth="option.autoCropWidth"
                          :autoCropHeight="option.autoCropHeight"
                          :fixedBox="option.fixedBox"
                          :fixed="option.fixed"
                          :fixedNumber="option.fixedNumber"
                          @realTime="realTime"
                          @imgLoad="imgLoad"
                        ></vueCropper>
                  </div>
                </div>
              </a-modal>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="upload">上 传</el-button>
          </span>
        </el-dialog>    
      </el-form-item>
      <el-form-item style="margin-top: 0.3rem;">
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
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
    name: 'senior',
    data() {
      return {
        dialogVisible: false,
        visible: false,
        uploadUrl: 'http://139.155.15.107:8000/bzlq/file/upload/image',
        openId: this.$route.params.openid == null? '' : this.$route.params.openid,
        loading: '',
        classList: [],
        fileImgList: [],
        isCropper: false,
        //裁剪组件的基础配置option
        previews: {},
        option: {
          img: "", // 裁剪图片的地址
          info: true, // 裁剪框的大小信息
          outputSize: 1, // 剪切后的图片质量（0.1-1）
          full: true, // 输出原图比例截图 props名full
          outputType: "jpg", // 裁剪生成额图片的格式
          canMove: false, // 能否拖动图片
          original: false, // 上传图片是否显示原始宽高
          canMoveBox: true, // 能否拖动截图框
          centerBox: true, //截图框是否限制在图片里面
          autoCrop: true, // 是否默认生成截图框
          autoCropWidth: 250, // 默认生成截图框宽度
          autoCropHeight: 350, // 默认生成截图框高度
          fixedBox: false, // 截图框固定大小
          fixed: true,
          fixedNumber: [5, 7] //截图框的宽高比例
        },
        
        ruleForm: this.$route.params.stuInfo == null? {
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
          "photo": "",
          "openid": this.$route.params.openid == null? '' : this.$route.params.openid,
        } : this.$route.params.stuInfo,
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
    components:{
      VueCropper: VueCropper
    },
    mounted() {
      this.classList = (() => {
        let arr = []
        for(let i=1; i<31; i++){
          arr.push({label: i + '班'})
        }
        return arr
      })()
    },
    computed: {},
    methods: {
      handlePictureCardPreview(cutImg) {
      this.option.img = cutImg;
      console.log(this.option.img);
      this.isCropper = true;
    },

    beforeAvatarUploadPS(e) {
      var file = e.target.files[0];
      this.option.img = URL.createObjectURL(file);

      const isDWG = file.name.split(".");
      const format = isDWG[isDWG.length - 1];
      if (format != "png" && format != "jpg" && format != "jpeg") {
        this.$message.error("上传文件只能是 png或jpg 格式!");
        return false;
      }
      console.log("beforeAvatarUploadPS");
      this.isCropper = true;
    },
    // 然后我加了几个剪切的按钮进行旋转或放大，并把上传方法一并粘贴到如下：

    turnLeft() {
      this.$refs.cropper.rotateLeft();
    },
    turnRight() {
      this.$refs.cropper.rotateRight();
    },
    cancleCropper() {
      //取消截图
      this.isCropper = false;
    },
    changeScale(num) {
      num = num || 1;
      this.$refs.cropper.changeScale(num);
    },
    imgLoad(msg) {
      console.log("imgLoad");
      console.log(msg);
    },
    // 实时预览函数
    realTime(data) {
      console.log("realTime:", data);
      this.previews = data;
    },
    parseInt(base64url){
      var str = base64url.replace('data:image/jpeg;base64,', '');
      var strLength = str.length;
       (fileLength / 1024).toFixed(2);
    },
    cancel(){
      if(this.showMask){
        this.showMask = !this.showMask
      }
    },

    upload(){
      this.$refs.cropper.getCropBlob((fileImg) => { 
            this.openFullScreen1();
            let file = fileImg;
            var strLength = file.length;
            if((strLength / 1024).toFixed(2)>=2000){
               alert("图片超过2M,不能上传");
              return;
            }
            let formData = new FormData();
            formData.append("file", file);
            this.$http.post("http://139.155.15.107:8000/bzlq/file/upload/image", formData, {contentType: false, processData: false, headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
                .then((response)=>{
                  this.loading.close();
                  console.log(JSON.stringify(response));
                  var url = response.data;
                  if(response.status == 200){
                    this.ruleForm.photo = url;
                    this.dialogVisible = false;
                  }
                });
      })
    },
    onCubeImg() {
      //剪切上传
      // 获取cropper的截图的base64 数据
      this.$refs.cropper.getCropData(async fileImg => {
        try {
          this.openFullScreen1();
          let file = fileImg;
          let data = new FormData();
          var str = file.replace('data:image/jpeg;base64,', '');
          var strLength = str.length;
          if((strLength / 1024).toFixed(2)>=2000){
             alert("图片超过2M,不能上传");
            return;
          }
          data.append("file", file);
          console.log(data.get('file'));
          let config = {
                  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                };
          this.$axios
            .post(
              "http://192.168.1.4:20100/bzlq/file/upload/image1",
              data,
              config
            )
            .then(res => {
              this.loading.close();
              console.log(JSON.stringify(res));
              let fileurl = res.data;
              if (res.status == 200) {
                this.dialogVisible = false;
                this.fileImgList.push({
                  url: fileurl
                });
                this.$emit('getUrl',this.fileImgList[0].url)
                this.option.img = "";//重置组件数据
                this.show = false;
              }
            })
            .catch(err => {});
        } catch (e){
        };
      });
    },
    // 将base64的图片转换为file文件
    convertBase64UrlToBlob(urlData) {
      let bytes = window.atob(urlData.split(",")[1]); //去掉url的头，并转换为byte
      //处理异常,将ascii码小于0的转换为大于0
      let ab = new ArrayBuffer(bytes.length);
      let ia = new Uint8Array(ab);
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
      return new Blob([ab], { type: "image/jpeg" });
    },
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
            this.axios.post('http://139.155.15.107:8000/bzlq/candidate/junior/save', query).then(res => {
              if(res.data.result_code === 200){
                MessageBox.alert(`<strong style="color: blue">${res.data.msg}</strong>`, '成功提示', {
                  dangerouslyUseHTMLString: true,
                  closeOnClickModal: true,
                  showConfirmButton: false,
                  showClose: true
                });
                 this.$router.push({path: '/juniorListMobile'})
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
