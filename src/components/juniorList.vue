<template>
  <el-container>
    <el-header>
      <el-menu default-active="2" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">{{year}}年招生报名初升高</el-menu-item>
        <el-menu-item index="2">{{year}}年招生报名小升初</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <div class="list">
        <h2>巴中龙泉外国语学校{{year}}年初一报名登记</h2>
        <el-row class="padding">
          <el-form :inline="true" label-width="100px">
            <el-form-item label="查询条件">
              <el-input style="width: 500px" placeholder="可模糊匹配以下信息：姓名,考号,区域,毕业学校,班主任姓名,等级,描述" v-model="studentName"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getList(1)">查询</el-button>
              <el-button type="primary" @click="add">报名</el-button>
              <el-button type="primary" @click="exportList">导出</el-button>
              <el-button type="primary" @click="importList">导入学生成绩</el-button>
            </el-form-item>
          </el-form>
        </el-row>
        <el-row class="padding">
          <el-col :span='24'>
            <el-table :data="tableData" border style="width: 100%" class="left">
              <el-table-column prop="no" label="考号" width="100" fixed></el-table-column>
              <el-table-column prop="name" label="姓名" width="100" fixed></el-table-column>
              <el-table-column prop="gender" label="性别" :formatter="genderFmt"></el-table-column>
              <el-table-column prop="identity_num" label="身份证号码" width="170"></el-table-column>
              <el-table-column prop="parent_phone" label="父亲电话" width="120"></el-table-column>
              <el-table-column prop="parent_phone_back" label="母亲电话" width="120"></el-table-column>
              <el-table-column prop="region" label="区县" width="80"></el-table-column>
              <el-table-column prop="primary_school" label="毕业学校" width="200"></el-table-column>
              <el-table-column prop="class_no" label="班号" width="120"></el-table-column>
              <el-table-column prop="head_teacher" label="班主任姓名" width="120"></el-table-column>
              <el-table-column prop="head_teacher_phone" label="班主任电话" width="120"></el-table-column>
              <el-table-column prop="points_of_chinese" label="语文" width="80"></el-table-column>
              <el-table-column prop="points_of_math" label="数学" width="80"></el-table-column>
              <el-table-column prop="total_points" label="总分" width="80"></el-table-column>
              <el-table-column prop="level" label="等级" width="80"></el-table-column>
              <el-table-column prop="fee" label="费用" width="80"></el-table-column>
              <el-table-column prop="description" label="备注" width="150" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column label="操作" width="200" fixed="right">
                <template slot-scope="scope">
                  <el-button @click="edit(scope.row)" type="text" size="small">修改报名信息</el-button>
                  <!-- <el-button @click="see(scope.row.id)" type="text" size="small">查看报名证信息</el-button> -->
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-row class="padding" v-show='tableData.length'>
          <Pagination :total-items="page.totalItems" :page-size.sync="page.pageSize" :current-page.sync="page.currentPage"
                      @sizeChange="sizeChange" @pageChange="pageChange"></Pagination>
        </el-row>
        <el-dialog title="查看报名证信息" :visible.sync="seeDialog" v-if="seeDialog" width="400px">
          <div class="info" id="newImg">
            <img src="../../static/images/BZLQ_LOGO.png" alt="" style="width: 71px;height: 57px;position: absolute;top: 0;left: 5px;z-index: 1;" crossorigin="anonymous">
            <img src="../../static/images/signet.png" alt="" style="width: 100px;height: 100px;position: absolute;bottom: 165px;right: 45px;z-index: 1;" crossorigin="anonymous">
            <h3>巴中龙泉外国语学校</h3>
            <h3>{{year}}年初中一年级</h3>
            <h2>报名证</h2>
            <el-row>
              <el-col :span="24"><img style="width: 130px;height: 181px;margin: 10px 0 20px;" :src="infoData.photo || 'http://139.155.15.107:8000/file/photos/sample.jpeg'" alt=""></el-col>
              <el-col :span="6">毕业学校</el-col>
              <el-col :span="18">{{infoData.primary_school}}</el-col>
              <el-col :span="6">姓名</el-col>
              <el-col :span="8" style="text-align: center">{{infoData.name}}</el-col>
              <el-col :span="6">性别</el-col>
              <el-col :span="4">{{infoData.gender | genderFilter}}&nbsp;</el-col>
              <el-col :span="6">报名类别</el-col>
              <el-col :span="18">小升初</el-col>
              <el-col :span="6">报名序号</el-col>
              <el-col :span="18"><p>{{infoData.no}}&nbsp;</p></el-col>
              <el-col :span="6">报名地点</el-col>
              <el-col :span="18"><p>巴中龙泉外国语学校(巴州区北山路10号)</p></el-col>
            </el-row>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="seeDialog = false">取 消</el-button>
            <el-button type="primary" @click="imgCreate">生成图片</el-button>
          </div>
        </el-dialog>
        <el-dialog title="报名证" :visible.sync="ticketDialog" v-if="ticketDialog" width="400px">
          <img :src="ticketImg" alt="" width="360px">
        </el-dialog>
        <el-dialog title="巴中龙泉外国语学校六年级综合素质测评" :visible.sync="juniorDialog" v-if="juniorDialog" width="650px" @closed="ruleClose">
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
              <!-- <el-form-item prop="photo" style="text-align: left">
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
              </el-form-item> -->
              <el-form-item style="margin: 0.3rem 0 0;">
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-dialog>
        <el-dialog title="导入学生成绩" :visible.sync="importDialog" v-if="importDialog" width="450px">
          <el-form>
            <el-upload
              class="upload-demo"
              ref="upload"
              action="http://139.155.15.107:8000/bzlq/candidate/junior/import"
              :on-success="handleSuccess"
              :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="importDialog = false">取 消</el-button>
            <el-button type="primary" @click="submitUpload">上传到服务器</el-button>
          </div>
        </el-dialog>
      </div>
    </el-main>
  </el-container>
</template>
<script>
  import html2canvas from 'html2canvas'
  import {Message, MessageBox, Loading} from 'element-ui'
  import Pagination from './Pagination.vue'
  import { getSessionItem } from '../common/util'

  export default {
    name: 'juniorList',
    components: {
      Pagination
    },
    data () {
      return {
        studentName: '',
        page: {
          currentPage: 1,
          pageSize: 10,
          totalItems: 0
        },
        tableData: [],
        seeDialog: false,
        ticketDialog: false,
        imgDialog: false,
        juniorDialog: false,
        importDialog: false,
        ticketImg: '',
        student: '',
        infoData: '',
        year: '',

        uploadUrl: 'http://139.155.15.107:8000/bzlq/file/upload/image',
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
          "photo":""
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
          ]
          // ,
          // photo: [{
          //   required: true, trigger: 'blur', validator: (rule, value, callback) => {
          //     if (!this.ruleForm.photo) {
          //       callback(new Error('请上传一寸照片'))
          //     } else {
          //       callback()
          //     }
          //   }
          // }]
        }
      }
    },
    mounted () {
      this.classList = (() => {
        let arr = []
        for(let i=1; i<31; i++){
          arr.push({label: i + '班'})
        }
        return arr
      })()
      setInterval(() => {
        this.axios.post(`http://139.155.15.107:8000/bzlq/token/verify?token=${getSessionItem('token')}`).then(res => {
          if (res.data.result_code === 200) {

          } else {
            this.$router.push({path: '/login'})
          }
        })
      }, 3000000)
      this.axios.post(`http://139.155.15.107:8000/bzlq/token/verify?token=${getSessionItem('token')}`).then(res => {
        if (res.data.result_code === 200) {
          this.getList()
        } else {
          this.$router.push({path: '/login'})
        }
      })
    },
    created(){
      this.getYear()
      this.getList()
    },
    methods: {
      getYear(){
        this.axios.get(`http://139.155.15.107:8000/bzlq/candidate/year`).then(res => {
          this.year = res.data
        })
      },
      handleSelect(key){
        if(key === '1'){
          this.$router.push({path: '/seniorList'})
        }
      },
      pageChange (curpage) {
        this.page.currentPage = curpage
        this.getList()
      },
      sizeChange(pagesize){
        this.page.pageSize = pagesize
        this.getList()
      },
      reset(){
        this.queryForm = {
          afterServiceType: '' || undefined,
          afterServiceStatus: '' || undefined,
        }
      },
      //获取商品列表
      getList () {
        let query = {
          search_param: this.studentName,
          page_num: this.page.currentPage,
          page_size: this.page.pageSize,
        }
        this.axios.post(`http://139.155.15.107:8000/bzlq/candidate/junior/search`, query).then(res => {
          if(res.data.result_code === 200){
            this.tableData = res.data.data.data;
            this.page.totalItems = res.data.data.recordCount
          } else {
            MessageBox.alert(`<strong style="color: red">${res.data.msg}</strong>`, '提示', {
              dangerouslyUseHTMLString: true,
              closeOnClickModal: true,
              showConfirmButton: false,
              showClose: true
            })
          }
        })
      },
      see(id){
        this.axios.get(`http://139.155.15.107:8000/bzlq/candidate/junior/get?id=${id}`).then(res => {
          if(res.data.result_code === 200){
            this.infoData = res.data.data
          } else {
            MessageBox.alert(`<strong style="color: red">${res.data.msg}</strong>`, '提示', {
              dangerouslyUseHTMLString: true,
              closeOnClickModal: true,
              showConfirmButton: false,
              showClose: true
            })
          }
        })
        this.$nextTick(() => {
          this.seeDialog = true
        })
      },
      imgCreate(){
        this.ticketImg = ''
        let that = this;
        let opts = {useCORS: true,allowTaint: false};
        html2canvas(document.getElementById("newImg"), opts).then(function (canvas) {
          let imgUri = canvas.toDataURL("image/jpeg", 2); // 获取生成的图片的url
          that.ticketImg = imgUri;
        })
        this.seeDialog = false
        this.$nextTick(() => {
          this.ticketDialog = true
        })
      },
      edit(data){
        this.ruleForm = data
        this.$nextTick(() => {
          this.juniorDialog = true
        })
      },
      add(){
        this.ruleClose()
        this.$nextTick(() => {
          this.juniorDialog = true
        })
      },
      exportList(){
        window.open('http://139.155.15.107:8000/bzlq/candidate/junior/export')
      },
      importList(){
        this.importDialog = true
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleSuccess(res) {
        if(res.result_code === 200){
          MessageBox.alert(`<strong style="color: blue">上传成功</strong>`, '提示', {
            dangerouslyUseHTMLString: true,
            closeOnClickModal: true,
            showConfirmButton: true,
            showClose: true
          })
          this.importDialog = false
        } else {
          MessageBox.alert(`<strong style="color: red">${res.data.msg}</strong>`, '上传失败', {
            dangerouslyUseHTMLString: true,
            closeOnClickModal: true,
            showConfirmButton: false,
            showClose: true
          })
        }
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
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios.post('http://139.155.15.107:8000/bzlq/candidate/junior/save', query).then(res => {
              if(res.data.result_code === 200){
                this.seniorDialog = false;
                MessageBox.alert(`<strong style="color: blue">${res.data.msg}</strong>`, '提示', {
                  dangerouslyUseHTMLString: true,
                  closeOnClickModal: true,
                  showConfirmButton: false,
                  showClose: true
                });
                this.juniorDialog = false;
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
      },
      ruleClose(){
        this.ruleForm = {
          "name":"", //姓名
          "gender":"", //性别
          "identity_num":"",  //身份证号码
          "phone": "", //手机号码
          "parent_phone":"", //父母电话1
          "parent_phone_back":"",  //父母电话2
          "region":"", //区域
          "primary_school":"", //毕业学校
          "class":"",  //班级
          "head_teacher":"",  //班主任
          "head_teacher_phone":"",  //电话
          "photo": ""
        }
      },

      genderFmt (row, column, value) {
        let map = {
          'male': '男',
          'female': '女'
        }
        return map[value] ? map[value] : ''
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

